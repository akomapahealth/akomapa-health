import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type PublicationMetaItem = {
  label: string;
  value: ReactNode;
  /** Optional machine-readable datetime for date values. */
  dateTime?: string;
};

type PublicationMetaProps = {
  items: PublicationMetaItem[];
  className?: string;
};

/**
 * Metadata row for publication surfaces (category, date, author, source).
 * Separators and labels communicate structure without relying on color alone.
 */
export function PublicationMeta({ items, className }: PublicationMetaProps) {
  const visible = items.filter(
    (item) => item.value !== null && item.value !== undefined && item.value !== "",
  );

  if (visible.length === 0) {
    return null;
  }

  return (
    <dl
      data-publication-meta
      className={cn(
        "flex flex-wrap items-baseline gap-x-3 gap-y-2 text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80",
        className,
      )}
    >
      {visible.map((item, index) => (
        <div key={`${item.label}-${index}`} className="inline-flex min-w-0 items-baseline gap-2">
          {index > 0 ? (
            <span
              aria-hidden="true"
              className="select-none text-[#0097b2]/45 dark:text-[#66C4DC]/45"
            >
              ·
            </span>
          ) : null}
          <dt className="sr-only">{item.label}</dt>
          <dd className="min-w-0 font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
            {item.dateTime ? (
              <time dateTime={item.dateTime}>{item.value}</time>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
