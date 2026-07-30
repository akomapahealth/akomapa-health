"use client";

import {
  FadeInStagger,
  FadeInStaggerItem,
  motionDurations,
} from "@/components/animations";
import { PublicationEmptyState } from "@/components/publication";
import type { BlogPost } from "@/lib/types";
import { BlogCard } from "./BlogCard";

type BlogGridProps = {
  posts: BlogPost[];
  /** Re-triggers the stagger animation when the active filter changes. */
  animationKey?: string;
};

/**
 * Responsive grid of blog cards: 3 columns (desktop), 2 (tablet), 1 (mobile),
 * with a staggered scroll-reveal and an empty state.
 */
export function BlogGrid({ posts, animationKey }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="mt-12">
        <PublicationEmptyState
          title="No articles in this category yet"
          description="Check back soon for new Thought Leadership perspectives."
        />
      </div>
    );
  }

  return (
    <FadeInStagger
      key={animationKey}
      className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
      staggerDelay={motionDurations.staggerContainer}
    >
      {posts.map((post) => (
        <FadeInStaggerItem key={post.id} direction="up" className="h-full">
          <BlogCard post={post} />
        </FadeInStaggerItem>
      ))}
    </FadeInStagger>
  );
}
