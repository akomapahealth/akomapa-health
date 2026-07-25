import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Content from "./Content";

export const metadata: Metadata = buildPageMetadata("/donate/corporate-sponsorship");

export default function CorporateSponsorshipPage() {
  return <Content />;
}
