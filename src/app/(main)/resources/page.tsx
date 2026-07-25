import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import ResourcesExplorer from "@/components/resources/ResourcesExplorer";

export const metadata: Metadata = buildPageMetadata("/resources");

export default function ResourcesPage() {
  return <ResourcesExplorer />;
}
