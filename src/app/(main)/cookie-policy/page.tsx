import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import Content from "./Content";

export const metadata: Metadata = buildPageMetadata("/cookie-policy");

export default function CookiePolicyPage() {
  return <Content />;
}
