import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/types";
import { AuthorAvatar } from "./AuthorAvatar";

type BlogAuthorBioProps = {
  post: BlogPost;
  /** Whether the author has other posts to link to. */
  hasMorePosts: boolean;
};

/**
 * Author card shown at the end of an article: avatar, name, role/institution,
 * a short bio, and — when relevant — a link to more from the same author.
 */
export function BlogAuthorBio({ post, hasMorePosts }: BlogAuthorBioProps) {
  return (
    <aside className="mx-auto mt-12 max-w-3xl rounded-2xl border border-[#0097b2]/12 bg-gradient-to-br from-[#0097b2]/5 to-[#eeba2b]/5 p-6 sm:p-8 dark:border-[#0097b2]/20 dark:from-[#0097b2]/10 dark:to-[#eeba2b]/10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <AuthorAvatar
          name={post.author}
          image={post.authorImage}
          sizeClassName="h-16 w-16"
          className="text-lg"
        />
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0097b2] dark:text-[#66C4DC]">
            About the author
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
            {post.author}
          </h2>
          <p className="text-sm font-medium text-[#2F3332]/70 dark:text-[#E6E7E7]/60">
            {post.authorRole}
            {post.authorInstitution ? ` · ${post.authorInstitution}` : ""}
          </p>

          {post.authorBio && (
            <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/75">
              {post.authorBio}
            </p>
          )}

          {hasMorePosts && (
            <Link
              href={`/blog?author=${encodeURIComponent(post.author)}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0097b2] transition-colors hover:text-[#005A55] dark:text-[#66C4DC] dark:hover:text-[#eeba2b]"
            >
              More from {post.author.split(" ")[0]}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
