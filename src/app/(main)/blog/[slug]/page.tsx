import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";

export const metadata: Metadata = {
  title: "Blog Post - Akomapa Health",
  description:
    "Read this article from the Akomapa thought leadership blog on ethical global health and community-driven care.",
};

const highlights = [
  {
    title: "Ethical Leadership",
    description:
      "Developing leaders who approach global health with humility, accountability, and respect for community expertise.",
  },
  {
    title: "Community Partnership",
    description:
      "Building equitable relationships where communities guide the priorities, methods, and measures of success.",
  },
  {
    title: "Sustainable Impact",
    description:
      "Creating lasting change through long-term commitment, local ownership, and evidence-based practice.",
  },
] as const;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <RebrandPageShell
      eyebrow="Blog"
      title={slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}
      description="This article is coming soon. Check back for the full post."
      highlights={highlights}
    />
  );
}
