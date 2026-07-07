import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/blog";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { getAnnouncementPosterSrc } from "@/lib/video-utils";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildNotFoundMetadata,
  serializeJsonLd,
} from "@/lib/seo";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return buildNotFoundMetadata("Article Not Found");
  }

  const image = getAnnouncementPosterSrc({
    image: post.image,
    videoUrl: post.videoUrl,
  });

  return buildArticleMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image,
    publishedTime: post.date,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post.slug, post.category);
  const hasMoreByAuthor =
    blogPosts.filter((p) => p.author === post.author).length > 1;
  const image = getAnnouncementPosterSrc({
    image: post.image,
    videoUrl: post.videoUrl,
  });
  const jsonLd = buildArticleJsonLd({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image,
    publishedTime: post.date,
    author: post.author,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <BlogPost
        post={post}
        related={related}
        hasMoreByAuthor={hasMoreByAuthor}
      />
    </>
  );
}
