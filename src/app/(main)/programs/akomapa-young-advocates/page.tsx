import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildPageMetadata(
  "/programs/akomapa-young-advocates",
);

export default function AkomapaYoungAdvocatesPage() {
  return <ClientPage />;
}
