"use client";

import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import PathwayCard from "@/components/get-involved/PathwayCard";
import { getInvolvedPathways } from "@/data/get-involved";

export default function PathwaysGrid() {
  return (
    <EditorialBand
      id="pathways"
      tone="cream"
      marker="01"
      className="scroll-mt-20"
      aria-labelledby="pathways-heading"
    >
      <FadeIn className="mx-auto mb-12 max-w-3xl text-center">
        <EditorialEyebrow>Engagement Pathways</EditorialEyebrow>
        <EditorialHeading id="pathways-heading" className="mt-4">
          Find the way you want to contribute
        </EditorialHeading>
        <EditorialLead className="mx-auto mt-5 max-w-2xl">
          Six distinct pathways for different audiences and interest levels.
          Choose the one that fits your goals — every path strengthens ethical
          global health leadership.
        </EditorialLead>
      </FadeIn>

      <FadeInStagger
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        staggerDelay={0.08}
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
    </EditorialBand>
  );
}
