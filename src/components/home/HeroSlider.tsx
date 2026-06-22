"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import HeroSlide, { type HeroSlideContent } from "@/components/home/HeroSlide";

// HeroVideoModal pulls in Radix Dialog + iframe wiring that's only needed
// when the user actually clicks a video CTA — defer it out of the initial
// hero hydration bundle.
const HeroVideoModal = dynamic(() => import("@/components/home/HeroVideoModal"), {
  ssr: false,
});
import { announcementCampaign } from "@/data/announcements";
import type { Announcement } from "@/lib/types";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const AUTOPLAY_MS = 7000;
const BRAND_BACKGROUND = {
  src: "/highlights/Akomapa-28.jpg",
  alt: "Akomapa healthcare professionals working in a community clinic",
};

type Props = {
  height?: "full" | "large" | "medium";
};

// Use both h-* and min-h-* so the section keeps a fixed height (so Swiper's
// absolutely-positioned fade slides have a parent to fill), while still
// honoring a sensible minimum on short viewports.
const heightClasses: Record<NonNullable<Props["height"]>, string> = {
  full: "h-[100svh] min-h-[640px]",
  large: "h-[80svh] min-h-[560px]",
  medium: "h-[60svh] min-h-[480px]",
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default function HeroSlider({ height = "full" }: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<Announcement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const slides = useMemo<HeroSlideContent[]>(
    () => [
      {
        variant: "brand",
        id: "brand-intro",
        backgroundImage: BRAND_BACKGROUND.src,
        backgroundAlt: BRAND_BACKGROUND.alt,
      },
      ...announcementCampaign.slides.map<HeroSlideContent>((announcement) => ({
        variant: "announcement",
        announcement,
      })),
    ],
    []
  );

  useEffect(() => {
    const slide = slides[activeIndex];
    if (!slide) return;
    const slideId = slide.variant === "brand" ? slide.id : slide.announcement.id;
    trackEvent({
      name: "hero_slide_view",
      slide_id: slideId,
      slide_index: activeIndex,
    });
  }, [activeIndex, slides]);

  // Imperatively reflect reduced-motion changes onto the Swiper instance,
  // since the Autoplay module reads its config at init time.
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper?.autoplay) return;
    if (reducedMotion) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [reducedMotion]);

  const handlePlayVideo = useCallback((announcement: Announcement) => {
    if (!announcement.videoUrl) return;
    setActiveVideo(announcement);
    setVideoOpen(true);
    swiperRef.current?.autoplay?.stop();
  }, []);

  const handleVideoOpenChange = useCallback(
    (open: boolean) => {
      setVideoOpen(open);
      if (!open) {
        setActiveVideo(null);
        if (!reducedMotion) {
          swiperRef.current?.autoplay?.start();
        }
      }
    },
    [reducedMotion]
  );

  // After any manual navigation, immediately restart the autoplay timer so the
  // carousel keeps cycling. `pauseOnMouseEnter` will still pause on hover.
  const resumeAutoplay = useCallback(() => {
    if (reducedMotion) return;
    const ap = swiperRef.current?.autoplay;
    if (!ap) return;
    ap.start();
    // The cursor is over the just-clicked button; clear paused-on-mouseenter
    // state so the next tick fires.
    if (ap.paused) ap.resume();
  }, [reducedMotion]);

  const goPrev = useCallback(() => {
    swiperRef.current?.slidePrev();
    resumeAutoplay();
  }, [resumeAutoplay]);
  const goNext = useCallback(() => {
    swiperRef.current?.slideNext();
    resumeAutoplay();
  }, [resumeAutoplay]);
  const goTo = useCallback(
    (index: number) => {
      swiperRef.current?.slideToLoop(index);
      resumeAutoplay();
    },
    [resumeAutoplay]
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        heightClasses[height]
      )}
      aria-label="Akomapa hero announcements"
      data-testid="hero-slider"
    >
      <Swiper
        modules={[Autoplay, EffectFade, Keyboard, Navigation, Pagination, A11y]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (reducedMotion) {
            swiper.autoplay?.stop();
          }
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={slides.length > 1}
        speed={reducedMotion ? 0 : 1200}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={
          reducedMotion
            ? false
            : {
                delay: AUTOPLAY_MS,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        keyboard={{ enabled: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: "Previous announcement",
          nextSlideMessage: "Next announcement",
          paginationBulletMessage: "Go to announcement {{index}}",
          containerMessage: "Akomapa announcements carousel",
        }}
        pagination={false}
        className="h-full w-full"
      >
        {slides.map((slide, index) => {
          const slideKey = slide.variant === "brand" ? slide.id : slide.announcement.id;
          return (
            <SwiperSlide key={slideKey} className="!h-full bg-[#1C1F1E]">
              <HeroSlide
                content={slide}
                isActive={index === activeIndex}
                isPrimary={index === 0}
                onPlayVideo={handlePlayVideo}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/30 p-3 text-white/85 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 md:inline-flex md:left-6"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/30 p-3 text-white/85 backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-black/30 md:inline-flex md:right-6"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3"
            role="tablist"
            aria-label="Hero slides"
            data-testid="hero-slider-pagination"
          >
            {slides.map((slide, index) => {
              const key = slide.variant === "brand" ? slide.id : slide.announcement.id;
              const label =
                slide.variant === "brand" ? "Akomapa intro" : slide.announcement.title;
              const isActive = activeIndex === index;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Go to slide ${index + 1}: ${label}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    "h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
                    isActive
                      ? "w-8 bg-[#eeba2b]"
                      : "w-3 bg-[#FCFAEF]/60 hover:bg-[#FCFAEF]/85"
                  )}
                />
              );
            })}
          </div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 right-8 z-20 hidden items-center justify-center md:flex"
        aria-hidden
      >
        <div className="relative h-16 w-16">
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="94 188"
              strokeLinecap="round"
              className="text-[#FCFAEF]/60"
            />
          </svg>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
              }
            }}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#FCFAEF]/80 bg-[#FCFAEF]/10 backdrop-blur-sm transition-all duration-300 hover:bg-[#FCFAEF]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b]"
            aria-label="Scroll down"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronUp className="h-5 w-5 rotate-180 text-[#FCFAEF]" />
            </motion.div>
          </button>
        </div>
      </motion.div>

      <HeroVideoModal
        open={videoOpen}
        videoUrl={activeVideo?.videoUrl ?? null}
        title={activeVideo?.title ?? "Video"}
        onOpenChange={handleVideoOpenChange}
      />
    </section>
  );
}
