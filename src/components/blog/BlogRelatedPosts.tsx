import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
  motionDurations,
} from "@/components/animations";
import type { BlogPost } from "@/lib/types";
import { BlogCard } from "./BlogCard";

type BlogRelatedPostsProps = {
  posts: BlogPost[];
};

/**
 * "Continue reading" grid of 2–3 related posts shown at the end of an article.
 */
export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-black/[0.04] bg-white py-16 md:py-24 dark:border-white/[0.04] dark:bg-[#2F3332]/30">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeIn
          className="mx-auto mb-12 max-w-3xl text-center"
          duration={motionDurations.enter}
        >
          <p className="mb-2 text-base font-bold text-[#F5C94D] sm:text-lg">
            KEEP READING
          </p>
          <h2 className="font-heading text-2xl font-bold text-[#1C1F1E] sm:text-3xl md:text-4xl dark:text-[#FCFAEF]">
            More from the blog
          </h2>
        </FadeIn>

        <FadeInStagger
          className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
          staggerDelay={motionDurations.staggerContainer}
        >
          {posts.map((post) => (
            <FadeInStaggerItem key={post.id} direction="up" className="h-full">
              <BlogCard post={post} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
