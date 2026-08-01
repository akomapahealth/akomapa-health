"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { MOTION_EASE } from "@/lib/motion/tokens";
import { whyNCDsMatterContent } from "@/data/ncd-impact";

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t sm:border-l",
] as const;

export default function WhyNCDsMatter() {
  const barChartRef = useRef<HTMLDivElement>(null);
  const barChartInView = useInView(barChartRef, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  return (
    <EditorialBand
      tone="cream"
      marker="01"
      id="why-ncds-matter"
      aria-labelledby="why-ncds-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow>{whyNCDsMatterContent.eyebrow}</EditorialEyebrow>
          <p className="mt-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0F4C5C]/70 dark:text-[#66C4DC]/80">
            External evidence
          </p>
          <EditorialHeading id="why-ncds-heading" className="mt-4">
            {whyNCDsMatterContent.heading}
          </EditorialHeading>
          <EditorialLead className="mt-5">
            {whyNCDsMatterContent.description}
          </EditorialLead>
        </div>
      </FadeIn>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <FadeInStagger staggerDelay={0.08}>
          <dl
            data-ncd-external-burden-stats
            className="grid border-y border-[#1C1F1E]/15 sm:grid-cols-1 dark:border-[#FCFAEF]/20"
          >
            {whyNCDsMatterContent.globalStats.map((stat, index) => (
              <FadeInStaggerItem key={stat.id} direction="up">
                <div
                  className={`flex min-h-32 flex-col justify-between border-[#1C1F1E]/15 px-1 py-6 sm:px-5 dark:border-[#FCFAEF]/20 ${metricDividerClasses[index] ?? "border-t"}`}
                >
                  <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                    {stat.label}
                  </dt>
                  <dd className="mt-4">
                    <AnimatedMetric
                      value={stat.value}
                      suffix={stat.suffix}
                      className="font-heading text-3xl font-semibold tracking-tight text-[#0097b2] sm:text-4xl dark:text-[#66C4DC]"
                      durationMs={2000}
                    />
                  </dd>
                </div>
              </FadeInStaggerItem>
            ))}
          </dl>
        </FadeInStagger>

        <FadeIn direction="up" delay={0.1}>
          <div
            ref={barChartRef}
            data-ncd-burden-chart
            className="border-y border-[#1C1F1E]/15 py-6 dark:border-[#FCFAEF]/20"
          >
            <h3 className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
              {whyNCDsMatterContent.barChart.title}
            </h3>
            <ul className="mt-6 space-y-4">
              {whyNCDsMatterContent.barChart.items.map((bar, index) => {
                const width = `${bar.percentage}%`;
                const showFinal = Boolean(reducedMotion) || barChartInView;

                return (
                  <li key={bar.label}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
                        {bar.label}
                      </span>
                      <span className="tabular-nums text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                        {bar.percentage}%
                      </span>
                    </div>
                    <div
                      className="h-2.5 w-full overflow-hidden border border-[#1C1F1E]/10 bg-[#E6E7E7]/40 dark:border-[#FCFAEF]/15 dark:bg-white/10"
                      role="img"
                      aria-label={`${bar.label}: ${bar.percentage}% of global NCD deaths`}
                    >
                      <motion.div
                        className="h-full"
                        style={{
                          backgroundColor: bar.color,
                          // Hatch via repeating linear gradient overlay for non-color cue
                          backgroundImage:
                            "repeating-linear-gradient(135deg, transparent, transparent 3px, rgba(255,255,255,0.18) 3px, rgba(255,255,255,0.18) 5px)",
                        }}
                        initial={false}
                        animate={{ width: showFinal ? width : "0%" }}
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : {
                                duration: 0.8,
                                delay: index * 0.12,
                                ease: MOTION_EASE,
                              }
                        }
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </FadeIn>
      </div>

      <FadeIn direction="up" delay={0.2}>
        <p
          data-ncd-external-source
          className="mt-10 text-sm text-[#2F3332]/70 dark:text-[#E6E7E7]/70"
        >
          Source:{" "}
          <a
            href={whyNCDsMatterContent.source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#0097b2] underline underline-offset-2 transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
          >
            {whyNCDsMatterContent.source.label}
          </a>
        </p>
      </FadeIn>
    </EditorialBand>
  );
}
