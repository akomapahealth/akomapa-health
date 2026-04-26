"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOTION_EASE, motionDurations } from "@/lib/motion/tokens";
import { announcementCampaign } from "@/data/announcements";
import Image from "@/components/common/Image";
import { TAG_COLORS } from "@/data/announcement-colors";

const STORAGE_KEY = "akomapa-announcements-dismissed";
const DELAY_MS = 3000;
const AUTO_ADVANCE_MS = 6000;

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasManualNav, setHasManualNav] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const { slides, version } = announcementCampaign;

  // Delayed open, gated by localStorage
  useEffect(() => {
    if (slides.length === 0) return;

    try {
      if (localStorage.getItem(STORAGE_KEY) === version) return;
    } catch {
      // localStorage unavailable — show anyway
    }

    const timer = setTimeout(() => {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setIsOpen(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, [slides.length, version]);

  // Body scroll lock + focus modal on open
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => modalRef.current?.focus());

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, version);
    } catch {
      // localStorage unavailable
    }
    previousFocusRef.current?.focus();
  }, [version]);

  // ESC key + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }

      if (e.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;

        const focusable = modal.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Auto-advance
  useEffect(() => {
    if (!isOpen || isPaused || hasManualNav || slides.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, hasManualNav, slides.length]);

  const navigate = useCallback(
    (newIndex: number, dir: number) => {
      setHasManualNav(true);
      setDirection(dir);
      setCurrentIndex(newIndex);
    },
    []
  );

  const goToPrevious = useCallback(() => {
    navigate(
      (currentIndex - 1 + slides.length) % slides.length,
      -1
    );
  }, [currentIndex, slides.length, navigate]);

  const goToNext = useCallback(() => {
    navigate(
      (currentIndex + 1) % slides.length,
      1
    );
  }, [currentIndex, slides.length, navigate]);

  // Touch swipe
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
    if (Math.abs(distance) < 50) return;
    if (distance > 0) goToNext();
    else goToPrevious();
  };

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];
  const showNavigation = slides.length > 1;

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionDurations.enter, ease: [...MOTION_EASE] }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Announcements"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: motionDurations.enter, ease: [...MOTION_EASE] }}
            className="relative w-full sm:max-w-[560px] max-h-[92vh] sm:max-h-[85vh] overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white dark:bg-[#2F3332] shadow-2xl outline-none"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={(e) => {
              if (!modalRef.current?.contains(e.relatedTarget)) {
                setIsPaused(false);
              }
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close Button — floats over the image */}
            <button
              onClick={close}
              className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black/20"
              aria-label="Close announcements"
            >
              <X size={18} className="text-white" />
            </button>

            {/* Prev/Next overlays on image area */}
            {showNavigation && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-[88px] sm:top-[100px] z-20 p-1 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/80"
                  aria-label="Previous announcement"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-[88px] sm:top-[100px] z-20 p-1 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/80"
                  aria-label="Next announcement"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [...MOTION_EASE] }}
                aria-live="polite"
                aria-atomic="true"
              >
                {/* Image Section */}
                {currentSlide.image && (
                  <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] overflow-hidden">
                    <Image
                      src={currentSlide.image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 560px"
                    />
                    {/* Gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

                    {/* Tag badge overlaid on image */}
                    {currentSlide.tag && (
                      <span
                        className={cn(
                          "absolute top-3 left-3 inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide backdrop-blur-md shadow-sm",
                          TAG_COLORS[currentSlide.tagColor ?? "lapis"]
                        )}
                      >
                        {currentSlide.tag}
                      </span>
                    )}

                    {/* Slide counter on image */}
                    {showNavigation && (
                      <span className="absolute bottom-3 right-3 text-xs font-medium text-white/80 bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-0.5">
                        {currentIndex + 1} / {slides.length}
                      </span>
                    )}
                  </div>
                )}

                {/* Text Content */}
                <div className="p-5 sm:p-6">
                  {/* Tag badge — only if no image */}
                  {currentSlide.tag && !currentSlide.image && (
                    <span
                      className={cn(
                        "inline-block rounded-full px-3 py-0.5 text-xs font-semibold mb-3",
                        TAG_COLORS[currentSlide.tagColor ?? "lapis"]
                      )}
                    >
                      {currentSlide.tag}
                    </span>
                  )}

                  <h2 className="font-heading text-lg sm:text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-1.5">
                    {currentSlide.title}
                  </h2>

                  <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed mb-4">
                    {currentSlide.description}
                  </p>

                  {/* CTA + Dismiss row */}
                  <div className="flex items-center gap-3">
                    {currentSlide.ctaText && currentSlide.ctaLink && (
                      currentSlide.isExternal ? (
                        <a
                          href={currentSlide.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#0097b2] text-[#FCFAEF] rounded-full hover:bg-[#005A55] transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#0097b2] focus:ring-offset-2"
                        >
                          {currentSlide.ctaText}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <Link
                          href={currentSlide.ctaLink}
                          onClick={close}
                          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#0097b2] text-[#FCFAEF] rounded-full hover:bg-[#005A55] transition-all duration-200 font-medium text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#0097b2] focus:ring-offset-2"
                        >
                          {currentSlide.ctaText}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )
                    )}

                    <button
                      onClick={close}
                      className="text-sm text-[#2F3332]/50 dark:text-[#FCFAEF]/40 hover:text-[#2F3332] dark:hover:text-[#FCFAEF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0097b2] focus:ring-offset-2 rounded px-2 py-1"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot Indicators — fixed at bottom */}
            {showNavigation && (
              <div className="pb-4 pt-0 flex justify-center">
                <div
                  className="flex items-center gap-1.5"
                  role="tablist"
                  aria-label="Announcement slides"
                >
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => navigate(index, index > currentIndex ? 1 : -1)}
                      role="tab"
                      aria-selected={index === currentIndex}
                      aria-label={`Go to announcement ${index + 1}: ${slide.title}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0097b2] focus:ring-offset-2",
                        index === currentIndex
                          ? "bg-[#0097b2] dark:bg-[#66C4DC] w-5"
                          : "bg-[#2F3332]/15 dark:bg-[#FCFAEF]/15 hover:bg-[#2F3332]/30 dark:hover:bg-[#FCFAEF]/30 w-1.5"
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
