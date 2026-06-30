"use client";

import {
  BookOpen,
  Building,
  GraduationCap,
  Rocket,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  IconBadge,
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
};

function TimelineNode({
  year,
  title,
  description,
  icon,
  milestone,
  isLast,
}: {
  year: string;
  title: string;
  description: string;
  icon?: string;
  milestone: boolean;
  isLast: boolean;
}) {
  const Icon = icon ? iconMap[icon] ?? Sparkles : Sparkles;

  return (
    <FadeInStaggerItem
      direction="up"
      className="relative flex min-w-0 flex-1 flex-col items-center text-center md:items-start md:text-left"
    >
      <div className="flex w-full flex-col items-center md:items-start">
        <IconBadge
          className={cn(
            "relative z-10 h-12 w-12",
            milestone &&
              "bg-[#0097b2]/15 ring-2 ring-[#0097b2]/30 dark:bg-[#66C4DC]/15 dark:ring-[#66C4DC]/30",
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </IconBadge>

        {!isLast ? (
          <div
            aria-hidden="true"
            className={cn(
              "bg-[#0097b2]/25 dark:bg-[#66C4DC]/25",
              "mt-2 h-12 w-0.5 md:absolute md:left-6 md:top-12 md:mt-0 md:h-0.5 md:w-[calc(100%+1rem)]",
            )}
          />
        ) : null}

        <p className="mt-4 text-sm font-semibold text-[#0097b2] dark:text-[#66C4DC] md:mt-4">
          {year}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          {description}
        </p>
      </div>
    </FadeInStaggerItem>
  );
}

export default function OrganizationalTimeline() {
  return (
    <PublicSection tone="white" spacing="normal" id="our-journey">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Our Journey"
          title="Organizational Story"
          description="From identifying the NCD epidemic to building a student-powered movement for ethical global health leadership."
          titleId="timeline-heading"
        />
      </FadeIn>

      <FadeInStagger className="relative mt-12 flex flex-col gap-8 md:flex-row md:items-start md:gap-4">
        {timeline.map((event, index) => (
          <TimelineNode
            key={event.id}
            year={event.year}
            title={event.title}
            description={event.description}
            icon={event.icon}
            milestone={event.milestone}
            isLast={index === timeline.length - 1}
          />
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
