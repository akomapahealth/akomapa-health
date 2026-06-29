"use client";

import { useEffect, type CSSProperties } from "react";
import NextImage from "next/image";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import {
  HomeArrowLink,
  HomeBand,
  HomeEyebrow,
  HomeHeading,
} from "@/components/home/_home-ui";

const partners = [
  { name: "University of Cape Coast", logo: "/images/partners/ucc.png" },
  { name: "University of Ghana", logo: "/images/partners/ug-logo.png" },
  { name: "Yale School of Medicine", logo: "/images/partners/yale-sm-logo.png" },
  { name: "David Geffen School of Medicine at UCLA", logo: "/images/partners/ucla.png" },
  { name: "Ghana Health Service", logo: "/images/partners/ghana-health-service-logo.png" },
  { name: "African Impact Initiative", logo: "/images/partners/AII-logo-bg.png" },
  { name: "Yale African Innovation Symposium", logo: "/images/partners/yale-african-innovation.webp" },
  { name: "Africa Health Collaborative", logo: "/images/partners/africa-health-collab.png" },
  { name: "Tsai Center for Innovative Thinking", logo: "/images/partners/tsai-city-logo.png" },
  { name: "Mastercard Foundation", logo: "/images/partners/mastercard-foundation.png" },
];

// Duplicated for a seamless looping marquee.
const marquee = [...partners, ...partners];

// Fallback edge-fade colors (used only when CSS masks are unsupported) match
// the cream band so the carousel blends into the section.
const carouselFadeVars = {
  "--partner-carousel-left-rgb": "252 250 239",
  "--partner-carousel-right-rgb": "252 250 239",
} as CSSProperties;

export default function PartnersSection() {
  const headingId = "partners-heading";
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set({ x: "0%" });
      return;
    }

    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: { repeat: Infinity, repeatType: "loop", duration: 32, ease: "linear" },
      },
    });
  }, [controls, shouldReduceMotion]);

  return (
    <HomeBand tone="cream" aria-labelledby={headingId}>
      <div className="mx-auto max-w-2xl text-center">
        <HomeEyebrow className="inline-block">
          Our Partners &amp; Collaborators
        </HomeEyebrow>
        <HomeHeading id={headingId} className="mt-4">
          Designed with evidence. Driven by collaboration.
        </HomeHeading>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
          We build with communities, universities, ministries of health, and
          partners committed to accessible noncommunicable disease care.
        </p>
      </div>

      <div
        data-testid="partner-logos"
        className="partner-carousel-fade mt-12 w-full"
        style={carouselFadeVars}
      >
        <motion.ul
          className="flex w-max items-center gap-5"
          animate={controls}
          aria-label="Partner and collaborator logos"
        >
          {marquee.map((partner, index) => (
            <li key={`${partner.name}-${index}`} className="shrink-0">
              <div className="flex h-24 w-44 items-center justify-center rounded-xl border border-[#E6E7E7] bg-white p-5 dark:border-[#2F3332]">
                <div className="relative h-full w-full opacity-90 transition-opacity duration-300 hover:opacity-100">
                  <NextImage
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="176px"
                    className="object-contain object-center"
                  />
                </div>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="mt-10 text-center">
        <HomeArrowLink href="/partnerships" className="justify-center">
          See all partners
        </HomeArrowLink>
      </div>
    </HomeBand>
  );
}
