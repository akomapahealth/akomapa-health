"use client";

import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { timeline } from "@/data/timeline";

export default function GrowthTimeline() {
  return (
    <EditorialBand
      tone="white"
      marker="04"
      id="growth-timeline"
      aria-labelledby="growth-timeline-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow>Our Journey</EditorialEyebrow>
          <EditorialHeading id="growth-timeline-heading" className="mt-4">
            A timeline of growth
          </EditorialHeading>
          <EditorialLead className="mt-5">
            From an observed gap in global health education to a growing
            movement of ethical leaders and community health hubs.
          </EditorialLead>
        </div>
      </FadeIn>

      <ol
        data-growth-timeline
        className="mt-14 space-y-0 border-t border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20"
      >
        {timeline.map((event, index) => (
          <li
            key={event.id}
            data-timeline-event={event.id}
            className="border-b border-[#1C1F1E]/15 py-8 dark:border-[#FCFAEF]/20 lg:py-10"
          >
            <FadeIn>
              <div className="grid gap-4 sm:grid-cols-[7rem_1fr] sm:gap-8">
                <div>
                  <p className="font-heading text-sm font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
                    {event.year}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-2 block font-subheading text-xs font-bold tracking-[0.2em] text-[#0097b2]/45 dark:text-[#66C4DC]/50"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-xl">
                    {event.title}
                  </h3>
                  {event.milestone ? (
                    <p className="mt-1 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
                      Milestone
                    </p>
                  ) : null}
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75 md:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </EditorialBand>
  );
}
