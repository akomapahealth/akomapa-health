"use client";

import { motion, AnimatePresence } from "framer-motion";

/**
 * Named client islands for framer-motion. Server Component route shells can
 * import these without marking the entire page as a client tree.
 */
export const MotionDiv = motion.div;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;
export const MotionP = motion.p;
export const MotionSpan = motion.span;
export const MotionSection = motion.section;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;
export const MotionA = motion.a;
export const MotionButton = motion.button;

export { AnimatePresence, motion };
