"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import HubEmptyState from "@/components/community-hubs/HubEmptyState";
import {
  EditorialArrowLink,
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
} from "@/components/shared/EditorialPrimitives";
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
    <EditorialBand
      tone="onyx"
      marker="03"
      id="hub-research"
      aria-labelledby="hub-research-heading"
      className="bg-[#0F4C5C]"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Research
          </EditorialEyebrow>
          <EditorialHeading id="hub-research-heading" className="mt-4">
            Evidence From the Community
          </EditorialHeading>
        </div>
      </FadeIn>

      {hasItems ? (
        <FadeInStagger className="mt-12 grid gap-0 border-t border-[#FCFAEF]/20 md:grid-cols-2">
          {items.map((item) => (
            <FadeInStaggerItem key={item.id} direction="up">
              <article className="flex h-full flex-col border-b border-[#FCFAEF]/20 px-1 py-7 md:border-r md:px-6 md:odd:border-r">
                <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#F5C94D]">
                  {item.status}
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-[#FCFAEF]">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#FCFAEF]/80">
                  {item.description}
                </p>
                {item.link ? (
                  <EditorialArrowLink href={item.link} tone="light" className="mt-4">
                    Explore the research
                  </EditorialArrowLink>
                ) : null}
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
            tone="dark"
          />
        </FadeIn>
      )}
    </EditorialBand>
  );
}
