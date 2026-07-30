"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import HubEmptyState from "@/components/community-hubs/HubEmptyState";
import {
  EditorialBand,
  EditorialHeading,
} from "@/components/shared/EditorialPrimitives";
import type { Story } from "@/lib/types";

type EmptyState = {
  title: string;
  description: string;
  cta: { label: string; href: string };
};

type StoriesSectionProps = {
  title: string;
  stories?: Story[];
  emptyState: EmptyState;
  sectionId: string;
};

export default function StoriesSection({
  title,
  stories = [],
  emptyState,
  sectionId,
}: StoriesSectionProps) {
  const hasStories = stories.length > 0;
  const headingId = `${sectionId}-heading`;

  return (
    <EditorialBand
      tone="white"
      id={sectionId}
      aria-labelledby={headingId}
    >
      <FadeIn>
        <EditorialHeading id={headingId}>{title}</EditorialHeading>
      </FadeIn>

      {hasStories ? (
        <FadeInStagger className="mt-12 grid gap-0 border-t border-[#1C1F1E]/15 md:grid-cols-2 lg:grid-cols-3 dark:border-[#FCFAEF]/20">
          {stories.map((story) => (
            <FadeInStaggerItem key={story.id} direction="up">
              <article className="flex h-full flex-col border-b border-[#1C1F1E]/15 px-1 py-7 md:border-r md:px-6 md:last:border-r-0 dark:border-[#FCFAEF]/20">
                <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
                  {story.role}
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {story.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {story.excerpt}
                </p>
                <p className="mt-4 text-sm font-medium text-[#2F3332] dark:text-[#E6E7E7]">
                  — {story.author}
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
