"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "@/components/common/Image";
import { getImageKitUrl } from "@/lib/imagekit";

type Props = {
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
  posterPosition?: string;
};

const MOBILE_VIDEO_WIDTH = 960;
const DESKTOP_VIDEO_WIDTH = 1280;
const VIDEO_QUALITY = 60;

export default function ImmersionHeroMedia({
  videoSrc,
  posterSrc,
  posterAlt,
  posterPosition = "center",
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

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

  useEffect(() => {
    if (!shouldLoadVideo) return;
    const media = videoRef.current;
    if (!media) return;
    const playResult = media.play();
    if (playResult && typeof playResult.catch === "function") {
      void playResult.catch(() => {
        /* Autoplay can be blocked; the muted attribute covers the usual case. */
      });
    }
  }, [shouldLoadVideo]);

  const mobileVideoSrc = getImageKitUrl(videoSrc, {
    width: MOBILE_VIDEO_WIDTH,
    quality: VIDEO_QUALITY,
  });
  const desktopVideoSrc = getImageKitUrl(videoSrc, {
    width: DESKTOP_VIDEO_WIDTH,
    quality: VIDEO_QUALITY,
  });

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
          {shouldLoadVideo ? (
            <>
              <source media="(max-width: 767px)" src={mobileVideoSrc} />
              <source src={desktopVideoSrc} />
            </>
          ) : null}
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
