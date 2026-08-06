"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "@/components/common/Image";
import { getImageKitUrl } from "@/lib/imagekit";

type Props = {
  videoSrc: string;
  posterSrc: string;
  posterAlt: string;
  posterPosition?: string;
};

export default function ImmersionHeroMedia({
  videoSrc,
  posterSrc,
  posterAlt,
  posterPosition = "center",
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);

  const mobileVideoSrc = getImageKitUrl(videoSrc, {
    width: 960,
    quality: 60,
  });
  const desktopVideoSrc = getImageKitUrl(videoSrc, {
    width: 1920,
    quality: 60,
  });
  const posterUrl = getImageKitUrl(posterSrc, {
    width: 1920,
    quality: 75,
  });

  return (
    <div className="absolute inset-0 bg-[#0B0F0E]" data-immersion-hero-media>
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: posterPosition }}
      />

      {shouldReduceMotion === false ? (
        <video
          aria-hidden="true"
          autoPlay
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          data-immersion-hero-video
          disablePictureInPicture
          loop
          muted
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
          playsInline
          poster={posterUrl}
          preload="metadata"
          tabIndex={-1}
        >
          <source media="(max-width: 767px)" src={mobileVideoSrc} />
          <source src={desktopVideoSrc} />
        </video>
      ) : null}

      <div
        aria-hidden="true"
        data-immersion-hero-overlay="horizontal"
        className="absolute inset-0 bg-gradient-to-r from-[#07191d]/78 via-[#07191d]/48 to-[#07191d]/22"
      />
      <div
        aria-hidden="true"
        data-immersion-hero-overlay="vertical"
        className="absolute inset-0 bg-gradient-to-t from-[#07191d]/48 via-transparent to-[#07191d]/20"
      />
    </div>
  );
}
