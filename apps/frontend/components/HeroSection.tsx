"use client";

export default function HeroSection() {
  return (
    <section className="bg-[#101010] text-white py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Column */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-inter font-bold text-[32px] leading-[38.73px] tracking-[0] mb-4">
            Conquer the Dojo
          </h1>
          <p className="text-lg mb-6">
            Leverage powerful tooling with Dojo Engine, Cartridge, Caldera, and
            Starknet.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Primary Button */}
            <a
              href="/tatami-gui"
              className="bg-[#FEB913] text-[#101010] font-semibold py-3 px-6 rounded-md transition-colors hover:bg-yellow-500"
            >
              Try Tatami
            </a>
            {/* Secondary Button */}
            <a
              href="/learn-more"
              className="border border-[#FEB913] text-[#FEB913] font-semibold py-3 px-6 rounded-md transition-colors hover:bg-[#262626]"
            >
              Open Docs
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className="md:w-1/2">
          <img
            src="/hero-illustration.png"
            alt="Hero illustration"
            className="w-full h-auto opacity-45"
          />
        </div>
      </div>
    </section>
  );
}
