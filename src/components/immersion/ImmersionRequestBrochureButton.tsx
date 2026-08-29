import IntakeFormLauncher from "@/components/intake/IntakeFormLauncher";
import { cn } from "@/lib/utils";

export default function ImmersionRequestBrochureButton({
  variant = "outline",
  className,
}: {
  variant?: "outline" | "outline-light" | "teal" | "gold";
  className?: string;
}) {
  return (
    <IntakeFormLauncher
      formKey="immersion"
      intent="request_brochure"
      variant={variant}
      className={cn("min-h-12 justify-center", className)}
    >
      Request Brochure
    </IntakeFormLauncher>
  );
}
