"use client";

import NextImage from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { partnerCategoryMeta } from "@/data/partnerships";
import type { Partner } from "@/lib/types";

interface PartnerCategorySectionProps {
  category: Partner["category"];
  partners: Partner[];
  index: number;
}

function PartnerCard({
  partner,
  onGradient,
}: {
  partner: Partner;
  onGradient: boolean;
}) {
  const cardClass = onGradient
    ? "flex h-full flex-col rounded-2xl border border-white/20 bg-[#0B2F3A]/60 p-5 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-6"
    : "flex h-full flex-col rounded-2xl border border-[#E6E7E7]/80 bg-white/95 p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95 sm:p-6";

  const nameClass = onGradient
    ? "text-base font-semibold text-[#FCFAEF] lg:text-lg"
    : "text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] lg:text-lg";

  const countryClass = onGradient
    ? "mt-2 flex items-center gap-1.5 text-xs font-medium text-[#F5C94D]"
    : "mt-2 flex items-center gap-1.5 text-xs font-medium text-[#0097b2] dark:text-[#66C4DC]";

  const descClass = onGradient
    ? "mt-3 flex-1 text-sm leading-relaxed text-[#FCFAEF]/75"
    : "mt-3 flex-1 text-sm leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/70";

  const linkClass = onGradient
    ? "mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#F5C94D] transition-colors hover:text-[#F5C94D]/70"
    : "mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0097b2] transition-colors hover:text-[#0097b2]/70 dark:text-[#66C4DC] dark:hover:text-[#66C4DC]/70";

  return (
    <div className={cardClass}>
      {/* Logo */}
      <div className="mb-4 flex h-20 items-center justify-center rounded-xl bg-white p-3 dark:bg-white">
        <div className="relative h-14 w-full">
          <NextImage
            src={partner.logo}
            alt={`${partner.name} logo`}
            fill
            sizes="200px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Name */}
      <h3 className={nameClass}>{partner.name}</h3>

      {/* Country badge */}
      <div className={countryClass}>
        <MapPin className="h-3 w-3" />
        {partner.country}
      </div>

      {/* Description */}
      <p className={descClass}>{partner.description}</p>

      {/* Website link */}
      {partner.website && (
        <Link
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Visit Website
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

function SinglePartnerLayout({
  partner,
  onGradient,
}: {
  partner: Partner;
  onGradient: boolean;
}) {
  const cardClass = onGradient
    ? "mx-auto max-w-4xl rounded-2xl border border-white/20 bg-[#0B2F3A]/60 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-500 hover:shadow-xl"
    : "mx-auto max-w-4xl rounded-2xl border border-[#E6E7E7]/80 bg-white/95 shadow-sm transition-all duration-500 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95";

  const nameClass = onGradient
    ? "text-lg font-semibold text-[#FCFAEF] sm:text-xl"
    : "text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-xl";

  const countryClass = onGradient
    ? "mt-2 flex items-center gap-1.5 text-xs font-medium text-[#F5C94D]"
    : "mt-2 flex items-center gap-1.5 text-xs font-medium text-[#0097b2] dark:text-[#66C4DC]";

  const descClass = onGradient
    ? "mt-3 text-sm leading-relaxed text-[#FCFAEF]/75 sm:text-base"
    : "mt-3 text-sm leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/70 sm:text-base";

  const linkClass = onGradient
    ? "mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#F5C94D] transition-colors hover:text-[#F5C94D]/70"
    : "mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0097b2] transition-colors hover:text-[#0097b2]/70 dark:text-[#66C4DC] dark:hover:text-[#66C4DC]/70";

  return (
    <FadeIn direction="up">
      <div className={cardClass}>
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-10 sm:p-8">
          {/* Logo */}
          <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-white p-4 dark:bg-white sm:h-32 sm:w-48">
            <div className="relative h-20 w-full sm:h-24">
              <NextImage
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                sizes="200px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className={nameClass}>{partner.name}</h3>
            <div className={countryClass}>
              <MapPin className="h-3 w-3" />
              {partner.country}
            </div>
            <p className={descClass}>{partner.description}</p>
            {partner.website && (
              <Link
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Visit Website
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

export default function PartnerCategorySection({
  category,
  partners,
  index,
}: PartnerCategorySectionProps) {
  const meta = partnerCategoryMeta[category];
  const isMultiPartner = partners.length > 1;

  // Alternate: even index = teal gradient, odd index = cream
  const isTealGradient = index % 2 === 0;

  const sectionClass = isTealGradient
    ? "relative scroll-mt-20 overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 text-[#FCFAEF] md:py-24"
    : "scroll-mt-20 bg-[#FCFAEF] py-16 dark:bg-[#1C1F1E] md:py-24";

  const eyebrowClass = isTealGradient
    ? "text-xs font-semibold uppercase tracking-[0.3em] text-[#F5C94D] sm:text-sm"
    : "text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm";

  const headingClass = isTealGradient
    ? "text-2xl font-bold text-[#FCFAEF] sm:text-3xl md:text-4xl"
    : "text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl";

  const descriptionClass = isTealGradient
    ? "text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg"
    : "text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg";

  return (
    <section
      id={`partners-${category}`}
      className={sectionClass}
      aria-labelledby={`partners-${category}-heading`}
    >
      {/* Decorative blurs for teal gradient sections */}
      {isTealGradient && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
      )}

      <div className={`container mx-auto px-4 sm:px-6 ${isTealGradient ? "relative z-10" : ""}`}>
        {/* Section header */}
        <FadeIn
          direction="up"
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16"
        >
          <p className={eyebrowClass}>{meta.eyebrow}</p>
          <h2
            id={`partners-${category}-heading`}
            className={headingClass}
          >
            {meta.heading}
          </h2>
          <p className={descriptionClass}>{meta.description}</p>
        </FadeIn>

        {/* Partners */}
        {isMultiPartner ? (
          <FadeInStagger
            className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {partners.map((partner) => (
              <FadeInStaggerItem key={partner.id} direction="up">
                <PartnerCard partner={partner} onGradient={isTealGradient} />
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        ) : (
          partners.map((partner) => (
            <SinglePartnerLayout
              key={partner.id}
              partner={partner}
              onGradient={isTealGradient}
            />
          ))
        )}
      </div>
    </section>
  );
}
