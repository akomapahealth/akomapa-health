"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import { academyTestimonials } from "@/data/academy";

export default function AcademyTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isHovered || shouldReduceMotion) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === academyTestimonials.length - 1 ? 0 : prev + 1,
      );
    }, 30000);

    return () => clearInterval(timer);
  }, [isHovered, shouldReduceMotion]);

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
    <section className="overflow-x-hidden bg-[#F4F1E8] py-16 dark:bg-[#1C1F1E] md:py-24">
      <div className="site-container mx-auto px-4 sm:px-6">
        <FadeIn direction="up" className="mx-auto mb-10 max-w-3xl space-y-3 text-center sm:space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            Testimonials
          </p>
          <h2 className="text-2xl font-bold text-[#0B2F3A] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl">
            Voices From Our Scholars
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            Hear from students and professionals whose leadership journeys were
            shaped by the Akomapa Academy experience.
          </p>
        </FadeIn>

        <div
          className="relative mx-auto max-w-4xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
              className="flex min-h-[380px] flex-col rounded-2xl border border-[#E6E7E7]/80 bg-white/95 p-8 shadow-xl dark:border-[#2E3433] dark:bg-[#2F3332] md:min-h-[340px] md:p-12"
            >
              <div className="absolute left-8 top-8 text-[#0097b2] opacity-20 dark:text-[#66C4DC]">
                <Quote size={64} />
              </div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex flex-1 flex-col justify-center">
                  <blockquote className="text-xl leading-relaxed text-[#2F3332] dark:text-[#E6E7E7] md:text-2xl">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                </div>

                <div className="flex items-center">
                  <div className="mr-4 h-16 w-16 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                      {testimonial.name}
                    </div>
                    <div className="text-[#0097b2] dark:text-[#66C4DC]">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {academyTestimonials.map((_, index) => (
              <button
                key={academyTestimonials[index].id}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-[#0097b2] dark:bg-[#66C4DC]"
                    : "bg-[#0097b2]/30 dark:bg-[#66C4DC]/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrevious}
            className="absolute -left-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6E7E7] bg-white text-[#0097b2] shadow-md transition hover:bg-[#FCFAEF] focus:outline-none focus:ring-2 focus:ring-[#0097b2] dark:border-[#2E3433] dark:bg-[#2F3332] dark:text-[#66C4DC] md:-left-5"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6E7E7] bg-white text-[#0097b2] shadow-md transition hover:bg-[#FCFAEF] focus:outline-none focus:ring-2 focus:ring-[#0097b2] dark:border-[#2E3433] dark:bg-[#2F3332] dark:text-[#66C4DC] md:-right-5"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
