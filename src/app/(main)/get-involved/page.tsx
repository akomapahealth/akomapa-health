import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import GetInvolvedHero from "@/components/get-involved/GetInvolvedHero";
import PathwaysGrid from "@/components/get-involved/PathwaysGrid";
import CurrentOpportunities from "@/components/get-involved/CurrentOpportunities";
import GetInvolvedFAQ from "@/components/get-involved/GetInvolvedFAQ";
import GetInvolvedCTA from "@/components/get-involved/GetInvolvedCTA";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join Akomapa as a student leader, Academy scholar, faculty mentor, researcher, partner, or supporter advancing ethical and equitable global health leadership.",
  openGraph: {
    title: "Get Involved | Akomapa",
    description:
      "Six distinct pathways to help build a new model for ethical global health leadership — for students, clinicians, researchers, partners, and supporters.",
    type: "website",
  },
  keywords: [
    "get involved",
    "volunteer",
    "student leadership",
    "faculty mentorship",
    "global health research",
    "partnerships",
    "donate",
    "ethical leadership",
    "community health",
    "Akomapa",
  ],
};

export default function GetInvolvedPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="container mx-auto">
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
