"use client";

import NextImage from "next/image";
import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
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
import { partnerCategoryMeta } from "@/data/partnerships";
import type { Partner } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PartnerCategorySectionProps {
  category: Partner["category"];
  partners: Partner[];
  index: number;
}

function PartnerCard({
  partner,
  onTeal,
}: {
  partner: Partner;
  onTeal: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col border-t-2 pt-5",
        onTeal
          ? "border-[#eeba2b]"
          : "border-[#0097b2] dark:border-[#66C4DC]",
      )}
    >
      {partner.logo ? (
        <div className="mb-4 flex h-20 items-center justify-center bg-white p-3">
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
      ) : null}

      <h3
        className={cn(
          "text-base font-semibold lg:text-lg",
          onTeal
            ? "text-[#FCFAEF]"
            : "text-[#1C1F1E] dark:text-[#FCFAEF]",
        )}
      >
        {partner.name}
      </h3>

      <div
        className={cn(
          "mt-2 flex items-center gap-1.5 text-xs font-medium",
          onTeal
            ? "text-[#F5C94D]"
            : "text-[#0097b2] dark:text-[#66C4DC]",
        )}
      >
        <MapPin className="h-3 w-3" aria-hidden="true" />
        <span>{partner.country}</span>
      </div>

      <p
        className={cn(
          "mt-3 flex-1 text-sm leading-relaxed",
          onTeal
            ? "text-[#FCFAEF]/80"
            : "text-[#2F3332]/75 dark:text-[#E6E7E7]/75",
        )}
      >
        {partner.description}
      </p>

      {partner.website ? (
        <Link
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
            onTeal
              ? "text-[#F5C94D] hover:text-[#FCFAEF] focus-visible:ring-offset-[#0F4C5C]"
              : "text-[#0097b2] hover:text-[#0F4C5C] dark:text-[#66C4DC] dark:hover:text-[#F5C94D]",
          )}
        >
          Visit Website
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      ) : null}
    </article>
  );
}

function SinglePartnerLayout({
  partner,
  onTeal,
}: {
  partner: Partner;
  onTeal: boolean;
}) {
  return (
    <FadeIn direction="up">
      <article
        className={cn(
          "mx-auto max-w-4xl border-t-2 pt-6",
          onTeal
            ? "border-[#eeba2b]"
            : "border-[#0097b2] dark:border-[#66C4DC]",
        )}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          {partner.logo ? (
            <div className="flex h-28 w-full shrink-0 items-center justify-center bg-white p-4 sm:h-32 sm:w-48">
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
          ) : null}

          <div className="flex-1">
            <h3
              className={cn(
                "text-lg font-semibold sm:text-xl",
                onTeal
                  ? "text-[#FCFAEF]"
                  : "text-[#1C1F1E] dark:text-[#FCFAEF]",
              )}
            >
              {partner.name}
            </h3>
            <div
              className={cn(
                "mt-2 flex items-center gap-1.5 text-xs font-medium",
                onTeal
                  ? "text-[#F5C94D]"
                  : "text-[#0097b2] dark:text-[#66C4DC]",
              )}
            >
              <MapPin className="h-3 w-3" aria-hidden="true" />
              <span>{partner.country}</span>
            </div>
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed sm:text-base",
                onTeal
                  ? "text-[#FCFAEF]/80"
                  : "text-[#2F3332]/75 dark:text-[#E6E7E7]/75",
              )}
            >
              {partner.description}
            </p>
            {partner.website ? (
              <Link
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
                  onTeal
                    ? "text-[#F5C94D] hover:text-[#FCFAEF] focus-visible:ring-offset-[#0F4C5C]"
                    : "text-[#0097b2] hover:text-[#0F4C5C] dark:text-[#66C4DC] dark:hover:text-[#F5C94D]",
                )}
              >
                Visit Website
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </article>
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
  const isTeal = index % 2 === 0;
  const marker = String(index + 2).padStart(2, "0");

  return (
    <EditorialBand
      id={`partners-${category}`}
      tone={isTeal ? "teal" : "cream"}
      marker={marker}
      aria-labelledby={`partners-${category}-heading`}
      className={cn(
        "scroll-mt-20",
        isTeal && "bg-[#0F4C5C]",
      )}
    >
      <FadeIn className="mx-auto mb-12 max-w-3xl space-y-4 text-center md:mb-16">
        <EditorialEyebrow
          tone={isTeal ? "gold" : "teal"}
          className={isTeal ? "text-[#F5C94D]" : undefined}
        >
          {meta.eyebrow}
        </EditorialEyebrow>
        <EditorialHeading
          id={`partners-${category}-heading`}
          className={isTeal ? "text-[#FCFAEF]" : undefined}
        >
          {meta.heading}
        </EditorialHeading>
        <EditorialLead
          className={
            isTeal
              ? "text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85"
              : undefined
          }
        >
          {meta.description}
        </EditorialLead>
      </FadeIn>

      {isMultiPartner ? (
        <FadeInStagger
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4"
          staggerDelay={0.08}
        >
          {partners.map((partner) => (
            <FadeInStaggerItem key={partner.id} direction="up">
              <PartnerCard partner={partner} onTeal={isTeal} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      ) : (
        partners.map((partner) => (
          <SinglePartnerLayout
            key={partner.id}
            partner={partner}
            onTeal={isTeal}
          />
        ))
      )}
    </EditorialBand>
  );
}
