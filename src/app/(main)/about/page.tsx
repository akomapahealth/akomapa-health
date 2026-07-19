import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AboutHero from "@/components/about/AboutHero";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import OrganizationalTimeline from "@/components/about/OrganizationalTimeline";
import WhatWeDoSection from "@/components/about/WhatWeDoSection";
import ExploreMoreSection from "@/components/about/ExploreMoreSection";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/about");

export default function AboutPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
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
