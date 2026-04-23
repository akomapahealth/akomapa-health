"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode, type ElementType } from "react";
import {
  defaultScrollViewport,
  fadeUpStaggerContainerVariants,
  fadeUpStaggerItemVariants,
  fadeUpVariants,
  motionDurations,
  type FadeDirection,
} from "@/lib/motion/tokens";

type FadeInDirection = FadeDirection;

type FadeInProps = {
  children: ReactNode;
  className?: string;
  direction?: FadeInDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  as?: ElementType;
};

export function FadeIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = motionDurations.enter,
  once = true,
  amount = defaultScrollViewport.amount,
  as = "div",
}: FadeInProps) {
  const variants: Variants = fadeUpVariants({ direction, duration, delay });

  const MotionComponent = motion(as);

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

/** Alias for semantic clarity — same behavior as {@link FadeIn}. */
export const SectionReveal = FadeIn;

type FadeInStaggerProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  once?: boolean;
  amount?: number;
};

export function FadeInStagger({
  children,
  className = "",
  staggerDelay = motionDurations.staggerContainer,
  once = true,
  amount = defaultScrollViewport.amount,
}: FadeInStaggerProps) {
  const containerVariants: Variants =
    fadeUpStaggerContainerVariants(staggerDelay);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type FadeInStaggerItemProps = {
  children: ReactNode;
  className?: string;
  direction?: FadeInDirection;
  duration?: number;
};

export function FadeInStaggerItem({
  children,
  className = "",
  direction = "up",
  duration = motionDurations.enter,
}: FadeInStaggerItemProps) {
  const itemVariants: Variants = fadeUpStaggerItemVariants({
    direction,
    duration,
  });

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
