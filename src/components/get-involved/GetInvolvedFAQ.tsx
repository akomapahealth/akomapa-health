"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeIn } from "@/components/animations";
import { PublicSection } from "@/components/shared/PublicPagePrimitives";
import { getInvolvedFaqs } from "@/data/get-involved";

export default function GetInvolvedFAQ() {
  const [openId, setOpenId] = useState<string | null>(
    getInvolvedFaqs[0]?.id ?? null,
  );

  return (
    <PublicSection tone="cream" aria-labelledby="get-involved-faq-heading">
      <FadeIn className="mx-auto mb-12 max-w-3xl text-center">
        <p className="font-subheading text-sm font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
          FAQ
        </p>
        <h2
          id="get-involved-faq-heading"
          className="mt-4 font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl lg:text-5xl"
        >
          Questions, answered
        </h2>
        <p className="mt-5 font-body text-lg leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          Common questions about getting involved, time commitment, and
          eligibility.
        </p>
      </FadeIn>

      <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
        {getInvolvedFaqs.map((faq) => {
          const isOpen = openId === faq.id;

          return (
            <div
              key={faq.id}
              className="overflow-hidden rounded-xl border border-[#E6E7E7] bg-white/88 shadow-[0_12px_36px_rgba(28,31,30,0.06)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 dark:border-[#2E3433] dark:bg-[#2F3332]/70"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                aria-expanded={isOpen}
                aria-controls={`faq-content-${faq.id}`}
              >
                <h3 className="font-heading text-base font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-lg">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-[#0097b2] transition-transform duration-200 dark:text-[#66C4DC] ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-content-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="px-5 pb-5 font-body leading-7 text-[#2F3332]/75 dark:text-[#FCFAEF]/70 sm:px-6 sm:pb-6">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </PublicSection>
  );
}
