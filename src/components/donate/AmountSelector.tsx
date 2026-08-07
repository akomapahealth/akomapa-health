"use client";

import { donationAmountOptions } from "@/data/donation";
import {
  editorialFieldClassName,
  editorialLabelClassName,
} from "@/components/shared/editorialFormStyles";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type AmountSelectorProps = {
  value: number;
  selectedPreset: number | "custom";
  onSelectPreset: (preset: number | "custom") => void;
  onCustomChange: (value: string) => void;
};

export default function AmountSelector({
  value,
  selectedPreset,
  onSelectPreset,
  onCustomChange,
}: AmountSelectorProps) {
  return (
    <div className="space-y-4">
      <p className={editorialLabelClassName}>Select your amount</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {donationAmountOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={selectedPreset === option.value}
            onClick={() => onSelectPreset(option.value)}
            className={cn(
              "rounded-md border-2 bg-white px-4 py-3 text-left transition-[border-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:bg-[#121514]",
              selectedPreset === option.value
                ? "border-[#eeba2b] bg-[#FCFAEF] ring-1 ring-[#eeba2b]/35 dark:bg-[#1C1F1E]"
                : "border-[#1C1F1E]/12 hover:border-[#0097b2]/55 dark:border-[#FCFAEF]/20",
            )}
          >
            <p className="font-heading text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {option.label}
            </p>
            <p className="text-xs text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              {option.impact}
            </p>
          </button>
        ))}

        <button
          type="button"
          aria-pressed={selectedPreset === "custom"}
          onClick={() => onSelectPreset("custom")}
          className={cn(
            "rounded-md border-2 bg-white px-4 py-3 text-left transition-[border-color,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:bg-[#121514]",
            selectedPreset === "custom"
              ? "border-[#eeba2b] bg-[#FCFAEF] ring-1 ring-[#eeba2b]/35 dark:bg-[#1C1F1E]"
              : "border-[#1C1F1E]/12 hover:border-[#0097b2]/55 dark:border-[#FCFAEF]/20",
          )}
        >
          <p className="font-heading text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
            Custom
          </p>
          <p className="text-xs text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            Enter your own amount
          </p>
        </button>
      </div>

      {selectedPreset === "custom" ? (
        <Input
          type="number"
          min={1}
          value={value > 0 ? String(value) : ""}
          onChange={(event) => onCustomChange(event.target.value)}
          placeholder="Enter custom amount"
          className={editorialFieldClassName}
        />
      ) : null}
    </div>
  );
}
