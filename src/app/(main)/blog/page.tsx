import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/blog");

export default function BlogPage() {
  return <BlogListing />;
}
