import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ImpactHero from "@/components/impact/ImpactHero";
import HealthImpactSection from "@/components/impact/HealthImpactSection";
import LeadershipImpactSection from "@/components/impact/LeadershipImpactSection";
import ImpactMap from "@/components/impact/ImpactMap";
import GrowthTimeline from "@/components/impact/GrowthTimeline";
import FutureVisionSection from "@/components/impact/FutureVisionSection";
import ImpactCTA from "@/components/impact/ImpactCTA";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "Explore Akomapa's measurable impact — communities screened, referrals completed, student leaders trained, and the growing network of community health hubs working toward our 2028 goals.",
  openGraph: {
    title: "Our Impact | Akomapa",
    description:
      "Measured in communities strengthened, leaders developed, and systems transformed. See Akomapa's health and leadership impact and where we are headed by 2028.",
    type: "website",
  },
  keywords: [
    "impact",
    "global health",
    "community health",
    "NCD screening",
    "student leaders",
    "health equity",
    "Ghana health",
    "community health hubs",
    "Akomapa",
  ],
};

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
