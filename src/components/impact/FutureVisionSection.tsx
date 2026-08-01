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
import { futureVision } from "@/data/impact";
import { parseMetricDisplayValue } from "@/lib/impact/parseMetricValue";

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t lg:border-l lg:border-t-0",
  "border-t sm:border-l lg:border-l",
  "border-t lg:border-l",
] as const;

export default function FutureVisionSection() {
  return (
    <EditorialBand
      tone="teal"
      marker="05"
      id="future-vision"
      aria-labelledby="future-vision-heading"
      className="bg-[#0F4C5C]"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Future targets
          </EditorialEyebrow>
          <p className="mt-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/65">
            By 2028 — not yet achieved
          </p>
          <EditorialHeading
            id="future-vision-heading"
            className="mt-4 text-[#FCFAEF]"
          >
            Where we are headed
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            Our current progress is only the beginning. These are the goals we
            are building toward as Akomapa scales its network of ethical leaders
            and community health hubs.
          </EditorialLead>
        </div>
      </FadeIn>

      <FadeInStagger className="mt-12" staggerDelay={0.08}>
        <dl
          data-future-vision-targets
          className="grid border-y border-[#FCFAEF]/25 sm:grid-cols-2 lg:grid-cols-3"
        >
          {futureVision.map((target, index) => {
            const { value, prefix, suffix } = parseMetricDisplayValue(
              target.value,
            );

            return (
              <FadeInStaggerItem key={target.id} direction="up">
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
                      {target.label}
                    </dt>
                    <dd className="mt-4">
                      <p className="font-subheading text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C94D]/90">
                        Target by 2028
                      </p>
                      <AnimatedMetric
                        value={value}
                        prefix={prefix}
                        suffix={suffix}
                        durationMs={2200}
                        className="mt-2 font-heading text-4xl font-semibold tracking-tight text-[#F5C94D] sm:text-5xl"
                      />
                      {target.currentValue ? (
                        <p className="mt-3 text-sm leading-relaxed text-[#FCFAEF]/70">
                          <span className="font-semibold text-[#FCFAEF]">
                            Today: {target.currentValue}
                          </span>
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
