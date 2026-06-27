import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import NCDHero from "@/components/ncd-impact/NCDHero";
import WhyNCDsMatter from "@/components/ncd-impact/WhyNCDsMatter";
import WhyStudentsMatter from "@/components/ncd-impact/WhyStudentsMatter";
import CommunityModel from "@/components/ncd-impact/CommunityModel";
import NCDDataViz from "@/components/ncd-impact/NCDDataViz";
import NCDImpactStats from "@/components/ncd-impact/NCDImpactStats";
import NCDFutureVision from "@/components/ncd-impact/NCDFutureVision";

export const metadata: Metadata = {
  title: "NCD Impact",
  description:
    "Discover how Akomapa addresses the global NCD epidemic through community-based screening, prevention, student-led health initiatives, and sustainable care pathways in Ghana and beyond.",
  openGraph: {
    title: "NCD Impact | Akomapa",
    description:
      "41 million lives are lost to NCDs each year. Learn how Akomapa's student-powered Community Learning & Care Hubs are addressing the NCD crisis through prevention, screening, referral, and longitudinal care.",
    type: "website",
  },
  keywords: [
    "non-communicable diseases",
    "NCD prevention",
    "community health screening",
    "Ghana health",
    "student-led health initiatives",
    "hypertension screening",
    "diabetes prevention",
    "global health equity",
    "community health hubs",
    "Akomapa",
  ],
};

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
