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

const sectionBgs = [
  "bg-[#F4F1E8] dark:bg-[#1C1F1E]",
  "bg-[#FCFAEF] dark:bg-[#121514]",
] as const;

function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E6E7E7]/80 bg-white/95 p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95 sm:p-6">
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
      <h3 className="text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] lg:text-lg">
        {partner.name}
      </h3>

      {/* Country badge */}
      <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#0097b2] dark:text-[#66C4DC]">
        <MapPin className="h-3 w-3" />
        {partner.country}
      </div>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
        {partner.description}
      </p>

      {/* Website link */}
      {partner.website && (
        <Link
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0097b2] transition-colors hover:text-[#0097b2]/70 dark:text-[#66C4DC] dark:hover:text-[#66C4DC]/70"
        >
          Visit Website
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

function SinglePartnerLayout({ partner }: { partner: Partner }) {
  return (
    <FadeIn direction="up">
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#E6E7E7]/80 bg-white/95 shadow-sm transition-all duration-500 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95">
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
            <h3 className="text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-xl">
              {partner.name}
            </h3>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#0097b2] dark:text-[#66C4DC]">
              <MapPin className="h-3 w-3" />
              {partner.country}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/70 sm:text-base">
              {partner.description}
            </p>
            {partner.website && (
              <Link
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#0097b2] transition-colors hover:text-[#0097b2]/70 dark:text-[#66C4DC] dark:hover:text-[#66C4DC]/70"
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
  const bgClass = sectionBgs[index % sectionBgs.length];
  const isMultiPartner = partners.length > 1;

  return (
    <section
      id={`partners-${category}`}
      className={`scroll-mt-20 py-16 md:py-24 ${bgClass}`}
      aria-labelledby={`partners-${category}-heading`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <FadeIn
          direction="up"
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            {meta.eyebrow}
          </p>
          <h2
            id={`partners-${category}-heading`}
            className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl"
          >
            {meta.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            {meta.description}
          </p>
        </FadeIn>

        {/* Partners */}
        {isMultiPartner ? (
          <FadeInStagger
            className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
            staggerDelay={0.1}
          >
            {partners.map((partner) => (
              <FadeInStaggerItem key={partner.id} direction="up">
                <PartnerCard partner={partner} />
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        ) : (
          partners.map((partner) => (
            <SinglePartnerLayout key={partner.id} partner={partner} />
          ))
        )}
      </div>
    </section>
  );
}
