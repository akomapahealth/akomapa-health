"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Home,
  Link2,
  Linkedin,
  Play,
} from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn, motionDurations } from "@/components/animations";
import { cn, formatDate, readingTime } from "@/lib/utils";
import { getCategoryBadgeClass, getCategoryLabel } from "@/data/blog";
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
    <>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="container mx-auto px-4 py-4 sm:px-6"
      >
        <ol className="flex flex-wrap items-center text-sm text-[#2F3332]/70 dark:text-[#FCFAEF]/70">
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center transition-colors hover:text-[#eeba2b] dark:hover:text-[#F5C94D]"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          <li className="flex items-center">
            <ChevronRight className="mx-2 h-4 w-4 text-[#2F3332]/50 dark:text-[#FCFAEF]/50" />
            <Link
              href="/blog"
              className="transition-colors hover:text-[#eeba2b] dark:hover:text-[#F5C94D]"
            >
              Thought Leadership
            </Link>
          </li>
          <li className="flex min-w-0 items-center">
            <ChevronRight className="mx-2 h-4 w-4 shrink-0 text-[#2F3332]/50 dark:text-[#FCFAEF]/50" />
            <span className="truncate font-medium text-[#2F3332] dark:text-[#FCFAEF]">
              {post.title}
            </span>
          </li>
        </ol>
      </nav>

      <article className="flex flex-col">
        {/* Header */}
        <header className="relative overflow-hidden bg-gradient-to-br from-[#0097b2] via-[#0A6B7A] to-[#0F4C5C] py-16 sm:py-20 md:py-24">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute right-0 top-0 h-72 w-72 -translate-y-1/3 translate-x-1/3 rounded-full bg-[#FCFAEF]/8 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/3 translate-y-1/2 rounded-full bg-[#eeba2b]/10 blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#FCFAEF]/70 transition-colors hover:text-[#FCFAEF]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Thought Leadership
              </Link>
            </motion.div>

            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <span
                  className={cn(
                    "mb-5 inline-block rounded-full px-3.5 py-1.5",
                    "text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-md",
                    getCategoryBadgeClass(post.category),
                  )}
                >
                  {getCategoryLabel(post.category)}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="mb-6 font-heading text-3xl font-bold leading-tight text-[#FCFAEF] sm:text-4xl md:text-5xl"
              >
                {post.title}
              </motion.h1>

              {/* Author + meta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <AuthorAvatar name={post.author} image={post.authorImage} />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[#FCFAEF]">
                      {post.author}
                    </p>
                    <p className="text-xs text-[#FCFAEF]/70">
                      {post.authorRole}
                      {post.authorInstitution
                        ? ` · ${post.authorInstitution}`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#FCFAEF]/70">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {readingTime(post.content)}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Hero media — overlaps header */}
        {posterSrc && (
          <div className="relative z-10 -mt-8 mb-4 sm:-mt-12 md:-mt-16">
            <div className="container mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="mx-auto max-w-4xl"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 sm:rounded-3xl dark:ring-white/5">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      {post.videoUrl && (
                        <button
                          type="button"
                          onClick={() => setVideoPlaying(true)}
                          className="absolute inset-0 flex items-center justify-center"
                          aria-label="Play video"
                        >
                          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform duration-200 hover:scale-110 sm:h-24 sm:w-24">
                            <Play
                              className="ml-1 h-9 w-9 text-[#0097b2] sm:h-10 sm:w-10"
                              fill="currentColor"
                            />
                          </span>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Body */}
        <section className="bg-[#FCFAEF] py-10 md:py-14 dark:bg-[#1C1F1E]">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeIn
              className="mx-auto max-w-3xl"
              duration={motionDurations.enter}
            >
              <div
                className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[#1C1F1E] prose-p:text-[#2F3332] prose-a:text-[#0097b2] prose-blockquote:border-[#0097b2] prose-blockquote:text-[#1C1F1E] prose-strong:text-[#1C1F1E] dark:prose-invert dark:prose-p:text-[#E6E7E7]/90 dark:prose-a:text-[#66C4DC] dark:prose-blockquote:border-[#66C4DC] dark:prose-headings:text-[#FCFAEF] dark:prose-strong:text-[#FCFAEF]"
                // Content is static, first-party authored HTML — no user input.
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2 border-t border-black/[0.06] pt-6 dark:border-white/[0.08]">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#0097b2]/8 px-3 py-1 text-xs font-medium text-[#036576] dark:bg-[#0097b2]/20 dark:text-[#66C4DC]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share row */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-[#2F3332]/70 dark:text-[#E6E7E7]/60">
                  Share:
                </span>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#2F3332] transition-colors hover:border-[#0097b2]/30 hover:text-[#0097b2] dark:border-white/[0.1] dark:bg-[#2F3332] dark:text-[#E6E7E7] dark:hover:text-[#66C4DC]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#2F3332] transition-colors hover:border-[#0097b2]/30 hover:text-[#0097b2] dark:border-white/[0.1] dark:bg-[#2F3332] dark:text-[#E6E7E7] dark:hover:text-[#66C4DC]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-xs font-medium text-[#2F3332] transition-colors hover:border-[#0097b2]/30 hover:text-[#0097b2] dark:border-white/[0.1] dark:bg-[#2F3332] dark:text-[#E6E7E7] dark:hover:text-[#66C4DC]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Link2 className="h-3.5 w-3.5" />
                      Copy link
                    </>
                  )}
                </button>
              </div>

              {/* Author bio */}
              <BlogAuthorBio post={post} hasMorePosts={hasMoreByAuthor} />

              {/* CTA */}
              <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] p-8 text-center text-[#FCFAEF] sm:p-10">
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">
                  Join the conversation
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#FCFAEF]/85 sm:text-base">
                  Become part of a movement of students, faculty, and communities
                  building a more ethical future for global health.
                </p>
                <Link
                  href="/get-involved"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#eeba2b] px-6 py-3 text-sm font-semibold text-[#1C1F1E] transition-colors hover:bg-[#FCFAEF]"
                >
                  Get Involved
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Related */}
        <BlogRelatedPosts posts={related} />
      </article>
    </>
  );
}
