"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MOTION_EASE } from "@/lib/motion/tokens";

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [...MOTION_EASE] },
  },
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
    <motion.ul
      className={`${className} motion-reduce:!transform-none motion-reduce:!opacity-100`}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      variants={shouldReduceMotion ? undefined : gridVariants}
      viewport={{ once: true, amount: 0.08 }}
    >
      {Children.map(children, (child) => (
        <motion.li
          variants={shouldReduceMotion ? undefined : itemVariants}
          className="min-w-0 motion-reduce:!transform-none motion-reduce:!opacity-100"
        >
          {child}
        </motion.li>
      ))}
    </motion.ul>
  );
}
