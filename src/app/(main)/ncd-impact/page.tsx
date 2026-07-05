import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import NCDHero from "@/components/ncd-impact/NCDHero";
import WhyNCDsMatter from "@/components/ncd-impact/WhyNCDsMatter";
import WhyStudentsMatter from "@/components/ncd-impact/WhyStudentsMatter";
import CommunityModel from "@/components/ncd-impact/CommunityModel";
import NCDDataViz from "@/components/ncd-impact/NCDDataViz";
import NCDImpactStats from "@/components/ncd-impact/NCDImpactStats";
import NCDFutureVision from "@/components/ncd-impact/NCDFutureVision";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/ncd-impact");

export default function NcdImpactPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <NCDHero />
      <WhyNCDsMatter />
      <WhyStudentsMatter />
      <CommunityModel />
      <NCDDataViz />
      <NCDImpactStats />
      <NCDFutureVision />
    </div>
  );
}
