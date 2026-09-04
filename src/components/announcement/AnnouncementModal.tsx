"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOTION_EASE, motionDurations } from "@/lib/motion/tokens";
import { formatAnnouncementDate } from "@/data/announcements";
import type { AnnouncementCampaign } from "@/lib/types";
import Image from "@/components/common/Image";
import {
  EditorialArrowLink,
  EditorialButton,
  EditorialEyebrow,
  EditorialPlay,
  type EditorialEyebrowTone,
} from "@/components/shared/EditorialPrimitives";
import { getAnnouncementPosterSrc, parseVideoUrl } from "@/lib/video-utils";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "akomapa-announcements-dismissed";
const AUTO_ADVANCE_MS = 6000;

const mediaControlClassName =
  "inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#FCFAEF] text-[#1C1F1E] shadow-sm transition-colors hover:bg-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:hover:bg-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]";

function tagEyebrowTone(
  tagColor: "lapis" | "amber" | "skobeloff" | undefined,
): EditorialEyebrowTone {
  return tagColor === "amber" ? "gold" : "teal";
}

type AnnouncementModalProps = {
  campaign: AnnouncementCampaign;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDismiss: () => void;
};

export default function AnnouncementModal({
  campaign,
  isOpen,
  onOpenChange,
  onDismiss,
}: AnnouncementModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasManualNav, setHasManualNav] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const viewedSlideIdsRef = useRef<Set<string>>(new Set());

  const { slides, version } = campaign;

  // Reset slide index when the modal opens
  useEffect(() => {
    if (!isOpen) return;
    setCurrentIndex(0);
    setDirection(0);
    setHasManualNav(false);
    setVideoPlaying(false);
    viewedSlideIdsRef.current = new Set();
    previousFocusRef.current = document.activeElement as HTMLElement;
    trackEvent({
      name: "announcement_popup_open",
      version,
      slide_count: slides.length,
    });
  }, [isOpen, slides.length, version]);

  // Track each slide impression as it becomes visible
  useEffect(() => {
    if (!isOpen) return;
    const slide = slides[currentIndex];
    if (!slide) return;
    viewedSlideIdsRef.current.add(slide.id);
    trackEvent({
      name: "announcement_slide_view",
      slide_id: slide.id,
      slide_index: currentIndex,
    });
  }, [isOpen, currentIndex, slides]);

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
    onOpenChange(false);
    trackEvent({
      name: "announcement_popup_dismiss",
      version,
      viewed_slides: viewedSlideIdsRef.current.size,
    });
    try {
      localStorage.setItem(STORAGE_KEY, version);
    } catch {
      // localStorage unavailable
    }
    onDismiss();
    previousFocusRef.current?.focus();
  }, [onOpenChange, onDismiss, version]);

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
      setVideoPlaying(false);
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
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#121514]/75 sm:items-center sm:p-4"
          onClick={close}
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
            className="relative max-h-[90vh] w-full overflow-hidden rounded-t-md border border-[#1C1F1E]/10 bg-[#FCFAEF] shadow-2xl outline-none dark:border-[#FCFAEF]/12 dark:bg-[#1C1F1E] sm:max-h-[88vh] sm:max-w-[680px] sm:rounded-md"
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
              type="button"
              onClick={close}
              className={cn(mediaControlClassName, "absolute top-3 right-3 z-20")}
              aria-label="Close announcements"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Prev/Next overlays on image area */}
            {showNavigation && (
              <>
                <button
                  type="button"
                  onClick={goToPrevious}
                  className={cn(
                    mediaControlClassName,
                    "absolute left-2 top-[28vw] z-20 -translate-y-1/2 sm:top-[170px]",
                  )}
                  aria-label="Previous announcement"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className={cn(
                    mediaControlClassName,
                    "absolute right-2 top-[28vw] z-20 -translate-y-1/2 sm:top-[170px]",
                  )}
                  aria-label="Next announcement"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
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
                {/* Media Section (Image or Video) */}
                {(currentSlide.image || currentSlide.videoUrl) && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
                    {currentSlide.videoUrl && videoPlaying ? (
                      <iframe
                        src={parseVideoUrl(currentSlide.videoUrl)?.embedUrl}
                        className="absolute inset-0 h-full w-full"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        title={currentSlide.title}
                      />
                    ) : (
                      <>
                        {/* Video/announcement poster — decorative — intentional empty alt (slide title above) */}
                        <Image
                          src={getAnnouncementPosterSrc(currentSlide) || ""}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, 680px"
                        />

                        {currentSlide.videoUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setVideoPlaying(true);
                              setIsPaused(true);
                            }}
                            className="absolute inset-0 z-10 flex items-center justify-center"
                            aria-label="Play video"
                          >
                            <span className="inline-flex h-14 w-14 items-center justify-center rounded-md bg-[#FCFAEF] text-[#0097b2] shadow-sm transition-colors hover:bg-[#eeba2b] hover:text-[#1C1F1E] sm:h-16 sm:w-16">
                              <EditorialPlay className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" />
                            </span>
                          </button>
                        )}
                      </>
                    )}

                    {/* Tag eyebrow overlaid on image */}
                    {currentSlide.tag && !videoPlaying && (
                      <div className="absolute top-3 left-3 z-10 rounded-md bg-[#FCFAEF]/95 px-3 py-2 dark:bg-[#1C1F1E]/95">
                        <EditorialEyebrow
                          tone={tagEyebrowTone(currentSlide.tagColor)}
                        >
                          {currentSlide.tag}
                        </EditorialEyebrow>
                      </div>
                    )}

                    {/* Slide counter on image */}
                    {showNavigation && !videoPlaying && (
                      <span className="absolute bottom-3 right-3 rounded-md bg-[#FCFAEF]/95 px-2.5 py-1 font-subheading text-xs font-semibold tracking-wide text-[#1C1F1E] dark:bg-[#1C1F1E]/95 dark:text-[#FCFAEF]">
                        {currentIndex + 1} / {slides.length}
                      </span>
                    )}
                  </div>
                )}

                {/* Text Content */}
                <div className="p-5 sm:p-8">
                  {currentSlide.tag &&
                  !currentSlide.image &&
                  !currentSlide.videoUrl ? (
                    <EditorialEyebrow
                      tone={tagEyebrowTone(currentSlide.tagColor)}
                      className="mb-3"
                    >
                      {currentSlide.tag}
                    </EditorialEyebrow>
                  ) : null}

                  <time
                    dateTime={currentSlide.publishedAt}
                    className="mb-2 block font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-[#2F3332]/58 dark:text-[#E6E7E7]/58"
                  >
                    {formatAnnouncementDate(currentSlide.publishedAt)}
                  </time>

                  <h2 className="mb-2 font-heading text-xl font-semibold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] sm:mb-3 sm:text-2xl">
                    {currentSlide.title}
                  </h2>

                  <p className="mb-5 max-w-xl text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:mb-6 sm:text-base">
                    {currentSlide.description}
                  </p>

                  {/* CTA + Dismiss row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    {currentSlide.ctaText && currentSlide.ctaLink ? (
                      currentSlide.isExternal ? (
                        <EditorialButton
                          href={currentSlide.ctaLink}
                          external
                          onClick={() =>
                            trackEvent({
                              name: "announcement_cta_click",
                              slide_id: currentSlide.id,
                              cta_text: currentSlide.ctaText ?? "",
                              cta_link: currentSlide.ctaLink ?? "",
                            })
                          }
                        >
                          {currentSlide.ctaText}
                        </EditorialButton>
                      ) : (
                        <EditorialButton
                          href={`/news/${currentSlide.id}`}
                          onClick={() => {
                            trackEvent({
                              name: "announcement_cta_click",
                              slide_id: currentSlide.id,
                              cta_text: currentSlide.ctaText ?? "",
                              cta_link: `/news/${currentSlide.id}`,
                            });
                            close();
                          }}
                        >
                          {currentSlide.ctaText}
                        </EditorialButton>
                      )
                    ) : null}

                    {currentSlide.secondaryCtaText &&
                    currentSlide.secondaryCtaLink ? (
                      <EditorialButton
                        href={currentSlide.secondaryCtaLink}
                        variant="outline"
                        external={currentSlide.secondaryCtaIsExternal}
                        onClick={() => {
                          trackEvent({
                            name: "announcement_cta_click",
                            slide_id: currentSlide.id,
                            cta_text: currentSlide.secondaryCtaText ?? "",
                            cta_link: currentSlide.secondaryCtaLink ?? "",
                          });
                          if (!currentSlide.secondaryCtaIsExternal) close();
                        }}
                      >
                        {currentSlide.secondaryCtaText}
                      </EditorialButton>
                    ) : null}

                    <EditorialArrowLink href="/news" onClick={close}>
                      View All Updates
                    </EditorialArrowLink>

                    <button
                      type="button"
                      onClick={close}
                      className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-[#2F3332]/55 transition-colors hover:text-[#1C1F1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#FCFAEF]/45 dark:hover:text-[#FCFAEF]"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot Indicators — fixed at bottom */}
            {showNavigation && (
              <div className="flex justify-center pb-5 pt-1">
                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Announcement slides"
                >
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() =>
                        navigate(index, index > currentIndex ? 1 : -1)
                      }
                      role="tab"
                      aria-selected={index === currentIndex}
                      aria-label={`Go to announcement ${index + 1}: ${slide.title}`}
                      className={cn(
                        "h-1.5 rounded-sm transition-[width,background-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
                        index === currentIndex
                          ? "w-6 bg-[#0097b2] dark:bg-[#66C4DC]"
                          : "w-2 bg-[#1C1F1E]/15 hover:bg-[#1C1F1E]/30 dark:bg-[#FCFAEF]/15 dark:hover:bg-[#FCFAEF]/30",
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
