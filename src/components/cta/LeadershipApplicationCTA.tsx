"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  leadershipApplicationCtaTitle,
  leadershipApplicationCtaShortDescription,
  leadershipApplicationCtaDescription,
  leadershipApplicationCtaButtonLabel,
} from "@/content/leadershipApplication";

const primaryButtonClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]";

const outlineBlueButtonClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-2 border-[#0097b2] bg-transparent text-[#0097b2] shadow-none hover:bg-[#0097b2]/10 hover:shadow-lg focus-visible:ring-[#8DD4E6] dark:text-[#8DD4E6] dark:hover:bg-[#0097b2]/20";

const outlineGoldButtonClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-2 border-[#eeba2b] bg-transparent text-[#eeba2b] shadow-none hover:bg-[#eeba2b]/10 hover:shadow-lg focus-visible:ring-[#F5C94D] dark:text-[#F5C94D] dark:hover:bg-[#eeba2b]/20";

export type SecondaryButton = { label: string; href: string };

type LeadershipApplicationCTAProps = {
  title?: string;
  shortDescription?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryHref: string;
  openInNewTab?: boolean;
  secondaryButtons?: SecondaryButton[];
};

export default function LeadershipApplicationCTA({
  title = leadershipApplicationCtaTitle,
  shortDescription = leadershipApplicationCtaShortDescription,
  description = leadershipApplicationCtaDescription,
  primaryButtonLabel = leadershipApplicationCtaButtonLabel,
  primaryHref,
  openInNewTab = false,
  secondaryButtons = [],
}: LeadershipApplicationCTAProps) {
  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
            {title}
          </h2>
          <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
            {shortDescription}
          </p>
          {description ? (
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              {description}
            </p>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {openInNewTab ? (
              <Button asChild className={primaryButtonClass}>
                <a
                  href={primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${primaryButtonLabel} – opens in new tab`}
                  className="whitespace-nowrap"
                >
                  {primaryButtonLabel}
                </a>
              </Button>
            ) : (
              <Button asChild className={primaryButtonClass}>
                <Link href={primaryHref} className="whitespace-nowrap">
                  {primaryButtonLabel}
                </Link>
              </Button>
            )}
            {secondaryButtons.map((btn, i) => (
              <Button
                asChild
                key={btn.href + i}
                className={
                  i % 2 === 0 ? outlineBlueButtonClass : outlineGoldButtonClass
                }
              >
                <Link href={btn.href} className="whitespace-nowrap">
                  {btn.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
