import { cn } from "@/lib/utils";

/**
 * Shared chrome for the cookie banner and settings dialog.
 *
 * Accept and reject share one class so neither choice is visually favoured
 * (refusing must be as easy and prominent as accepting). Deep teal on cream
 * and light teal on onyx both clear WCAG AA contrast for small bold text.
 */
export const consentChoiceButtonClassName = cn(
  "inline-flex min-h-12 w-full items-center justify-center rounded-md px-5 py-3 text-center font-subheading text-sm font-semibold leading-snug",
  "bg-[#0F4C5C] text-[#FCFAEF] transition-[background-color,color,transform] duration-200 ease-out",
  "hover:-translate-y-px hover:bg-[#eeba2b] hover:text-[#1C1F1E] active:translate-y-0",
  "motion-reduce:transition-colors motion-reduce:hover:translate-y-0",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF]",
  "dark:bg-[#66C4DC] dark:text-[#121514] dark:hover:bg-[#F5C94D] dark:hover:text-[#121514] dark:focus-visible:ring-[#F5C94D] dark:focus-visible:ring-offset-[#1C1F1E]",
);

export const consentTextButtonClassName = cn(
  "inline-flex min-h-11 items-center rounded-sm font-subheading text-sm font-semibold text-[#0F4C5C] underline decoration-[#0097b2]/40 underline-offset-4 transition-colors",
  "hover:text-[#0097b2] hover:decoration-[#0097b2]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF]",
  "dark:text-[#66C4DC] dark:decoration-[#66C4DC]/40 dark:hover:text-[#F5C94D] dark:hover:decoration-[#F5C94D] dark:focus-visible:ring-[#F5C94D] dark:focus-visible:ring-offset-[#1C1F1E]",
);

export const consentEyebrowClassName =
  "font-subheading text-xs font-bold uppercase tracking-[0.14em] text-[#0F4C5C] dark:text-[#66C4DC]";

export const consentBodyClassName =
  "font-body text-sm leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]";

export const consentSurfaceClassName = cn(
  "relative border border-[#0F4C5C]/15 bg-[#FCFAEF] text-[#1C1F1E] shadow-[0_-8px_32px_rgba(28,31,30,0.12)]",
  "dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.45)]",
);
