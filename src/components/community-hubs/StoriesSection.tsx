"use client";

import { useState } from "react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import HubEmptyState from "@/components/community-hubs/HubEmptyState";
import StoriesCarouselDialog from "@/components/community-hubs/StoriesCarouselDialog";
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            isTeal
              ? "border-[#FCFAEF]/20"
              : "border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20"
          }`}
        >
          {stories.map((story, index) => (
            <FadeInStaggerItem key={story.id} direction="up">
              <article
                data-story-id={story.id}
                className={`flex h-full flex-col border-b px-1 py-7 md:border-r md:px-6 md:last:border-r-0 ${
                  isTeal
                    ? "border-[#FCFAEF]/20"
                    : "border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20"
                }`}
              >
                <p
                  className={`font-subheading text-xs font-bold uppercase tracking-[0.2em] ${
                    isTeal
                      ? "text-[#F5C94D]"
                      : "text-[#0097b2] dark:text-[#66C4DC]"
                  }`}
                >
                  {story.role}
                </p>
                <h3
                  className={`mt-3 font-heading text-xl font-semibold ${
                    isTeal
                      ? "text-[#FCFAEF]"
                      : "text-[#1C1F1E] dark:text-[#FCFAEF]"
                  }`}
                >
                  {story.title}
                </h3>
                <p
                  className={`mt-3 flex-1 text-sm leading-relaxed ${
                    isTeal
                      ? "text-[#FCFAEF]/80"
                      : "text-[#2F3332]/80 dark:text-[#E6E7E7]/80"
                  }`}
                >
                  {story.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                  <p
                    className={`text-sm font-medium ${
                      isTeal
                        ? "text-[#FCFAEF]"
                        : "text-[#2F3332] dark:text-[#E6E7E7]"
                    }`}
                  >
                    — {story.author}
                  </p>
                  <button
                    type="button"
                    data-testid={`story-read-more-${story.id}`}
                    data-story-read-more={story.id}
                    onClick={() => setOpenIndex(index)}
                    aria-haspopup="dialog"
                    className={`inline-flex min-h-11 items-center rounded-md border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isTeal
                        ? "border-[#FCFAEF] text-[#FCFAEF] hover:bg-[#FCFAEF] hover:text-[#0F4C5C] focus-visible:ring-[#F5C94D]"
                        : "border-[#0F4C5C] text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-[#FCFAEF] focus-visible:ring-[#eeba2b] dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]"
                    }`}
                  >
                    Read more
                  </button>
                </div>
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

      <StoriesCarouselDialog
        stories={stories}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        label={title}
        tone={tone === "teal" ? "teal" : "amber"}
      />
    </EditorialBand>
  );
}
