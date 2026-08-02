"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { getInvolvedFaqs } from "@/data/get-involved";
import { cn } from "@/lib/utils";

export default function GetInvolvedFAQ() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <EditorialBand
      tone="cream"
      marker="03"
      aria-labelledby="get-involved-faq-heading"
    >
      <FadeIn className="mx-auto mb-12 max-w-3xl text-center">
        <EditorialEyebrow>FAQ</EditorialEyebrow>
        <EditorialHeading id="get-involved-faq-heading" className="mt-4">
          Questions, answered
        </EditorialHeading>
        <EditorialLead className="mx-auto mt-5 max-w-2xl">
          Common questions about getting involved, time commitment, and
          eligibility.
        </EditorialLead>
      </FadeIn>

      <div className="mx-auto max-w-3xl space-y-3">
        {getInvolvedFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          const panelId = `${baseId}-panel-${faq.id}`;
          const buttonId = `${baseId}-button-${faq.id}`;

          return (
            <div
              key={faq.id}
              className="border border-[#1C1F1E]/12 bg-white dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]"
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  onClick={() =>
                    setOpenId((current) => (current === faq.id ? null : faq.id))
                  }
                  className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#eeba2b] sm:px-6 sm:py-5"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span className="font-heading text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-[#0097b2] transition-transform duration-300 ease-out motion-reduce:transition-none dark:text-[#66C4DC]",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              {/*
                CSS grid 0fr→1fr animates height without measuring content,
                which avoids the layout flicker that instant show/hide caused.
              */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isOpen ? true : undefined}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,0.4,0.25,1)] motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p
                    className={cn(
                      "border-t border-[#1C1F1E]/10 px-5 py-5 text-base leading-relaxed text-[#2F3332]/80 transition-opacity duration-300 ease-out motion-reduce:transition-none dark:border-[#FCFAEF]/12 dark:text-[#E6E7E7]/75 sm:px-6 sm:pb-6",
                      isOpen ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </EditorialBand>
  );
}
