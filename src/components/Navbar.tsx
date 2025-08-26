"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

export function Navbar() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/session", { cache: "no-store" });
        const json = await res.json();
        if (mounted) setIsAuthed(Boolean(json.user));
      } catch {}
    })();
    const supabase = getSupabaseBrowser();
    const sub = supabase?.auth.onAuthStateChange((_e, s) => {
      if (mounted) setIsAuthed(Boolean(s));
    });
    return () => {
      mounted = false;
      sub?.data.subscription.unsubscribe();
    };
  }, []);

  async function onLogout() {
    const supabase = getSupabaseBrowser();
    await supabase?.auth.signOut();
    setIsAuthed(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B0E14]/80 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-105">
              K
            </div>
            <span className="text-xl font-bold text-white">Konnichiwa</span>
          </Link>

          {/* Center Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-[#A3A7B7] hover:text-white transition-colors duration-200">
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-[#A3A7B7] hover:text-white transition-colors duration-200">
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-[#A3A7B7] hover:text-white transition-colors duration-200">
              About
            </Link>
            <Link
              href="#contact"
              className="text-[#A3A7B7] hover:text-white transition-colors duration-200">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {isAuthed ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200">
                  Dashboard
                </Link>
                <button
                  onClick={onLogout}
                  className="rounded-full px-6 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition-colors duration-200">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="rounded-full px-6 py-3 border border-white/15 text-white/90 hover:bg-white/5 transition-colors duration-200">
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
