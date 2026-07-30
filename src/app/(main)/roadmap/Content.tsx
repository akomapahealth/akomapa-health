import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import Breadcrumb from "@/components/layout/Breadcrumb";
import RoadmapPhases from "@/components/roadmap/RoadmapPhases";
import { phases } from "@/components/roadmap/phases";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

export default function Content() {
  return (
    <>
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="cream"
        aria-labelledby="roadmap-hero-heading"
        className="relative overflow-hidden border-b border-[#1C1F1E]/10 dark:border-[#FCFAEF]/15"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden>
          <Image
            src="/highlights/Akomapa-28.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <FadeIn className="relative z-10 mx-auto max-w-4xl text-center">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Akomapa&apos;s 3-Year Roadmap
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="roadmap-hero-heading"
            className="mt-5 text-[2.35rem] sm:text-[3rem] md:text-[3.5rem]"
          >
            Building sustainable care, one step at a time.
          </EditorialHeading>
          <EditorialLead className="mx-auto mt-6 max-w-3xl">
            Our comprehensive 3-year roadmap (2025–2028) outlines our journey
            from launching essential healthcare services to building
            sustainable, replicable care models across Ghana and beyond.
          </EditorialLead>
        </FadeIn>
      </EditorialBand>

      <RoadmapPhases />

      <EditorialBand
        tone="white"
        marker="02"
        id="roadmap-timeline"
        aria-labelledby="roadmap-timeline-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Chronology
            </EditorialEyebrow>
            <EditorialHeading id="roadmap-timeline-heading" className="mt-4">
              Our Journey Timeline
            </EditorialHeading>
          </div>
        </FadeIn>

        <ol className="mt-12 border-t border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20">
          {phases.map((phase, index) => (
            <li
              key={phase.id}
              className="grid gap-3 border-b border-[#1C1F1E]/15 py-7 sm:grid-cols-[auto_1fr] sm:gap-8 dark:border-[#FCFAEF]/20"
            >
              <span
                aria-hidden="true"
                className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#0097b2]/55 dark:text-[#66C4DC]/65"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {phase.title}
                </h3>
                <p className="mt-2 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
                  {phase.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base">
                  {phase.focus}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="03"
        id="roadmap-cta"
        aria-labelledby="roadmap-cta-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Get Involved
            </EditorialEyebrow>
            <EditorialHeading
              id="roadmap-cta-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Help us bring this vision to life
            </EditorialHeading>
            <EditorialLead className="mx-auto mt-6 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Whether you&apos;re a donor, global health ally, or community
              partner — we invite you to walk this road with us.
            </EditorialLead>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <EditorialButton href="/partnerships" variant="light">
                Partner With Us
              </EditorialButton>
              <EditorialButton href="/partnerships" variant="amber">
                Donate
              </EditorialButton>
              <EditorialButton
                href="mailto:akomapahealth@gmail.com"
                variant="outline-light"
                external
              >
                Contact Us
              </EditorialButton>
            </div>
          </div>
        </FadeIn>
      </EditorialBand>
    </>
  );
}
