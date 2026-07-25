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

const impactMetrics = [
  {
    value: 3000,
    suffix: "+",
    label: "People screened for chronic disease risk",
  },
  {
    value: 600,
    suffix: "+",
    label:
      "People identified with previously undetected or untreated hypertension and diabetes",
  },
  {
    value: 75,
    suffix: "%+",
    label: "Patients successfully connected to ongoing primary care",
  },
  {
    value: 80,
    suffix: "%+",
    label:
      "Patients successfully followed through community outreach and home visits",
  },
  {
    value: 4,
    suffix: "",
    label: "Community Learning & Care Hubs",
  },
  {
    value: 300,
    suffix: "+",
    label: "Health professional students trained across seven disciplines",
  },
] as const;

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t xl:border-l xl:border-t-0",
  "border-t sm:border-l xl:border-l-0",
  "border-t xl:border-l",
  "border-t sm:border-l",
] as const;

export default function TransformationalImpactSection() {
  const headingId = "transformational-impact-heading";
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const counts = useAnimatedMetricValues(impactMetrics, inView, 2000);

  return (
    <section
      aria-labelledby={headingId}
      data-transformational-impact
      className="relative isolate overflow-hidden border-t border-[#FCFAEF]/20 bg-[#0097b2] text-[#FCFAEF]"
    >
      <span
        aria-hidden="true"
        data-home-band-marker
        className="pointer-events-none absolute right-4 top-6 hidden select-none rounded px-2 py-1 font-subheading text-xs font-bold tracking-[0.2em] text-[#FCFAEF]/70 ring-1 ring-[#FCFAEF]/30 md:inline-block"
      >
        03
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-1 w-24 bg-[#eeba2b] md:w-40"
      />

      <div className="site-container relative mx-auto px-4 py-20 md:py-24 lg:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <div data-impact-copy>
              <HomeEyebrow tone="light">
                Transformational Impact
              </HomeEyebrow>
              <HomeHeading
                id={headingId}
                className="mt-4 max-w-3xl text-[#FCFAEF] lg:text-[3.2rem]"
              >
                Closing the Primary Care Gap. Building healthier communities.
                Preparing stronger health leaders.
              </HomeHeading>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-5">
            <div
              data-impact-context
              className="lg:border-l lg:border-[#FCFAEF]/30 lg:pl-10"
            >
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#FCFAEF]/85 md:text-lg">
                At Akomapa, we believe lasting improvements in health require
                more than one-day screenings. We work alongside communities to
                identify chronic disease earlier, connect people to ongoing
                care, support long-term follow-up, and prepare the next
                generation of health professionals to strengthen primary care
                systems.
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
              data-impact-metrics
              className="grid border-y border-[#FCFAEF]/30 sm:grid-cols-2 xl:grid-cols-3"
            >
              {impactMetrics.map((metric, index) => (
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
        </div>
      </div>
    </section>
  );
}
