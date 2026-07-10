import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CommunityHubDetailPage from "@/components/community-hubs/CommunityHubDetailPage";
import { getHubByRouteSlug } from "@/data/community-hubs";
import { buildPageMetadata } from "@/lib/seo";

const hub = getHubByRouteSlug("ucc");

export const metadata: Metadata = buildPageMetadata("/community-hubs/ucc");

export default function UCCHubPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>
      <CommunityHubDetailPage hub={hub} />
    </div>
  );
}
