import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabaseServer";

export default async function DashboardPage() {
  const supabase = await getSupabaseServer();
  if (!supabase) redirect("/");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const userId = user.id;
  const now = new Date();
  const nowIso = now.toISOString();
  const weekAgoIso = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();
  const thirtyDaysAgoIso = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  const [
    dueTodayRes,
    masteredRes,
    totalProgressRes,
    learnedThisWeekRes,
    reviewedThisWeekRes,
    sessions30dRes,
  ] = await Promise.all([
    supabase
      .from("user_kanji_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .lte("next_review", nowIso),
    supabase
      .from("user_kanji_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("confidence_level", 4),
    supabase
      .from("user_kanji_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId),
    supabase
      .from("user_kanji_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", weekAgoIso),
    supabase
      .from("user_kanji_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("last_reviewed", weekAgoIso),
    supabase
      .from("study_sessions")
      .select("start_time")
      .eq("user_id", userId)
      .gte("start_time", thirtyDaysAgoIso),
  ]);

  type CountHeadResponse = { count: number | null } | null | undefined;
  const safeCount = (res: CountHeadResponse) =>
    res && typeof res.count === "number" ? res.count : 0;

  const dueToday = safeCount(dueTodayRes);
  const mastered = safeCount(masteredRes);
  const totalLearned = safeCount(totalProgressRes);
  const learnedThisWeek = safeCount(learnedThisWeekRes);
  const reviewedThisWeek = safeCount(reviewedThisWeekRes);
  const sessions30d: { start_time: string }[] = sessions30dRes?.data || [];

  // Approximate new items available to learn: total kanji - already started
  const [kanjiTotalRes] = await Promise.all([
    supabase.from("kanji").select("id", { count: "exact", head: true }),
  ]);
  const kanjiTotal = safeCount(kanjiTotalRes);
  const newToLearn = Math.max(0, kanjiTotal - totalLearned);

  // Streak computation
  const dayKey = (d: Date) => d.toISOString().slice(0, 10);
  const sessionDays = new Set<string>(
    sessions30d.map((s) => new Date(s.start_time).toISOString().slice(0, 10))
  );
  let streak = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date(now.getTime() - i * 86400000);
    if (sessionDays.has(dayKey(d))) streak++;
    else break;
  }

  // Weekly goal and overall progress
  const weeklyGoal = 20;
  const weeklyProgressPct = Math.min(
    100,
    Math.round((learnedThisWeek / weeklyGoal) * 100)
  );
  const masteredPct =
    kanjiTotal > 0 ? Math.round((mastered / kanjiTotal) * 100) : 0;

  // CTA emphasis
  const hasDue = dueToday > 0;

  return (
    <div className="min-h-screen px-6 py-8 space-y-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white">
              <span className="bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="text-[#A3A7B7] mt-2">
              Track your Japanese learning progress
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/study?mode=learn"
              className={
                hasDue
                  ? "rounded-full px-6 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition-colors duration-200"
                  : "rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200"
              }>
              Start Learn (5)
            </a>
            <div className="relative">
              <a
                href="/study?mode=review"
                className={
                  hasDue
                    ? "rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200 animate-pulse"
                    : "rounded-full px-6 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition-colors duration-200"
                }>
                Start Review ({dueToday})
              </a>
              {hasDue ? (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-[#FF73B9] animate-bounce">
                  ⚡ {dueToday} reviews due now
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Stats: mobile carousel, desktop grid */}
      <section className="max-w-7xl mx-auto">
        <div className="sm:grid sm:grid-cols-3 sm:gap-6 overflow-x-auto sm:overflow-visible flex gap-4 snap-x snap-mandatory">
          {/* Daily */}
          <div className="snap-start min-w-[80%] sm:min-w-0 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:border-[#6BE4FF]/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">📅</div>
              <h3 className="text-lg font-bold text-white">Daily</h3>
            </div>
            <div className="mt-3 text-3xl font-bold text-white">{dueToday}</div>
            <div className="text-sm text-[#A3A7B7]">Due today</div>
            <div className="mt-4 h-2 rounded-full bg-white/10">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-[#6BE4FF] to-[#9B5CF6]"
                style={{ width: `${Math.min(100, (dueToday / 10) * 100)}%` }}
              />
            </div>
            <div className="mt-3 text-sm text-[#A3A7B7]">
              🔥 Streak:{" "}
              <span className="text-white font-semibold">{streak}</span> day
              {streak === 1 ? "" : "s"}
            </div>
          </div>

          {/* Weekly */}
          <div className="snap-start min-w-[80%] sm:min-w-0 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:border-[#9B5CF6]/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">📈</div>
              <h3 className="text-lg font-bold text-white">Weekly</h3>
            </div>
            <div className="mt-3 text-3xl font-bold text-white">
              {learnedThisWeek}
            </div>
            <div className="text-sm text-[#A3A7B7]">New learned this week</div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-[#A3A7B7]">
                <span>Goal</span>
                <span>
                  {learnedThisWeek} / {weeklyGoal}
                </span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9]"
                  style={{ width: `${weeklyProgressPct}%` }}
                />
              </div>
            </div>
            <div className="mt-3 text-sm text-[#A3A7B7]">
              <span className="text-white font-semibold">
                {reviewedThisWeek}
              </span>{" "}
              reviews
            </div>
          </div>

          {/* Overall with radial progress */}
          <div className="snap-start min-w-[80%] sm:min-w-0 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:border-[#FF73B9]/30 transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">🌏</div>
              <h3 className="text-lg font-bold text-white">Overall</h3>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <svg
                width="80"
                height="80"
                viewBox="0 0 36 36"
                className="shrink-0">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  strokeDasharray={`${masteredPct}, 100`}
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%">
                    <stop offset="0%" stopColor="#9B5CF6" />
                    <stop offset="100%" stopColor="#FF73B9" />
                  </linearGradient>
                </defs>
                <text
                  x="18"
                  y="20"
                  textAnchor="middle"
                  fontSize="6"
                  fill="#EAEAF0">
                  {masteredPct}%
                </text>
              </svg>
              <div>
                <div className="text-2xl font-bold text-white">{mastered}</div>
                <div className="text-sm text-[#A3A7B7]">Mastered</div>
                <div className="mt-1 text-sm text-[#A3A7B7]">
                  <span className="text-white">{totalLearned}</span> learned ·{" "}
                  <span className="text-white">{newToLearn}</span> new
                </div>
                {mastered >= 50 ? (
                  <div className="mt-2 inline-flex items-center gap-2 text-sm bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] text-white px-3 py-1 rounded-full">
                    🏅 50 Kanji Learned
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Tip / Personalization */}
      <section className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">🌟</div>
            <h3 className="text-lg font-bold text-white">Daily Tip</h3>
          </div>
          <p className="text-[#A3A7B7] leading-relaxed">
            <span className="text-[#FF73B9] font-medium">
              「習うより慣れろ」
            </span>{" "}
            — Practice makes perfect. Review a few cards now to keep your streak
            alive!
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:border-[#9B5CF6]/30 hover:shadow-lg hover:shadow-[#9B5CF6]/10 transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">📚</div>
              <h3 className="text-lg font-bold text-white">
                Study Modes — Learn
              </h3>
            </div>
            <p className="mt-2 text-[#A3A7B7] leading-relaxed">
              Introduce 5 new kanji with examples and context. Build your base
              steadily.
            </p>
            <a
              href="/study?mode=learn"
              className="mt-6 inline-block rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200">
              Start Learn
            </a>
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:border-[#FF73B9]/30 hover:shadow-lg hover:shadow-[#FF73B9]/10 transition-all duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">🔄</div>
              <h3 className="text-lg font-bold text-white">
                Study Modes — Review
              </h3>
            </div>
            <p className="mt-2 text-[#A3A7B7] leading-relaxed">
              Spaced repetition on due cards to lock in memory.
            </p>
            <a
              href="/study?mode=review"
              className="mt-6 inline-block rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200">
              Start Review
            </a>
          </div>
        </div>
      </section>

      {/* Mobile bottom CTAs */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 backdrop-blur-md bg-[#0B0E14]/90 border-t border-white/10 flex items-center justify-between gap-3">
        <a
          href="/study?mode=learn"
          className={`flex-1 text-center rounded-full py-3 font-semibold transition-all duration-200 ${
            hasDue
              ? "border border-white/15 text-white/90 hover:bg-white/5"
              : "text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95"
          }`}>
          Learn
        </a>
        <a
          href="/study?mode=review"
          className={`flex-1 text-center rounded-full py-3 font-semibold transition-all duration-200 ${
            hasDue
              ? "text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 animate-pulse"
              : "border border-white/15 text-white/90 hover:bg-white/5"
          }`}>
          Review ({dueToday})
        </a>
      </div>
    </div>
  );
}
