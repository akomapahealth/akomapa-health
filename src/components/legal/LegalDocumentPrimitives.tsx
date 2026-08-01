import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared long-form prose helpers for Privacy and Terms.
 * Visual-only: approved legal copy stays inline in each route Content file.
 */

export const legalBodyClassName =
  "text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed break-words";

export const legalHeadingClassName =
  "font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]";

export const legalSubheadingClassName =
  "text-lg sm:text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]";

export const legalListClassName = cn(
  legalBodyClassName,
  "list-disc list-outside space-y-2 pl-6 sm:pl-7 [&_strong]:text-[#1C1F1E] dark:[&_strong]:text-[#FCFAEF]",
);

export const legalLinkClassName =
  "font-medium text-[#0097b2] underline-offset-2 transition-colors hover:text-[#eeba2b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]";

export const legalSectionClassName =
  "space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40 first:border-t-0 first:pt-0";

export type LegalSectionRuleVariant = "teal" | "amber";

export function LegalSectionRule({
  variant,
  className,
}: {
  variant: LegalSectionRuleVariant;
  className?: string;
}) {
  const bg = variant === "teal" ? "bg-[#0097b2]" : "bg-[#eeba2b]";

  return (
    <div
      data-legal-section-rule
      data-legal-section-rule-variant={variant}
      className={cn("mb-4 flex items-center gap-2", className)}
      aria-hidden="true"
    >
      <div className={cn("h-1 w-8 rounded-full", bg)} />
      <div className={cn("h-1 w-1 rounded-full", bg)} />
    </div>
  );
}

export function LegalLastUpdated({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  return (
    <div
      data-legal-last-updated
      className={cn(
        "border-t border-[#E6E7E7] pt-6 dark:border-[#4F5554]",
        className,
      )}
    >
      <p className="text-sm text-[#2F3332]/80 sm:text-base dark:text-[#E6E7E7]/80">
        Last updated: {date}
      </p>
    </div>
  );
}

export function LegalProseArticle({
  children,
  labelledBy,
  className,
}: {
  children: ReactNode;
  labelledBy: string;
  className?: string;
}) {
  return (
    <article
      data-legal-prose-article
      aria-labelledby={labelledBy}
      className={cn("space-y-8 sm:space-y-10", className)}
    >
      {children}
    </article>
  );
}
