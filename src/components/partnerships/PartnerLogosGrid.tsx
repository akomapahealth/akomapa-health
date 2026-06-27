"use client";

import NextImage from "next/image";
import Link from "next/link";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { allPartnerLogos } from "@/data/partnerships";

export default function PartnerLogosGrid() {
  return (
    <section
      className="bg-[#FCFAEF] py-16 dark:bg-[#121514] md:py-24"
      aria-labelledby="partner-logos-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <FadeIn
          direction="up"
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            Our Network
          </p>
          <h2
            id="partner-logos-heading"
            className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl"
          >
            Partners &amp; Collaborators
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            A growing network of institutions, organizations, and communities
            committed to advancing global health equity together.
          </p>
        </FadeIn>

        {/* Logo grid */}
        <FadeInStagger
          className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          staggerDelay={0.05}
        >
          {allPartnerLogos.map((partner) => {
            const inner = (
              <div className="flex h-24 items-center justify-center rounded-xl border border-[#E6E7E7]/60 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-[#2E3433] dark:bg-white sm:h-28">
                <div className="relative h-14 w-full sm:h-16">
                  <NextImage
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="(min-width: 1024px) 180px, (min-width: 768px) 160px, 140px"
                    className="object-contain"
                  />
                </div>
              </div>
            );

            return (
              <FadeInStaggerItem key={partner.name} direction="up">
                {partner.url ? (
                  <Link
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${partner.name}`}
                    className="block"
                  >
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </FadeInStaggerItem>
            );
          })}
        </FadeInStagger>
      </div>
    </section>
  );
}
