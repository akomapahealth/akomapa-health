import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import {
  academyOverview,
  academyCurriculum,
  academyFaculty,
} from "@/data/academy";
import { LEADERSHIP_APP_FORM_URL } from "@/config/links";

const heroStats = [
  {
    value: academyCurriculum.totalDuration,
    label: "Intensive Program",
  },
  {
    value: `${academyCurriculum.modules.length}`,
    label: "Core Modules",
  },
  {
    value: `${academyFaculty.length}`,
    label: "Expert Faculty",
  },
] as const;

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t sm:border-l sm:border-t-0",
] as const;

export default function AcademyHero() {
  return (
    <EditorialBand
      tone="teal"
      aria-labelledby="academy-hero-heading"
      className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
      containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <FadeIn className="lg:col-span-7 lg:pb-4">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Leadership Development
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="academy-hero-heading"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            Akomapa Academy
          </EditorialHeading>
          <p className="mt-4 max-w-2xl font-heading text-lg font-semibold text-[#F5C94D] md:text-xl">
            {academyOverview.title}
          </p>
          <EditorialLead className="mt-5 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            {academyOverview.description}
          </EditorialLead>

          <FadeInStagger className="mt-10" staggerDelay={0.08}>
            <dl className="grid border-y border-[#FCFAEF]/25 sm:grid-cols-3">
              {heroStats.map((stat, index) => (
                <FadeInStaggerItem key={stat.label} direction="up">
                  <div
                    className={`flex min-h-28 flex-col justify-between px-1 py-6 sm:px-5 ${metricDividerClasses[index]} border-[#FCFAEF]/25`}
                  >
                    <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/70">
                      {stat.label}
                    </dt>
                    <dd className="mt-4 font-heading text-2xl font-semibold tracking-tight text-[#FCFAEF] sm:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                </FadeInStaggerItem>
              ))}
            </dl>
          </FadeInStagger>

          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <EditorialButton
              href={LEADERSHIP_APP_FORM_URL}
              variant="amber"
              external
            >
              Become a Scholar
            </EditorialButton>
            <EditorialButton href="#curriculum" variant="outline-light">
              Explore Curriculum
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
              src="/highlights/Akomapa-68.jpg"
              alt="Akomapa Academy scholars collaborating in a learning session"
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
