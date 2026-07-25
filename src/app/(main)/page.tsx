import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import { buildPageMetadata } from "@/lib/seo";

// Near- and below-the-fold bands — split into their own chunks so the initial
// homepage payload stays light until the user scrolls toward them.
const ChallengeSection = dynamic(
  () => import("@/components/home/ChallengeSection"),
);
const WhyAkomapaSection = dynamic(
  () => import("@/components/home/WhyAkomapaSection"),
);
const CarePathwaySection = dynamic(
  () => import("@/components/home/CarePathwaySection"),
);
const BuiltOnEvidenceSection = dynamic(
  () => import("@/components/home/BuiltOnEvidenceSection"),
);
const OurModelSection = dynamic(
  () => import("@/components/home/OurModelSection"),
);
const AkomapaMeaningSection = dynamic(
  () => import("@/components/home/AkomapaMeaningSection"),
);
const TransformationalImpactSection = dynamic(
  () => import("@/components/home/TransformationalImpactSection"),
);
const VisionSection = dynamic(() => import("@/components/home/VisionSection"));
const StoriesOfImpactSection = dynamic(
  () => import("@/components/home/StoriesOfImpactSection"),
);
const PartnersSection = dynamic(
  () => import("@/components/home/PartnersSection"),
);
const JoinTheMovementSection = dynamic(
  () => import("@/components/home/JoinTheMovementSection"),
);

export const metadata: Metadata = buildPageMetadata("/");

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <ChallengeSection />
      <WhyAkomapaSection />
      <CarePathwaySection />
      <BuiltOnEvidenceSection />
      <OurModelSection />
      <TransformationalImpactSection />
      <AkomapaMeaningSection />
      <VisionSection />
      <StoriesOfImpactSection />
      <PartnersSection />
      <JoinTheMovementSection />
    </div>
  );
}
