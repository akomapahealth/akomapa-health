import Image from "@/components/common/Image";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0]?.[0] ?? "";
  const second = words.length > 1 ? (words[words.length - 1]?.[0] ?? "") : "";
  return (first + second).toUpperCase();
}

type HubPortraitProps = {
  name?: string;
  image?: string;
  alt: string;
  /** Fallback mark when no name is available, e.g. hub monogram "UG". */
  monogram?: string;
  sizes?: string;
  objectPosition?: string;
  className?: string;
  imageClassName?: string;
};

/**
 * Shared hub portrait surface. Renders a real photo when provided; otherwise a
 * reserved, brand-tinted initials/monogram surface so missing portraits never
 * produce broken image requests or layout shift.
 */
export default function HubPortrait({
  name,
  image,
  alt,
  monogram = "AH",
  sizes = "(min-width: 1280px) 378px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  objectPosition = "center top",
  className,
  imageClassName,
}: HubPortraitProps) {
  const hasImage = Boolean(image?.trim());

  if (hasImage && image) {
    return (
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden rounded-md bg-[#E6E7E7] dark:bg-[#2F3332]",
          className,
        )}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          className={cn(
            "object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:group-hover:scale-100 motion-reduce:transition-none",
            imageClassName,
          )}
          style={{ objectPosition }}
        />
      </div>
    );
  }

  const label = name?.trim() ? getInitials(name) : monogram;
  const accessibleLabel = name?.trim()
    ? `Portrait pending for ${name}`
    : alt;

  return (
    <div
      role="img"
      aria-label={accessibleLabel}
      data-hub-portrait-fallback
      className={cn(
        "relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-md",
        "bg-[color-mix(in_srgb,var(--hub-people-accent,#0097b2)_14%,#E6E7E7)]",
        "dark:bg-[color-mix(in_srgb,var(--hub-people-accent,#0097b2)_22%,#2F3332)]",
        "ring-1 ring-inset ring-[color-mix(in_srgb,var(--hub-people-accent,#0097b2)_35%,transparent)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="font-heading text-3xl font-semibold tracking-wide text-[color-mix(in_srgb,var(--hub-people-accent,#0097b2)_72%,#1C1F1E)] dark:text-[color-mix(in_srgb,var(--hub-people-accent,#F5C94D)_55%,#FCFAEF)] sm:text-4xl"
      >
        {label}
      </span>
    </div>
  );
}
