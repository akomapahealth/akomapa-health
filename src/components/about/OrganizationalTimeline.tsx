import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { timeline } from "@/data/timeline";

export default function OrganizationalTimeline() {
  return (
    <EditorialBand
      tone="white"
      marker="03"
      id="our-journey"
      aria-labelledby="timeline-heading"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <EditorialEyebrow>Our Journey</EditorialEyebrow>
          <EditorialHeading id="timeline-heading" className="mt-4">
            Organizational Story
          </EditorialHeading>
        </div>
        <EditorialLead className="max-w-3xl lg:col-span-7 lg:pt-8">
          From identifying the NCD epidemic to building a student-powered
          movement for ethical global health leadership.
        </EditorialLead>
      </div>

      <ol className="mt-12 border-t border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20">
        {timeline.map((event, index) => (
          <li
            key={event.id}
            data-timeline-event={event.id}
            data-milestone={event.milestone || undefined}
            className="grid gap-5 border-b border-[#1C1F1E]/15 py-7 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[10rem_minmax(0,1fr)] lg:py-9 dark:border-[#FCFAEF]/20"
          >
            <div className="flex items-baseline gap-3 sm:block">
              <span
                aria-hidden="true"
                className="font-subheading text-xs font-bold tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="font-heading text-2xl font-semibold text-[#0097b2] dark:text-[#66C4DC] sm:mt-3">
                {event.year}
              </p>
            </div>
            <div className="max-w-3xl">
              <h3 className="font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-2xl">
                {event.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
                {event.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </EditorialBand>
  );
}
