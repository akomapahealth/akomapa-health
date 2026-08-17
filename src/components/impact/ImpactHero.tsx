"use client";

import Image from "@/components/common/Image";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { parseMetricDisplayValue } from "@/lib/impact/parseMetricValue";

const heroStats = [
  { id: "screened", value: "3,000+", label: "Community members screened" },
  { id: "leaders", value: "300+", label: "Student leaders trained" },
  { id: "hubs", value: "3", label: "Community health hubs" },
] as const;

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t sm:border-l sm:border-t-0",
] as const;

export default function ImpactHero() {
  return (
    <EditorialBand
      tone="teal"
      aria-labelledby="impact-hero-heading"
      className="border-b border-[#FCFAEF]/15 bg-[#0F4C5C]"
      containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <FadeIn className="lg:col-span-7 lg:pb-4">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Measuring Progress
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="impact-hero-heading"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            Our Impact
          </EditorialHeading>
          <EditorialLead className="mt-5 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            Measured in communities strengthened, leaders developed, and systems
            transformed.
          </EditorialLead>

          <FadeInStagger className="mt-10" staggerDelay={0.08}>
            <dl
              data-impact-hero-metrics
              className="grid max-w-2xl border-y border-[#FCFAEF]/25 sm:grid-cols-3"
            >
              {heroStats.map((stat, index) => {
                const { value, prefix, suffix } = parseMetricDisplayValue(
                  stat.value,
                );
                return (
                  <FadeInStaggerItem key={stat.id} direction="up">
                    <div
                      className={`flex min-h-28 flex-col justify-between border-[#FCFAEF]/25 px-1 py-6 sm:px-5 ${metricDividerClasses[index]}`}
                    >
                      <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/70">
                        {stat.label}
                      </dt>
                      <dd className="mt-4">
                        <AnimatedMetric
                          value={value}
                          prefix={prefix}
                          suffix={suffix}
                          className="font-heading text-2xl font-semibold tracking-tight text-[#F5C94D] sm:text-3xl"
                        />
                      </dd>
                    </div>
                  </FadeInStaggerItem>
                );
              })}
            </dl>
          </FadeInStagger>
        </FadeIn>

        <FadeIn direction="left" delay={0.15} className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C] lg:aspect-[4/5]">
            <Image
              src="/highlights/Akomapa-20.jpg"
              alt="Akomapa community health outreach in progress"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </FadeIn>
      </div>
    </EditorialBand>
  );
}
