"use client";

import { FadeIn } from "@/components/animations";
import OpenImmersionInterestCta from "@/components/immersion/OpenImmersionInterestCta";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

export default function ApplySection() {
  return (
    <EditorialBand
      tone="teal"
      marker="06"
      id="apply"
      aria-labelledby="apply-heading"
      className="border-t border-[#FCFAEF]/15 bg-[#0F4C5C]"
    >
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Become a Scholar
          </EditorialEyebrow>
          <EditorialHeading
            id="apply-heading"
            className="mt-4 text-[#FCFAEF] md:text-[2.6rem]"
          >
            Ready to Lead With Purpose?
          </EditorialHeading>
          <EditorialLead className="mx-auto mt-6 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            The Akomapa Academy welcomes students and emerging health
            professionals who are committed to ethical leadership, community
            partnership, and creating lasting change in global health.
          </EditorialLead>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <OpenImmersionInterestCta variant="amber">
              Apply to the Academy
            </OpenImmersionInterestCta>
            <EditorialButton href="/get-involved" variant="outline-light">
              Other Ways to Get Involved
            </EditorialButton>
          </div>
        </div>
      </FadeIn>
    </EditorialBand>
  );
}
