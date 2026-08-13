"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
  GraduationCap,
  Handshake,
  Heart,
  Stethoscope,
  User,
  type LucideIcon,
} from "lucide-react";
import OpenImmersionInterestCta from "@/components/immersion/OpenImmersionInterestCta";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  User,
  GraduationCap,
  Stethoscope,
  FlaskConical,
  Handshake,
  Heart,
};

export interface PathwayCardProps {
  icon: string;
  title: string;
  description: string;
  audience: string;
  ctaLabel: string;
  ctaHref?: string;
  external?: boolean;
  opensImmersionInterest?: boolean;
  accent: string;
  featured?: boolean;
}

export default function PathwayCard({
  icon,
  title,
  description,
  audience,
  ctaLabel,
  ctaHref,
  external = false,
  opensImmersionInterest = false,
  featured = false,
}: PathwayCardProps) {
  const Icon = iconMap[icon];

  const ctaClassName =
    "mt-6 inline-flex min-h-11 items-center font-subheading text-sm font-bold uppercase tracking-[0.14em] text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col border-t-2 pt-6",
        featured
          ? "border-[#eeba2b] md:col-span-1"
          : "border-[#0097b2]/40 dark:border-[#66C4DC]/40",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-[#0097b2]/30 text-[#0097b2] dark:border-[#66C4DC]/35 dark:text-[#66C4DC]"
        >
          {Icon ? <Icon className="h-5 w-5" /> : null}
        </span>
        {featured ? (
          <span className="inline-flex min-h-8 items-center border border-[#eeba2b]/50 px-3 py-1 font-subheading text-[11px] font-bold uppercase tracking-[0.14em] text-[#C9920F] dark:text-[#F5C94D]">
            Primary pathway
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/75">
        {description}
      </p>

      <p className="mt-4 border-l-2 border-[#1C1F1E]/15 pl-3 text-sm leading-relaxed text-[#2F3332]/70 dark:border-[#FCFAEF]/20 dark:text-[#E6E7E7]/65">
        <span className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
          For:
        </span>{" "}
        {audience}
      </p>

      <div className="mt-auto">
        {opensImmersionInterest ? (
          <OpenImmersionInterestCta
            appearance="text-link"
            className="mt-6"
          >
            {ctaLabel}
          </OpenImmersionInterestCta>
        ) : external && ctaHref ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClassName}
          >
            {ctaLabel}
            <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </a>
        ) : ctaHref ? (
          <Link href={ctaHref} className={ctaClassName}>
            {ctaLabel}
            <ArrowRight
              className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
