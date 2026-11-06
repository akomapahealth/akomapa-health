"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MOTION_EASE } from "@/lib/motion/tokens";

/**
 * Each card observes the viewport on its own, and reveals on any intersection.
 * A list-level `whileInView` with a fractional `amount` can never fire when the
 * list is taller than the viewport (a single-column roster on a phone), which
 * left every card at opacity 0. Individual cards can also exceed a phone
 * viewport, so a fractional amount is unsafe on items as well.
 */
const ITEM_VIEWPORT = { once: true, amount: "some" } as const;
const STAGGER_SECONDS = 0.055;
const MAX_STAGGER_ITEMS = 8;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: [...MOTION_EASE],
      delay: Math.min(index, MAX_STAGGER_ITEMS) * STAGGER_SECONDS,
    },
  }),
};

type PeopleMotionGridProps = {
  children: ReactNode;
  className: string;
};

export default function PeopleMotionGrid({
  children,
  className,
}: PeopleMotionGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ul className={`${className} motion-reduce:!transform-none motion-reduce:!opacity-100`}>
      {Children.map(children, (child, index) => (
        <motion.li
          data-people-grid-item
          custom={index}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          variants={shouldReduceMotion ? undefined : itemVariants}
          viewport={ITEM_VIEWPORT}
          className="min-w-0 motion-reduce:!transform-none motion-reduce:!opacity-100"
        >
          {child}
        </motion.li>
      ))}
    </ul>
  );
}
