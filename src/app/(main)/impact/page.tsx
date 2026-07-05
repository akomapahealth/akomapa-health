import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ImpactHero from "@/components/impact/ImpactHero";
import HealthImpactSection from "@/components/impact/HealthImpactSection";
import LeadershipImpactSection from "@/components/impact/LeadershipImpactSection";
import ImpactMap from "@/components/impact/ImpactMap";
import GrowthTimeline from "@/components/impact/GrowthTimeline";
import FutureVisionSection from "@/components/impact/FutureVisionSection";
import ImpactCTA from "@/components/impact/ImpactCTA";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/impact");

export default function ImpactPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <ImpactHero />
      <HealthImpactSection />
      <LeadershipImpactSection />
      <ImpactMap />
      <GrowthTimeline />
      <FutureVisionSection />
      <ImpactCTA />
    </div>
  );
}
