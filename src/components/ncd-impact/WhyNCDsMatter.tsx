"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { MOTION_EASE } from "@/lib/motion/tokens";
import { whyNCDsMatterContent } from "@/data/ncd-impact";

export default function WhyNCDsMatter() {
  const barChartRef = useRef<HTMLDivElement>(null);
  const barChartInView = useInView(barChartRef, { once: true, amount: 0.3 });

  return (
    <section
      className="bg-[#1C1F1E] py-16 text-[#FCFAEF] md:py-24"
      aria-labelledby="why-ncds-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <FadeIn direction="up" className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5C94D] sm:text-sm">
            {whyNCDsMatterContent.eyebrow}
          </p>
          <h2
            id="why-ncds-heading"
            className="text-2xl font-bold sm:text-3xl md:text-4xl"
          >
            {whyNCDsMatterContent.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#FCFAEF]/80 sm:text-lg">
            {whyNCDsMatterContent.description}
          </p>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Global stat counters */}
          <FadeInStagger className="space-y-4" staggerDelay={0.1}>
            {whyNCDsMatterContent.globalStats.map((stat) => (
              <FadeInStaggerItem key={stat.id} direction="up">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <div className="flex items-baseline gap-2">
                    <AnimatedMetric
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-3xl font-bold text-white sm:text-4xl"
                      durationMs={2000}
                    />
                  </div>
                  <p className="mt-2 text-sm leading-snug text-white/70 sm:text-base">
                    {stat.label}
                  </p>
                </div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>

          {/* Right: Bar chart */}
          <FadeIn direction="up" delay={0.15}>
            <div ref={barChartRef} className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#F5C94D]">
                {whyNCDsMatterContent.barChart.title}
              </h3>
              <div className="space-y-4">
                {whyNCDsMatterContent.barChart.items.map((bar, index) => (
                  <div key={bar.label}>
                    <div className="mb-1.5 flex items-baseline justify-between text-sm">
                      <span className="font-medium text-[#FCFAEF]/90">
                        {bar.label}
                      </span>
                      <span className="tabular-nums text-[#FCFAEF]/60">
                        {bar.percentage}%
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-3 rounded-full"
                        style={{ backgroundColor: bar.color }}
                        initial={{ width: 0 }}
                        animate={
                          barChartInView ? { width: `${bar.percentage}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 0.8,
                          delay: index * 0.12,
                          ease: MOTION_EASE,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Source */}
        <FadeIn direction="up" delay={0.3}>
          <p className="mt-10 text-center text-xs text-[#FCFAEF]/40">
            Source:{" "}
            <a
              href={whyNCDsMatterContent.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-[#F5C94D]/60"
            >
              {whyNCDsMatterContent.source.label}
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
