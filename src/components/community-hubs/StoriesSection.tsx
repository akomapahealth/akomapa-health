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
  tone?: "cream" | "teal";
};

export default function StoriesSection({
  title,
  stories = [],
  emptyState,
  sectionId,
  tone = "cream",
}: StoriesSectionProps) {
  const hasStories = stories.length > 0;
  const headingId = `${sectionId}-heading`;
  const isTeal = tone === "teal";

  return (
    <EditorialBand
      tone={isTeal ? "onyx" : "cream"}
      id={sectionId}
      aria-labelledby={headingId}
      className={isTeal ? "bg-[#0F4C5C]" : undefined}
    >
      <FadeIn>
        <EditorialHeading id={headingId}>{title}</EditorialHeading>
      </FadeIn>

      {hasStories ? (
        <FadeInStagger
          className={`mt-12 grid gap-0 border-t md:grid-cols-2 lg:grid-cols-3 ${
            isTeal ? "border-[#FCFAEF]/20" : "border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20"
          }`}
        >
          {stories.map((story) => (
            <FadeInStaggerItem key={story.id} direction="up">
              <article className={`flex h-full flex-col border-b px-1 py-7 md:border-r md:px-6 md:last:border-r-0 ${isTeal ? "border-[#FCFAEF]/20" : "border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20"}`}>
                <p className={`font-subheading text-xs font-bold uppercase tracking-[0.2em] ${isTeal ? "text-[#F5C94D]" : "text-[#0097b2] dark:text-[#66C4DC]"}`}>
                  {story.role}
                </p>
                <h3 className={`mt-3 font-heading text-xl font-semibold ${isTeal ? "text-[#FCFAEF]" : "text-[#1C1F1E] dark:text-[#FCFAEF]"}`}>
                  {story.title}
                </h3>
                <p className={`mt-3 flex-1 text-sm leading-relaxed ${isTeal ? "text-[#FCFAEF]/80" : "text-[#2F3332]/80 dark:text-[#E6E7E7]/80"}`}>
                  {story.excerpt}
                </p>
                <p className={`mt-4 text-sm font-medium ${isTeal ? "text-[#FCFAEF]" : "text-[#2F3332] dark:text-[#E6E7E7]"}`}>
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
            tone={isTeal ? "dark" : "light"}
          />
        </FadeIn>
      )}
    </EditorialBand>
  );
}
