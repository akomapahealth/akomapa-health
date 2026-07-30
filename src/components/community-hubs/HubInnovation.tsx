"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import HubEmptyState from "@/components/community-hubs/HubEmptyState";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
} from "@/components/shared/EditorialPrimitives";
import type { InnovationItem } from "@/lib/types";

type EmptyState = {
  title: string;
  description: string;
  cta: { label: string; href: string };
};

const categoryLabels: Record<InnovationItem["category"], string> = {
  nkwapa: "Nkwapa EMR",
  "quality-improvement": "Quality Improvement",
  technology: "Technology Pilot",
};

type HubInnovationProps = {
  items?: InnovationItem[];
  emptyState: EmptyState;
};

export default function HubInnovation({ items = [], emptyState }: HubInnovationProps) {
  const hasItems = items.length > 0;

  return (
    <EditorialBand
      tone="cream"
      marker="04"
      id="hub-innovation"
      aria-labelledby="hub-innovation-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Innovation
          </EditorialEyebrow>
          <EditorialHeading id="hub-innovation-heading" className="mt-4">
            Testing What Works in Community Settings
          </EditorialHeading>
        </div>
      </FadeIn>

      {hasItems ? (
        <FadeInStagger className="mt-12 grid gap-0 border-t border-[#1C1F1E]/15 md:grid-cols-2 lg:grid-cols-3 dark:border-[#FCFAEF]/20">
          {items.map((item) => (
            <FadeInStaggerItem key={item.id} direction="up">
              <article className="flex h-full flex-col border-b border-[#1C1F1E]/15 px-1 py-7 md:border-r md:px-6 dark:border-[#FCFAEF]/20">
                <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
                  {categoryLabels[item.category]}
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {item.description}
                </p>
              </article>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      ) : (
        <FadeIn className="mt-10">
          <HubEmptyState
            title={emptyState.title}
            description={emptyState.description}
            cta={emptyState.cta}
          />
        </FadeIn>
      )}
    </EditorialBand>
  );
}
