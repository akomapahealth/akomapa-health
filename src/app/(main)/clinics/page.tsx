import type { Metadata } from "next";
import { buildNoindexMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildNoindexMetadata("/clinics");

export default function ClinicsPage() {
  return <ClientPage />;
}
