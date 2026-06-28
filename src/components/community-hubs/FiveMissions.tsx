"use client";

import {
  FlaskConical,
  GraduationCap,
  Handshake,
  Heart,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  IconBadge,
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { hubMissions } from "@/data/community-hubs";

const missionIcons: LucideIcon[] = [
  Heart,
  GraduationCap,
  Handshake,
  FlaskConical,
  Lightbulb,
];

export default function FiveMissions() {
  return (
    <PublicSection tone="cream" spacing="normal" withTexture id="five-missions">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Every Hub, Five Missions"
          title="What Our Hubs Are Built to Do"
          description="Each Community Learning & Care Hub is a platform for healthcare delivery, leadership development, partnership, research, and innovation."
          titleId="five-missions-heading"
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {hubMissions.map((mission, index) => {
          const Icon = missionIcons[index] ?? Heart;

          return (
            <FadeInStaggerItem key={mission.id} direction="up">
              <div className="flex h-full flex-col items-center rounded-xl border border-[#E6E7E7] bg-white/88 p-6 text-center shadow-sm dark:border-[#2F3332] dark:bg-[#2F3332]/70">
                <IconBadge className="h-12 w-12">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </IconBadge>
                <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-[#0097b2] dark:text-[#66C4DC]">
                  {String(mission.id).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {mission.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {mission.description}
                </p>
              </div>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </PublicSection>
  );
}
