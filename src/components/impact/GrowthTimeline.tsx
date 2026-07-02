"use client";

import {
  BookOpen,
  Building,
  Calendar,
  GraduationCap,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { timeline } from "@/data/timeline";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Search,
  BookOpen,
  Sparkles,
  Building,
  GraduationCap,
  Rocket,
  Calendar,
};

export default function GrowthTimeline() {
  const lastIndex = timeline.length - 1;

  return (
    <PublicSection tone="white" aria-labelledby="growth-timeline-heading">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Our Journey"
          eyebrowTone="teal"
          titleId="growth-timeline-heading"
          title="A timeline of growth"
          description="From an observed gap in global health education to a growing movement of ethical leaders and community health hubs."
          className="mb-14"
        />
      </FadeIn>

      <FadeInStagger
        className="relative mx-auto grid max-w-6xl gap-8 lg:auto-cols-fr lg:grid-flow-col lg:gap-6"
        staggerDelay={0.1}
      >
        {/* Horizontal track (desktop) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-6 hidden h-0.5 bg-gradient-to-r from-[#0097b2]/20 via-[#0097b2] to-[#0097b2]/20 lg:block"
        />

        {timeline.map((event, index) => {
          const Icon = iconMap[event.icon ?? "Calendar"] ?? Calendar;
          const isMilestone = event.milestone;

          return (
            <FadeInStaggerItem
              key={event.id}
              direction="up"
              className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
            >
              {/* Vertical track (mobile) */}
              {index !== lastIndex ? (
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-12 -bottom-8 w-0.5 bg-[#0097b2]/20 lg:hidden"
                />
              ) : null}

              {/* Node */}
              <span
                className={cn(
                  "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 shadow-sm",
                  isMilestone
                    ? "border-[#0097b2] bg-[#0097b2] text-white"
                    : "border-[#0097b2]/40 bg-white text-[#0097b2] dark:bg-[#1C1F1E]",
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              {/* Content */}
              <div className="pb-2 lg:mt-5 lg:px-2">
                <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
                  {event.year}
                </p>
                <h3 className="mt-1 font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
                  {event.description}
                </p>
              </div>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </PublicSection>
  );
}
