"use client";

import { useState } from "react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
  motionDurations,
} from "@/components/animations";
import Image from "@/components/common/Image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  PublicationArticleMeasure,
  PublicationBackLink,
  PublicationEntry,
  PublicationMeta,
} from "@/components/publication";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
  EditorialPlay,
} from "@/components/shared/EditorialPrimitives";
import { getAnnouncementPosterSrc, parseVideoUrl } from "@/lib/video-utils";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

interface Props {
  item: NewsItem;
  relatedItems: NewsItem[];
}

export function NewsDetailContent({ item, relatedItems }: Props) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const isRichContent = item.content.length > 1;
  const detailPoster = getAnnouncementPosterSrc(item);

  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="news-detail-heading"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <PublicationBackLink href="/news" tone="light">
          Back to News
        </PublicationBackLink>

        <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
          {item.category}
        </EditorialEyebrow>
        <EditorialHeading
          as="h1"
          id="news-detail-heading"
          className="mt-5 max-w-4xl text-[1.85rem] text-[#FCFAEF] sm:text-[2.35rem] md:text-[2.85rem] lg:text-[3.25rem]"
        >
          {item.title}
        </EditorialHeading>

        <PublicationMeta
          className="mt-5 text-[#FCFAEF]/85 [&_dd]:text-[#FCFAEF]"
          items={[
            ...(item.date
              ? [
                  {
                    label: "Published",
                    value: formatDate(item.date),
                    dateTime: item.date,
                  },
                ]
              : []),
            ...item.tags.map((tag) => ({
              label: "Tag",
              value: tag,
            })),
          ]}
        />
      </EditorialBand>

      {(detailPoster || item.videoUrl) && (
        <EditorialBand
          tone="cream"
          aria-label="Story media"
          containerClassName="py-10 md:py-12"
        >
          <FadeIn className="mx-auto max-w-4xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-[#1C1F1E]/10 dark:border-[#FCFAEF]/15">
              {item.videoUrl && videoPlaying ? (
                <iframe
                  src={parseVideoUrl(item.videoUrl)?.embedUrl}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={item.title}
                />
              ) : (
                <>
                  {detailPoster ? (
                    <Image
                      src={detailPoster}
                      alt={item.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 56rem, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-[#2F3332]"
                      aria-hidden
                    />
                  )}
                  {item.videoUrl ? (
                    <button
                      type="button"
                      onClick={() => setVideoPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2"
                      aria-label="Play video"
                    >
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#FCFAEF]/40 bg-[#0F4C5C]/90 text-[#FCFAEF] sm:h-20 sm:w-20">
                        <EditorialPlay className="h-5 w-5 sm:h-6 sm:w-6" />
                      </span>
                    </button>
                  ) : null}
                </>
              )}
            </div>
          </FadeIn>
        </EditorialBand>
      )}

      <EditorialBand
        tone="cream"
        aria-labelledby="news-detail-body-heading"
        containerClassName="py-10 md:py-14 lg:py-16"
      >
        <h2 id="news-detail-body-heading" className="sr-only">
          Article body
        </h2>
        <PublicationArticleMeasure className="max-w-3xl">
          {isRichContent ? (
            <FadeIn duration={motionDurations.enter}>
              <div className="space-y-6">
                {item.content.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={cn(
                      "text-base leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]/90 sm:text-lg",
                      idx === 0 &&
                        "text-lg font-medium text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-xl",
                    )}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
          ) : (
            <FadeIn duration={motionDurations.enter}>
              <blockquote className="border-l-2 border-[#eeba2b] pl-6 sm:pl-8">
                <p className="font-heading text-lg leading-relaxed text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-xl md:text-2xl">
                  {item.content[0]}
                </p>
              </blockquote>
            </FadeIn>
          )}

          {item.ctaLink && item.ctaText ? (
            <FadeIn className="mt-10" duration={motionDurations.enter}>
              <EditorialButton
                href={item.ctaLink}
                variant="amber"
                external={item.isExternalCta}
              >
                {item.ctaText}
              </EditorialButton>
            </FadeIn>
          ) : null}
        </PublicationArticleMeasure>
      </EditorialBand>

      {relatedItems.length > 0 ? (
        <EditorialBand
          tone="white"
          aria-labelledby="news-related-heading"
          className="border-t border-[#1C1F1E]/8 dark:border-[#FCFAEF]/10"
        >
          <FadeIn duration={motionDurations.enter}>
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              More Updates
            </EditorialEyebrow>
            <EditorialHeading
              as="h3"
              id="news-related-heading"
              className="mt-4"
            >
              Continue Reading
            </EditorialHeading>
            <EditorialLead className="mt-4 max-w-2xl">
              More news from across the Akomapa network.
            </EditorialLead>
          </FadeIn>

          <FadeInStagger
            className="mt-10 flex max-w-5xl flex-col"
            staggerDelay={motionDurations.staggerContainer}
          >
            {relatedItems.map((related) => {
              const poster = getAnnouncementPosterSrc(related);
              return (
                <FadeInStaggerItem key={related.id} direction="up">
                  <PublicationEntry
                    href={`/news/${related.id}`}
                    title={related.title}
                    description={related.excerpt}
                    image={poster}
                    imageAlt={related.title}
                    ctaLabel="Explore the update"
                    eyebrow={related.category}
                  />
                </FadeInStaggerItem>
              );
            })}
          </FadeInStagger>

          <FadeIn className="mt-10" duration={motionDurations.enter}>
            <EditorialButton href="/news" variant="outline">
              View All Updates
            </EditorialButton>
          </FadeIn>
        </EditorialBand>
      ) : null}
    </div>
  );
}
