"use client";

import { useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { useAnimatedInteger } from "@/lib/motion/useAnimatedInteger";
import { cn } from "@/lib/utils";

export type AnimatedMetricProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  style?: CSSProperties;
  durationMs?: number;
  viewport?: { once?: boolean; amount?: number | "some" | "all" };
};

export function AnimatedMetric({
  value,
  suffix = "",
  prefix = "",
  className,
  style,
  durationMs = 2000,
  viewport = { once: true, amount: 0.6 },
}: AnimatedMetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, viewport);
  const display = useAnimatedInteger(value, isInView, durationMs);
  const formatted = `${prefix}${display.toLocaleString()}${suffix}`;

  return (
    <span ref={ref} className={cn(className)} style={style}>
      {formatted}
    </span>
  );
}
