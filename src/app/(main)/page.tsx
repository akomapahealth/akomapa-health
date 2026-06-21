import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { BRAND } from "@/config/brand";
import HeroSection from "@/components/home/HeroSection";
import AkomapaMeaningSection from "@/components/home/AkomapaMeaningSection";
import ProgramsOverview from "@/components/home/ProgramsOverview";
import NkwapaSection from "@/components/home/NkwapaSection";
import MissionSection from "@/components/home/MissionSection";
import HealthCrisisSection from "@/components/home/HealthCrisisSection";
import LocationSection from "@/components/home/LocationSection";
import ResearchSection from "@/components/home/ResearchSection";
import ImpactMetrics from "@/components/home/ImpactMetrics";

// Below-the-fold sections — split into their own chunks so the initial
// homepage payload doesn't ship Swiper carousels, image galleries, or
// the news feed until the user scrolls toward them.
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const Gallery = dynamic(() => import("@/components/home/Gallery"));
const UpdatesFeed = dynamic(() => import("@/components/home/UpdatesFeed"));
const CallToAction = dynamic(() => import("@/components/home/CallToAction"));

export const metadata: Metadata = {
  title: {
    absolute: `Akomapa Health - ${BRAND.tagline}`,
  },
  description: BRAND.heroSubheadline,
};

export default function Home() {
  return (
    <div className="flex flex-col gap-y-section-mobile md:gap-y-section-tablet lg:gap-y-section-desktop">
      <HeroSection />
      <AkomapaMeaningSection />
      <MissionSection />
      <ProgramsOverview />
      <NkwapaSection />
      <HealthCrisisSection />
      <LocationSection />
      <ResearchSection />
      <UpdatesFeed />
      <ImpactMetrics />
      <Testimonials />
      <Gallery />
      <CallToAction />
    </div>
  );
}
