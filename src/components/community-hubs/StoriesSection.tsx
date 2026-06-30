"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
  PublicCta,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
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

  return (
    <PublicSection tone="white" spacing="normal" id={sectionId}>
      <FadeIn>
        <PublicSectionHeader title={title} titleId={`${sectionId}-heading`} />
      </FadeIn>

      {hasStories ? (
        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <FadeInStaggerItem key={story.id} direction="up">
              <SurfaceCard className="h-full p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#0097b2] dark:text-[#66C4DC]">
                  {story.role}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {story.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {story.excerpt}
                </p>
                <p className="mt-4 text-sm font-medium text-[#2F3332] dark:text-[#E6E7E7]">
                  — {story.author}
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
