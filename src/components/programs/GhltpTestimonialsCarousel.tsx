"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionDiv } from "@/components/motion/framer";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "@/components/common/Image";

const testimonials = [
  {
    id: 1,
    quote:
      "The Akomapa Program changed how I see leadership. It's not about titles — it's about empathy, ethics, and action.",
    name: "Program Fellow",
    title: "Ghana",
    image: "/avatar-2.jpg",
  },
  {
    id: 2,
    quote:
      "Learning directly from world leaders while engaging with peers across continents gave me the confidence to lead in my own community.",
    name: "Student",
    title: "Yale University",
    image: "/avatar-2.jpg",
  },
];

export default function GhltpTestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || shouldReduceMotion) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, shouldReduceMotion]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const testimonial = testimonials[currentIndex];

  return (
    <div
      className="relative mx-auto max-w-4xl"
      role="region"
      aria-roledescription="carousel"
      aria-label="Participant testimonial carousel"
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
        className="border border-[#FCFAEF]/25 bg-[#0B2F3A] px-6 py-8 md:px-10 md:py-10"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <MotionDiv
            key={currentIndex}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
          >
            <blockquote className="font-heading text-xl leading-relaxed text-[#FCFAEF] md:text-2xl">
              <span className="sr-only">Quote from {testimonial.name}: </span>
              &quot;{testimonial.quote}&quot;
            </blockquote>

            <footer className="mt-8 flex items-center gap-4 border-t border-[#FCFAEF]/20 pt-6">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#2F3332]">
                <Image
                  src={testimonial.image}
                  alt=""
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <cite className="not-italic font-heading text-lg font-semibold text-[#FCFAEF]">
                  {testimonial.name}
                </cite>
                <p className="text-sm text-[#F5C94D]">{testimonial.title}</p>
              </div>
            </footer>
          </MotionDiv>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2" role="tablist" aria-label="Participant quotes">
          {testimonials.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
              className={`inline-flex h-11 min-w-11 items-center justify-center rounded-md px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C] ${
                index === currentIndex ? "text-[#F5C94D]" : "text-[#FCFAEF]/40"
              }`}
              aria-label={`Show testimonial ${index + 1} from ${item.name}`}
            >
              <span
                aria-hidden="true"
                className={`block h-2.5 w-2.5 rounded-full ${
                  index === currentIndex ? "bg-current" : "bg-current opacity-50"
                }`}
              />
            </button>
          ))}
        </div>

        {testimonials.length > 1 ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrevious}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#FCFAEF]/40 text-[#FCFAEF] transition-colors hover:border-[#eeba2b] hover:text-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#FCFAEF]/40 text-[#FCFAEF] transition-colors hover:border-[#eeba2b] hover:text-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
