"use client";

import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
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
    <EditorialBand
      tone="cream"
      marker="02"
      id="faculty-mentorship"
      aria-labelledby="faculty-mentorship-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Faculty Mentorship
          </EditorialEyebrow>
          <EditorialHeading id="faculty-mentorship-heading" className="mt-4">
            Expert Supervision, Ethical Practice
          </EditorialHeading>
          <EditorialLead className="mt-5">{mentorship.model}</EditorialLead>
        </div>
      </FadeIn>

      {mentors.length > 0 ? (
        <FadeInStagger className="mt-12 grid gap-0 border-t border-[#1C1F1E]/15 md:grid-cols-2 lg:grid-cols-3 dark:border-[#FCFAEF]/20">
          {mentors.map((mentor) => (
            <FadeInStaggerItem key={mentor.slug ?? mentor.id} direction="up">
              <article className="flex h-full flex-col border-b border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20 md:border-r md:last:border-r-0">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F4C5C]/10">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col px-1 py-6 md:px-6">
                  <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {mentor.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-[#0097b2] dark:text-[#66C4DC]">
                    {mentor.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                    {mentor.bio}
                  </p>
                </div>
              </article>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      ) : null}
    </EditorialBand>
  );
}
