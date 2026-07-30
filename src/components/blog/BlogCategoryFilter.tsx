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
 * Editorial category tabs for filtering the blog grid.
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
      className="flex max-w-5xl flex-wrap gap-2"
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
              "min-h-11 border px-4 py-2 text-sm font-semibold transition-colors duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:focus-visible:ring-offset-[#1C1F1E]",
              isActive
                ? "border-[#0F4C5C] bg-[#0F4C5C] text-[#FCFAEF] dark:border-[#66C4DC] dark:bg-[#66C4DC] dark:text-[#121514]"
                : "border-[#B8B5A8] bg-transparent text-[#2F3332] hover:border-[#0F4C5C] hover:text-[#0F4C5C] dark:border-[#3E555A] dark:text-[#E6E7E7] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
