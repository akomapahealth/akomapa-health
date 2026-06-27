"use client";

import Image from "@/components/common/Image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import { partnershipsHeroContent } from "@/data/partnerships";

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ctaStyles = {
  amber:
    "bg-[#eeba2b] text-[#FCFAEF] shadow-lg hover:bg-[#eeba2b]/80 hover:shadow-xl focus-visible:ring-[#F5C94D]",
  teal: "bg-[#0097b2] text-[#FCFAEF] shadow-lg hover:bg-[#0097b2]/80 hover:shadow-xl focus-visible:ring-[#8DD4E6]",
} as const;

export default function PartnershipsHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#1C1F1E] via-[#0F4C5C] to-[#0097b2] py-16 sm:py-20 md:py-28"
      aria-labelledby="partnerships-hero-heading"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Content */}
          <FadeIn className="max-w-3xl flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5C94D] sm:text-sm">
              {partnershipsHeroContent.eyebrow}
            </p>
            <h1
              id="partnerships-hero-heading"
              className="mt-4 text-3xl font-light leading-tight text-[#FCFAEF] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              {partnershipsHeroContent.heading}
            </h1>
            <p className="mt-4 text-lg font-semibold text-[#F5C94D] md:text-xl lg:text-2xl">
              {partnershipsHeroContent.subtitle}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg md:text-xl">
              {partnershipsHeroContent.description}
            </p>

            {/* CTAs */}
            <FadeIn direction="up" delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                {partnershipsHeroContent.ctas.map((cta) => (
                  <Button
                    key={cta.label}
                    asChild
                    className={`${ctaBaseClass} ${ctaStyles[cta.variant]}`}
                  >
                    <Link href={cta.href}>{cta.label}</Link>
                  </Button>
                ))}
              </div>
            </FadeIn>
          </FadeIn>

          {/* Hero image */}
          <FadeIn
            direction="left"
            delay={0.2}
            className="w-full lg:max-w-md xl:max-w-lg"
          >
            <div className="relative h-[280px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[360px] md:h-[420px] lg:h-[480px]">
              <Image
                src={partnershipsHeroContent.image.src}
                alt={partnershipsHeroContent.image.alt}
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
