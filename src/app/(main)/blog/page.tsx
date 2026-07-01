import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";

export const metadata: Metadata = {
  title: "Thought Leadership",
  description:
    "Student essays, faculty reflections, and community voices on ethical global health leadership and community-driven care.",
  openGraph: {
    title: "Thought Leadership | Akomapa",
    description:
      "Student essays, faculty reflections, and community voices on ethical global health, community partnership, and the future of care.",
    type: "website",
  },
  keywords: [
    "ethical leadership",
    "global health",
    "student essays",
    "faculty reflections",
    "community voices",
    "NCDs",
    "Akomapa",
  ],
};

export default function BlogPage() {
  return <BlogListing />;
}
