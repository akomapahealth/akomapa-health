"use client";

import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { partnershipsHeroContent } from "@/data/partnerships";

const ctaVariantMap = {
  amber: "amber",
  teal: "outline-light",
} as const;

export default function PartnershipsHero() {
  return (
    <EditorialBand
      tone="teal"
      aria-labelledby="partnerships-hero-heading"
      className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
      containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <FadeIn className="lg:col-span-7 lg:pb-8">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            {partnershipsHeroContent.eyebrow}
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="partnerships-hero-heading"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            {partnershipsHeroContent.heading}
          </EditorialHeading>
          <p className="mt-4 font-heading text-xl font-semibold text-[#F5C94D] md:text-2xl">
            {partnershipsHeroContent.subtitle}
          </p>
          <EditorialLead className="mt-5 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            {partnershipsHeroContent.description}
          </EditorialLead>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            {partnershipsHeroContent.ctas.map((cta) => (
              <EditorialButton
                key={cta.label}
                href={cta.href}
                variant={ctaVariantMap[cta.variant]}
              >
                {cta.label}
              </EditorialButton>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C] lg:aspect-[4/5]">
            <Image
              src={partnershipsHeroContent.image.src}
              alt={partnershipsHeroContent.image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
          </div>
        </FadeIn>
      </div>
    </EditorialBand>
  );
}
