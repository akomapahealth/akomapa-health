import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { leadershipImpact } from "@/data/impact";
import { MetricCard } from "./MetricCard";

export default function LeadershipImpactSection() {
  return (
    <PublicSection
      tone="dark"
      withTexture
      aria-labelledby="leadership-impact-heading"
    >
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Leadership Impact"
          eyebrowTone="gold"
          titleId="leadership-impact-heading"
          title="Students trained to lead with a good heart"
          description="Leadership development is not separate from care delivery. Students grow by serving alongside communities, faculty mentors, and partner institutions across countries."
          titleClassName="text-[#FCFAEF]"
          descriptionClassName="text-[#E6E7E7]/80"
          className="mb-14"
        />
      </FadeIn>

      <FadeInStagger
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.08}
      >
        {leadershipImpact.metrics.map((metric) => (
          <FadeInStaggerItem key={metric.id} direction="up" className="h-full">
            <MetricCard
              label={metric.label}
              currentValue={metric.currentValue}
              futureValue={metric.futureValue}
              futureYear={metric.futureYear}
              icon={metric.icon}
              accent="gold"
              onDark
              durationMs={2200}
            />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
