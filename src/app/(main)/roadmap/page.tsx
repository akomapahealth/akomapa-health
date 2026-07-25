import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Content from "./Content";

export const metadata: Metadata = buildPageMetadata("/roadmap");

export default function RoadmapPage() {
  return <Content />;
}
