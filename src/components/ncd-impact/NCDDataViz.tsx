"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { MOTION_EASE } from "@/lib/motion/tokens";
import { ncdDataVizContent } from "@/data/ncd-impact";

function ComparisonRow({
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
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reducedMotion = useReducedMotion();
  const showFinal = Boolean(reducedMotion) || inView;

  const ghanaWidth = `${(ghana / maxValue) * 100}%`;
  const globalWidth = `${(global / maxValue) * 100}%`;

  return (
    <div
      ref={ref}
      className="border-b border-[#1C1F1E]/15 py-7 last:border-b-0 dark:border-[#FCFAEF]/20"
    >
      <h3 className="font-heading text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-lg">
        {label}
      </h3>

      <div className="mt-5 space-y-4">
        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="inline-flex items-center gap-2 font-medium text-[#0097b2] dark:text-[#66C4DC]">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-full bg-[#0097b2] dark:bg-[#66C4DC]"
              />
              Ghana
            </span>
            <span className="tabular-nums text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
              {ghana}
              {unit}
            </span>
          </div>
          <div
            className="h-2.5 w-full overflow-hidden border border-[#1C1F1E]/10 bg-[#E6E7E7]/40 dark:border-[#FCFAEF]/15 dark:bg-white/10"
            role="img"
            aria-label={`Ghana: ${ghana}${unit}`}
          >
            <motion.div
              className="h-full bg-[#0097b2] dark:bg-[#66C4DC]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.22) 4px, rgba(255,255,255,0.22) 6px)",
              }}
              initial={false}
              animate={{ width: showFinal ? ghanaWidth : "0%" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: MOTION_EASE,
                    }
              }
            />
          </div>
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="inline-flex items-center gap-2 font-medium text-[#C9920F] dark:text-[#F5C94D]">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-sm bg-[#eeba2b]"
              />
              Global
            </span>
            <span className="tabular-nums text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
              {global}
              {unit}
            </span>
          </div>
          <div
            className="h-2.5 w-full overflow-hidden border border-[#1C1F1E]/10 bg-[#E6E7E7]/40 dark:border-[#FCFAEF]/15 dark:bg-white/10"
            role="img"
            aria-label={`Global: ${global}${unit}`}
          >
            <motion.div
              className="h-full bg-[#eeba2b]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(28,31,30,0.18) 3px, rgba(28,31,30,0.18) 5px)",
              }}
              initial={false}
              animate={{ width: showFinal ? globalWidth : "0%" }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.8,
                      delay: index * 0.1 + 0.1,
                      ease: MOTION_EASE,
                    }
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NCDDataViz() {
  return (
    <EditorialBand
      tone="white"
      marker="04"
      id="ncd-data-viz"
      aria-labelledby="ncd-data-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow>{ncdDataVizContent.eyebrow}</EditorialEyebrow>
          <p className="mt-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0F4C5C]/70 dark:text-[#66C4DC]/80">
            External evidence
          </p>
          <EditorialHeading id="ncd-data-heading" className="mt-4">
            {ncdDataVizContent.heading}
          </EditorialHeading>
          <EditorialLead className="mt-5">
            {ncdDataVizContent.description}
          </EditorialLead>
        </div>
      </FadeIn>

      <div
        data-ncd-comparison-viz
        className="mt-12 border-t border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20"
      >
        {ncdDataVizContent.comparisons.map((comparison, index) => (
          <ComparisonRow
            key={comparison.label}
            label={comparison.label}
            ghana={comparison.ghana}
            global={comparison.global}
            unit={comparison.unit}
            maxValue={comparison.maxValue}
            index={index}
          />
        ))}
      </div>

      <FadeIn direction="up" delay={0.15}>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ul
            data-ncd-comparison-legend
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#2F3332]/75 dark:text-[#E6E7E7]/75"
          >
            <li className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-full bg-[#0097b2]"
              />
              Ghana (solid + horizontal hatch)
            </li>
            <li className="inline-flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 rounded-sm bg-[#eeba2b]"
              />
              Global (square + diagonal hatch)
            </li>
          </ul>
          <p
            data-ncd-comparison-source
            className="text-sm text-[#2F3332]/70 dark:text-[#E6E7E7]/70"
          >
            Source:{" "}
            <a
              href={ncdDataVizContent.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-semibold text-[#0097b2] underline underline-offset-2 transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC]"
            >
              {ncdDataVizContent.source.label}
            </a>
          </p>
        </div>
      </FadeIn>
    </EditorialBand>
  );
}
