import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import Image from "@/components/common/Image";
import { cn, formatDate } from "@/lib/utils";
import { getCategoryBadgeClass, getCategoryLabel } from "@/data/blog";
import { getAnnouncementPosterSrc } from "@/lib/video-utils";
import type { BlogPost } from "@/lib/types";
import { AuthorAvatar } from "./AuthorAvatar";

type BlogCardProps = {
  post: BlogPost;
};

/**
 * Editorial blog card: image, category badge, title, excerpt, author byline,
 * and date. The whole card links to the article. Mirrors the site's card
 * hover/elevation language for visual consistency with the news feed.
 */
export function BlogCard({ post }: BlogCardProps) {
  const posterSrc = getAnnouncementPosterSrc({
    image: post.image,
    videoUrl: post.videoUrl,
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:focus-visible:ring-offset-[#1C1F1E]"
    >
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-2xl",
          "bg-white dark:bg-[#2F3332]",
          "border border-black/[0.04] dark:border-white/[0.06]",
          "shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
          "transition-all duration-300 ease-out",
          "group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]",
          "dark:group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.3)]",
        )}
      >
        {/* Image */}
        {posterSrc && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={posterSrc}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

            {post.videoUrl && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-0.5 h-5 w-5 text-[#0097b2]" fill="currentColor" />
                </span>
              </span>
            )}

            <span
              className={cn(
                "absolute left-3 top-3 inline-block rounded-full px-3 py-1",
                "text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm",
                getCategoryBadgeClass(post.category),
              )}
            >
              {getCategoryLabel(post.category)}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {!posterSrc && (
            <span
              className={cn(
                "mb-3 inline-block w-fit rounded-full px-3 py-1",
                "text-[11px] font-bold uppercase tracking-wider",
                getCategoryBadgeClass(post.category),
              )}
            >
              {getCategoryLabel(post.category)}
            </span>
          )}

          <h3 className="mb-2 font-heading text-lg font-bold leading-snug text-[#1C1F1E] line-clamp-2 dark:text-[#FCFAEF]">
            {post.title}
          </h3>

          <p className="mb-5 flex-1 text-sm leading-relaxed text-[#2F3332]/70 line-clamp-3 dark:text-[#E6E7E7]/60">
            {post.excerpt}
          </p>

          {/* Byline */}
          <div className="flex items-center gap-3 border-t border-black/[0.05] pt-4 dark:border-white/[0.06]">
            <AuthorAvatar
              name={post.author}
              image={post.authorImage}
              sizeClassName="h-9 w-9"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {post.author}
              </p>
              <p className="truncate text-xs text-[#2F3332]/60 dark:text-[#E6E7E7]/50">
                {post.authorRole}
              </p>
            </div>
            <time
              dateTime={post.date}
              className="shrink-0 text-xs text-[#2F3332]/60 dark:text-[#E6E7E7]/50"
            >
              {formatDate(post.date)}
            </time>
          </div>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0097b2] transition-colors duration-200 group-hover:text-[#005A55] dark:text-[#66C4DC] dark:group-hover:text-[#eeba2b]">
            Read article
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
