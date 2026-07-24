import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Content from "./Content";

export const metadata: Metadata = buildPageMetadata("/programs/akomapa-young-advocates");

export default function YoungAdvocatesPage() {
  return <Content />;
}
