"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

type MotionConfigProviderProps = {
  children: ReactNode;
};

/**
 * Respects prefers-reduced-motion for all Framer Motion components in the tree.
 */
export function MotionConfigProvider({ children }: MotionConfigProviderProps) {
  return (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );
}
