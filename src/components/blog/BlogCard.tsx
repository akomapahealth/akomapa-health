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
 * Border-led editorial preview with a single, generous link target.
 */
export function BlogCard({ post }: BlogCardProps) {
  const posterSrc = getAnnouncementPosterSrc({
    image: post.image,
    videoUrl: post.videoUrl,
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:focus-visible:ring-offset-[#121514]"
    >
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden border-t-2 border-[#0F4C5C] bg-transparent dark:border-[#66C4DC]",
          "transition-colors duration-200 group-hover:bg-white/70 dark:group-hover:bg-[#1C1F1E]",
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
            {post.videoUrl && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-0.5 h-5 w-5 text-[#0097b2]" fill="currentColor" />
                </span>
              </span>
            )}

            <span
              className={cn(
                "absolute left-3 top-3 inline-block border border-white/30 px-3 py-1",
                "text-[11px] font-bold uppercase tracking-wider",
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

          <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#0097b2] transition-colors duration-200 group-hover:text-[#005A55] dark:text-[#66C4DC] dark:group-hover:text-[#eeba2b]">
            Explore this perspective
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </article>
    </Link>
  );
}
