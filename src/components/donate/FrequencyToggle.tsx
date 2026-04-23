"use client";

import { DonationFrequency } from "@/data/donation";
import { cn } from "@/lib/utils";

type FrequencyToggleProps = {
  value: DonationFrequency;
  onChange: (value: DonationFrequency) => void;
};

export default function FrequencyToggle({ value, onChange }: FrequencyToggleProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-[#2F3332] dark:text-[#E6E7E7]">Choose giving frequency</p>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange("monthly")}
          className={cn(
            "rounded-xl border-2 px-4 py-4 text-left transition",
            value === "monthly"
              ? "border-amber bg-amber/10 shadow-sm"
              : "border-[#E6E7E7] hover:border-amber/60 dark:border-[#4F5554]",
          )}
          aria-pressed={value === "monthly"}
        >
          <div className="mb-2 inline-block rounded-full bg-amber px-2 py-1 text-xs font-semibold text-floralwhite">
            Recommended
          </div>
          <p className="text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">Monthly</p>
          <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80">Highest impact over time</p>
        </button>

        <button
          type="button"
          onClick={() => onChange("one-time")}
          className={cn(
            "rounded-xl border-2 px-4 py-4 text-left transition",
            value === "one-time"
              ? "border-lapis bg-lapis/10 shadow-sm"
              : "border-[#E6E7E7] hover:border-lapis/60 dark:border-[#4F5554]",
          )}
          aria-pressed={value === "one-time"}
        >
          <p className="text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">One-time</p>
          <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80">Give once, right now</p>
        </button>
      </div>
    </div>
  );
}
