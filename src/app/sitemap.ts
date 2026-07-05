import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { getNewsOnlyItems } from "@/data/unified-news";
import { researchPapers } from "@/data/research-papers";
import { absoluteUrl, canonicalSeoRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = canonicalSeoRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency ?? "monthly",
    priority: route.priority ?? 0.7,
  }));
  const blogRoutes = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const newsRoutes = getNewsOnlyItems().map((item) => ({
    url: absoluteUrl(`/news/${item.id}`),
    lastModified: item.date ? new Date(item.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const researchRoutes = researchPapers.map((paper) => ({
    url: absoluteUrl(`/research/${paper.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...newsRoutes, ...researchRoutes];
}
