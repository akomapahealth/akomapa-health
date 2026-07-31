import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
  motionDurations,
} from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
} from "@/components/shared/EditorialPrimitives";
import type { BlogPost } from "@/lib/types";
import { BlogCard } from "./BlogCard";

type BlogRelatedPostsProps = {
  posts: BlogPost[];
};

/**
 * Related posts shown at the end of an article.
 */
export function BlogRelatedPosts({ posts }: BlogRelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <EditorialBand
      tone="white"
      aria-labelledby="blog-related-heading"
      className="border-t border-[#1C1F1E]/8 dark:border-[#FCFAEF]/10"
    >
      <FadeIn duration={motionDurations.enter}>
        <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
          Keep Reading
        </EditorialEyebrow>
        <EditorialHeading id="blog-related-heading" className="mt-4">
          More from Thought Leadership
        </EditorialHeading>
      </FadeIn>

      <FadeInStagger
        className="mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        staggerDelay={motionDurations.staggerContainer}
      >
        {posts.map((post) => (
          <FadeInStaggerItem key={post.id} direction="up" className="h-full">
            <BlogCard post={post} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </EditorialBand>
  );
}
