"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";
import type { Kanji } from "@/types/database";

interface LearnModeProps {
  jlptLevel: string;
  onComplete: () => void;
}

export function LearnMode({ jlptLevel, onComplete }: LearnModeProps) {
  const [kanjiBatch, setKanjiBatch] = useState<Kanji[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const targetBatchSize = 5; // later: make configurable per user

  const jlptLevelId = useMemo(() => {
    const map: Record<string, number> = { N5: 5, N4: 4, N3: 3, N2: 2, N1: 1 };
    return map[jlptLevel] ?? 5;
  }, [jlptLevel]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const supabase = getSupabaseBrowser();
        if (!supabase) throw new Error("Supabase not initialized");

        const { data: userRes, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userRes.user) throw new Error("No user session");
        const userId = userRes.user.id;

        // Ensure a corresponding row exists in public.users to satisfy FK
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("id", userId)
          .maybeSingle();
        if (!existingUser) {
          await supabase.from("users").insert({
            id: userId,
            email: userRes.user.email ?? "",
          });
        }

        // Fetch existing progress ids for this user (exclude already learned/learning)
        const { data: progressRows, error: progressErr } = await supabase
          .from("user_kanji_progress")
          .select("kanji_id")
          .eq("user_id", userId);
        if (progressErr) throw progressErr;
        const learnedIds = new Set(
          ((progressRows as { kanji_id: string }[] | null) || []).map(
            (row) => row.kanji_id
          )
        );

        // Fetch candidate kanji for this JLPT level
        const { data: candidates, error: kanjiErr } = await supabase
          .from("kanji")
          .select("*")
          .eq("jlpt_level_id", jlptLevelId)
          .order("character", { ascending: true })
          .limit(500);
        if (kanjiErr) throw kanjiErr;

        const fresh = (candidates || []).filter((k) => !learnedIds.has(k.id));
        const batch = fresh.slice(0, targetBatchSize);

        // Create progress rows with status "learning" for assigned batch
        if (batch.length > 0) {
          const rows = batch.map((k) => ({
            user_id: userId,
            kanji_id: k.id,
            status: "learning",
            confidence_level: 1,
            review_count: 0,
          }));
          const { error: insertErr } = await supabase
            .from("user_kanji_progress")
            .upsert(rows, { onConflict: "user_id,kanji_id" });
          if (insertErr) throw insertErr;
        }

        setKanjiBatch(batch as Kanji[]);
      } catch (e: unknown) {
        const message =
          e instanceof Error ? e.message : "Failed to create learn batch";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [jlptLevelId]);

  const handleNext = () => {
    if (currentIndex < kanjiBatch.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleFinish = async () => {
    try {
      const supabase = getSupabaseBrowser();
      if (!supabase) return onComplete();
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes?.user?.id;
      if (!userId) return onComplete();

      const ids = kanjiBatch.map((k) => k.id);
      const now = new Date();
      const next = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      // mark assigned batch as ready for review (first interval)
      const { error: updateErr } = await supabase
        .from("user_kanji_progress")
        .update({
          status: "review",
          last_reviewed: now.toISOString(),
          next_review: next.toISOString(),
          confidence_level: 1,
        })
        .eq("user_id", userId)
        .in("kanji_id", ids);
      if (updateErr) throw updateErr;
    } finally {
      onComplete();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="text-lg text-white">
            Preparing your learn batch...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="backdrop-blur-md bg-white/5 border border-red-500/30 rounded-2xl p-8">
          <div className="text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  if (kanjiBatch.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="text-[#A3A7B7]">
            No new kanji available for this level.
          </div>
        </div>
      </div>
    );
  }

  const k = kanjiBatch[currentIndex];
  const progress = ((currentIndex + 1) / kanjiBatch.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between text-sm text-[#A3A7B7] mb-3">
          <span>
            Learn:{" "}
            <span className="text-white font-semibold">{currentIndex + 1}</span>{" "}
            / {kanjiBatch.length}
          </span>
          <span className="text-white font-semibold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
        <div className="text-8xl font-bold text-center mb-6 text-white">
          {k.character}
        </div>
        <div className="text-center text-2xl mb-8 text-white font-semibold">
          {k.meaning}
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="font-semibold mb-2 text-white">On-yomi</div>
            <div className="text-[#A3A7B7] text-lg">
              {(k.on_yomi || []).join(", ") || "—"}
            </div>
          </div>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="font-semibold mb-2 text-white">Kun-yomi</div>
            <div className="text-[#A3A7B7] text-lg">
              {(k.kun_yomi || []).join(", ") || "—"}
            </div>
          </div>
        </div>

        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="font-semibold mb-3 text-white">Examples</div>
          <ul className="text-[#A3A7B7] space-y-2">
            {Array.isArray(k.examples) ? (
              (k.examples as unknown[]).slice(0, 4).map((example, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#9B5CF6] rounded-full"></div>
                  {typeof example === "string"
                    ? example
                    : JSON.stringify(example)}
                </li>
              ))
            ) : (
              <li>—</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        {currentIndex < kanjiBatch.length - 1 ? (
          <button
            onClick={handleNext}
            className="rounded-full px-8 py-3 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200">
            Next
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="rounded-full px-8 py-3 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200">
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
