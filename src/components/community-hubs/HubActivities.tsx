"use client";

import {
  ArrowRightLeft,
  BookOpen,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  IconBadge,
  PublicSection,
  PublicSectionHeader,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import { hubActivities, type HubActivityIcon } from "@/data/community-hubs";

const activityIconMap: Record<HubActivityIcon, LucideIcon> = {
  Stethoscope,
  ArrowRightLeft,
  BookOpen,
  Users,
  GraduationCap,
  HeartHandshake,
  FlaskConical,
  Lightbulb,
};

export default function HubActivities() {
  return (
    <PublicSection tone="white" spacing="normal" id="hub-activities">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="What Happens at Each Hub"
          title="Learning, Care, and Partnership in Action"
          description="From screening and education to mentorship and innovation pilots, hub activity connects community priorities with student leadership development."
          titleId="hub-activities-heading"
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {hubActivities.map((activity) => {
          const Icon = activityIconMap[activity.icon];

          return (
            <FadeInStaggerItem key={activity.id} direction="up">
              <SurfaceCard className="h-full p-6">
                <IconBadge>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </IconBadge>
                <h3 className="mt-4 text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {activity.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {activity.description}
                </p>
              </SurfaceCard>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </PublicSection>
  );
}
