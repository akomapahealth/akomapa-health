import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import ImpactSnapshot from "@/components/home/ImpactSnapshot";
import AkomapaMeaningSection from "@/components/home/AkomapaMeaningSection";
import GoodIntentionsSection from "@/components/home/GoodIntentionsSection";
import ProgramsOverview from "@/components/home/ProgramsOverview";
import SilentEpidemicSection from "@/components/home/SilentEpidemicSection";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import AcademyPreviewSection from "@/components/home/AcademyPreviewSection";
import CommunityHubsPreviewSection from "@/components/home/CommunityHubsPreviewSection";

// Below-the-fold sections — split into their own chunks so the initial
// homepage payload does not ship carousel and animation-heavy sections until
// the user scrolls toward them.
const StudentsChangedSection = dynamic(
  () => import("@/components/home/StudentsChangedSection"),
);
const ResearchSection = dynamic(
  () => import("@/components/home/ResearchSection"),
);
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const CallToAction = dynamic(() => import("@/components/home/CallToAction"));

export const metadata: Metadata = {
  title: {
    absolute:
      "Akomapa Health | Ethical Global Health Leaders and Community-Driven Care",
  },
  description:
    "Akomapa develops ethical global health leaders through community health hubs, leadership training, research, and equitable partnerships.",
};

export default function Home() {
  return (
    <div className="flex flex-col gap-y-section-mobile md:gap-y-section-tablet lg:gap-y-section-desktop">
      <HeroSection />
      <ImpactSnapshot />
      <AkomapaMeaningSection />
      <GoodIntentionsSection />
      <ProgramsOverview />
      <SilentEpidemicSection />
      <ImpactMetrics />
      <AcademyPreviewSection />
      <CommunityHubsPreviewSection />
      <StudentsChangedSection />
      <ResearchSection />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
