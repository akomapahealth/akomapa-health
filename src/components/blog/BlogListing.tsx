"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { FadeIn, motionDurations } from "@/components/animations";
import {
  BlogCategoryFilter,
  BlogFeaturedPost,
  BlogGrid,
  BlogHero,
  type BlogFilterOption,
} from "@/components/blog";
import {
  getActiveCategories,
  getAllBlogPosts,
  getFeaturedPost,
} from "@/data/blog";

const ALL = "all";

const allPosts = getAllBlogPosts();
const featuredPost = getFeaturedPost();

const filterOptions: BlogFilterOption[] = [
  { value: ALL, label: "All" },
  ...getActiveCategories().map((category) => ({
    value: category.value,
    label: category.filterLabel,
  })),
];

function BlogListingContent() {
  const searchParams = useSearchParams();
  const authorFilter = searchParams.get("author");
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  // Author view: everything by a single author, no category pills.
  const authorPosts = useMemo(
    () =>
      authorFilter
        ? allPosts.filter((post) => post.author === authorFilter)
        : [],
    [authorFilter],
  );

  const gridPosts = useMemo(() => {
    if (activeCategory === ALL) {
      return featuredPost
        ? allPosts.filter((post) => post.id !== featuredPost.id)
        : allPosts;
    }
    return allPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const showFeatured = activeCategory === ALL && Boolean(featuredPost);

  if (authorFilter) {
    return (
      <>
        <div className="site-container mx-auto">
          <Breadcrumb />
        </div>
        <BlogHero postCount={allPosts.length} />
        <section className="bg-[#FCFAEF] py-16 md:py-24 dark:bg-[#1C1F1E]">
          <div className="site-container mx-auto px-4 sm:px-6">
            <FadeIn
              className="mx-auto mb-10 max-w-3xl text-center"
              duration={motionDurations.enter}
            >
              <p className="mb-2 text-base font-bold text-[#F5C94D] sm:text-lg">
                AUTHOR
              </p>
              <h2 className="mb-4 font-heading text-2xl font-bold text-[#1C1F1E] sm:text-3xl md:text-4xl dark:text-[#FCFAEF]">
                Stories by {authorFilter}
              </h2>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0097b2] transition-colors hover:text-[#005A55] dark:text-[#66C4DC] dark:hover:text-[#eeba2b]"
              >
                <X className="h-4 w-4" />
                Clear author filter
              </Link>
            </FadeIn>
            <BlogGrid posts={authorPosts} animationKey={authorFilter} />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <BlogHero postCount={allPosts.length} />

      {/* Featured */}
      {showFeatured && featuredPost && (
        <section className="bg-[#FCFAEF] pt-14 md:pt-20 dark:bg-[#1C1F1E]">
          <div className="site-container mx-auto px-4 sm:px-6">
            <FadeIn
              className="mx-auto max-w-6xl"
              duration={motionDurations.enter}
            >
              <BlogFeaturedPost post={featuredPost} />
            </FadeIn>
          </div>
        </section>
      )}

      {/* Grid + filter */}
      <section className="bg-[#FCFAEF] py-14 md:py-20 dark:bg-[#1C1F1E]">
        <div className="site-container mx-auto px-4 sm:px-6">
          <FadeIn
            className="mx-auto mb-8 max-w-3xl text-center"
            duration={motionDurations.enter}
          >
            <p className="mb-2 text-base font-bold text-[#F5C94D] sm:text-lg">
              ALL ARTICLES
            </p>
            <h2 className="mb-4 font-heading text-2xl font-bold text-[#1C1F1E] sm:text-3xl md:text-4xl dark:text-[#FCFAEF]">
              Explore by category
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#2F3332]/70 sm:text-lg dark:text-[#E6E7E7]/60">
              Perspectives from students, faculty, and communities across the
              Akomapa network.
            </p>
          </FadeIn>

          <FadeIn className="mb-10" duration={motionDurations.enter}>
            <BlogCategoryFilter
              options={filterOptions}
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </FadeIn>

          <BlogGrid posts={gridPosts} animationKey={activeCategory} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] py-16 text-[#FCFAEF] md:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-32 -top-28 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="site-container relative mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
              Have a story to tell?
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
              We welcome essays, reflections, and voices from students, faculty,
              and the communities we partner with.
            </p>
            <div className="flex flex-col justify-center gap-4 pt-2 sm:flex-row">
              <Link
                href="/get-involved"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eeba2b] px-8 py-3 text-sm font-semibold text-[#1C1F1E] transition-colors hover:bg-[#FCFAEF]"
              >
                Get Involved
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/news"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#FCFAEF]/30 px-8 py-3 text-sm font-semibold text-[#FCFAEF] transition-colors hover:bg-[#FCFAEF]/10"
              >
                Read the latest news
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Client-side blog listing: hero, featured post, category filter, and the
 * responsive post grid. Wrapped in Suspense because it reads search params.
 */
export function BlogListing() {
  return (
    <Suspense fallback={null}>
      <BlogListingContent />
    </Suspense>
  );
}
