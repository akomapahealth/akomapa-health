"use client";

import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, type CSSProperties } from "react";
import Image from "next/image";
import {
  PublicCta,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";

// Partner logos with increased dimensions
const partners = [
  {
    name: "University of Cape Coast",
    logo: "/images/partners/ucc.png", 
    width: 280,  
    height: 140  
  },
  {
    name: "University of Ghana",
    logo: "/images/partners/ug-logo.png",
    width: 280,  
    height: 140  
  },
  {
    name: "Yale School of Medicine",
    logo: "/images/partners/yale-sm-logo.png",
    width: 280,  
    height: 140  
  },
  {
    name: "David Geffen School of Medicine at UCLA",
    logo: "/images/partners/ucla.png",
    width: 280,  
    height: 140  
  },
  {
    name: "Ghana Health Service",
    logo: "/images/partners/ghana-health-service-logo.png",
    width: 280,  
    height: 140  
  },
  {
    name: "African Impact Initiative",
    logo: "/images/partners/AII-logo-bg.png",
    width: 280,  
    height: 140  
  },
  {
    name: "Yale African Innovation Symposium",
    logo: "/images/partners/yale-african-innovation.webp",
    width: 280,  
    height: 140  
  },
  {
    name: "Africa Health Collaborative",
    logo: "/images/partners/africa-health-collab.png",
    width: 280,  
    height: 140  
  },
  {
    name: "Tsai Center for Innovative Thinking",
    logo: "/images/partners/tsai-city-logo.png",
    width: 280,  
    height: 140  
  } 
];

// Duplicate the partners array for seamless infinite scroll
const allPartners = [...partners, ...partners];

const carouselFadeVars = {
  "--partner-carousel-left-rgb": "0 151 178",
  "--partner-carousel-right-rgb": "15 76 92",
} as CSSProperties;

export default function ResearchSection() {
  // Controls for the logo animation
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();

  // Start the animation when component mounts
  useEffect(() => {
    if (shouldReduceMotion) {
      controls.set({ x: "0%" });
      return;
    }

    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    });
  }, [controls, shouldReduceMotion]);

  return (
    <section
      id="research"
      className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] dark:bg-[#1C1F1E] relative overflow-hidden text-[#FCFAEF]"
    >
      <div className="site-container mx-auto px-4">
        <PublicSectionHeader
          eyebrow="Our Research & Academic Partners"
          eyebrowTone="gold"
          title="Designed with Evidence. Driven by Collaboration."
          description="In collaboration with leading universities, health systems, and student-powered clinics worldwide, we generate the research and real-world evidence that powers Akomapa's model."
          className="mb-16"
          titleClassName="text-[#FCFAEF] dark:text-[#FCFAEF] md:text-4xl"
          descriptionClassName="text-[#FCFAEF]/85"
        />

        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-sm text-[#F5C94D]/80 mb-3">
            In collaboration with
          </p>
          <p className="text-[#FCFAEF]/80 text-base md:text-lg max-w-2xl mx-auto">
            These partners power our research agenda, strengthen our clinics, and help us translate evidence into impact.
          </p>
        </div>

        {/* Logo carousel container */}
        <div
          className="partner-carousel-fade my-12 w-full"
          data-testid="partner-logo-carousel"
          style={carouselFadeVars}
        >
          {/* The animated logo container */}
          <motion.div
            className="flex items-center"
            animate={controls}
            style={{ width: "fit-content" }}
          >
            {allPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="group mx-6 sm:mx-10 lg:mx-12 flex-shrink-0 opacity-85 hover:opacity-100 transition-all duration-300"
              >
                {/* Updated logo container with larger dimensions */}
                <div
                  className="relative flex h-[90px] w-[180px] items-center justify-center rounded-xl bg-transparent p-4 dark:bg-transparent sm:h-[110px] sm:w-[220px] sm:p-6 lg:h-[140px] lg:w-[280px]"
                >
                  {/* Image with adjusted dimensions to fit the larger container */}
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 280px"
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <PublicCta href="/research" variant="light">
            Explore Our Science
          </PublicCta>
        </div>
      </div>
    </section>
  );
}
