"use client";

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
import {
  parsedHealthMetrics,
  parsedLeadershipMetrics,
} from "@/data/ncd-impact";

const healthDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t lg:border-l lg:border-t-0",
  "border-t sm:border-l lg:border-l",
  "border-t lg:border-l",
] as const;

const leadershipDividerClasses = healthDividerClasses;

export default function NCDImpactStats() {
  return (
    <EditorialBand
      tone="cream"
      marker="05"
      id="ncd-impact-stats"
      aria-labelledby="ncd-impact-stats-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow>Community Impact</EditorialEyebrow>
          <p className="mt-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0F4C5C]/70 dark:text-[#66C4DC]/80">
            Akomapa current results
          </p>
          <EditorialHeading id="ncd-impact-stats-heading" className="mt-4">
            Our Impact So Far
          </EditorialHeading>
          <EditorialLead className="mt-5">
            Through community partnership and student leadership, Akomapa is
            making measurable progress in the fight against NCDs.
          </EditorialLead>
        </div>
      </FadeIn>

      <div className="mt-12">
        <FadeIn>
          <h3 className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
            Health Impact
          </h3>
        </FadeIn>
        <FadeInStagger className="mt-6" staggerDelay={0.08}>
          <dl
            data-ncd-current-metrics="health"
            className="grid border-y border-[#1C1F1E]/15 sm:grid-cols-2 lg:grid-cols-3 dark:border-[#FCFAEF]/20"
          >
            {parsedHealthMetrics.map((metric, index) => (
              <FadeInStaggerItem key={metric.id} direction="up">
                <div
                  className={`flex min-h-40 flex-col justify-between border-[#1C1F1E]/15 px-1 py-7 sm:px-6 dark:border-[#FCFAEF]/20 ${healthDividerClasses[index]}`}
                >
                  <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                    {metric.label}
                  </dt>
                  <dd className="mt-4">
                    <AnimatedMetric
                      value={metric.numericValue}
                      suffix={metric.suffix}
                      className="font-heading text-3xl font-semibold tracking-tight text-[#0097b2] md:text-4xl dark:text-[#66C4DC]"
                      durationMs={2000}
                    />
                  </dd>
                </div>
              </FadeInStaggerItem>
            ))}
          </dl>
        </FadeInStagger>
      </div>

      <div className="mt-14">
        <FadeIn>
          <h3 className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
            Leadership Impact
          </h3>
        </FadeIn>
        <FadeInStagger className="mt-6" staggerDelay={0.08}>
          <dl
            data-ncd-current-metrics="leadership"
            className="grid border-y border-[#1C1F1E]/15 sm:grid-cols-2 lg:grid-cols-3 dark:border-[#FCFAEF]/20"
          >
            {parsedLeadershipMetrics.map((metric, index) => (
              <FadeInStaggerItem key={metric.id} direction="up">
                <div
                  className={`flex min-h-40 flex-col justify-between border-[#1C1F1E]/15 px-1 py-7 sm:px-6 dark:border-[#FCFAEF]/20 ${leadershipDividerClasses[index]}`}
                >
                  <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                    {metric.label}
                  </dt>
                  <dd className="mt-4">
                    <AnimatedMetric
                      value={metric.numericValue}
                      suffix={metric.suffix}
                      className="font-heading text-3xl font-semibold tracking-tight text-[#C9920F] md:text-4xl dark:text-[#F5C94D]"
                      durationMs={2200}
                    />
                  </dd>
                </div>
              </FadeInStaggerItem>
            ))}
          </dl>
        </FadeInStagger>
      </div>
    </EditorialBand>
  );
}
