"use client";

import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { hubMissions } from "@/data/community-hubs";

export default function FiveMissions() {
  return (
    <EditorialBand
      tone="cream"
      marker="01"
      id="five-missions"
      aria-labelledby="five-missions-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Every Hub, Five Missions
          </EditorialEyebrow>
          <EditorialHeading id="five-missions-heading" className="mt-4">
            What Our Hubs Are Built to Do
          </EditorialHeading>
          <EditorialLead className="mt-5">
            Each Community Learning & Care Hub is a platform for healthcare
            delivery, leadership development, partnership, research, and
            innovation.
          </EditorialLead>
        </div>
      </FadeIn>

      <ol className="mt-12 grid border-t border-[#1C1F1E]/15 md:grid-cols-2 xl:grid-cols-5 dark:border-[#FCFAEF]/20">
        {hubMissions.map((mission, index) => (
          <li
            key={mission.id}
            className="border-b border-[#1C1F1E]/15 px-1 py-7 md:odd:border-r md:px-6 xl:border-r xl:px-5 xl:last:border-r-0 dark:border-[#FCFAEF]/20"
          >
            <span
              aria-hidden="true"
              className="font-heading text-4xl font-semibold tracking-[-0.06em] text-[#0097b2]/55 dark:text-[#66C4DC]/65"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {mission.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              {mission.description}
            </p>
          </li>
        ))}
      </ol>
    </EditorialBand>
  );
}
