"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Home,
  Link2,
  Linkedin,
} from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn, motionDurations } from "@/components/animations";
import {
  PublicationArticleMeasure,
  PublicationBackLink,
  PublicationMeta,
} from "@/components/publication";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
  EditorialPlay,
} from "@/components/shared/EditorialPrimitives";
import { formatDate, readingTime } from "@/lib/utils";
import { getCategoryLabel } from "@/data/blog";
import { getAnnouncementPosterSrc, parseVideoUrl } from "@/lib/video-utils";
import type { BlogPost as BlogPostType } from "@/lib/types";
import { AuthorAvatar } from "./AuthorAvatar";
import { BlogAuthorBio } from "./BlogAuthorBio";
import { BlogRelatedPosts } from "./BlogRelatedPosts";

type BlogPostProps = {
  post: BlogPostType;
  related: BlogPostType[];
  hasMoreByAuthor: boolean;
};

/**
 * Full editorial article view: header, hero media, prose body, share row,
 * author bio, and related posts. Renders trusted, first-party HTML content.
 */
export function BlogPost({ post, related, hasMoreByAuthor }: BlogPostProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const posterSrc = getAnnouncementPosterSrc({
    image: post.image,
    videoUrl: post.videoUrl,
  });

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — silently ignore.
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <nav
        aria-label="Breadcrumb"
        className="site-container mx-auto px-4 py-4 sm:px-6"
      >
        <ol className="flex flex-wrap items-center text-sm text-[#2F3332]/70 dark:text-[#FCFAEF]/70">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex min-h-11 min-w-11 items-center transition-colors hover:text-[#eeba2b] dark:hover:text-[#F5C94D]"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight
              className="mx-2 h-4 w-4 text-[#2F3332]/50 dark:text-[#FCFAEF]/50"
              aria-hidden="true"
            />
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center transition-colors hover:text-[#eeba2b] dark:hover:text-[#F5C94D]"
            >
              Thought Leadership
            </Link>
          </li>
          <li className="flex min-w-0 items-center">
            <ChevronRight
              className="mx-2 h-4 w-4 shrink-0 text-[#2F3332]/50 dark:text-[#FCFAEF]/50"
              aria-hidden="true"
            />
            <span className="truncate font-medium text-[#2F3332] dark:text-[#FCFAEF]">
              {post.title}
            </span>
          </li>
        </ol>
      </nav>

      <article>
        <EditorialBand
          tone="teal"
          aria-labelledby="blog-post-heading"
          className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
          containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
        >
          <PublicationBackLink href="/blog" tone="light">
            Back to Thought Leadership
          </PublicationBackLink>

          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            {getCategoryLabel(post.category)}
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="blog-post-heading"
            className="mt-5 max-w-4xl text-[1.85rem] text-[#FCFAEF] sm:text-[2.35rem] md:text-[2.85rem] lg:text-[3.25rem]"
          >
            {post.title}
          </EditorialHeading>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <AuthorAvatar name={post.author} image={post.authorImage} />
              <div>
                <p className="text-sm font-semibold text-[#FCFAEF]">
                  {post.author}
                </p>
                <p className="text-xs text-[#FCFAEF]/75">
                  {post.authorRole}
                  {post.authorInstitution
                    ? ` · ${post.authorInstitution}`
                    : ""}
                </p>
              </div>
            </div>
            <PublicationMeta
              className="text-[#FCFAEF]/85 [&_dd]:text-[#FCFAEF]"
              items={[
                {
                  label: "Published",
                  value: formatDate(post.date),
                  dateTime: post.date,
                },
                {
                  label: "Reading time",
                  value: readingTime(post.content),
                },
              ]}
            />
          </div>
        </EditorialBand>

        {posterSrc ? (
          <EditorialBand
            tone="cream"
            aria-label="Article media"
            containerClassName="py-10 md:py-12"
          >
            <FadeIn className="mx-auto max-w-4xl">
              <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-[#1C1F1E]/10 dark:border-[#FCFAEF]/15">
                {post.videoUrl && videoPlaying ? (
                  <iframe
                    src={parseVideoUrl(post.videoUrl)?.embedUrl}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    title={post.title}
                  />
                ) : (
                  <>
                    <Image
                      src={posterSrc}
                      alt={post.title}
                      fill
                      priority
                      sizes="(min-width: 1024px) 56rem, 100vw"
                      className="object-cover"
                    />
                    {post.videoUrl ? (
                      <button
                        type="button"
                        onClick={() => setVideoPlaying(true)}
                        className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2"
                        aria-label="Play video"
                      >
                        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#FCFAEF]/40 bg-[#0F4C5C]/90 text-[#FCFAEF] sm:h-20 sm:w-20">
                          <EditorialPlay className="h-5 w-5 sm:h-6 sm:w-6" />
                        </span>
                      </button>
                    ) : null}
                  </>
                )}
              </div>
            </FadeIn>
          </EditorialBand>
        ) : null}

        <EditorialBand
          tone="cream"
          aria-labelledby="blog-post-body-heading"
          containerClassName="py-10 md:py-14 lg:py-16"
        >
          <h2 id="blog-post-body-heading" className="sr-only">
            Article body
          </h2>
          <PublicationArticleMeasure className="max-w-3xl">
            <FadeIn duration={motionDurations.enter}>
              <div
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[#1C1F1E] prose-p:text-[#2F3332] prose-a:text-[#0097b2] prose-blockquote:border-[#eeba2b] prose-blockquote:text-[#1C1F1E] prose-strong:text-[#1C1F1E] dark:prose-invert dark:prose-p:text-[#E6E7E7]/90 dark:prose-a:text-[#66C4DC] dark:prose-blockquote:border-[#eeba2b] dark:prose-headings:text-[#FCFAEF] dark:prose-strong:text-[#FCFAEF]"
                // Content is static, first-party authored HTML — no user input.
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags.length > 0 ? (
                <ul className="mt-10 flex list-none flex-wrap gap-2 border-t border-[#1C1F1E]/10 p-0 pt-6 dark:border-[#FCFAEF]/15">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-[#1C1F1E]/15 px-3 py-1 text-xs font-medium text-[#0F4C5C] dark:border-[#FCFAEF]/20 dark:text-[#66C4DC]"
                    >
                      #{tag}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-[#2F3332]/70 dark:text-[#E6E7E7]/60">
                  Share:
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#1C1F1E]/15 text-[#2F3332] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:border-[#FCFAEF]/20 dark:text-[#E6E7E7]"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[#1C1F1E]/15 text-[#2F3332] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:border-[#FCFAEF]/20 dark:text-[#E6E7E7]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-11 items-center gap-1.5 border border-[#1C1F1E]/15 px-3 text-xs font-medium text-[#2F3332] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:border-[#FCFAEF]/20 dark:text-[#E6E7E7]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Copy link
                    </>
                  )}
                </button>
              </div>

              <BlogAuthorBio post={post} hasMorePosts={hasMoreByAuthor} />
            </FadeIn>
          </PublicationArticleMeasure>
        </EditorialBand>

        <EditorialBand
          tone="onyx"
          aria-labelledby="blog-join-heading"
          className="border-t border-[#FCFAEF]/10"
        >
          <FadeIn className="max-w-3xl">
            <EditorialHeading id="blog-join-heading" className="text-[#FCFAEF]">
              Join the conversation
            </EditorialHeading>
            <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Become part of a movement of students, faculty, and communities
              building a more ethical future for global health.
            </EditorialLead>
            <EditorialButton
              href="/get-involved"
              variant="amber"
              className="mt-8"
            >
              Get Involved
            </EditorialButton>
          </FadeIn>
        </EditorialBand>

        <BlogRelatedPosts posts={related} />
      </article>
    </div>
  );
}
