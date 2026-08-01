"use client";

import NextImage from "next/image";
import Link from "next/link";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { allPartnerLogos } from "@/data/partnerships";

export default function PartnerLogosGrid() {
  return (
    <EditorialBand
      tone="white"
      marker="06"
      aria-labelledby="partner-logos-heading"
    >
      <FadeIn className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16">
        <EditorialEyebrow>Our Network</EditorialEyebrow>
        <EditorialHeading id="partner-logos-heading">
          Partners &amp; Collaborators
        </EditorialHeading>
        <EditorialLead className="mx-auto max-w-2xl">
          A growing network of institutions, organizations, and communities
          committed to advancing global health equity together.
        </EditorialLead>
      </FadeIn>

      <FadeInStagger
        className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        staggerDelay={0.05}
      >
        {allPartnerLogos.map((partner) => {
          const inner = (
            <div className="flex h-24 items-center justify-center border border-[#1C1F1E]/10 bg-white p-4 transition-colors hover:border-[#0097b2]/40 dark:border-[#FCFAEF]/15 dark:bg-white sm:h-28">
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
                  className="block min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2"
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
    </EditorialBand>
  );
}
