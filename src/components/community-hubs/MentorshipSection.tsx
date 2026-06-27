"use client";

import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import type { MentorshipInfo } from "@/lib/types";
import { getTeamMemberBySlug } from "@/data/team";

type MentorshipSectionProps = {
  mentorship?: MentorshipInfo;
};

export default function MentorshipSection({ mentorship }: MentorshipSectionProps) {
  if (!mentorship) {
    return null;
  }

  const mentors = mentorship.mentors
    .map((slug) => getTeamMemberBySlug(slug))
    .filter((member) => member !== undefined);

  return (
    <PublicSection tone="cream" spacing="normal" withTexture id="faculty-mentorship">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Faculty Mentorship"
          title="Expert Supervision, Ethical Practice"
          description={mentorship.model}
          titleId="faculty-mentorship-heading"
        />
      </FadeIn>

      {mentors.length > 0 ? (
        <FadeInStagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mentors.map((mentor) => (
            <FadeInStaggerItem key={mentor.slug ?? mentor.id} direction="up">
              <SurfaceCard className="h-full overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {mentor.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#0097b2] dark:text-[#66C4DC]">
                    {mentor.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                    {mentor.bio}
                  </p>
                </div>
              </SurfaceCard>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      ) : null}
    </PublicSection>
  );
}
