import Image from "@/components/common/Image";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { aboutHero } from "@/data/about";

export default function AboutHero() {
  return (
    <EditorialBand
      tone="teal"
      aria-labelledby="about-hero-heading"
      className="border-b border-[#FCFAEF]/20"
      containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-7 lg:pb-8">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            {aboutHero.eyebrow}
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="about-hero-heading"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            {aboutHero.headline}
          </EditorialHeading>
          <EditorialLead className="mt-7 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            {aboutHero.openingParagraph}
          </EditorialLead>
        </div>

        <div className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C] lg:aspect-[4/5]">
            <Image
              src="/highlights/Akomapa-69.jpg"
              alt="Akomapa student leaders and community partners working together"
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
          </div>
        </div>
      </div>
    </EditorialBand>
  );
}
