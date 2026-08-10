"use client";

import { FadeIn } from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import type { CommunityHub } from "@/lib/types";

const metricConfig = [
  { key: "communityMembersServed" as const, label: "Community members served" },
  { key: "studentsTrained" as const, label: "Students trained" },
  { key: "communitiesReached" as const, label: "Communities reached" },
  { key: "partnersEngaged" as const, label: "Partners engaged" },
] as const;

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t lg:border-l lg:border-t-0",
  "border-t sm:border-l lg:border-l",
] as const;

type HubMetricsProps = {
  hub: CommunityHub;
};

export default function HubMetrics({ hub }: HubMetricsProps) {
  const description =
    hub.status === "in-development"
      ? "This hub is in development. Metrics will grow as programs launch and community partnerships expand."
      : "Key indicators of community reach, student leadership development, and partnership engagement at this hub.";

  return (
    <EditorialBand
      tone="onyx"
      marker="01"
      id="hub-metrics"
      aria-labelledby="hub-metrics-heading"
      className="bg-[#0F4C5C]"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Impact at a Glance
          </EditorialEyebrow>
          <EditorialHeading id="hub-metrics-heading" className="mt-4">
            Hub Metrics
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#FCFAEF]/80 dark:text-[#FCFAEF]/80">
            {description}
          </EditorialLead>
        </div>
      </FadeIn>

      <dl
        data-hub-metrics
        className="mt-12 grid border-y border-[#FCFAEF]/20 sm:grid-cols-2 lg:grid-cols-4"
      >
        {metricConfig.map(({ key, label }, index) => (
          <div
            key={key}
            className={`flex min-h-36 flex-col justify-between border-[#FCFAEF]/20 px-1 py-7 sm:px-6 ${metricDividerClasses[index]}`}
          >
            <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/70">
              {label}
            </dt>
            <dd
              className="mt-6 font-heading text-4xl font-semibold tracking-tight text-[#F5C94D] md:text-5xl"
            >
              <AnimatedMetric value={hub.metrics[key]} />
            </dd>
          </div>
        ))}
      </dl>
    </EditorialBand>
  );
}
