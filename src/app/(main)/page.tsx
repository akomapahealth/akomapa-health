import { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import UpdatesCarousel from "@/components/home/UpdatesCarousel";
import AkomapaMeaningSection from "@/components/home/AkomapaMeaningSection";
import ProgramsOverview from "@/components/home/ProgramsOverview";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import MissionSection from "@/components/home/MissionSection";
import HealthCrisisSection from "@/components/home/HealthCrisisSection";
import LocationSection from "@/components/home/LocationSection";
import ResearchSection from "@/components/home/ResearchSection";
import ImpactMetrics from "@/components/home/ImpactMetrics";
import Gallery from "@/components/home/Gallery";




export const metadata: Metadata = {
  title: "Akomapa Health - Improving Healthcare Access and Outcomes",
  description: "Akomapa Health is dedicated to improving healthcare access and outcomes in underserved communities through sustainable initiatives and partnerships.",
};

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AkomapaMeaningSection />
      <MissionSection />
      <ProgramsOverview />
      <HealthCrisisSection />
      <LocationSection />
      <ResearchSection />
      <ImpactMetrics />
      <UpdatesCarousel />
      <Testimonials />
      <Gallery />
      <CallToAction />
    </div>
  );
}