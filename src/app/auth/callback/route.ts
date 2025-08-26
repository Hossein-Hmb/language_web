import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function GET(req: Request) {
  const supabase = await getSupabaseServer();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  if (code) {
    await supabase?.auth.exchangeCodeForSession(code);
  } else {
    await supabase?.auth.getUser();
  }

  // Ensure user exists in public.users (for FK references)
  const { data: userRes } = await supabase!.auth.getUser();
  const user = userRes.user;
  if (user) {
    await supabase!.from("users").upsert(
      {
        id: user.id,
        email: user.email ?? "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
      },
      { onConflict: "id" }
    );
  }
  return NextResponse.redirect(new URL("/", url.origin));
}
