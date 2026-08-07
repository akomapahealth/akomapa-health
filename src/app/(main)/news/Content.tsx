import Image from "@/components/common/Image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import NewsCategoryListing from "@/components/news/NewsCategoryListing";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { getNewsOnlyItems } from "@/data/unified-news";

const allItems = getNewsOnlyItems();

export default function Content() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="news-hero-heading"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <FadeIn className="lg:col-span-7 lg:pb-4">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Latest news
            </EditorialEyebrow>
            <EditorialHeading
              as="h1"
              id="news-hero-heading"
              className="mt-5 max-w-4xl text-[2.1rem] text-[#FCFAEF] sm:text-[2.75rem] md:text-[3.4rem] lg:text-[3.9rem]"
            >
              News from the frontlines
            </EditorialHeading>
            <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
              Awards, partnerships, program launches, and milestones — stay
              connected with everything shaping the future of student-powered
              healthcare.
            </EditorialLead>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <EditorialButton href="/get-involved" variant="amber">
                Get Involved
              </EditorialButton>
              <EditorialButton href="/" variant="outline-light">
                Back to Home
              </EditorialButton>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.15} className="relative lg:col-span-5">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C] lg:aspect-[4/5]">
              <Image
                src="/highlights/Akomapa-2.jpg"
                alt="Akomapa community health activities"
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="mt-5 border-t border-[#66C4DC]/55 pt-5">
              <p className="font-heading text-4xl font-semibold text-[#F5C94D] md:text-5xl">
                {allItems.length}
              </p>
              <p className="mt-2 max-w-xs text-sm font-semibold uppercase tracking-[0.16em] text-[#FCFAEF]/75">
                {allItems.length === 1 ? "story" : "stories"} — field notes,
                wins, and program news
              </p>
            </div>
          </FadeIn>
        </div>
      </EditorialBand>

      <NewsCategoryListing />

      <EditorialBand
        tone="onyx"
        aria-labelledby="news-cta-heading"
        className="border-t border-[#FCFAEF]/10"
      >
        <FadeIn className="max-w-3xl">
          <EditorialHeading id="news-cta-heading" className="text-[#FCFAEF]">
            Want to Be Part of the Story?
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            Join our movement of student leaders transforming healthcare
            delivery in underserved communities.
          </EditorialLead>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <EditorialButton href="/get-involved" variant="amber">
              Join Our Movement
            </EditorialButton>
            <EditorialButton href="/contact" variant="outline-light">
              Contact Us
            </EditorialButton>
          </div>
        </FadeIn>
      </EditorialBand>
    </div>
  );
}
