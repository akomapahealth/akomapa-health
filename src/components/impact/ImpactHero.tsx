"use client";

import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { HeroEntranceH1, HeroEntranceP } from "@/components/motion/HeroEntrance";
import { parseMetricDisplayValue } from "@/lib/impact/parseMetricValue";

const heroStats = [
  { id: "screened", value: "2,000+", label: "Community members screened" },
  { id: "leaders", value: "300+", label: "Student leaders trained" },
  { id: "hubs", value: "3", label: "Community health hubs" },
] as const;

export default function ImpactHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#1C1F1E] via-[#0F4C5C] to-[#0097b2] py-16 sm:py-20 md:py-28"
      aria-labelledby="impact-hero-heading"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="site-container relative z-10 mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Content */}
          <div className="max-w-3xl flex-1">
            <HeroEntranceP className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5C94D] sm:text-sm">
              Measuring Progress
            </HeroEntranceP>
            <HeroEntranceH1
              id="impact-hero-heading"
              delay={0.05}
              className="mt-4 font-heading text-4xl font-bold leading-tight text-[#FCFAEF] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Our Impact
            </HeroEntranceH1>
            <HeroEntranceP
              delay={0.1}
              className="mt-5 max-w-2xl text-lg leading-relaxed text-[#FCFAEF]/85 sm:text-xl"
            >
              Measured in communities strengthened, leaders developed, and
              systems transformed.
            </HeroEntranceP>

            {/* Lead stats */}
            <FadeIn direction="up" delay={0.25}>
              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 sm:gap-6">
                {heroStats.map((stat) => {
                  const { value, prefix, suffix } = parseMetricDisplayValue(
                    stat.value,
                  );
                  return (
                    <div
                      key={stat.id}
                      className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm sm:p-5"
                    >
                      <dd>
                        <AnimatedMetric
                          value={value}
                          prefix={prefix}
                          suffix={suffix}
                          className="font-heading text-2xl font-bold tracking-tight text-[#F5C94D] sm:text-3xl md:text-4xl"
                        />
                      </dd>
                      <dt className="mt-1.5 text-xs leading-snug text-[#FCFAEF]/75 sm:text-sm">
                        {stat.label}
                      </dt>
                    </div>
                  );
                })}
              </dl>
            </FadeIn>
          </div>

          {/* Hero image */}
          <FadeIn
            direction="left"
            delay={0.2}
            className="w-full lg:max-w-md xl:max-w-lg"
          >
            <div className="relative h-[280px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[360px] md:h-[420px] lg:h-[480px]">
              <Image
                src="/highlights/Akomapa-20.jpg"
                alt="Akomapa community health outreach in progress"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
