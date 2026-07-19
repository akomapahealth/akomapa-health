import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildPageMetadata("/roadmap");

export default function RoadmapPage() {
  return <ClientPage />;
}
