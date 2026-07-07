import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildPageMetadata("/contact");

export default function ContactPage() {
  return <ClientPage />;
}
