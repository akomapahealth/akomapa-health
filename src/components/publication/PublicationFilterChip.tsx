import { cn } from "@/lib/utils";

type PublicationFilterChipProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
};

/**
 * Filter chip with selected state communicated by border, weight, and aria-pressed —
 * not color alone.
 */
export function PublicationFilterChip({
  label,
  selected,
  onClick,
  className,
}: PublicationFilterChipProps) {
  return (
    <button
      type="button"
      data-publication-filter-chip
      data-selected={selected ? "true" : "false"}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center border px-4 py-2 text-sm font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
        selected
          ? "border-[#0F4C5C] bg-[#0F4C5C] font-bold text-[#FCFAEF] dark:border-[#66C4DC] dark:bg-[#66C4DC] dark:text-[#121514]"
          : "border-[#1C1F1E]/20 bg-transparent font-medium text-[#1C1F1E] hover:border-[#0097b2] hover:text-[#0097b2] dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]",
        className,
      )}
    >
      {label}
      {selected ? <span className="sr-only"> (selected)</span> : null}
    </button>
  );
}
