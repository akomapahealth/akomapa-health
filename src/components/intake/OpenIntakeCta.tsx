"use client";

import type { ReactNode } from "react";
import {
  EditorialArrow,
  type EditorialButtonVariant,
} from "@/components/shared/EditorialPrimitives";
import { useIntakeDialog } from "@/components/intake/IntakeDialogProvider";
import type { PurposeSpecificRequest } from "@/components/intake/PurposeSpecificIntakeForm";
import { cn } from "@/lib/utils";

const variants: Record<EditorialButtonVariant, string> = {
  solid: "bg-[#0097b2] text-[#FCFAEF] hover:bg-[#eeba2b] hover:text-[#1C1F1E]",
  amber: "bg-[#eeba2b] text-[#1C1F1E] hover:bg-[#1C1F1E] hover:text-[#FCFAEF]",
  outline:
    "border border-[#1C1F1E]/20 hover:border-[#0097b2] hover:text-[#0097b2] dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF]",
  light: "bg-[#FCFAEF] text-[#0097b2] hover:bg-[#eeba2b] hover:text-[#1C1F1E]",
  "outline-light":
    "border border-[#FCFAEF]/60 text-[#FCFAEF] hover:bg-[#FCFAEF] hover:text-[#0097b2]",
};

export default function OpenIntakeCta({
  request,
  children,
  variant = "amber",
  appearance = "button",
  className,
}: {
  request: PurposeSpecificRequest;
  children: ReactNode;
  variant?: EditorialButtonVariant;
  appearance?: "button" | "text-link";
  className?: string;
}) {
  const { openIntake } = useIntakeDialog();
  return (
    <button
      type="button"
      onClick={(event) => openIntake(request, event.currentTarget)}
      className={cn(
        appearance === "text-link"
          ? "group inline-flex min-h-11 items-center font-subheading text-sm font-bold uppercase tracking-[0.14em] text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC]"
          : "group inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 md:text-base",
        appearance === "button" && variants[variant],
        className,
      )}
    >
      {children}
      <EditorialArrow className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
