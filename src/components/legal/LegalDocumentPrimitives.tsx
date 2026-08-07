import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared long-form prose helpers for Privacy and Terms.
 * Visual-only: approved legal copy stays inline in each route Content file.
 */

export const legalBodyClassName =
  "text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed break-words";

export const legalHeadingClassName =
  "font-heading text-xl sm:text-2xl md:text-[1.85rem] lg:text-[2.1rem] font-semibold leading-snug tracking-tight text-[#1C1F1E] dark:text-[#FCFAEF]";

export const legalSubheadingClassName =
  "text-lg sm:text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]";

export const legalListClassName = cn(
  legalBodyClassName,
  "list-disc list-outside space-y-2.5 pl-6 sm:pl-7 marker:text-[#0097b2] dark:marker:text-[#66C4DC] [&_strong]:text-[#1C1F1E] dark:[&_strong]:text-[#FCFAEF]",
);

export const legalLinkClassName =
  "font-medium text-[#0097b2] underline-offset-2 transition-colors hover:text-[#eeba2b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]";

export const legalSectionClassName =
  "space-y-5 sm:space-y-6 border-t border-[#E6E7E7]/55 py-8 first:border-t-0 first:pt-2 sm:py-10 dark:border-[#4F5554]/55";

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
      <div className={cn("h-1 w-10 rounded-full", bg)} />
      <div className={cn("h-1 w-1.5 rounded-full", bg)} />
      <div className={cn("h-px flex-1 max-w-16 opacity-40", bg)} />
    </div>
  );
}

export function LegalSection({
  id,
  title,
  ruleVariant,
  children,
  className,
}: {
  id: string;
  title: string;
  ruleVariant: LegalSectionRuleVariant;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      data-legal-section
      aria-labelledby={headingId}
      className={cn(legalSectionClassName, "scroll-mt-28", className)}
    >
      <header className="space-y-3">
        <LegalSectionRule variant={ruleVariant} className="mb-0" />
        <h2 id={headingId} className={legalHeadingClassName}>
          {title}
        </h2>
      </header>
      <div className="space-y-4 sm:space-y-5">{children}</div>
    </section>
  );
}

export type LegalContentsItem = {
  href: `#${string}`;
  label: string;
};

export function LegalContentsNav({
  items,
  className,
}: {
  items: readonly LegalContentsItem[];
  className?: string;
}) {
  return (
    <nav
      data-legal-contents
      aria-label="On this page"
      className={cn(
        "mb-2 border-y border-[#E6E7E7]/60 py-7 dark:border-[#4F5554]/60",
        className,
      )}
    >
      <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
        On this page
      </p>
      <ol className="mt-5 grid list-none gap-x-8 gap-y-1 p-0 sm:grid-cols-2">
        {items.map((item, index) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cn(
                "group inline-flex min-h-11 w-full items-baseline gap-3 py-1 text-sm sm:text-base",
                "text-[#2F3332] transition-colors hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#E6E7E7] dark:hover:text-[#66C4DC]",
              )}
            >
              <span
                className="shrink-0 font-subheading text-xs font-bold tabular-nums tracking-wider text-[#C9920F] dark:text-[#F5C94D]"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-left leading-snug underline-offset-4 group-hover:underline">
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
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
        "mt-2 border-t border-[#E6E7E7] pt-8 dark:border-[#4F5554]",
        className,
      )}
    >
      <p className="font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
        Document status
      </p>
      <p className="mt-2 text-sm text-[#2F3332]/80 sm:text-base dark:text-[#E6E7E7]/80">
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
      className={cn("space-y-0", className)}
    >
      {children}
    </article>
  );
}
