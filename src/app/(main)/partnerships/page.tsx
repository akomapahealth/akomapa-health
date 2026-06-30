import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PartnershipsHero from "@/components/partnerships/PartnershipsHero";
import PartnershipPhilosophy from "@/components/partnerships/PartnershipPhilosophy";
import PartnerCategorySection from "@/components/partnerships/PartnerCategorySection";
import PartnerLogosGrid from "@/components/partnerships/PartnerLogosGrid";
import BecomePartnerCTA from "@/components/partnerships/BecomePartnerCTA";
import { partners, categoryOrder } from "@/data/partnerships";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Explore Akomapa's equitable partnerships with universities, communities, government agencies, and global collaborators advancing health equity.",
  openGraph: {
    title: "Partnerships | Akomapa",
    description:
      "Creating equitable collaborations across institutions, disciplines, and countries to advance global health equity.",
    type: "website",
  },
  keywords: [
    "partnerships",
    "global health",
    "university partnerships",
    "community health",
    "health equity",
    "Ghana health",
    "Yale",
    "University of Cape Coast",
    "University of Ghana",
    "UCLA",
    "Akomapa",
  ],
};

export default function PartnershipsPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <PartnershipsHero />
      <PartnershipPhilosophy />

      {categoryOrder.map((category, index) => (
        <PartnerCategorySection
          key={category}
          category={category}
          partners={partners.filter((p) => p.category === category)}
          index={index}
        />
      ))}

      <PartnerLogosGrid />
      <BecomePartnerCTA />
    </div>
  );
}
