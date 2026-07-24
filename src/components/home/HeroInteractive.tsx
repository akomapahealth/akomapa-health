"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Play } from "lucide-react";
import { InlineChevron } from "@/components/home/_home-ui";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

/**
 * Set a YouTube/Vimeo URL to enable a "Watch video" control that opens
 * HeroVideoModal. Leave null to keep the static image hero.
 */
export const HERO_BACKGROUND_VIDEO_URL: string | null = null;

const HeroVideoModal = dynamic(() => import("@/components/home/HeroVideoModal"), {
  ssr: false,
});

/**
 * Small client island for hero analytics + scroll cue (+ optional video).
 * LCP image and copy stay in the Server Component hero path.
 */
export default function HeroInteractive() {
  const [videoOpen, setVideoOpen] = useState(false);
  const hasHeroVideo = Boolean(HERO_BACKGROUND_VIDEO_URL);

  useEffect(() => {
    trackEvent({
      name: "hero_slide_view",
      slide_id: "brand-intro",
      slide_index: 0,
    });
  }, []);

  return (
    <>
      {hasHeroVideo && (
        <div className="absolute bottom-28 left-4 z-20 sm:left-6 md:bottom-24 md:left-8">
          <Button
            type="button"
            size="lg"
            onClick={() => setVideoOpen(true)}
            className="bg-[#0097b2] text-[#FCFAEF] hover:bg-[#005A55]"
            aria-label="Watch hero background video"
          >
            <Play className="mr-2 h-5 w-5" aria-hidden="true" />
            Watch video
          </Button>
        </div>
      )}

      <div
        className="hero-scroll-cue absolute bottom-8 right-8 z-20 hidden items-center justify-center md:flex"
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
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#FCFAEF]/80 bg-[#FCFAEF]/10 backdrop-blur-sm transition-all duration-300 hover:bg-[#FCFAEF]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b]"
            aria-label="Scroll down"
          >
            <InlineChevron className="hero-scroll-chevron h-5 w-5 -rotate-90 text-[#FCFAEF]" />
          </button>
        </div>
      </div>

      {hasHeroVideo && (
        <HeroVideoModal
          open={videoOpen}
          videoUrl={HERO_BACKGROUND_VIDEO_URL}
          title="Akomapa hero video"
          onOpenChange={setVideoOpen}
        />
      )}
    </>
  );
}
