import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import GetInvolvedHero from "@/components/get-involved/GetInvolvedHero";
import PathwaysGrid from "@/components/get-involved/PathwaysGrid";
import CurrentOpportunities from "@/components/get-involved/CurrentOpportunities";
import GetInvolvedFAQ from "@/components/get-involved/GetInvolvedFAQ";
import GetInvolvedCTA from "@/components/get-involved/GetInvolvedCTA";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/get-involved");

export default function GetInvolvedPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>
      <GetInvolvedHero />
      <PathwaysGrid />
      <CurrentOpportunities />
      <GetInvolvedFAQ />
      <GetInvolvedCTA />
    </div>
  );
}
