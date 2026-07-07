"use client";

import {
  Activity,
  ArrowUpRight,
  Award,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hospital,
  MapPinned,
  Microscope,
  Network,
  Presentation,
  Repeat,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { parseMetricDisplayValue } from "@/lib/impact/parseMetricValue";
import { cn } from "@/lib/utils";

/** Icons referenced by name from `src/data/impact.ts`. */
const iconMap: Record<string, LucideIcon> = {
  Activity,
  Award,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hospital,
  MapPinned,
  Microscope,
  Network,
  Presentation,
  Repeat,
  UserRoundCheck,
};

export type MetricCardAccent = "teal" | "gold";

export interface MetricCardProps {
  label: string;
  currentValue: string;
  futureValue?: string;
  futureYear?: number;
  icon?: string;
  /** Color theme for the value and icon. */
  accent?: MetricCardAccent;
  /** Render for a permanently dark section (Leadership Impact). */
  onDark?: boolean;
  /** Count-up duration in milliseconds. */
  durationMs?: number;
}

const accentText: Record<MetricCardAccent, string> = {
  teal: "text-[#0097b2] dark:text-[#66C4DC]",
  gold: "text-[#eeba2b] dark:text-[#F5C94D]",
};

const accentTextOnDark: Record<MetricCardAccent, string> = {
  teal: "text-[#66C4DC]",
  gold: "text-[#F5C94D]",
};

const accentBadge: Record<MetricCardAccent, string> = {
  teal: "bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]",
  gold: "bg-[#eeba2b]/12 text-[#eeba2b] dark:bg-[#F5C94D]/15 dark:text-[#F5C94D]",
};

const accentBadgeOnDark: Record<MetricCardAccent, string> = {
  teal: "bg-[#66C4DC]/15 text-[#66C4DC]",
  gold: "bg-[#F5C94D]/15 text-[#F5C94D]",
};

const accentRule: Record<MetricCardAccent, string> = {
  teal: "bg-[#0097b2]",
  gold: "bg-[#eeba2b]",
};

const accentRuleOnDark: Record<MetricCardAccent, string> = {
  teal: "bg-[#66C4DC]",
  gold: "bg-[#F5C94D]",
};

export function MetricCard({
  label,
  currentValue,
  futureValue,
  futureYear,
  icon,
  accent = "teal",
  onDark = false,
  durationMs = 2000,
}: MetricCardProps) {
  const Icon = (icon && iconMap[icon]) || Activity;
  const { value, prefix, suffix } = parseMetricDisplayValue(currentValue);

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none sm:p-7",
        onDark
          ? "border-[#FCFAEF]/12 bg-[#FCFAEF]/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.35)] hover:border-[#FCFAEF]/25"
          : "border-[#E6E7E7] bg-white/90 shadow-[0_12px_36px_rgba(28,31,30,0.08)] hover:border-[#0097b2]/25 dark:border-[#2F3332] dark:bg-[#2F3332]/70",
      )}
    >
      {/* Accent rule */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 h-1 w-16 rounded-full",
          onDark ? accentRuleOnDark[accent] : accentRule[accent],
        )}
      />

      <span
        className={cn(
          "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          onDark ? accentBadgeOnDark[accent] : accentBadge[accent],
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <AnimatedMetric
        value={value}
        prefix={prefix}
        suffix={suffix}
        durationMs={durationMs}
        className={cn(
          "mt-6 font-heading text-4xl font-bold tracking-tight sm:text-5xl",
          onDark ? accentTextOnDark[accent] : accentText[accent],
        )}
      />

      <p
        className={cn(
          "mt-2 text-base font-medium",
          onDark ? "text-[#FCFAEF]" : "text-[#1C1F1E] dark:text-[#FCFAEF]",
        )}
      >
        {label}
      </p>

      {futureValue ? (
        <p
          className={cn(
            "mt-auto flex items-center gap-1.5 pt-4 text-sm",
            onDark
              ? "text-[#E6E7E7]/70"
              : "text-[#2F3332]/70 dark:text-[#E6E7E7]/70",
          )}
        >
          <ArrowUpRight
            className={cn(
              "h-4 w-4",
              onDark ? accentTextOnDark[accent] : accentText[accent],
            )}
            aria-hidden="true"
          />
          <span>
            <span className="font-semibold">{futureValue}</span>
            {futureYear ? ` by ${futureYear}` : null}
          </span>
        </p>
      ) : null}
    </div>
  );
}

export default MetricCard;
