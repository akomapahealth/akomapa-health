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
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { ncdHeroContent } from "@/data/ncd-impact";

export default function NCDHero() {
  return (
    <EditorialBand
      tone="onyx"
      aria-labelledby="ncd-hero-heading"
      className="border-b border-[#FCFAEF]/15"
      containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <FadeIn className="lg:col-span-7 lg:pb-4">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            {ncdHeroContent.eyebrow}
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="ncd-hero-heading"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            {ncdHeroContent.heading}
          </EditorialHeading>
          <p className="mt-4 max-w-2xl font-heading text-lg font-semibold text-[#F5C94D] md:text-xl">
            {ncdHeroContent.subtitle}
          </p>
          <EditorialLead className="mt-5 max-w-3xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            {ncdHeroContent.description}
          </EditorialLead>

          <FadeInStagger className="mt-10" staggerDelay={0.08}>
            <dl
              data-ncd-hero-key-stat
              className="max-w-xl border-y border-[#FCFAEF]/25"
            >
              <FadeInStaggerItem direction="up">
                <div className="flex flex-col justify-between gap-3 px-1 py-6 sm:flex-row sm:items-end sm:px-5">
                  <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/70">
                    External evidence · Annual burden
                  </dt>
                  <dd className="flex flex-wrap items-baseline gap-3">
                    <AnimatedMetric
                      value={ncdHeroContent.keyStat.value}
                      suffix={ncdHeroContent.keyStat.suffix}
                      className="font-heading text-4xl font-semibold tracking-tight text-[#F5C94D] sm:text-5xl md:text-6xl"
                      durationMs={2000}
                    />
                    <span className="max-w-xs text-sm leading-snug text-[#FCFAEF]/75 sm:text-base">
                      {ncdHeroContent.keyStat.label}
                    </span>
                  </dd>
                </div>
              </FadeInStaggerItem>
            </dl>
          </FadeInStagger>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            {ncdHeroContent.ctas.map((cta) => (
              <EditorialButton
                key={cta.label}
                href={cta.href}
                variant={cta.variant === "amber" ? "amber" : "outline-light"}
              >
                {cta.label}
              </EditorialButton>
            ))}
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.15} className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#121514] lg:aspect-[4/5]">
            <Image
              src={ncdHeroContent.image.src}
              alt={ncdHeroContent.image.alt}
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
