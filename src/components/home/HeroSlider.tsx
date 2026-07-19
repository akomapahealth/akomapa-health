"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { InlineChevron } from "@/components/home/_home-ui";
import HeroSlide from "@/components/home/HeroSlide";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const BRAND_BACKGROUND = {
  src: "/highlights/Akomapa-28.jpg",
  alt: "Akomapa healthcare professionals working in a community clinic",
};

type Props = {
  height?: "full" | "large" | "medium";
};

const heightClasses: Record<NonNullable<Props["height"]>, string> = {
  full: "h-[100svh] min-h-[640px]",
  large: "h-[80svh] min-h-[560px]",
  medium: "h-[60svh] min-h-[480px]",
};

export default function HeroSlider({ height = "full" }: Props) {
  useEffect(() => {
    trackEvent({
      name: "hero_slide_view",
      slide_id: "brand-intro",
      slide_index: 0,
    });
  }, []);

  return (
    <section
      className={cn("relative overflow-hidden", heightClasses[height])}
      aria-label="Akomapa homepage hero"
      data-testid="hero-slider"
    >
      <div className="h-full w-full bg-[#1C1F1E]">
        <HeroSlide
          content={{
            variant: "brand",
            id: "brand-intro",
            backgroundImage: BRAND_BACKGROUND.src,
            backgroundAlt: BRAND_BACKGROUND.alt,
          }}
          isPrimary
        />
      </div>

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
              <InlineChevron className="h-5 w-5 -rotate-90 text-[#FCFAEF]" />
            </motion.div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
