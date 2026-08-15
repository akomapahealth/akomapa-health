"use client";

import { PublicCta } from "@/components/shared/PublicPagePrimitives";
import { useIntakeDialog } from "@/components/intake/IntakeDialogProvider";
import { cn } from "@/lib/utils";

type ImmersionRegisterInterestButtonProps = {
  variant?: "gold" | "teal";
  className?: string;
};

export default function ImmersionRegisterInterestButton({
  variant = "teal",
  className,
}: ImmersionRegisterInterestButtonProps) {
  const { openIntake } = useIntakeDialog();

  return (
    <PublicCta
      type="button"
      variant={variant}
      className={cn("min-h-12 justify-center", className)}
      onClick={(event) =>
        openIntake(
          {
            formType: "program_interest",
            programId: "global-health-immersion-program",
            contextId: "immersion",
          },
          event.currentTarget,
        )
      }
      data-immersion-register-interest
    >
      Register Interest
    </PublicCta>
  );
}
