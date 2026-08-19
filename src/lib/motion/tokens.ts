import type { Variants } from "framer-motion";

/** Primary ease curve — refined, fast deceleration */
export const MOTION_EASE = [0.25, 0.4, 0.25, 1] as const;

export const motionDurations = {
  enter: 0.4,
  stagger: 0.08,
  staggerContainer: 0.1,
} as const;

export type FadeDirection = "up" | "down" | "left" | "right" | "none";

const ENTER_OFFSET = 20;

export function getScrollRevealOffset(direction: FadeDirection) {
  switch (direction) {
    case "up":
      return { y: ENTER_OFFSET, x: 0 };
    case "down":
      return { y: -ENTER_OFFSET, x: 0 };
    case "left":
      return { x: ENTER_OFFSET, y: 0 };
    case "right":
      return { x: -ENTER_OFFSET, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
}

export const defaultScrollViewport = {
  once: true,
  amount: 0.2,
} as const;

export type FadeUpOptions = {
  direction?: FadeDirection;
  duration?: number;
  delay?: number;
};

export function fadeUpVariants(options: FadeUpOptions = {}): Variants {
  const {
    direction = "up",
    duration = motionDurations.enter,
    delay = 0,
  } = options;
  const offset = getScrollRevealOffset(direction);

  return {
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
        ease: [...MOTION_EASE],
      },
    },
  };
}

export function fadeUpStaggerContainerVariants(
  staggerDelay: number = motionDurations.staggerContainer
): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
}

export function fadeUpStaggerItemVariants(
  options: Omit<FadeUpOptions, "delay"> = {}
): Variants {
  const { direction = "up", duration = motionDurations.enter } = options;
  const offset = getScrollRevealOffset(direction);

  return {
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
        ease: [...MOTION_EASE],
      },
    },
  };
}
