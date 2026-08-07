"use client";

import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { hubActivities } from "@/data/community-hubs";

export default function HubActivities() {
  return (
    <EditorialBand
      tone="white"
      marker="02"
      id="hub-activities"
      aria-labelledby="hub-activities-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            What Happens at Each Hub
          </EditorialEyebrow>
          <EditorialHeading id="hub-activities-heading" className="mt-4">
            Learning, Care, and Partnership in Action
          </EditorialHeading>
          <EditorialLead className="mt-5">
            From screening and education to mentorship and innovation pilots,
            hub activity connects community priorities with student leadership
            development.
          </EditorialLead>
        </div>
      </FadeIn>

      <ol className="mt-12 grid border-t border-[#1C1F1E]/15 sm:grid-cols-2 dark:border-[#FCFAEF]/20">
        {hubActivities.map((activity, index) => (
          <li
            key={activity.id}
            className="border-b border-[#1C1F1E]/15 px-1 py-7 sm:odd:border-r sm:px-6 dark:border-[#FCFAEF]/20"
          >
            <span
              aria-hidden="true"
              className="font-subheading text-xs font-bold tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {activity.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              {activity.description}
            </p>
          </li>
        ))}
      </ol>
    </EditorialBand>
  );
}
