import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseBrowser(): SupabaseClient | null {
  if (!url || !anon) return null;
  return createBrowserClient(url, anon);
}
