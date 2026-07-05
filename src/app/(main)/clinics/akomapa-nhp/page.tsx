import type { Metadata } from "next";
import { buildNoindexMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildNoindexMetadata("/clinics/akomapa-nhp");

export default function AkomapaNhpClinicPage() {
  return <ClientPage />;
}
