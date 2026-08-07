"use client";

import { FadeIn } from "@/components/animations";
import { useImmersionInterest } from "@/components/immersion/ImmersionInterestProvider";
import {
  PublicCta,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";
import { IMMERSION_INTEREST_COPY } from "@/lib/immersion-interest";

export default function ImmersionAlertSection() {
  const { open } = useImmersionInterest();

  return (
    <section
      aria-labelledby="immersion-alert-title"
      data-immersion-alert-section
      className="border-t border-[#1C1F1E]/12 bg-[#FCFAEF] dark:border-[#FCFAEF]/12 dark:bg-[#121514]"
    >
      <div className="site-container mx-auto px-4 py-16 md:py-20 lg:py-24">
        <FadeIn>
          <div className="relative overflow-hidden border border-[#0097b2]/25 bg-white px-6 py-10 dark:border-[#66C4DC]/25 dark:bg-[#1C1F1E] sm:px-10 sm:py-12 lg:px-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[#eeba2b]"
            />
            <div className="max-w-3xl">
              <SectionEyebrow>
                {IMMERSION_INTEREST_COPY.section.eyebrow}
              </SectionEyebrow>
              <h2
                id="immersion-alert-title"
                className="mt-4 max-w-3xl font-heading text-[1.9rem] font-semibold leading-[1.14] tracking-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-[2.4rem] lg:text-[2.8rem]"
              >
                {IMMERSION_INTEREST_COPY.section.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#2F3332]/78 dark:text-[#E6E7E7]/78 md:text-lg">
                {IMMERSION_INTEREST_COPY.section.body}
              </p>
              <div className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
                <PublicCta
                  type="button"
                  variant="teal"
                  className="min-h-12 justify-center !text-[#1C1F1E]"
                  onClick={(event) => open(event.currentTarget)}
                  data-immersion-alert-cta
                >
                  {IMMERSION_INTEREST_COPY.section.cta}
                </PublicCta>
              </div>
              <p className="mt-4 text-sm leading-6 text-[#2F3332]/65 dark:text-[#E6E7E7]/65">
                {IMMERSION_INTEREST_COPY.section.reassurance}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
