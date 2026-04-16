"use client";

import { donationAmountOptions } from "@/data/donation";
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
      <p className="text-sm font-medium text-[#2F3332] dark:text-[#E6E7E7]">Select your amount</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {donationAmountOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelectPreset(option.value)}
            className={cn(
              "rounded-xl border-2 px-4 py-3 text-left transition",
              selectedPreset === option.value
                ? "border-lapis bg-lapis/10"
                : "border-[#E6E7E7] hover:border-lapis/60 dark:border-[#4F5554]",
            )}
          >
            <p className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">{option.label}</p>
            <p className="text-xs text-[#2F3332]/80 dark:text-[#E6E7E7]/80">{option.impact}</p>
          </button>
        ))}

        <button
          type="button"
          onClick={() => onSelectPreset("custom")}
          className={cn(
            "rounded-xl border-2 px-4 py-3 text-left transition",
            selectedPreset === "custom"
              ? "border-lapis bg-lapis/10"
              : "border-[#E6E7E7] hover:border-lapis/60 dark:border-[#4F5554]",
          )}
        >
          <p className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">Custom</p>
          <p className="text-xs text-[#2F3332]/80 dark:text-[#E6E7E7]/80">Enter your own amount</p>
        </button>
      </div>

      {selectedPreset === "custom" && (
        <Input
          type="number"
          min={1}
          value={value > 0 ? String(value) : ""}
          onChange={(event) => onCustomChange(event.target.value)}
          placeholder="Enter custom amount"
          className="h-11 border-[#0097b2] bg-white dark:bg-[#1C1F1E]"
        />
      )}
    </div>
  );
}
