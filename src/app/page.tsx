import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Falling Cherry Blossom Petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Petal 1 */}
        <div className="absolute left-[15%] animate-petal-fall-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="drop-shadow-sm">
            <path
              d="M10 2 C6 6, 6 10, 10 10 C14 10, 14 6, 10 2 Z M10 10 C14 14, 10 18, 10 18 C10 18, 6 14, 10 10 Z"
              fill="#FF73B9"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Petal 2 */}
        <div className="absolute left-[30%] animate-petal-sway-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="drop-shadow-sm">
            <path
              d="M8 1.5 C5.5 4.5, 5.5 7.5, 8 7.5 C10.5 7.5, 10.5 4.5, 8 1.5 Z M8 7.5 C10.5 10.5, 8 14.5, 8 14.5 C8 14.5, 5.5 10.5, 8 7.5 Z"
              fill="#EAEAF0"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* Petal 3 */}
        <div className="absolute left-[50%] animate-petal-fall-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className="drop-shadow-sm">
            <path
              d="M9 2 C6.5 5.5, 6.5 9, 9 9 C11.5 9, 11.5 5.5, 9 2 Z M9 9 C11.5 12.5, 9 16, 9 16 C9 16, 6.5 12.5, 9 9 Z"
              fill="#FF73B9"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Petal 4 */}
        <div className="absolute left-[70%] animate-petal-sway-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            className="drop-shadow-sm">
            <path
              d="M7 1 C5 3.5, 5 6.5, 7 6.5 C9 6.5, 9 3.5, 7 1 Z M7 6.5 C9 9.5, 7 13, 7 13 C7 13, 5 9.5, 7 6.5 Z"
              fill="#9B5CF6"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Petal 5 */}
        <div
          className="absolute left-[85%] animate-petal-fall-1"
          style={{ animationDelay: "5s" }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            className="drop-shadow-sm">
            <path
              d="M11 2 C7.5 6.5, 7.5 11, 11 11 C14.5 11, 14.5 6.5, 11 2 Z M11 11 C14.5 15.5, 11 20, 11 20 C11 20, 7.5 15.5, 11 11 Z"
              fill="#EAEAF0"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Petal 6 */}
        <div
          className="absolute left-[5%] animate-petal-sway-1"
          style={{ animationDelay: "7s" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="drop-shadow-sm">
            <path
              d="M8 1.5 C5.5 4.5, 5.5 7.5, 8 7.5 C10.5 7.5, 10.5 4.5, 8 1.5 Z M8 7.5 C10.5 10.5, 8 14.5, 8 14.5 C8 14.5, 5.5 10.5, 8 7.5 Z"
              fill="#FF73B9"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* Petal 7 */}
        <div
          className="absolute left-[25%] animate-petal-fall-2"
          style={{ animationDelay: "2s" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            className="drop-shadow-sm">
            <path
              d="M9 2 C6.5 5.5, 6.5 9, 9 9 C11.5 9, 11.5 5.5, 9 2 Z M9 9 C11.5 12.5, 9 16, 9 16 C9 16, 6.5 12.5, 9 9 Z"
              fill="#9B5CF6"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Petal 8 */}
        <div
          className="absolute left-[75%] animate-petal-sway-2"
          style={{ animationDelay: "6s" }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            className="drop-shadow-sm">
            <path
              d="M10 2 C6 6, 6 10, 10 10 C14 10, 14 6, 10 2 Z M10 10 C14 14, 10 18, 10 18 C10 18, 6 14, 10 10 Z"
              fill="#EAEAF0"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Petal 9 */}
        <div
          className="absolute left-[45%] animate-petal-fall-1"
          style={{ animationDelay: "9s" }}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            className="drop-shadow-sm">
            <path
              d="M7.5 1.5 C5.5 4, 5.5 7, 7.5 7 C9.5 7, 9.5 4, 7.5 1.5 Z M7.5 7 C9.5 10, 7.5 13.5, 7.5 13.5 C7.5 13.5, 5.5 10, 7.5 7 Z"
              fill="#FF73B9"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Petal 10 */}
        <div
          className="absolute left-[65%] animate-petal-sway-1"
          style={{ animationDelay: "4s" }}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            className="drop-shadow-sm">
            <path
              d="M8.5 1.5 C6 4.5, 6 8, 8.5 8 C11 8, 11 4.5, 8.5 1.5 Z M8.5 8 C11 11.5, 8.5 15.5, 8.5 15.5 C8.5 15.5, 6 11.5, 8.5 8 Z"
              fill="#9B5CF6"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/cherry-blossom-bg.svg"
            alt=""
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0E14]/20 via-[#0B0E14]/40 to-[#0B0E14]/80"></div>
        </div>

        {/* Gradient Spotlight */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-[#9B5CF6]/10 via-[#FF73B9]/5 to-transparent blur-3xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          {/* Japanese Text */}
          <div className="mb-6">
            <p className="text-[#FF73B9]/70 text-3xl font-light tracking-wide">
              こんにちは
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] bg-clip-text text-transparent">
              Konnichiwa
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#EAEAF0] mb-8 max-w-2xl mx-auto leading-relaxed">
            Master Japanese with{" "}
            <span className="bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] bg-clip-text text-transparent font-semibold">
              beautiful learning
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="group relative rounded-full px-8 py-4 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200 transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Start Learning Free
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-200"></div>
            </Link>

            <button className="flex items-center gap-2 rounded-full px-8 py-4 border border-white/15 text-white/90 hover:bg-white/5 transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Cultural Context */}
            <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:border-[#9B5CF6]/30 hover:shadow-lg hover:shadow-[#9B5CF6]/10 transform hover:-translate-y-2 transition-all duration-200">
              <div className="text-4xl mb-4">🏯</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Cultural Context
              </h3>
              <p className="text-[#A3A7B7] leading-relaxed">
                Learn through Japanese culture and traditions.
              </p>
            </div>

            {/* AI Tutor */}
            <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:border-[#9B5CF6]/30 hover:shadow-lg hover:shadow-[#9B5CF6]/10 transform hover:-translate-y-2 transition-all duration-200">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-3">AI Tutor</h3>
              <p className="text-[#A3A7B7] leading-relaxed">
                Personalized lessons adapted to your pace.
              </p>
            </div>

            {/* Native Practice */}
            <div className="group backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:border-[#9B5CF6]/30 hover:shadow-lg hover:shadow-[#9B5CF6]/10 transform hover:-translate-y-2 transition-all duration-200">
              <div className="text-4xl mb-4">🗣️</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Native Practice
              </h3>
              <p className="text-[#A3A7B7] leading-relaxed">
                Conversation practice with native speakers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="rounded-full px-8 py-4 font-semibold text-white bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B5CF6] transition-all duration-200 transform hover:scale-105">
              Start Learning Free →
            </Link>

            <button className="flex items-center gap-2 rounded-full px-8 py-4 border border-white/15 text-white/90 hover:bg-white/5 transition-colors duration-200">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Students */}
            <div className="flex items-center gap-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <div className="text-2xl">👥</div>
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-[#A3A7B7]">Students</div>
              </div>
            </div>

            {/* Success Rate */}
            <div className="flex items-center gap-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <div className="text-2xl">📈</div>
              <div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm text-[#A3A7B7]">Success Rate</div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-6 py-4">
              <div className="text-2xl">⭐</div>
              <div>
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-sm text-[#A3A7B7]">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#9B5CF6] to-[#FF73B9] flex items-center justify-center text-white font-bold text-sm">
                K
              </div>
              <span className="text-xl font-bold text-white">Konnichiwa</span>
            </div>

            {/* Links */}
            <nav className="flex items-center gap-8 text-sm">
              <Link
                href="#features"
                className="text-[#A3A7B7] hover:text-white transition-colors">
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-[#A3A7B7] hover:text-white transition-colors">
                Pricing
              </Link>
              <Link
                href="#about"
                className="text-[#A3A7B7] hover:text-white transition-colors">
                About
              </Link>
              <Link
                href="#contact"
                className="text-[#A3A7B7] hover:text-white transition-colors">
                Contact
              </Link>
              <Link
                href="#privacy"
                className="text-[#A3A7B7] hover:text-white transition-colors">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
