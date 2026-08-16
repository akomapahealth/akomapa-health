import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import DonatePageContent from "@/components/donate/DonatePageContent";

export const metadata: Metadata = buildPageMetadata("/donate");

type DonatePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const params = await searchParams;
  const initialSection =
    params.entry === "one-time" ? "one-time" : "partner";

  return <DonatePageContent initialSection={initialSection} />;
}
