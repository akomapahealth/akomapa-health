import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import TeamPageContent from "@/components/about/TeamPageContent";

export const metadata: Metadata = buildPageMetadata("/about/team");
export default function TeamPage() {
  return <TeamPageContent />;
}
