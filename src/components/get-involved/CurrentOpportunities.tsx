"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarClock } from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import OpenImmersionInterestCta from "@/components/immersion/OpenImmersionInterestCta";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { getInvolvedOpportunities } from "@/data/get-involved";

const opportunityCtaClassName =
  "group inline-flex min-h-11 items-center font-subheading text-sm font-bold uppercase tracking-[0.14em] text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]";

export default function CurrentOpportunities() {
  return (
    <EditorialBand
      tone="white"
      marker="02"
      aria-labelledby="opportunities-heading"
    >
      <FadeIn className="mx-auto mb-12 max-w-3xl text-center">
        <EditorialEyebrow>Current Opportunities</EditorialEyebrow>
        <EditorialHeading id="opportunities-heading" className="mt-4">
          Open now — start where you are
        </EditorialHeading>
        <EditorialLead className="mx-auto mt-5 max-w-2xl">
          These pathways are actively welcoming new people. Applications and
          inquiries are reviewed on a rolling basis.
        </EditorialLead>
      </FadeIn>

      <FadeInStagger
        className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10"
        staggerDelay={0.08}
      >
        {getInvolvedOpportunities.map((opportunity) => (
          <FadeInStaggerItem key={opportunity.id} className="h-full">
            <article className="flex h-full flex-col border-t-2 border-[#0097b2] pt-6 dark:border-[#66C4DC]">
              <span className="inline-flex w-fit min-h-9 items-center gap-1.5 border border-[#0097b2]/30 px-3 py-1.5 font-subheading text-xs font-bold uppercase tracking-[0.14em] text-[#0097b2] dark:border-[#66C4DC]/40 dark:text-[#66C4DC]">
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                {opportunity.status}
              </span>

              <h3 className="mt-4 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {opportunity.title}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/75">
                {opportunity.description}
              </p>

              <div className="mt-auto pt-6">
                {opportunity.opensImmersionInterest ? (
                  <OpenImmersionInterestCta appearance="text-link">
                    {opportunity.ctaLabel}
                  </OpenImmersionInterestCta>
                ) : opportunity.external && opportunity.ctaHref ? (
                  <a
                    href={opportunity.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={opportunityCtaClassName}
                  >
                    {opportunity.ctaLabel}
                    <ArrowUpRight
                      className="ml-1.5 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                ) : opportunity.ctaHref ? (
                  <Link
                    href={opportunity.ctaHref}
                    className={opportunityCtaClassName}
                  >
                    {opportunity.ctaLabel}
                    <ArrowRight
                      className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                ) : null}
              </div>
            </article>
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </EditorialBand>
  );
}
