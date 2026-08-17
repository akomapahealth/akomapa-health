"use client";

import {
  GraduationCap,
  Stethoscope,
  FlaskConical,
  HandCoins,
  Users,
} from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { becomePartnerContent } from "@/data/partnerships";
import type { LucideIcon } from "lucide-react";
import OpenIntakeCta from "@/components/intake/OpenIntakeCta";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  Stethoscope,
  FlaskConical,
  HandCoins,
  Users,
};

const ctaVariantMap = {
  amber: "amber",
  teal: "outline-light",
} as const;

export default function BecomePartnerCTA() {
  return (
    <EditorialBand
      id="become-a-partner"
      tone="teal"
      aria-labelledby="become-partner-heading"
      className="scroll-mt-20 border-t border-[#FCFAEF]/15 bg-[#0F4C5C]"
    >
      <FadeIn className="mx-auto max-w-3xl space-y-4 text-center">
        <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
          {becomePartnerContent.eyebrow}
        </EditorialEyebrow>
        <EditorialHeading
          id="become-partner-heading"
          className="text-[#FCFAEF]"
        >
          {becomePartnerContent.heading}
        </EditorialHeading>
        <EditorialLead className="mx-auto max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
          {becomePartnerContent.description}
        </EditorialLead>
      </FadeIn>

      <FadeInStagger
        className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3"
        staggerDelay={0.06}
      >
        {becomePartnerContent.partnershipTypes.map((type) => {
          const Icon = iconMap[type.icon];
          return (
            <FadeInStaggerItem key={type.label} direction="up">
              <div className="inline-flex min-h-11 items-center gap-2 border border-[#66C4DC]/50 px-4 py-2.5 text-sm font-medium text-[#FCFAEF]">
                {Icon ? (
                  <Icon className="h-4 w-4 text-[#F5C94D]" aria-hidden="true" />
                ) : null}
                {type.label}
              </div>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>

      <FadeIn delay={0.2}>
        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
          {becomePartnerContent.ctas.map((cta) =>
            cta.label === "Get in Touch" ? (
              <OpenIntakeCta
                key={cta.label}
                request={{
                  formType: "partnership_request",
                  contextId: "partnerships-page",
                }}
                variant="amber"
              >
                {cta.label}
              </OpenIntakeCta>
            ) : (
              <EditorialButton
                key={cta.label}
                href={cta.href}
                variant={ctaVariantMap[cta.variant]}
              >
                {cta.label}
              </EditorialButton>
            ),
          )}
        </div>
      </FadeIn>
    </EditorialBand>
  );
}
