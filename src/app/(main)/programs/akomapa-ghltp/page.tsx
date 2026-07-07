import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildPageMetadata("/programs/akomapa-ghltp");

export default function AkomapaGhltpPage() {
  return <ClientPage />;
}
