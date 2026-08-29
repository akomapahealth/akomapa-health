"use client";

import type { ReactNode } from "react";
import { useIntakeFormDialog } from "@/components/intake/IntakeFormDialogProvider";
import { PublicCta } from "@/components/shared/PublicPagePrimitives";
import type {
  ImmersionIntent,
  IntakeFormKey,
} from "@/lib/intake/immersion-registry";

export default function IntakeFormLauncher({
  formKey,
  intent,
  children,
  variant = "teal",
  className,
  icon = true,
}: {
  formKey: IntakeFormKey;
  intent: ImmersionIntent;
  children: ReactNode;
  variant?: "teal" | "gold" | "light" | "outline" | "outline-light";
  className?: string;
  icon?: boolean;
}) {
  const { openIntakeForm } = useIntakeFormDialog();

  return (
    <PublicCta
      type="button"
      variant={variant}
      className={className}
      icon={icon}
      onClick={(event) =>
        openIntakeForm({ formKey, intent }, event.currentTarget)
      }
      data-intake-form-key={formKey}
      data-intake-intent={intent}
      data-immersion-register-interest={
        intent === "register_interest" ? "true" : undefined
      }
      data-immersion-request-brochure={
        intent === "request_brochure" ? "true" : undefined
      }
    >
      {children}
    </PublicCta>
  );
}
