"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { MOTION_EASE } from "@/lib/motion/tokens";
import { ncdDataVizContent } from "@/data/ncd-impact";

function ComparisonCard({
  label,
  ghana,
  global,
  unit,
  maxValue,
  index,
}: {
  label: string;
  ghana: number;
  global: number;
  unit: string;
  maxValue: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const ghanaWidth = (ghana / maxValue) * 100;
  const globalWidth = (global / maxValue) * 100;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-[#E6E7E7]/80 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95 sm:p-6"
    >
      <h3 className="text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-base">
        {label}
      </h3>

      {/* Ghana bar */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-baseline justify-between text-xs sm:text-sm">
          <span className="font-medium text-[#0097b2] dark:text-[#66C4DC]">
            Ghana
          </span>
          <span className="tabular-nums text-[#2F3332]/60 dark:text-[#E6E7E7]/60">
            {ghana}
            {unit}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#0097b2]/10 dark:bg-[#0097b2]/20">
          <motion.div
            className="h-3 rounded-full bg-[#0097b2]"
            initial={{ width: 0 }}
            animate={inView ? { width: `${ghanaWidth}%` } : { width: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: MOTION_EASE,
            }}
          />
        </div>
      </div>

      {/* Global bar */}
      <div className="mt-3">
        <div className="mb-1.5 flex items-baseline justify-between text-xs sm:text-sm">
          <span className="font-medium text-[#eeba2b]">Global</span>
          <span className="tabular-nums text-[#2F3332]/60 dark:text-[#E6E7E7]/60">
            {global}
            {unit}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#eeba2b]/10 dark:bg-[#eeba2b]/20">
          <motion.div
            className="h-3 rounded-full bg-[#eeba2b]"
            initial={{ width: 0 }}
            animate={inView ? { width: `${globalWidth}%` } : { width: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.1 + 0.1,
              ease: MOTION_EASE,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function NCDDataViz() {
  return (
    <section
      className="bg-[#FCFAEF] py-16 dark:bg-[#1C1F1E] md:py-24"
      aria-labelledby="ncd-data-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <FadeIn
          direction="up"
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            {ncdDataVizContent.eyebrow}
          </p>
          <h2
            id="ncd-data-heading"
            className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl"
          >
            {ncdDataVizContent.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            {ncdDataVizContent.description}
          </p>
        </FadeIn>

        {/* Comparison cards grid */}
        <FadeInStagger
          className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6"
          staggerDelay={0.08}
        >
          {ncdDataVizContent.comparisons.map((comparison, index) => (
            <FadeInStaggerItem key={comparison.label} direction="up">
              <ComparisonCard
                label={comparison.label}
                ghana={comparison.ghana}
                global={comparison.global}
                unit={comparison.unit}
                maxValue={comparison.maxValue}
                index={index}
              />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        {/* Legend + Source */}
        <FadeIn direction="up" delay={0.3}>
          <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-4 text-xs text-[#2F3332]/60 dark:text-[#E6E7E7]/60">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                Ghana
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                Global
              </span>
            </div>
            <p className="text-xs text-[#2F3332]/40 dark:text-[#E6E7E7]/40">
              Source:{" "}
              <a
                href={ncdDataVizContent.source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-colors hover:text-[#0097b2] dark:hover:text-[#66C4DC]"
              >
                {ncdDataVizContent.source.label}
              </a>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
