import type { Metadata } from "next";
import { buildNoindexMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildNoindexMetadata("/clinics/akomapa-ucc");

export default function AkomapaUccClinicPage() {
  return <ClientPage />;
}
