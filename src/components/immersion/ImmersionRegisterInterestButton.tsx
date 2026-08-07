"use client";

import { PublicCta } from "@/components/shared/PublicPagePrimitives";
import { useImmersionInterest } from "@/components/immersion/ImmersionInterestProvider";
import { cn } from "@/lib/utils";

type ImmersionRegisterInterestButtonProps = {
  variant?: "gold" | "teal";
  className?: string;
};

export default function ImmersionRegisterInterestButton({
  variant = "teal",
  className,
}: ImmersionRegisterInterestButtonProps) {
  const { open } = useImmersionInterest();

  return (
    <PublicCta
      type="button"
      variant={variant}
      className={cn("min-h-12 justify-center", className)}
      onClick={(event) => open(event.currentTarget)}
      data-immersion-register-interest
    >
      Register Interest
    </PublicCta>
  );
}
