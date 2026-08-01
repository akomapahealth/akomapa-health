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
import { healthImpact } from "@/data/impact";
import { parseMetricDisplayValue } from "@/lib/impact/parseMetricValue";

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t lg:border-l lg:border-t-0",
  "border-t sm:border-l lg:border-l",
  "border-t lg:border-l",
] as const;

export default function HealthImpactSection() {
  return (
    <EditorialBand
      tone="cream"
      marker="01"
      id="health-impact"
      aria-labelledby="health-impact-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow>Health Impact</EditorialEyebrow>
          <p className="mt-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0F4C5C]/70 dark:text-[#66C4DC]/80">
            Current results
          </p>
          <EditorialHeading id="health-impact-heading" className="mt-4">
            Community-rooted care in motion
          </EditorialHeading>
          <EditorialLead className="mt-5">
            Every screening, referral, follow-up, and education session
            strengthens prevention, continuity, and access in communities facing
            the silent epidemic of non-communicable disease.
          </EditorialLead>
        </div>
      </FadeIn>

      <FadeInStagger className="mt-12" staggerDelay={0.08}>
        <dl
          data-health-impact-metrics
          className="grid border-y border-[#1C1F1E]/15 sm:grid-cols-2 lg:grid-cols-3 dark:border-[#FCFAEF]/20"
        >
          {healthImpact.metrics.map((metric, index) => {
            const { value, prefix, suffix } = parseMetricDisplayValue(
              metric.currentValue,
            );
            return (
              <FadeInStaggerItem key={metric.id} direction="up">
                <div
                  className={`flex min-h-44 flex-col justify-between border-[#1C1F1E]/15 px-1 py-7 sm:px-6 dark:border-[#FCFAEF]/20 ${metricDividerClasses[index]}`}
                >
                  <span
                    aria-hidden="true"
                    className="block font-subheading text-xs font-bold tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]"
                  >
                    0{index + 1}
                  </span>
                  <div className="mt-6">
                    <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                      {metric.label}
                    </dt>
                    <dd className="mt-4">
                      <AnimatedMetric
                        value={value}
                        prefix={prefix}
                        suffix={suffix}
                        durationMs={2000}
                        className="font-heading text-4xl font-semibold tracking-tight text-[#0097b2] md:text-5xl dark:text-[#66C4DC]"
                      />
                      {metric.futureValue ? (
                        <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                          <span className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                            Target {metric.futureValue}
                          </span>
                          {metric.futureYear
                            ? ` by ${metric.futureYear}`
                            : null}
                        </p>
                      ) : null}
                    </dd>
                  </div>
                </div>
              </FadeInStaggerItem>
            );
          })}
        </dl>
      </FadeInStagger>
    </EditorialBand>
  );
}
