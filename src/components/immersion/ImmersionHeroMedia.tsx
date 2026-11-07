"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "@/components/common/Image";
import { IMMERSION_HERO_MOBILE_MEDIA_QUERY } from "@/components/immersion/immersion-hero-video-shared";

type Props = {
  /** Precomputed ImageKit (or fixture) URL for max-width 767px viewports. */
  mobileVideoSrc: string;
  /** Precomputed ImageKit (or fixture) URL for wider viewports. */
  desktopVideoSrc: string;
  posterSrc: string;
  posterAlt: string;
  posterPosition?: string;
};

export default function ImmersionHeroMedia({
  mobileVideoSrc,
  desktopVideoSrc,
  posterSrc,
  posterAlt,
  posterPosition = "center",
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion === true) {
      setShouldLoadVideo(false);
      return;
    }

    const node = mediaRef.current;
    if (!node) return;

    if (typeof IntersectionObserver !== "function") {
      setShouldLoadVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldLoadVideo(true);
        observer.disconnect();
      },
      { threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  // Browsers largely ignore `<source media>` on `<video>`. Pick one precomputed
  // URL in JS so mobile never pulls the desktop encode.
  useEffect(() => {
    if (!shouldLoadVideo) {
      setActiveVideoSrc(null);
      return;
    }

    if (typeof window.matchMedia !== "function") {
      setActiveVideoSrc(desktopVideoSrc);
      return;
    }

    const mediaQuery = window.matchMedia(IMMERSION_HERO_MOBILE_MEDIA_QUERY);
    const syncSrc = () => {
      setActiveVideoSrc(mediaQuery.matches ? mobileVideoSrc : desktopVideoSrc);
    };
    syncSrc();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncSrc);
      return () => mediaQuery.removeEventListener("change", syncSrc);
    }

    mediaQuery.addListener(syncSrc);
    return () => mediaQuery.removeListener(syncSrc);
  }, [shouldLoadVideo, mobileVideoSrc, desktopVideoSrc]);

  useEffect(() => {
    if (!activeVideoSrc) return;
    const media = videoRef.current;
    if (!media) return;
    const playResult = media.play();
    if (playResult && typeof playResult.catch === "function") {
      void playResult.catch(() => {
        /* Autoplay can be blocked; the muted attribute covers the usual case. */
      });
    }
  }, [activeVideoSrc]);

  return (
    <div
      ref={mediaRef}
      className="absolute inset-0 bg-[#0B0F0E]"
      data-immersion-hero-hydrated={isHydrated ? "true" : "false"}
      data-immersion-hero-media
    >
      {shouldReduceMotion === true ? (
        <Image
          src={posterSrc}
          alt={posterAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: posterPosition }}
        />
      ) : null}

      {shouldReduceMotion !== true ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          data-immersion-hero-video
          disablePictureInPicture
          loop
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
        >
          {activeVideoSrc ? <source src={activeVideoSrc} /> : null}
        </video>
      ) : null}

      <div
        aria-hidden="true"
        data-immersion-hero-overlay="horizontal"
        className="absolute inset-0 bg-gradient-to-r from-[#07191d]/55 via-[#07191d]/28 to-[#07191d]/12"
      />
      <div
        aria-hidden="true"
        data-immersion-hero-overlay="vertical"
        className="absolute inset-0 bg-gradient-to-t from-[#07191d]/40 via-transparent to-[#07191d]/16"
      />
    </div>
  );
}
