"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
  PublicCta,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
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
    <PublicSection tone="cream" spacing="normal" withTexture id="hub-innovation">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Innovation"
          title="Testing What Works in Community Settings"
          titleId="hub-innovation-heading"
        />
      </FadeIn>

      {hasItems ? (
        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <FadeInStaggerItem key={item.id} direction="up">
              <SurfaceCard className="h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#0097b2] dark:text-[#66C4DC]">
                  {categoryLabels[item.category]}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {item.description}
                </p>
              </SurfaceCard>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      ) : (
        <FadeIn className="mt-12">
          <SurfaceCard className="mx-auto max-w-3xl p-8 text-center">
            <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {emptyState.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              {emptyState.description}
            </p>
            <PublicCta href={emptyState.cta.href} variant="teal" className="mt-6">
              {emptyState.cta.label}
            </PublicCta>
          </SurfaceCard>
        </FadeIn>
      )}
    </PublicSection>
  );
}
