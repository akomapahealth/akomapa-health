"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { Target } from "lucide-react";
import { FadeIn } from "@/components/animations";
import {
  BentoMetricsGroup,
  type BentoMetricItem,
} from "@/components/ui/feature-section-with-bento-grid";
import { healthImpact, leadershipImpact } from "@/data/impact";
import { useAnimatedMetricValues } from "@/lib/motion/useAnimatedInteger";
import { motionDurations } from "@/lib/motion/tokens";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import type { ImpactCategory, ImpactMetric } from "@/lib/types";

type MetricDisplayValue = {
  value: number;
  prefix: string;
  suffix: string;
};

type HomepageImpactMetric = MetricDisplayValue & {
  id: string;
  label: string;
};

function parseMetricDisplayValue(displayValue: string): MetricDisplayValue {
  const trimmedValue = displayValue.trim();
  const numericMatch = trimmedValue.match(/\d[\d,]*/);

  if (!numericMatch || numericMatch.index === undefined) {
    return {
      value: 0,
      prefix: "",
      suffix: trimmedValue,
    };
  }

  const numericText = numericMatch[0];
  const numericStart = numericMatch.index;
  const numericEnd = numericStart + numericText.length;

  return {
    value: Number(numericText.replaceAll(",", "")),
    prefix: trimmedValue.slice(0, numericStart),
    suffix: trimmedValue.slice(numericEnd),
  };
}

function toHomepageMetric(metric: ImpactMetric): HomepageImpactMetric {
  return {
    id: metric.id,
    label: metric.label,
    ...parseMetricDisplayValue(metric.currentValue),
  };
}

function buildMetricGroup(
  category: ImpactCategory,
  leadMetricId: string,
): HomepageImpactMetric[] {
  const leadMetric = category.metrics.find((metric) => metric.id === leadMetricId);

  if (!leadMetric) {
    throw new Error(`Missing homepage lead metric "${leadMetricId}".`);
  }

  return [
    toHomepageMetric(leadMetric),
    ...category.metrics
      .filter((metric) => metric.id !== leadMetricId)
      .map(toHomepageMetric),
  ];
}

function formatMetricValue(metric: HomepageImpactMetric, count: number) {
  return `${metric.prefix}${count.toLocaleString()}${metric.suffix}`;
}

function buildMetricItems(
  metrics: HomepageImpactMetric[],
  counts: number[],
): BentoMetricItem[] {
  return metrics.slice(1).map((metric, index) => ({
    value: formatMetricValue(metric, counts[index + 1]),
    label: metric.label,
    eyebrow: String(index + 2).padStart(2, "0"),
  }));
}

const healthMetrics = buildMetricGroup(
  healthImpact,
  "community-members-screened",
);
const leadershipMetrics = buildMetricGroup(
  leadershipImpact,
  "student-leaders-trained",
);

const healthFutureLeadValue =
  healthImpact.metrics.find((metric) => metric.id === "community-members-screened")
    ?.futureValue ?? "";
const leadershipFutureLeadValue =
  leadershipImpact.metrics.find(
    (metric) => metric.id === "student-leaders-trained",
  )?.futureValue ?? "";

export default function ImpactMetrics() {
  const healthRef = useRef<HTMLDivElement | null>(null);
  const leadershipRef = useRef<HTMLDivElement | null>(null);

  const healthInView = useInView(healthRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });
  const leadershipInView = useInView(leadershipRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });

  const healthCounts = useAnimatedMetricValues(
    healthMetrics,
    healthInView,
    2000,
  );
  const leadershipCounts = useAnimatedMetricValues(
    leadershipMetrics,
    leadershipInView,
    2200,
  );

  return (
    <PublicSection tone="cream" withTexture>
      <FadeIn duration={motionDurations.enter}>
        <PublicSectionHeader
          eyebrow="Our Impact"
          eyebrowTone="gold"
          title="Community health impact, leadership development, and momentum"
          description="Akomapa measures progress through healthier communities, stronger referral pathways, and students prepared to lead with skill, humility, and a good heart."
          className="mb-16"
        />
      </FadeIn>

      <div ref={healthRef} className="space-y-8">
        <FadeIn duration={motionDurations.enter}>
          <BentoMetricsGroup
            badge={healthImpact.title}
            title="Community-rooted care in motion"
            description="These measures track the people reached through screening, education, referrals, and trusted local partnerships."
            tone="teal"
            leadValue={formatMetricValue(healthMetrics[0], healthCounts[0])}
            leadLabel={healthMetrics[0].label}
            supportingCopy="Every screening and education session strengthens prevention, continuity, and access in communities facing the silent epidemic of non-communicable disease."
            items={buildMetricItems(healthMetrics, healthCounts)}
          />
        </FadeIn>
      </div>

      <FadeIn
        className="mt-12 md:mt-14"
        delay={0.1}
        amount={0.6}
        duration={motionDurations.enter}
      >
        <div className="rounded-xl border border-[#0097b2]/15 bg-gradient-to-r from-[#0097b2]/[0.06] via-white/80 to-[#F5C94D]/[0.08] px-6 py-8 text-center shadow-sm backdrop-blur md:px-8 md:py-10 dark:border-[#2F3332] dark:from-[#2F3332] dark:via-[#1C1F1E] dark:to-[#2F3332]">
          <div className="inline-flex items-center justify-center rounded-full bg-[#0097b2]/10 px-4 py-2 text-sm font-medium text-[#0097b2] dark:bg-[#66C4DC]/10 dark:text-[#66C4DC]">
            <Target className="mr-2 h-4 w-4" aria-hidden="true" />
            By 2028
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            Akomapa is building toward {healthFutureLeadValue} community
            members screened and {leadershipFutureLeadValue} student leaders
            trained through community health hubs, leadership education, and
            equitable partnerships.
          </p>
        </div>
      </FadeIn>

      <div ref={leadershipRef} className="mt-12 space-y-8">
        <FadeIn duration={motionDurations.enter}>
          <BentoMetricsGroup
            badge={leadershipImpact.title}
            title="Students trained to lead with a good heart"
            description="These measures track the leadership pipeline Akomapa is building through mentorship, academy learning, research, and community practice."
            tone="gold"
            leadValue={formatMetricValue(
              leadershipMetrics[0],
              leadershipCounts[0],
            )}
            leadLabel={leadershipMetrics[0].label}
            supportingCopy="Leadership development is not separate from care delivery. Students learn by serving with communities, faculty mentors, and partner institutions."
            items={buildMetricItems(leadershipMetrics, leadershipCounts)}
          />
        </FadeIn>
      </div>
    </PublicSection>
  );
}
