"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  HomeArrowLink,
  HomeEyebrow,
  HomeHeading,
} from "@/components/home/_home-ui";
import { useAnimatedMetricValues } from "@/lib/motion/useAnimatedInteger";
import { leadershipImpact } from "@/data/impact";

const communityMetrics = [
  { value: 3000, suffix: "+", label: "Community members screened" },
  { value: 95, suffix: "%", label: "Linkage-to-care rate" },
  { value: 4, suffix: "+", label: "Community Learning & Care Hubs" },
  { value: 300, suffix: "+", label: "Student leaders trained" },
] as const;

const researchMetricIds = [
  "faculty-mentors-engaged",
  "academy-graduates",
  "research-scholars-supported",
] as const;

const researchMetrics = researchMetricIds.map((id) => {
  const metric = leadershipImpact.metrics.find((item) => item.id === id);
  if (!metric) {
    throw new Error(`Missing homepage research metric "${id}".`);
  }
  return metric;
});

const metricDividerClasses = [
  "sm:border-r",
  "border-t sm:border-t-0 xl:border-r",
  "border-t sm:border-r xl:border-t-0",
  "border-t xl:border-t-0",
] as const;

export default function TransformationalImpactSection() {
  const headingId = "transformational-impact-heading";
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const counts = useAnimatedMetricValues(communityMetrics, inView, 2000);

  return (
    <section
      aria-labelledby={headingId}
      data-transformational-impact
      className="relative isolate overflow-hidden border-t border-[#FCFAEF]/20 bg-[#0097b2] text-[#FCFAEF]"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-1 w-24 bg-[#eeba2b] md:w-40"
      />

      <div className="site-container relative mx-auto px-4 py-20 md:py-24 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <div data-impact-copy>
              <HomeEyebrow tone="light">Transformational Impact</HomeEyebrow>
              <HomeHeading
                id={headingId}
                className="mt-4 max-w-3xl text-[#FCFAEF] lg:text-[3.2rem]"
              >
                Building healthier communities. Preparing stronger health
                leaders.
              </HomeHeading>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5">
            <div
              data-impact-context
              className="lg:border-l lg:border-[#FCFAEF]/30 lg:pl-10"
            >
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#FCFAEF]/85 md:text-lg">
                Every clinic improves care for today&rsquo;s patients. Every
                student encounter prepares tomorrow&rsquo;s workforce. The
                numbers below track both.
              </p>
              <HomeArrowLink href="/impact" tone="light" className="mt-8">
                Explore our impact
              </HomeArrowLink>
            </div>
          </FadeIn>
        </div>

        <div ref={ref} className="mt-14 md:mt-16">
          <FadeInStagger>
            <dl
              data-community-metrics
              className="grid border-y border-[#FCFAEF]/30 sm:grid-cols-2 xl:grid-cols-4"
            >
              {communityMetrics.map((metric, index) => (
                <FadeInStaggerItem key={metric.label}>
                  <div
                    className={`flex min-h-44 flex-col justify-between border-[#FCFAEF]/30 px-0 py-7 sm:px-7 xl:min-h-52 xl:px-8 ${metricDividerClasses[index]}`}
                  >
                    <span
                      aria-hidden="true"
                      className="block font-subheading text-xs font-bold tracking-[0.2em] text-[#F5C94D]"
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <dt className="sr-only">{metric.label}</dt>
                      <dd>
                        <span className="font-heading text-5xl font-semibold tracking-tight text-[#FCFAEF] md:text-6xl">
                          {counts[index].toLocaleString()}
                          {metric.suffix}
                        </span>
                        <span className="mt-3 block max-w-44 text-sm font-medium leading-snug text-[#FCFAEF]/80">
                          {metric.label}
                        </span>
                      </dd>
                    </div>
                  </div>
                </FadeInStaggerItem>
              ))}
            </dl>
          </FadeInStagger>

          <FadeIn delay={0.15}>
            <div
              data-research-metrics
              className="grid gap-6 border-b border-[#FCFAEF]/30 py-7 md:grid-cols-4 md:items-start md:gap-8"
            >
              <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/70">
                Research &amp; Innovation
              </p>
              {researchMetrics.map((metric) => (
                <dl key={metric.id}>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="font-heading text-2xl font-semibold tracking-tight text-[#FCFAEF] md:text-3xl">
                      {metric.currentValue}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-[#FCFAEF]/75">
                      {metric.label}
                    </span>
                  </dd>
                </dl>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
