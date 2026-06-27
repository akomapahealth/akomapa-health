import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AboutHero from "@/components/about/AboutHero";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import OrganizationalTimeline from "@/components/about/OrganizationalTimeline";
import WhatWeDoSection from "@/components/about/WhatWeDoSection";
import ExploreMoreSection from "@/components/about/ExploreMoreSection";

export const metadata: Metadata = {
  title: "About Akomapa - Building Ethical Global Health Leaders",
  description:
    "Learn about Akomapa's mission to develop ethical global health leaders who partner with communities to address health inequities and the NCD epidemic.",
};

export default function AboutPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      <AboutHero />
      <MissionVisionSection />
      <OrganizationalTimeline />
      <WhatWeDoSection />
      <ExploreMoreSection />
    </div>
  );
}
