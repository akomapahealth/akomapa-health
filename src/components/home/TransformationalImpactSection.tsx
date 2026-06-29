"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
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

export default function TransformationalImpactSection() {
  const headingId = "transformational-impact-heading";
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const counts = useAnimatedMetricValues(communityMetrics, inView, 2000);

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden bg-[#0097b2] text-[#FCFAEF]"
    >
      <div className="container relative mx-auto px-4 py-20 md:py-24 lg:py-28">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-6 hidden select-none rounded px-2 py-1 font-subheading text-xs font-bold tracking-[0.2em] text-[#FCFAEF]/70 ring-1 ring-[#FCFAEF]/30 md:inline-block"
        >
          06
        </span>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <HomeEyebrow tone="light">Transformational Impact</HomeEyebrow>
            <HomeHeading id={headingId} className="mt-4 text-[#FCFAEF]">
              Building healthier communities. Preparing stronger health leaders.
            </HomeHeading>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#FCFAEF]/85 md:text-lg">
              Every clinic improves care for today&rsquo;s patients. Every
              student encounter prepares tomorrow&rsquo;s workforce. The numbers
              below track both.
            </p>
            <HomeArrowLink href="/impact" tone="light" className="mt-8">
              Explore our impact
            </HomeArrowLink>
          </div>

          <div ref={ref} className="lg:col-span-7">
            <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {communityMetrics.map((metric, index) => (
                <div
                  key={metric.label}
                  className="border-t border-[#FCFAEF]/25 pt-4"
                >
                  <span
                    aria-hidden="true"
                    className="block h-0.5 w-8 -translate-y-[1.05rem] bg-[#eeba2b]"
                  />
                  <dt className="sr-only">{metric.label}</dt>
                  <dd>
                    <span className="font-heading text-5xl font-semibold tracking-tight text-[#FCFAEF] md:text-6xl">
                      {counts[index].toLocaleString()}
                      {metric.suffix}
                    </span>
                    <span className="mt-3 block text-sm font-medium leading-snug text-[#FCFAEF]/80">
                      {metric.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 border-t border-[#FCFAEF]/25 pt-8">
              <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/70">
                Research &amp; Innovation
              </p>
              <dl className="mt-5 grid grid-cols-3 gap-6">
                {researchMetrics.map((metric) => (
                  <div key={metric.id}>
                    <dt className="sr-only">{metric.label}</dt>
                    <dd>
                      <span className="font-heading text-2xl font-semibold tracking-tight text-[#FCFAEF] md:text-3xl">
                        {metric.currentValue}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-[#FCFAEF]/75">
                        {metric.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
