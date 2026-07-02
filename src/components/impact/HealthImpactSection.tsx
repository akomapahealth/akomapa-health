import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { healthImpact } from "@/data/impact";
import { MetricCard } from "./MetricCard";

export default function HealthImpactSection() {
  return (
    <PublicSection tone="cream" withTexture aria-labelledby="health-impact-heading">
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Health Impact"
          eyebrowTone="teal"
          titleId="health-impact-heading"
          title="Community-rooted care in motion"
          description="Every screening, referral, follow-up, and education session strengthens prevention, continuity, and access in communities facing the silent epidemic of non-communicable disease."
          className="mb-14"
        />
      </FadeIn>

      <FadeInStagger
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {healthImpact.metrics.map((metric) => (
          <FadeInStaggerItem key={metric.id} direction="up" className="h-full">
            <MetricCard
              label={metric.label}
              currentValue={metric.currentValue}
              futureValue={metric.futureValue}
              futureYear={metric.futureYear}
              icon={metric.icon}
              accent="teal"
              durationMs={2000}
            />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
