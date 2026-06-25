import Link from "next/link";
import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

type PublicSectionTone = "cream" | "dark" | "teal" | "white";
type PublicSectionSpacing = "compact" | "normal" | "spacious";

const sectionToneClasses: Record<PublicSectionTone, string> = {
  cream: "bg-[#FCFAEF] text-[#1C1F1E] dark:bg-[#121514] dark:text-[#FCFAEF]",
  dark: "bg-[#121514] text-[#FCFAEF]",
  teal: "bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF]",
  white: "bg-white text-[#1C1F1E] dark:bg-[#1C1F1E] dark:text-[#FCFAEF]",
};

const sectionSpacingClasses: Record<PublicSectionSpacing, string> = {
  compact: "py-12 md:py-16",
  normal: "py-16 md:py-24",
  spacious: "py-20 md:py-28",
};

export function PublicSection({
  children,
  className,
  containerClassName,
  tone = "cream",
  spacing = "normal",
  withTexture = false,
  ...props
}: ComponentPropsWithoutRef<"section"> & {
  containerClassName?: string;
  tone?: PublicSectionTone;
  spacing?: PublicSectionSpacing;
  withTexture?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        sectionToneClasses[tone],
        sectionSpacingClasses[spacing],
        className,
      )}
      {...props}
    >
      {withTexture ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(0,151,178,0.08),transparent_38%,rgba(238,186,43,0.08))] dark:bg-[linear-gradient(135deg,rgba(0,151,178,0.12),transparent_38%,rgba(238,186,43,0.08))]"
        />
      ) : null}
      <div className={cn("container relative z-10 mx-auto px-4", containerClassName)}>
        {children}
      </div>
    </section>
  );
}

export function SectionEyebrow({
  children,
  className,
  tone = "teal",
}: {
  children: ReactNode;
  className?: string;
  tone?: "teal" | "gold" | "light";
}) {
  return (
    <p
      className={cn(
        "font-subheading text-sm font-bold uppercase tracking-[0.18em]",
        tone === "teal" && "text-[#0097b2] dark:text-[#66C4DC]",
        tone === "gold" && "text-[#F5C94D]",
        tone === "light" && "text-[#FCFAEF]/80",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function PublicSectionHeader({
  eyebrow,
  title,
  description,
  alignment = "center",
  className,
  eyebrowTone,
  titleClassName,
  descriptionClassName,
  titleId,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  alignment?: "left" | "center";
  className?: string;
  eyebrowTone?: "teal" | "gold" | "light";
  titleClassName?: string;
  descriptionClassName?: string;
  titleId?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-4xl",
        alignment === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <SectionEyebrow
          tone={eyebrowTone}
          className={cn(alignment === "center" && "mx-auto")}
        >
          {eyebrow}
        </SectionEyebrow>
      ) : null}
      <h2
        id={titleId}
        className={cn(
          "mt-4 font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-5xl lg:text-6xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-xl",
            alignment === "center" && "mx-auto max-w-3xl",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function SurfaceCard({
  className,
  interactive = false,
  accentColor,
  style,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  interactive?: boolean;
  accentColor?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[#E6E7E7] bg-white/88 shadow-[0_12px_36px_rgba(28,31,30,0.08)] backdrop-blur-sm dark:border-[#2F3332] dark:bg-[#2F3332]/70",
        interactive && "homepage-hover-card [--homepage-hover-border-color:rgba(0,151,178,0.24)] dark:[--homepage-hover-border-color:rgba(102,196,220,0.28)]",
        className,
      )}
      style={
        accentColor
          ? ({
              ...style,
              "--homepage-hover-border-color": accentColor,
            } as CSSProperties)
          : style
      }
      {...props}
    />
  );
}

export function MediaFrame({
  className,
  children,
  aspect = "portrait",
}: {
  className?: string;
  children: ReactNode;
  aspect?: "portrait" | "wide" | "square" | "browser";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-[#0097b2]/15 shadow-[0_24px_70px_rgba(15,76,92,0.2)] dark:border-white/10",
        aspect === "portrait" && "aspect-[4/5]",
        aspect === "wide" && "aspect-[16/10]",
        aspect === "square" && "aspect-square",
        aspect === "browser" && "min-h-[360px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IconBadge({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function PublicCta({
  href,
  children,
  variant = "teal",
  className,
  icon = true,
  ...props
}: Omit<ButtonProps, "variant"> & {
  href?: string;
  variant?: "teal" | "gold" | "light" | "outline" | "outline-light";
  icon?: boolean;
}) {
  const variantClassName = cn(
    "h-auto rounded-md px-7 py-4 text-base font-semibold md:text-lg",
    variant === "teal" &&
      "bg-[#0097b2] text-[#FCFAEF] hover:bg-[#eeba2b] hover:text-[#1C1F1E]",
    variant === "gold" &&
      "bg-[#eeba2b] text-[#1C1F1E] hover:bg-[#FCFAEF] hover:text-[#1C1F1E]",
    variant === "light" &&
      "bg-[#FCFAEF] text-[#0097b2] hover:bg-[#F5C94D] hover:text-[#1C1F1E]",
    variant === "outline" &&
      "border border-[#0097b2]/30 bg-transparent text-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF] dark:border-[#66C4DC]/30 dark:text-[#66C4DC] dark:hover:bg-[#66C4DC] dark:hover:text-[#1C1F1E]",
    variant === "outline-light" &&
      "border border-[#FCFAEF]/80 bg-transparent text-[#FCFAEF] hover:bg-[#FCFAEF] hover:text-[#1C1F1E]",
    className,
  );

  const content = (
    <>
      {children}
      {icon ? <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /> : null}
    </>
  );

  if (href) {
    return (
      <Button asChild className={variantClassName} {...props}>
        <Link href={href}>{content}</Link>
      </Button>
    );
  }

  if (props.asChild) {
    return (
      <Button className={variantClassName} {...props}>
        {children}
      </Button>
    );
  }

  return (
    <Button className={variantClassName} {...props}>
      {content}
    </Button>
  );
}
