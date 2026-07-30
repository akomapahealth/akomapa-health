import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

export default function ResearchHero() {
  return (
    <EditorialBand
      tone="teal"
      aria-labelledby="research-hero-heading"
      className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
      containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <FadeIn className="lg:col-span-7 lg:pb-4">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Research &amp; Innovation
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="research-hero-heading"
            className="mt-5 max-w-4xl text-[2.1rem] text-[#FCFAEF] sm:text-[2.75rem] md:text-[3.4rem] lg:text-[3.9rem]"
          >
            Evidence-based research driving healthcare innovation.
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            Our research explores student-powered healthcare models,
            community-based interventions, and leadership development programs
            that transform how care is delivered in underserved communities.
          </EditorialLead>
        </FadeIn>

        <FadeIn direction="left" delay={0.15} className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C] lg:aspect-[4/5]">
            <Image
              src="/highlights/Akomapa-61.jpg"
              alt="Research and data collection in community settings"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </FadeIn>
      </div>
    </EditorialBand>
  );
}
