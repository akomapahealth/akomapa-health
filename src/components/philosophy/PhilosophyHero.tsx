import Image from "@/components/common/Image";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { silentEpidemicContent } from "@/data/homepage-narrative";

const philosophyStats = silentEpidemicContent.metrics.map((metric) => ({
  ...metric,
  displayValue: `${metric.value}${
    metric.suffix === " million" ? "M" : (metric.suffix ?? "")
  }`,
}));

export default function PhilosophyHero() {
  return (
    <EditorialBand
      tone="teal"
      aria-labelledby="philosophy-hero-heading"
      className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-7">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Ethics, Partnership, Impact
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="philosophy-hero-heading"
            className="mt-5 text-[2.5rem] text-[#FCFAEF] sm:text-[3.25rem] lg:text-[4.5rem]"
          >
            Our Philosophy
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            Building a different future for global health &mdash; one rooted in
            ethics, partnership, and sustainable impact.
          </EditorialLead>

          <dl
            data-philosophy-metrics
            className="mt-9 grid border-y border-[#FCFAEF]/30 sm:grid-cols-3"
          >
            {philosophyStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`py-5 sm:px-5 ${
                  index > 0
                    ? "border-t border-[#FCFAEF]/30 sm:border-l sm:border-t-0"
                    : ""
                }`}
              >
                <dd className="font-heading text-2xl font-semibold text-[#FCFAEF] sm:text-3xl">
                  {stat.displayValue}
                </dd>
                <dt className="mt-2 text-sm leading-snug text-[#FCFAEF]/75">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EditorialButton
              href="/get-involved"
              variant="amber"
              className="focus-visible:ring-[#F5C94D]"
            >
              Join Us
            </EditorialButton>
            <EditorialButton
              href="/partnerships"
              variant="outline-light"
              className="focus-visible:ring-[#F5C94D]"
            >
              Partner With Us
            </EditorialButton>
          </div>
        </div>

        <figure className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C]">
            <Image
              src="/highlights/Akomapa-73.jpg"
              alt="Akomapa student leaders and community partners gathered together"
              fill
              priority
              sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 38vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
          </div>
        </figure>
      </div>
    </EditorialBand>
  );
}
