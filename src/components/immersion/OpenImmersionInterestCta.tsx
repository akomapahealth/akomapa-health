"use client";

import type { ReactNode } from "react";
import { useIntakeDialog } from "@/components/intake/IntakeDialogProvider";
import {
  EditorialArrow,
  type EditorialButtonVariant,
} from "@/components/shared/EditorialPrimitives";
import { cn } from "@/lib/utils";

const buttonVariantClasses: Record<EditorialButtonVariant, string> = {
  solid: "bg-[#0097b2] text-[#FCFAEF] hover:bg-[#eeba2b] hover:text-[#1C1F1E]",
  amber: "bg-[#eeba2b] text-[#1C1F1E] hover:bg-[#1C1F1E] hover:text-[#FCFAEF]",
  outline:
    "border border-[#1C1F1E]/20 text-[#1C1F1E] hover:border-[#0097b2] hover:text-[#0097b2] dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]",
  light: "bg-[#FCFAEF] text-[#0097b2] hover:bg-[#eeba2b] hover:text-[#1C1F1E]",
  "outline-light":
    "border border-[#FCFAEF]/60 text-[#FCFAEF] hover:bg-[#FCFAEF] hover:text-[#0097b2]",
};

type OpenImmersionInterestCtaProps = {
  children: ReactNode;
  variant?: EditorialButtonVariant;
  icon?: boolean;
  className?: string;
  /** Compact text-link style used in pathway/opportunity cards. */
  appearance?: "button" | "text-link";
};

/**
 * Opens the shared program-interest intake dialog.
 * Use this for closed Google Form CTAs that ask students to join or register interest.
 */
export default function OpenImmersionInterestCta({
  children,
  variant = "amber",
  icon = true,
  className,
  appearance = "button",
}: OpenImmersionInterestCtaProps) {
  const { openIntake } = useIntakeDialog();
  const open = (trigger: HTMLElement) =>
    openIntake(
      {
        formType: "program_interest",
        programId: "global-health-immersion-program",
        contextId: "immersion",
      },
      trigger,
    );

  if (appearance === "text-link") {
    return (
      <button
        type="button"
        onClick={(event) => open(event.currentTarget)}
        className={cn(
          "group inline-flex min-h-11 items-center font-subheading text-sm font-bold uppercase tracking-[0.14em] text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]",
          className,
        )}
      >
        {children}
        <EditorialArrow className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={(event) => open(event.currentTarget)}
      className={cn(
        "group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 md:text-base",
        buttonVariantClasses[variant],
        className,
      )}
    >
      {children}
      {icon ? (
        <EditorialArrow className="transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </button>
  );
}
