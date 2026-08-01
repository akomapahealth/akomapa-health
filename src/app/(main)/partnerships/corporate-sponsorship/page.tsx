import type { Metadata } from "next";
import CorporateSponsorshipContent from "@/components/partnerships/CorporateSponsorshipContent";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(
  "/partnerships/corporate-sponsorship",
);

export default function CorporateSponsorshipPage() {
  return <CorporateSponsorshipContent />;
}
