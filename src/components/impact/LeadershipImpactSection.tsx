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
import { leadershipImpact } from "@/data/impact";
import { parseMetricDisplayValue } from "@/lib/impact/parseMetricValue";

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t lg:border-l lg:border-t-0",
  "border-t sm:border-l lg:border-l",
  "border-t lg:border-l",
] as const;

export default function LeadershipImpactSection() {
  return (
    <EditorialBand
      tone="onyx"
      marker="02"
      id="leadership-impact"
      aria-labelledby="leadership-impact-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Leadership Impact
          </EditorialEyebrow>
          <p className="mt-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/65">
            Current results
          </p>
          <EditorialHeading
            id="leadership-impact-heading"
            className="mt-4 text-[#FCFAEF]"
          >
            Students trained to lead with a good heart
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#E6E7E7]/80 dark:text-[#E6E7E7]/80">
            Leadership development is not separate from care delivery. Students
            grow by serving alongside communities, faculty mentors, and partner
            institutions across countries.
          </EditorialLead>
        </div>
      </FadeIn>

      <FadeInStagger className="mt-12" staggerDelay={0.08}>
        <dl
          data-leadership-impact-metrics
          className="grid border-y border-[#FCFAEF]/25 sm:grid-cols-2 lg:grid-cols-3"
        >
          {leadershipImpact.metrics.map((metric, index) => {
            const { value, prefix, suffix } = parseMetricDisplayValue(
              metric.currentValue,
            );
            return (
              <FadeInStaggerItem key={metric.id} direction="up">
                <div
                  className={`flex min-h-44 flex-col justify-between border-[#FCFAEF]/25 px-1 py-7 sm:px-6 ${metricDividerClasses[index]}`}
                >
                  <span
                    aria-hidden="true"
                    className="block font-subheading text-xs font-bold tracking-[0.2em] text-[#F5C94D]"
                  >
                    0{index + 1}
                  </span>
                  <div className="mt-6">
                    <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/70">
                      {metric.label}
                    </dt>
                    <dd className="mt-4">
                      <AnimatedMetric
                        value={value}
                        prefix={prefix}
                        suffix={suffix}
                        durationMs={2200}
                        className="font-heading text-4xl font-semibold tracking-tight text-[#F5C94D] md:text-5xl"
                      />
                      {metric.futureValue ? (
                        <p className="mt-3 text-sm leading-relaxed text-[#E6E7E7]/70">
                          <span className="font-semibold text-[#FCFAEF]">
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
