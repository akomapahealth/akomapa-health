"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "@/components/common/Image";
import { UpdateSlide } from "@/lib/types";
import { updates as defaultUpdates, getActiveUpdates } from "@/data/updates";

interface UpdatesCarouselProps {
  slides?: UpdateSlide[];
  autoAdvanceInterval?: number;
}

export default function UpdatesCarousel({
  slides = defaultUpdates,
  autoAdvanceInterval = 8000,
}: UpdatesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeSlides = useMemo(() => getActiveUpdates(slides), [slides]);

  const goToNext = useCallback(() => {
    if (activeSlides.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  const goToPrevious = useCallback(() => {
    if (activeSlides.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused || activeSlides.length <= 1) return;

    const timer = setInterval(goToNext, autoAdvanceInterval);
    return () => clearInterval(timer);
  }, [isPaused, autoAdvanceInterval, goToNext, activeSlides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current?.contains(document.activeElement)) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  if (activeSlides.length === 0) {
    return null;
  }

  const currentSlide = activeSlides[currentIndex];
  const showNavigation = activeSlides.length > 1;

  return (
    <section
      className="py-8 md:py-12 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] relative overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Latest updates and announcements"
    >
      {/* Decorative blur elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#eeba2b]/15 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[#eeba2b] font-semibold text-sm tracking-wider uppercase mb-1">
            Stay in the Loop
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-[#FCFAEF]">
            What&apos;s Happening at Akomapa
          </h3>
        </motion.div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative max-w-6xl xl:max-w-7xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="bg-white/95 dark:bg-[#2F3332]/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col md:flex-row"
              >
                {/* Image - First on desktop */}
                {currentSlide.image && (
                  <div className="relative w-full md:w-[45%] lg:w-[40%] aspect-[16/10] md:aspect-auto md:min-h-[240px] lg:min-h-[280px] order-2 md:order-1">
                    <Image
                      src={currentSlide.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/30 via-black/10 to-transparent" />
                  </div>
                )}

                {/* Text Content */}
                <div
                  className="flex-1 p-5 md:p-6 lg:p-8 flex flex-col justify-center order-1 md:order-2"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2 md:mb-3">
                    {currentSlide.title}
                  </h4>
                  <p className="text-[#2F3332] dark:text-[#E6E7E7] text-sm md:text-base mb-4 md:mb-5 leading-relaxed line-clamp-3">
                    {currentSlide.description}
                  </p>
                  {currentSlide.isExternal ? (
                    <a
                      href={currentSlide.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 w-fit px-5 py-2.5 bg-[#0097b2] text-[#FCFAEF] rounded-full hover:bg-[#005A55] transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    >
                      {currentSlide.ctaText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <Link
                      href={currentSlide.ctaLink}
                      className="group inline-flex items-center gap-2 w-fit px-5 py-2.5 bg-[#0097b2] text-[#FCFAEF] rounded-full hover:bg-[#005A55] transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    >
                      {currentSlide.ctaText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          {showNavigation && (
            <>
              {/* Previous/Next Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-2 md:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 dark:bg-[#2F3332]/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-[#0097b2] hover:bg-[#eeba2b] hover:text-[#1C1F1E] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#eeba2b] focus:ring-offset-2"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 md:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 dark:bg-[#2F3332]/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-[#0097b2] hover:bg-[#eeba2b] hover:text-[#1C1F1E] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#eeba2b] focus:ring-offset-2"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div
                className="flex justify-center gap-2 mt-4"
                role="tablist"
                aria-label="Slide indicators"
              >
                {activeSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Go to slide ${index + 1}: ${slide.title}`}
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#eeba2b] focus:ring-offset-2 focus:ring-offset-[#0097b2] ${
                      index === currentIndex
                        ? "bg-[#eeba2b] w-6"
                        : "bg-white/40 hover:bg-white/60 w-2"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
