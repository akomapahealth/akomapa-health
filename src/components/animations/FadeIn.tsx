"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode, type ElementType } from "react";

type FadeInDirection = "up" | "down" | "left" | "right" | "none";

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

const getDirectionOffset = (direction: FadeInDirection) => {
  switch (direction) {
    case "up":
      return { y: 40, x: 0 };
    case "down":
      return { y: -40, x: 0 };
    case "left":
      return { x: 40, y: 0 };
    case "right":
      return { x: -40, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
};

export function FadeIn({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.2,
  as = "div",
}: FadeInProps) {
  const offset = getDirectionOffset(direction);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

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
  staggerDelay = 0.1,
  once = true,
  amount = 0.2,
}: FadeInStaggerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

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
  duration = 0.5,
}: FadeInStaggerItemProps) {
  const offset = getDirectionOffset(direction);

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

