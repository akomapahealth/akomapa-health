"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { FadeIn, motionDurations } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
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
        <section className="bg-[#FCFAEF] py-16 md:py-24 dark:bg-[#121514]">
          <div className="site-container mx-auto px-4 sm:px-6">
            <FadeIn
              className="mb-10 max-w-3xl"
              duration={motionDurations.enter}
            >
              <EditorialEyebrow>Author archive</EditorialEyebrow>
              <h2 className="mb-4 mt-4 font-heading text-2xl font-bold text-[#1C1F1E] sm:text-3xl md:text-4xl dark:text-[#FCFAEF]">
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
        <section className="bg-[#FCFAEF] pt-14 md:pt-20 dark:bg-[#121514]">
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
      <section className="bg-[#FCFAEF] py-14 md:py-20 dark:bg-[#121514]">
        <div className="site-container mx-auto px-4 sm:px-6">
          <FadeIn
            className="mb-8 max-w-3xl"
            duration={motionDurations.enter}
          >
            <EditorialEyebrow>Browse the journal</EditorialEyebrow>
            <EditorialHeading as="h2" className="mb-4 mt-4">
              Follow the ideas that move you
            </EditorialHeading>
            <p className="max-w-2xl text-base leading-relaxed text-[#2F3332]/70 sm:text-lg dark:text-[#E6E7E7]/70">
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

      <EditorialBand
        tone="onyx"
        aria-labelledby="thought-leadership-cta"
        className="border-t border-[#66C4DC]/35"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Add your voice
            </EditorialEyebrow>
            <EditorialHeading id="thought-leadership-cta" className="mt-4">
              Have a story to tell?
            </EditorialHeading>
            <EditorialLead className="mt-5 max-w-2xl text-[#FCFAEF]/82 dark:text-[#FCFAEF]/82">
              We welcome essays, reflections, and voices from students, faculty,
              and the communities we partner with.
            </EditorialLead>
          </div>
          <div className="flex flex-col gap-3 border-t border-[#FCFAEF]/20 pt-7 sm:flex-row lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <EditorialButton
                href="/get-involved"
                variant="amber"
                className="w-full sm:w-auto"
              >
                Share your perspective
              </EditorialButton>
              <EditorialButton
                href="/news"
                variant="outline-light"
                className="w-full sm:w-auto"
              >
                Discover what’s happening
              </EditorialButton>
          </div>
        </div>
      </EditorialBand>
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
