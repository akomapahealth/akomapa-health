import IntakeFormLauncher from "@/components/intake/IntakeFormLauncher";
import { cn } from "@/lib/utils";

type ImmersionRegisterInterestButtonProps = {
  variant?: "gold" | "teal";
  className?: string;
};

export default function ImmersionRegisterInterestButton({
  variant = "teal",
  className,
}: ImmersionRegisterInterestButtonProps) {
  return (
    <IntakeFormLauncher
      formKey="immersion"
      intent="register_interest"
      variant={variant}
      className={cn("min-h-12 justify-center", className)}
    >
      Register Interest
    </IntakeFormLauncher>
  );
}
