"use client";

import {
  MapPinned,
  HeartPulse,
  Hospital,
  Presentation,
  GraduationCap,
  UserRoundCheck,
  Award,
  Microscope,
  Activity,
} from "lucide-react";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { parsedHealthMetrics, parsedLeadershipMetrics } from "@/data/ncd-impact";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  MapPinned,
  HeartPulse,
  Hospital,
  Presentation,
  GraduationCap,
  UserRoundCheck,
  Award,
  Microscope,
  Activity,
};

export default function NCDImpactStats() {
  return (
    <section
      className="bg-[#F4F1E8] py-16 dark:bg-[#1C1F1E] md:py-24"
      aria-labelledby="ncd-impact-stats-heading"
    >
      <div className="site-container mx-auto px-4 sm:px-6">
        {/* Section header */}
        <FadeIn
          direction="up"
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            Community Impact
          </p>
          <h2
            id="ncd-impact-stats-heading"
            className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl"
          >
            Our Impact So Far
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            Through community partnership and student leadership, Akomapa is
            making measurable progress in the fight against NCDs.
          </p>
        </FadeIn>

        {/* Health Impact */}
        <div className="mx-auto max-w-5xl">
          <FadeIn direction="up" delay={0.05}>
            <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-[#0097b2] dark:text-[#66C4DC]">
              Health Impact
            </h3>
          </FadeIn>
          <FadeInStagger
            className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
            staggerDelay={0.08}
          >
            {parsedHealthMetrics.map((metric) => {
              const Icon = iconMap[metric.icon] ?? Activity;
              return (
                <FadeInStaggerItem key={metric.id} direction="up">
                  <div className="rounded-2xl border border-[#E6E7E7]/80 bg-white p-5 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95 sm:p-6">
                    <Icon className="mx-auto h-6 w-6 text-[#0097b2] dark:text-[#66C4DC]" />
                    <AnimatedMetric
                      value={metric.numericValue}
                      suffix={metric.suffix}
                      className="mt-3 text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl"
                      durationMs={2000}
                    />
                    <p className="mt-2 text-xs leading-snug text-[#2F3332]/70 dark:text-[#E6E7E7]/70 sm:text-sm">
                      {metric.label}
                    </p>
                  </div>
                </FadeInStaggerItem>
              );
            })}
          </FadeInStagger>
        </div>

        {/* Leadership Impact */}
        <div className="mx-auto mt-12 max-w-5xl">
          <FadeIn direction="up" delay={0.05}>
            <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-[#eeba2b]">
              Leadership Impact
            </h3>
          </FadeIn>
          <FadeInStagger
            className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
            staggerDelay={0.08}
          >
            {parsedLeadershipMetrics.map((metric) => {
              const Icon = iconMap[metric.icon] ?? Activity;
              return (
                <FadeInStaggerItem key={metric.id} direction="up">
                  <div className="rounded-2xl border border-[#E6E7E7]/80 bg-white p-5 text-center shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95 sm:p-6">
                    <Icon className="mx-auto h-6 w-6 text-[#eeba2b]" />
                    <AnimatedMetric
                      value={metric.numericValue}
                      suffix={metric.suffix}
                      className="mt-3 text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl"
                      durationMs={2200}
                    />
                    <p className="mt-2 text-xs leading-snug text-[#2F3332]/70 dark:text-[#E6E7E7]/70 sm:text-sm">
                      {metric.label}
                    </p>
                  </div>
                </FadeInStaggerItem>
              );
            })}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
