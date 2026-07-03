"use client";

import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { PublicSection } from "@/components/shared/PublicPagePrimitives";
import PathwayCard from "@/components/get-involved/PathwayCard";
import { getInvolvedPathways } from "@/data/get-involved";

export default function PathwaysGrid() {
  return (
    <PublicSection
      id="pathways"
      tone="cream"
      className="scroll-mt-20"
      aria-labelledby="pathways-heading"
    >
      <FadeIn className="mx-auto mb-12 max-w-3xl text-center">
        <p className="font-subheading text-sm font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
          Engagement Pathways
        </p>
        <h2
          id="pathways-heading"
          className="mt-4 font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl lg:text-5xl"
        >
          Find the way you want to contribute
        </h2>
        <p className="mt-5 font-body text-lg leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          Six distinct pathways for different audiences and interest levels.
          Choose the one that fits your goals — every path strengthens ethical
          global health leadership.
        </p>
      </FadeIn>

      <FadeInStagger
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.1}
      >
        {getInvolvedPathways.map((pathway) => (
          <FadeInStaggerItem key={pathway.id} className="h-full">
            <PathwayCard
              icon={pathway.icon}
              title={pathway.title}
              description={pathway.description}
              audience={pathway.audience}
              ctaLabel={pathway.ctaLabel}
              ctaHref={pathway.ctaHref}
              external={pathway.external}
              accent={pathway.accent}
              featured={pathway.featured}
            />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
