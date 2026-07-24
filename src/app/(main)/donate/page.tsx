import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import DonatePageContent from "@/components/donate/DonatePageContent";

export const metadata: Metadata = buildPageMetadata("/donate");

export default function DonatePage() {
  return <DonatePageContent />;
}
