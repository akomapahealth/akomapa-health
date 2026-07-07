import type { Metadata } from "next";
import { buildNoindexMetadata } from "@/lib/seo";
import ClientPage from "./ClientPage";

export const metadata: Metadata = buildNoindexMetadata("/sentry-example-page");

export default function SentryExamplePage() {
  return <ClientPage />;
}
