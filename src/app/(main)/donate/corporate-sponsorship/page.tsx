import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildPageMetadata(
  "/donate/corporate-sponsorship",
);

export default function DonateCorporateSponsorshipPage() {
  return <ClientPage />;
}
