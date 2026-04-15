"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animates from 0 to `target` while `isActive` is true.
 * Respects `prefers-reduced-motion`: jumps to `target` immediately when active.
 */
export function useAnimatedInteger(
  target: number,
  isActive: boolean,
  durationMs = 2000
): number {
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    if (reducedMotion) {
      setValue(target);
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isActive, target, durationMs, reducedMotion]);

  return value;
}

type MetricLike = { value: number };

/**
 * Parallel count-up for multiple metrics (single rAF loop).
 */
export function useAnimatedMetricValues<T extends MetricLike>(
  metrics: T[],
  isInView: boolean,
  durationMs = 2000
): number[] {
  const reducedMotion = useReducedMotion();
  const [counts, setCounts] = useState(() => metrics.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    if (reducedMotion) {
      setCounts(metrics.map((m) => m.value));
      return;
    }

    const start = performance.now();
    let raf = 0;

    const tick = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeOutCubic(progress);
      setCounts(metrics.map((m) => Math.round(m.value * eased)));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, metrics, durationMs, reducedMotion]);

  return counts;
}
