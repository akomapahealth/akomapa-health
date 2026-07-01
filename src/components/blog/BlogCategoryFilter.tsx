"use client";

import { cn } from "@/lib/utils";

export type BlogFilterOption = {
  value: string;
  label: string;
};

type BlogCategoryFilterProps = {
  options: BlogFilterOption[];
  activeCategory: string;
  onChange: (value: string) => void;
};

/**
 * Pill-style category tabs for filtering the blog grid. Controlled by the
 * parent listing page. Matches the news feed's filter styling.
 */
export function BlogCategoryFilter({
  options,
  activeCategory,
  onChange,
}: BlogCategoryFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter articles by category"
      className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-3"
    >
      {options.map((option) => {
        const isActive = activeCategory === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:focus-visible:ring-offset-[#1C1F1E]",
              isActive
                ? "bg-[#0097b2] text-[#FCFAEF] shadow-md"
                : "border border-black/[0.06] bg-white text-[#2F3332]/70 hover:border-[#0097b2]/30 hover:text-[#0097b2] dark:border-white/[0.08] dark:bg-[#2F3332] dark:text-[#E6E7E7]/70 dark:hover:text-[#66C4DC]",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
