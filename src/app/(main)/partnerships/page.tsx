import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PartnershipsHero from "@/components/partnerships/PartnershipsHero";
import PartnershipPhilosophy from "@/components/partnerships/PartnershipPhilosophy";
import PartnerCategorySection from "@/components/partnerships/PartnerCategorySection";
import PartnerLogosGrid from "@/components/partnerships/PartnerLogosGrid";
import BecomePartnerCTA from "@/components/partnerships/BecomePartnerCTA";
import { partners, categoryOrder } from "@/data/partnerships";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/partnerships");

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
