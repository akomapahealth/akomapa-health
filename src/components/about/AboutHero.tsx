"use client";

import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import { aboutHero } from "@/data/about";

export default function AboutHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 sm:py-20 md:py-28"
      aria-labelledby="about-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <FadeIn className="max-w-3xl flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5C94D] sm:text-sm">
              {aboutHero.eyebrow}
            </p>
            <h1
              id="about-hero-heading"
              className="mt-4 text-3xl font-light leading-tight text-[#FCFAEF] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              {aboutHero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg md:text-xl">
              {aboutHero.openingParagraph}
            </p>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="w-full lg:max-w-md xl:max-w-lg">
            <div className="relative h-[280px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[360px] md:h-[420px] lg:h-[480px]">
              <Image
                src="/highlights/Akomapa-69.jpg"
                alt="Akomapa student leaders and community partners working together"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
