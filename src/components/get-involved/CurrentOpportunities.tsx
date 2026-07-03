"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarClock } from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  PublicSection,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import { getInvolvedOpportunities } from "@/data/get-involved";

export default function CurrentOpportunities() {
  return (
    <PublicSection tone="white" aria-labelledby="opportunities-heading">
      <FadeIn className="mx-auto mb-12 max-w-3xl text-center">
        <p className="font-subheading text-sm font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
          Current Opportunities
        </p>
        <h2
          id="opportunities-heading"
          className="mt-4 font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl lg:text-5xl"
        >
          Open now — start where you are
        </h2>
        <p className="mt-5 font-body text-lg leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          These pathways are actively welcoming new people. Applications and
          inquiries are reviewed on a rolling basis.
        </p>
      </FadeIn>

      <FadeInStagger
        className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
        staggerDelay={0.1}
      >
        {getInvolvedOpportunities.map((opportunity) => (
          <FadeInStaggerItem key={opportunity.id} className="h-full">
            <SurfaceCard
              interactive
              className="flex h-full flex-col p-6 sm:p-7"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#0097b2]/10 px-3 py-1 font-subheading text-xs font-bold uppercase tracking-[0.14em] text-[#0097b2] dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]">
                <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
                {opportunity.status}
              </span>

              <h3 className="mt-4 font-heading text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {opportunity.title}
              </h3>

              <p className="mt-3 font-body leading-7 text-[#2F3332]/75 dark:text-[#FCFAEF]/70">
                {opportunity.description}
              </p>

              <div className="mt-auto pt-6">
                {opportunity.external ? (
                  <a
                    href={opportunity.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center font-subheading text-sm font-bold uppercase tracking-[0.14em] text-[#0097b2] transition-colors hover:text-[#eeba2b] dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                  >
                    {opportunity.ctaLabel}
                    <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    href={opportunity.ctaHref}
                    className="group inline-flex items-center font-subheading text-sm font-bold uppercase tracking-[0.14em] text-[#0097b2] transition-colors hover:text-[#eeba2b] dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                  >
                    {opportunity.ctaLabel}
                    <ArrowRight
                      className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </div>
            </SurfaceCard>
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
