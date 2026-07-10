import Link from "next/link";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Homepage-local design primitives for the flat, editorial redesign.
 *
 * These are intentionally separate from the shared `PublicPagePrimitives` so the
 * homepage can drop gradients and icon-library dependencies without affecting
 * the rest of the site. The only iconography here is hand-authored inline SVG —
 * no icon libraries, no generated assets.
 */

// ---------------------------------------------------------------------------
// Inline icons (single hand-authored path each)
// ---------------------------------------------------------------------------

export function InlineArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function InlineChevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function InlinePlay({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
    >
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Section band
// ---------------------------------------------------------------------------

export type HomeBandTone = "cream" | "white" | "teal" | "onyx";

const bandToneClasses: Record<HomeBandTone, string> = {
  cream: "bg-[#FCFAEF] text-[#1C1F1E] dark:bg-[#121514] dark:text-[#FCFAEF]",
  white: "bg-white text-[#1C1F1E] dark:bg-[#1C1F1E] dark:text-[#FCFAEF]",
  teal: "bg-[#0097b2] text-[#FCFAEF]",
  onyx: "bg-[#121514] text-[#FCFAEF]",
};

const markerToneClasses: Record<HomeBandTone, string> = {
  cream: "text-[#0097b2]/55 ring-[#0097b2]/20",
  white: "text-[#0097b2]/55 ring-[#0097b2]/20",
  teal: "text-[#FCFAEF]/70 ring-[#FCFAEF]/30",
  onyx: "text-[#FCFAEF]/60 ring-[#FCFAEF]/25",
};

type HomeBandProps = ComponentPropsWithoutRef<"section"> & {
  tone?: HomeBandTone;
  /** Two-digit editorial marker shown top-right, e.g. "01". */
  marker?: string;
  containerClassName?: string;
};

export function HomeBand({
  tone = "cream",
  marker,
  className,
  containerClassName,
  children,
  ...props
}: HomeBandProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        bandToneClasses[tone],
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "site-container relative mx-auto px-4 py-16 md:py-20 lg:py-24",
          containerClassName,
        )}
      >
        {marker ? (
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute right-4 top-6 hidden select-none rounded px-2 py-1 font-subheading text-xs font-bold tracking-[0.2em] ring-1 md:inline-block",
              markerToneClasses[tone],
            )}
          >
            {marker}
          </span>
        ) : null}
        {children}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

type EyebrowTone = "teal" | "gold" | "light";

const eyebrowToneClasses: Record<EyebrowTone, string> = {
  teal: "text-[#0097b2] dark:text-[#66C4DC]",
  gold: "text-[#C9920F] dark:text-[#F5C94D]",
  light: "text-[#FCFAEF]/75",
};

export function HomeEyebrow({
  children,
  tone = "teal",
  className,
}: {
  children: ReactNode;
  tone?: EyebrowTone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-subheading text-xs font-bold uppercase tracking-[0.2em]",
        eyebrowToneClasses[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}

export function HomeHeading({
  as: Tag = "h2",
  children,
  className,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-heading text-[1.65rem] font-semibold leading-[1.14] tracking-tight md:text-[2.1rem] lg:text-[2.4rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function HomeLead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-base font-normal leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg",
        className,
      )}
    >
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Links & buttons (flat fills, inline arrow)
// ---------------------------------------------------------------------------

type ArrowLinkTone = "teal" | "light" | "dark";

const arrowLinkToneClasses: Record<ArrowLinkTone, string> = {
  teal: "text-[#0097b2] hover:text-[#0F4C5C] dark:text-[#66C4DC] dark:hover:text-[#F5C94D]",
  light: "text-[#FCFAEF] hover:text-[#eeba2b]",
  dark: "text-[#1C1F1E] hover:text-[#0097b2] dark:text-[#FCFAEF] dark:hover:text-[#66C4DC]",
};

export function HomeArrowLink({
  href,
  children,
  tone = "teal",
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  tone?: ArrowLinkTone;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex w-fit items-center gap-2 text-sm font-semibold transition-colors",
        arrowLinkToneClasses[tone],
        className,
      )}
    >
      {children}
      <InlineArrow className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

type ButtonVariant = "solid" | "amber" | "outline" | "light" | "outline-light";

const buttonVariantClasses: Record<ButtonVariant, string> = {
  solid: "bg-[#0097b2] text-[#FCFAEF] hover:bg-[#eeba2b] hover:text-[#1C1F1E]",
  amber: "bg-[#eeba2b] text-[#1C1F1E] hover:bg-[#1C1F1E] hover:text-[#FCFAEF]",
  outline:
    "border border-[#1C1F1E]/20 text-[#1C1F1E] hover:border-[#0097b2] hover:text-[#0097b2] dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]",
  light: "bg-[#FCFAEF] text-[#0097b2] hover:bg-[#eeba2b] hover:text-[#1C1F1E]",
  "outline-light":
    "border border-[#FCFAEF]/60 text-[#FCFAEF] hover:bg-[#FCFAEF] hover:text-[#0097b2]",
};

type HomeButtonProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  icon?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

export function HomeButton({
  children,
  href,
  variant = "solid",
  icon = true,
  external = false,
  className,
  onClick,
}: HomeButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 md:text-base",
    buttonVariantClasses[variant],
    className,
  );

  const content = (
    <>
      {children}
      {icon ? (
        <InlineArrow className="transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}
