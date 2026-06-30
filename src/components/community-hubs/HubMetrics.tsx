"use client";

import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { PublicSection, PublicSectionHeader, SurfaceCard } from "@/components/shared/PublicPagePrimitives";
import type { CommunityHub } from "@/lib/types";

const metricConfig = [
  { key: "patientsServed" as const, label: "Community members served" },
  { key: "studentsTrained" as const, label: "Students trained" },
  { key: "communitiesReached" as const, label: "Communities reached" },
  { key: "partnersEngaged" as const, label: "Partners engaged" },
];

type HubMetricsProps = {
  hub: CommunityHub;
};

export default function HubMetrics({ hub }: HubMetricsProps) {
  return (
    <PublicSection tone="cream" spacing="normal" withTexture id="hub-metrics">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Impact at a Glance"
          title="Hub Metrics"
          description={
            hub.status === "in-development"
              ? "This hub is in development. Metrics will grow as programs launch and community partnerships expand."
              : "Key indicators of community reach, student leadership development, and partnership engagement at this hub."
          }
          titleId="hub-metrics-heading"
        />
      </FadeIn>

      <FadeInStagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metricConfig.map(({ key, label }) => (
          <FadeInStaggerItem key={key} direction="up">
            <SurfaceCard className="p-6 text-center">
              <p
                className="text-3xl font-bold sm:text-4xl"
                style={{ color: hub.color }}
              >
                <AnimatedMetric value={hub.metrics[key]} />
              </p>
              <p className="mt-2 text-sm font-medium text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                {label}
              </p>
            </SurfaceCard>
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
