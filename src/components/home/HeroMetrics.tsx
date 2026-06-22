"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND } from "@/config/brand";
import { useAnimatedMetricValues } from "@/lib/motion/useAnimatedInteger";
import {
  fadeUpStaggerContainerVariants,
  fadeUpStaggerItemVariants,
} from "@/lib/motion/tokens";

const containerVariants = fadeUpStaggerContainerVariants(0.12);
const itemVariants = fadeUpStaggerItemVariants();

export default function HeroMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const counts = useAnimatedMetricValues(BRAND.heroMetrics, isInView);

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8"
      role="list"
      aria-label="Key impact metrics"
    >
      {BRAND.heroMetrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          variants={itemVariants}
          className="flex flex-col items-center rounded-xl bg-black/30 px-4 py-5 text-center backdrop-blur-sm ring-1 ring-white/10 sm:px-6 sm:py-6"
          role="listitem"
        >
          <span className="font-heading text-3xl font-bold tracking-tight text-[#eeba2b] sm:text-4xl lg:text-5xl">
            {counts[i].toLocaleString()}
            {metric.suffix}
          </span>
          <span className="mt-1 text-sm font-medium leading-snug text-[#FCFAEF]/90 sm:text-base">
            {metric.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
