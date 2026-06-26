"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "@/components/common/Image";
import { PublicSectionHeader } from "@/components/shared/PublicPagePrimitives";
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
    <section className="overflow-x-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 text-[#FCFAEF] dark:from-[#121514] dark:to-[#0F4C5C] md:py-24">
      <div className="container mx-auto px-4">
        <PublicSectionHeader
          eyebrow="Testimonials"
          eyebrowTone="gold"
          title="Voices From Our Scholars"
          description="Hear from students and professionals whose leadership journeys were shaped by the Akomapa Academy experience."
          className="mb-12"
          titleClassName="text-[#FCFAEF] dark:text-[#FCFAEF]"
          descriptionClassName="text-[#FCFAEF]/85"
        />

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
              className="flex min-h-[380px] flex-col rounded-xl border border-white/15 bg-[#FCFAEF]/95 p-8 shadow-xl dark:bg-[#2F3332] md:min-h-[340px] md:p-12"
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
                      alt={`${testimonial.name}`}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                      {testimonial.name}
                    </div>
                    <div className="text-[#eeba2b] dark:text-[#F5C94D]">
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
                  index === currentIndex ? "bg-[#F5C94D]" : "bg-[#FCFAEF]/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6E7E7] bg-[#FCFAEF] text-[#0097b2] shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#66C4DC] dark:border-[#2F3332] dark:bg-[#2F3332] dark:text-[#66C4DC] md:-left-3"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6E7E7] bg-[#FCFAEF] text-[#0097b2] shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#66C4DC] dark:border-[#2F3332] dark:bg-[#2F3332] dark:text-[#66C4DC] md:-right-3"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
