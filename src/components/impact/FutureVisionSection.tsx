"use client";

import {
  ArrowRight,
  Globe,
  GraduationCap,
  Handshake,
  HeartPulse,
  Network,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { futureVision } from "@/data/impact";
import { parseMetricDisplayValue } from "@/lib/impact/parseMetricValue";

const iconMap: Record<string, LucideIcon> = {
  HeartPulse,
  Network,
  GraduationCap,
  Globe,
  Handshake,
};

export default function FutureVisionSection() {
  return (
    <PublicSection tone="teal" aria-labelledby="future-vision-heading">
      {/* Decorative blurs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <FadeIn>
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FCFAEF]/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#F5C94D]">
            <Target className="h-4 w-4" aria-hidden="true" />
            By 2028
          </span>
          <PublicSectionHeader
            title="Where we are headed"
            description="Our current progress is only the beginning. These are the goals we are building toward as Akomapa scales its network of ethical leaders and community health hubs."
            titleId="future-vision-heading"
            titleClassName="text-[#FCFAEF]"
            descriptionClassName="text-[#FCFAEF]/85"
            className="mt-6"
          />
        </div>
      </FadeIn>

      <FadeInStagger
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {futureVision.map((target) => {
          const Icon = iconMap[target.icon ?? ""] ?? Target;
          const { value, prefix, suffix } = parseMetricDisplayValue(
            target.value,
          );

          return (
            <FadeInStaggerItem key={target.id} direction="up" className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-[#FCFAEF]/15 bg-[#FCFAEF]/[0.06] p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none sm:p-7">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5C94D]/15 text-[#F5C94D]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <AnimatedMetric
                  value={value}
                  prefix={prefix}
                  suffix={suffix}
                  durationMs={2200}
                  className="mt-6 font-heading text-4xl font-bold tracking-tight text-[#F5C94D] sm:text-5xl"
                />
                <p className="mt-2 text-base font-medium text-[#FCFAEF]">
                  {target.label}
                </p>

                {target.currentValue ? (
                  <p className="mt-auto flex items-center gap-2 pt-4 text-sm text-[#FCFAEF]/70">
                    <span className="font-semibold text-[#FCFAEF]">
                      {target.currentValue}
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#F5C94D]" aria-hidden="true" />
                    <span>today &rarr; 2028 goal</span>
                  </p>
                ) : null}
              </div>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStagger>
    </PublicSection>
  );
}
