"use client";

import { useState } from "react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  PublicationEmptyState,
  PublicationEntry,
  PublicationFilterChip,
} from "@/components/publication";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { getNewsOnlyItems } from "@/data/unified-news";
import { getAnnouncementPosterSrc } from "@/lib/video-utils";
import { motionDurations } from "@/lib/motion/tokens";

const allItems = getNewsOnlyItems();

const categories = [
  "All",
  ...Array.from(new Set(allItems.map((item) => item.category))),
];

function formatNewsDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateStr));
}

export default function NewsCategoryListing() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <EditorialBand
      tone="cream"
      marker="01"
      aria-labelledby="news-listing-heading"
    >
      <FadeIn duration={motionDurations.enter}>
        <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
          All News
        </EditorialEyebrow>
        <EditorialHeading id="news-listing-heading" className="mt-4 max-w-3xl">
          Everything You Need to Know
        </EditorialHeading>
        <EditorialLead className="mt-5 max-w-3xl">
          Browse stories covering awards, partnerships, launches, and
          milestones from our teams in the field.
        </EditorialLead>
      </FadeIn>

      <FadeIn className="mt-10" duration={motionDurations.enter}>
        <div
          role="group"
          aria-label="Filter news by category"
          className="flex flex-wrap gap-2 sm:gap-3"
        >
          {categories.map((cat) => (
            <PublicationFilterChip
              key={cat}
              label={cat}
              selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </FadeIn>

      {filtered.length === 0 ? (
        <div className="mt-12">
          <PublicationEmptyState
            title="No stories in this category yet."
            description="Choose another category to continue browsing Akomapa news."
          />
        </div>
      ) : (
        <FadeInStagger
          key={activeCategory}
          className="mt-10 flex max-w-5xl flex-col"
          staggerDelay={motionDurations.staggerContainer}
        >
          {filtered.map((item) => {
            const poster = getAnnouncementPosterSrc(item);
            return (
              <FadeInStaggerItem key={item.id} direction="up">
                <PublicationEntry
                  href={`/news/${item.id}`}
                  title={item.title}
                  description={item.excerpt}
                  image={poster}
                  imageAlt={item.title}
                  ctaLabel="Explore the update"
                  eyebrow={item.category}
                  meta={
                    item.date
                      ? [
                          {
                            label: "Published",
                            value: formatNewsDate(item.date),
                            dateTime: item.date,
                          },
                        ]
                      : undefined
                  }
                />
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      )}
    </EditorialBand>
  );
}
