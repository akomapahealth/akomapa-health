"use client";

import { useEffect, type CSSProperties } from "react";
import NextImage from "next/image";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { HomeButton, HomeEyebrow, HomeHeading } from "@/components/home/_home-ui";

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

// Fallback edge-fade colours (used only when CSS masks are unsupported) match
// the dark-teal band so the carousel blends into the section.
const carouselFadeVars = {
  "--partner-carousel-left-rgb": "15 76 92",
  "--partner-carousel-right-rgb": "15 76 92",
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
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-[#0F4C5C] text-[#FCFAEF]"
    >
      <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <HomeEyebrow tone="gold" className="inline-block">
            Our Research &amp; Academic Partners
          </HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4 text-[#FCFAEF]">
            Designed with evidence. Driven by collaboration.
          </HomeHeading>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#FCFAEF]/80 md:text-lg">
            We work with leading universities, ministries of health, and
            student-run clinics worldwide to generate the evidence that powers
            Akomapa&rsquo;s model.
          </p>
        </div>

        <p className="mt-12 text-center font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#F5C94D]">
          In collaboration with
        </p>

        <div
          data-testid="partner-logos"
          className="partner-carousel-fade mt-8 w-full"
          style={carouselFadeVars}
        >
          <motion.ul
            className="flex w-max items-center gap-5"
            animate={controls}
            aria-label="Partner and collaborator logos"
          >
            {marquee.map((partner, index) => (
              <li key={`${partner.name}-${index}`} className="shrink-0">
                <div className="flex h-24 w-44 items-center justify-center rounded-xl bg-white p-5 shadow-sm">
                  <div className="relative h-full w-full">
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

        <div className="mt-12 text-center">
          <HomeButton href="/research" variant="light">
            Explore our science
          </HomeButton>
        </div>
      </div>
    </section>
  );
}
