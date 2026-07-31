import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";
import Image from "@/components/common/Image";
import { cn, formatDate, readingTime } from "@/lib/utils";
import { getCategoryBadgeClass, getCategoryLabel } from "@/data/blog";
import { getAnnouncementPosterSrc } from "@/lib/video-utils";
import type { BlogPost } from "@/lib/types";
import { AuthorAvatar } from "./AuthorAvatar";

type BlogFeaturedPostProps = {
  post: BlogPost;
};

/**
 * Prominent editorial lead story with an asymmetric two-column composition.
 */
export function BlogFeaturedPost({ post }: BlogFeaturedPostProps) {
  const posterSrc = getAnnouncementPosterSrc({
    image: post.image,
    videoUrl: post.videoUrl,
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:focus-visible:ring-offset-[#121514]"
    >
      <article
        className={cn(
          "grid overflow-hidden border-y border-[#B8B5A8] lg:grid-cols-12 dark:border-[#3E555A]",
          "bg-transparent transition-colors duration-200 group-hover:bg-white/65 dark:group-hover:bg-[#1C1F1E]",
        )}
      >
        {/* Media */}
        {posterSrc && (
          <div className="relative aspect-[16/10] min-w-0 overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[390px]">
            <Image
              src={posterSrc}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            {post.videoUrl && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-0.5 h-7 w-7 text-[#0097b2]" fill="currentColor" />
                </span>
              </span>
            )}

            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 bg-[#eeba2b] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1C1F1E]">
              <Star className="h-3 w-3" fill="currentColor" />
              Featured
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:col-span-5 lg:border-l lg:border-[#B8B5A8] lg:p-10 dark:lg:border-[#3E555A]">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider",
                getCategoryBadgeClass(post.category),
              )}
            >
              {getCategoryLabel(post.category)}
            </span>
            <time
              dateTime={post.date}
              className="text-xs text-[#2F3332]/60 dark:text-[#E6E7E7]/50"
            >
              {formatDate(post.date)}
            </time>
            <span aria-hidden="true" className="text-xs text-[#2F3332]/40 dark:text-[#E6E7E7]/30">
              •
            </span>
            <span className="text-xs text-[#2F3332]/60 dark:text-[#E6E7E7]/50">
              {readingTime(post.content)}
            </span>
          </div>

          <h2 className="mb-4 font-heading text-2xl font-bold leading-tight text-[#1C1F1E] sm:text-3xl md:text-4xl dark:text-[#FCFAEF]">
            {post.title}
          </h2>

          <p className="mb-6 text-base leading-relaxed text-[#2F3332]/75 sm:text-lg dark:text-[#E6E7E7]/70">
            {post.excerpt}
          </p>

          <div className="flex min-w-0 items-center gap-3">
            <AuthorAvatar name={post.author} image={post.authorImage} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {post.author}
              </p>
              <p className="truncate text-xs text-[#2F3332]/60 dark:text-[#E6E7E7]/50">
                {post.authorRole}
                {post.authorInstitution ? ` · ${post.authorInstitution}` : ""}
              </p>
            </div>
          </div>

          <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0097b2] transition-colors duration-200 group-hover:text-[#005A55] dark:text-[#66C4DC] dark:group-hover:text-[#eeba2b]">
            Step inside this story
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}
