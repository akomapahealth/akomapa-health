import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FiveMissions from "@/components/community-hubs/FiveMissions";
import HubActivities from "@/components/community-hubs/HubActivities";
import HubCardGrid from "@/components/community-hubs/HubCardGrid";
import HubsHero from "@/components/community-hubs/HubsHero";
import WhyHubsMatter from "@/components/community-hubs/WhyHubsMatter";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/community-hubs");

export default function CommunityHubsPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>
      <HubsHero />
      <FiveMissions />
      <HubActivities />
      <HubCardGrid />
      <WhyHubsMatter />
    </div>
  );
}
