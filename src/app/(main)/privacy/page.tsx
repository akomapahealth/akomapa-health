import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Content from "./Content";

export const metadata: Metadata = buildPageMetadata("/privacy");

export default function PrivacyPage() {
  return <Content />;
}
