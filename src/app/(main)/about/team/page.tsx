import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildPageMetadata("/about/team");

export default function TeamPage() {
  return <ClientPage />;
}
