import Link from "next/link";
import { EditorialArrow } from "@/components/shared/EditorialPrimitives";
import type { BlogPost } from "@/lib/types";
import { AuthorAvatar } from "./AuthorAvatar";

type BlogAuthorBioProps = {
  post: BlogPost;
  /** Whether the author has other posts to link to. */
  hasMorePosts: boolean;
};

/**
 * Author panel shown at the end of an article: avatar, name, role/institution,
 * a short bio, and — when relevant — a link to more from the same author.
 */
export function BlogAuthorBio({ post, hasMorePosts }: BlogAuthorBioProps) {
  return (
    <aside className="mx-auto mt-12 max-w-3xl border border-[#1C1F1E]/12 border-l-2 border-l-[#eeba2b] bg-transparent p-6 sm:p-8 dark:border-[#FCFAEF]/15 dark:border-l-[#eeba2b]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <AuthorAvatar
          name={post.author}
          image={post.authorImage}
          sizeClassName="h-16 w-16"
          className="text-lg"
        />
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0097b2] dark:text-[#66C4DC]">
            About the author
          </p>
          <h2 className="mt-1 font-heading text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
            {post.author}
          </h2>
          <p className="text-sm font-medium text-[#2F3332]/70 dark:text-[#E6E7E7]/60">
            {post.authorRole}
            {post.authorInstitution ? ` · ${post.authorInstitution}` : ""}
          </p>

          {post.authorBio ? (
            <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/75">
              {post.authorBio}
            </p>
          ) : null}

          {hasMorePosts ? (
            <Link
              href={`/blog?author=${encodeURIComponent(post.author)}`}
              className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#eeba2b]"
            >
              More from {post.author.split(" ")[0]}
              <EditorialArrow />
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
