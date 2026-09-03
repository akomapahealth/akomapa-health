import {
  EditorialButton,
  type EditorialButtonVariant,
} from "@/components/shared/EditorialPrimitives";
import {
  IMMERSION_APPLICATION_FORM_URL,
  IMMERSION_INFO_SESSION_FORM_URL,
} from "@/config/links";
import { cn } from "@/lib/utils";

const destinations = {
  application: {
    href: IMMERSION_APPLICATION_FORM_URL,
    label: "Apply Now",
  },
  "info-session": {
    href: IMMERSION_INFO_SESSION_FORM_URL,
    label: "RSVP for the Info Session",
  },
} as const;

export default function ImmersionGoogleFormButton({
  form,
  variant = "solid",
  className,
}: {
  form: keyof typeof destinations;
  variant?: EditorialButtonVariant;
  className?: string;
}) {
  const destination = destinations[form];

  return (
    <span data-immersion-google-form={form} className="contents">
      <EditorialButton
        href={destination.href}
        external
        variant={variant}
        className={cn("min-h-12 justify-center", className)}
      >
        {destination.label}
      </EditorialButton>
    </span>
  );
}
