"use client";

import { useEffect, useState } from "react";
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
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mobileVideoSrc = getImageKitUrl(videoSrc, {
    width: 960,
    quality: 60,
  });
  const desktopVideoSrc = getImageKitUrl(videoSrc, {
    width: 1920,
    quality: 60,
  });
  return (
    <div
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
          aria-hidden="true"
          autoPlay
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          data-immersion-hero-video
          disablePictureInPicture
          loop
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
        >
          <source media="(max-width: 767px)" src={mobileVideoSrc} />
          <source src={desktopVideoSrc} />
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
