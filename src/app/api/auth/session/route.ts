import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = await getSupabaseServer();
  const resp = await supabase?.auth.getUser();
  const user = resp && "data" in resp ? resp.data.user : null;
  return NextResponse.json({ user: user ?? null });
}
