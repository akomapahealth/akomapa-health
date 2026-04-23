"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUpVariants, motionDurations } from "@/lib/motion/tokens";

type HeroLineProps = {
  delay?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Mount-time fade-up for hero headings (respects MotionConfig / reduced motion).
 */
export function HeroEntranceH1({ delay = 0, className, children }: HeroLineProps) {
  return (
    <motion.h1
      variants={fadeUpVariants({ duration: motionDurations.enter, delay })}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.h1>
  );
}

export function HeroEntranceP({
  delay = 0,
  className,
  children,
}: HeroLineProps) {
  return (
    <motion.p
      variants={fadeUpVariants({ duration: motionDurations.enter, delay })}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.p>
  );
}
