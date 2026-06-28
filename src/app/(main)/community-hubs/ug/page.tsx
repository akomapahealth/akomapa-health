import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CommunityHubDetailPage from "@/components/community-hubs/CommunityHubDetailPage";
import { getHubByRouteSlug } from "@/data/community-hubs";

const hub = getHubByRouteSlug("ug");

export const metadata: Metadata = {
  title: hub.name,
  description: hub.description,
};

export default function UGHubPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      <CommunityHubDetailPage hub={hub} />
    </div>
  );
}
