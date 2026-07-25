import { FadeIn } from "@/components/animations";
import {
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
} from "@/components/home/_home-ui";
import { cn } from "@/lib/utils";

type WhyAkomapaStep = Readonly<{
  marker: string;
  accent: "teal" | "gold";
  title: string;
  body: string;
}>;

const whyAkomapaSteps = [
  {
    marker: "01",
    accent: "teal",
    title: "Catch cases earlier",
    body: "We screen for hypertension, diabetes, and related risk factors so communities can identify preventable complications before they become emergencies.",
  },
  {
    marker: "02",
    accent: "gold",
    title: "Close the loop to care",
    body: "We track referrals, linkage to care, and follow-up so outreach does not end at screening day.",
  },
  {
    marker: "03",
    accent: "teal",
    title: "Train ethical health leaders",
    body: "We prepare students and professionals to lead community-centered NCD prevention, education, data collection, referral support, and patient advocacy.",
  },
] as const satisfies readonly WhyAkomapaStep[];

const markerAccentClasses: Record<WhyAkomapaStep["accent"], string> = {
  teal:
    "border-[#0F4C5C] bg-[#0F4C5C] text-[#FCFAEF] dark:border-[#66C4DC] dark:bg-[#66C4DC] dark:text-[#121514]",
  gold:
    "border-[#7A5200] bg-[#eeba2b] text-[#1C1F1E] dark:border-[#F5C94D] dark:bg-[#F5C94D] dark:text-[#121514]",
};

export default function WhyAkomapaSection() {
  const headingId = "why-akomapa-heading";

  return (
    <HomeBand tone="white" marker="02" aria-labelledby={headingId}>
      <FadeIn>
        <div className="max-w-3xl">
          <HomeEyebrow>Why Akomapa</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4">
            One model. Two challenges. Lasting impact.
          </HomeHeading>
          <HomeLead className="mt-6">
            Most interventions focus on either community care or professional
            training. Akomapa brings both together. Through Community Learning
            &amp; Care Hubs, we support early NCD detection, referral, follow-up,
            and health education while training student leaders and health
            professionals to serve with clinical competence, cultural humility,
            and ethical leadership.
          </HomeLead>
        </div>
      </FadeIn>

      <ol className="mt-12 grid list-none gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {whyAkomapaSteps.map((step, index) => (
          <FadeIn
            as="li"
            key={step.marker}
            delay={index * 0.08}
            className={cn(
              "relative min-w-0",
              index === whyAkomapaSteps.length - 1 &&
                "md:col-span-2 lg:col-span-1",
            )}
          >
            <div className="homepage-hover-card relative h-full rounded-xl border border-[#8C908E] bg-white p-7 dark:border-[#69706E] dark:bg-[#1C1F1E] md:p-8">
              <span
                aria-hidden="true"
                data-accent={step.accent}
                className={cn(
                  "relative z-10 flex h-14 w-14 items-center justify-center rounded-full border font-subheading text-sm font-bold tracking-[0.12em]",
                  markerAccentClasses[step.accent],
                )}
              >
                {step.marker}
              </span>
              {index < whyAkomapaSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  data-testid="why-akomapa-connector"
                  className="absolute left-[5.5rem] top-[3.75rem] z-0 hidden h-px bg-[#527B80] dark:bg-[#7AAAB4] lg:block lg:-right-14"
                />
              ) : null}
              <h3 className="mt-6 font-heading text-xl font-semibold leading-snug text-[#0097b2] dark:text-[#66C4DC]">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]">
                {step.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </ol>

      <FadeIn delay={0.1}>
        <p className="mt-12 max-w-3xl font-heading text-xl font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF] md:text-2xl">
          Akomapa is building healthier communities by caring for today&apos;s
          patients and preparing tomorrow&apos;s NCD-ready health leaders.
        </p>
      </FadeIn>
    </HomeBand>
  );
}
