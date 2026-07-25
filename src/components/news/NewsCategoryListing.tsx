"use client";

import { useState } from "react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { AnnouncementCard } from "@/components/common/AnnouncementCard";
import { getNewsOnlyItems, newsItemToAnnouncement } from "@/data/unified-news";
import { cn } from "@/lib/utils";
import { motionDurations } from "@/lib/motion/tokens";

const allItems = getNewsOnlyItems();

const categories = [
  "All",
  ...Array.from(new Set(allItems.map((item) => item.category))),
];

export default function NewsCategoryListing() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      <div className="site-container mx-auto px-4 sm:px-6">
        <FadeIn
          className="text-center max-w-3xl mx-auto mb-10"
          duration={motionDurations.enter}
        >
          <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
            ALL NEWS
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
            Everything You Need to Know
          </h2>
          <p className="text-base sm:text-lg text-[#2F3332]/70 dark:text-[#E6E7E7]/60 leading-relaxed max-w-2xl mx-auto">
            Browse stories covering awards, partnerships, launches, and
            milestones from our teams in the field.
          </p>
        </FadeIn>

        {/* Category Filter Pills */}
        <FadeIn className="mb-10" duration={motionDurations.enter}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  activeCategory === cat
                    ? "bg-[#0097b2] text-[#FCFAEF] shadow-md"
                    : "bg-white dark:bg-[#2F3332] text-[#2F3332]/70 dark:text-[#E6E7E7]/70 border border-black/[0.06] dark:border-white/[0.08] hover:border-[#0097b2]/30 hover:text-[#0097b2] dark:hover:text-[#66C4DC]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeInStagger
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
          staggerDelay={motionDurations.staggerContainer}
        >
          {filtered.map((item) => (
            <FadeInStaggerItem key={item.id} direction="up">
              <AnnouncementCard item={newsItemToAnnouncement(item)} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        {filtered.length === 0 && (
          <p className="text-center text-[#2F3332]/50 dark:text-[#E6E7E7]/40 mt-12">
            No stories in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
