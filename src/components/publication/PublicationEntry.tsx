import Link from "next/link";
import type { ReactNode } from "react";
import Image from "@/components/common/Image";
import { EditorialArrow } from "@/components/shared/EditorialPrimitives";
import { cn } from "@/lib/utils";
import { PublicationMeta, type PublicationMetaItem } from "./PublicationMeta";

type PublicationEntryProps = {
  href: string;
  title: string;
  description?: string;
  meta?: PublicationMetaItem[];
  image?: string;
  imageAlt?: string;
  ctaLabel: string;
  eyebrow?: ReactNode;
  className?: string;
  external?: boolean;
};

/**
 * Border-led scannable publication row — not a marketing card.
 * Full title and metadata remain visible (no essential line clamps).
 */
export function PublicationEntry({
  href,
  title,
  description,
  meta,
  image,
  imageAlt,
  ctaLabel,
  eyebrow,
  className,
  external = false,
}: PublicationEntryProps) {
  const content = (
    <article
      data-publication-entry
      className={cn(
        "group flex h-full flex-col gap-5 border-t-2 border-[#0F4C5C] bg-transparent py-6 transition-colors",
        "hover:bg-white/60 dark:border-[#66C4DC] dark:hover:bg-[#1C1F1E]/60",
        "sm:flex-row sm:gap-8",
        className,
      )}
    >
      {image ? (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-[4/3] sm:w-44 md:w-52">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(min-width: 640px) 208px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        {eyebrow ? (
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0097b2] dark:text-[#66C4DC]">
            {eyebrow}
          </div>
        ) : null}

        <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-[1.35rem]">
          {title}
        </h3>

        {meta && meta.length > 0 ? (
          <PublicationMeta items={meta} className="mt-3" />
        ) : null}

        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/75 md:text-base">
            {description}
          </p>
        ) : null}

        <span className="mt-5 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#0097b2] transition-colors group-hover:text-[#0F4C5C] dark:text-[#66C4DC] dark:group-hover:text-[#eeba2b]">
          {ctaLabel}
          <EditorialArrow className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );

  const linkClass =
    "block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:focus-visible:ring-offset-[#121514]";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {content}
    </Link>
  );
}
