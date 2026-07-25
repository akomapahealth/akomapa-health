import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Content from "./Content";

export const metadata: Metadata = buildPageMetadata("/programs/akomapa-network");

export default function AkomapaNetworkPage() {
  return <Content />;
}
