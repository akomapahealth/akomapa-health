"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { academyTestimonials } from "@/data/academy";

export default function AcademyTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || shouldReduceMotion) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === academyTestimonials.length - 1 ? 0 : prev + 1,
      );
    }, 30000);

    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? academyTestimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === academyTestimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const testimonial = academyTestimonials[currentIndex];

  return (
    <EditorialBand
      tone="cream"
      marker="05"
      id="academy-testimonials"
      aria-labelledby="academy-testimonials-heading"
      className="bg-[#F4F1E8] dark:bg-[#1C1F1E]"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Testimonials
          </EditorialEyebrow>
          <EditorialHeading id="academy-testimonials-heading" className="mt-4">
            Voices From Our Scholars
          </EditorialHeading>
          <EditorialLead className="mt-5">
            Hear from students and professionals whose leadership journeys were
            shaped by the Akomapa Academy experience.
          </EditorialLead>
        </div>
      </FadeIn>

      <div
        className="relative mx-auto mt-12 max-w-4xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setIsPaused(false);
          }
        }}
      >
        <div
          className="border border-[#1C1F1E]/15 bg-[#FCFAEF] px-6 py-8 dark:border-[#FCFAEF]/20 dark:bg-[#121514] md:px-10 md:py-10"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            >
              <blockquote className="font-heading text-xl leading-relaxed text-[#1C1F1E] dark:text-[#FCFAEF] md:text-2xl">
                <span className="sr-only">Quote from {testimonial.name}: </span>
                &quot;{testimonial.quote}&quot;
              </blockquote>

              <footer className="mt-8 flex items-center gap-4 border-t border-[#1C1F1E]/15 pt-6 dark:border-[#FCFAEF]/20">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#E6E7E7] dark:bg-[#2F3332]">
                  <Image
                    src={testimonial.image}
                    alt=""
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <cite className="not-italic font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {testimonial.name}
                  </cite>
                  <p className="text-sm text-[#0097b2] dark:text-[#66C4DC]">
                    {testimonial.title}
                  </p>
                </div>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2" role="tablist" aria-label="Testimonials">
            {academyTestimonials.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
                className={`inline-flex h-11 min-w-11 items-center justify-center rounded-md px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 ${
                  index === currentIndex
                    ? "text-[#0097b2] dark:text-[#66C4DC]"
                    : "text-[#0097b2]/40 dark:text-[#66C4DC]/40"
                }`}
                aria-label={`Show testimonial ${index + 1} from ${item.name}`}
              >
                <span
                  aria-hidden="true"
                  className={`block h-2.5 w-2.5 rounded-full ${
                    index === currentIndex
                      ? "bg-current"
                      : "bg-current opacity-50"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1C1F1E]/15 text-[#0097b2] transition-colors hover:border-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/25 dark:text-[#66C4DC]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1C1F1E]/15 text-[#0097b2] transition-colors hover:border-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/25 dark:text-[#66C4DC]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </EditorialBand>
  );
}
