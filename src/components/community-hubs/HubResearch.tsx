"use client";

import Link from "next/link";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
  PublicCta,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import type { ResearchItem } from "@/lib/types";

type EmptyState = {
  title: string;
  description: string;
  cta: { label: string; href: string };
};

type HubResearchProps = {
  items?: ResearchItem[];
  emptyState: EmptyState;
};

export default function HubResearch({ items = [], emptyState }: HubResearchProps) {
  const hasItems = items.length > 0;

  return (
    <PublicSection tone="white" spacing="normal" id="hub-research">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Research"
          title="Evidence From the Community"
          titleId="hub-research-heading"
        />
      </FadeIn>

      {hasItems ? (
        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <FadeInStaggerItem key={item.id} direction="up">
              <SurfaceCard className="h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#0097b2] dark:text-[#66C4DC]">
                  {item.status}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {item.description}
                </p>
                {item.link ? (
                  <Link
                    href={item.link}
                    className="mt-4 inline-flex text-sm font-semibold text-[#0097b2] hover:text-[#eeba2b] dark:text-[#66C4DC]"
                  >
                    Explore the research
                  </Link>
                ) : null}
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
