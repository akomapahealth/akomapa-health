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
  title: string;
  body: string;
}>;

const whyAkomapaSteps = [
  {
    marker: "01",
    title: "Catch cases earlier",
    body: "We screen for hypertension, diabetes, and related risk factors so communities can identify preventable complications before they become emergencies.",
  },
  {
    marker: "02",
    title: "Close the loop to care",
    body: "We track referrals, linkage to care, and follow-up so outreach does not end at screening day.",
  },
  {
    marker: "03",
    title: "Train ethical health leaders",
    body: "We prepare students and professionals to lead community-centered NCD prevention, education, data collection, referral support, and patient advocacy.",
  },
] as const satisfies readonly WhyAkomapaStep[];

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
              "homepage-hover-card relative min-w-0 rounded-xl border border-[#D8D6C8] bg-white p-7 dark:border-[#2F3332] dark:bg-[#1C1F1E] md:p-8",
              index === whyAkomapaSteps.length - 1 &&
                "md:col-span-2 lg:col-span-1",
            )}
          >
            <span
              aria-hidden="true"
              className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#0F4C5C]/25 bg-white font-subheading text-sm font-bold tracking-[0.12em] text-[#0F4C5C] dark:border-[#66C4DC]/35 dark:bg-[#1C1F1E] dark:text-[#66C4DC]"
            >
              {step.marker}
            </span>
            {index < whyAkomapaSteps.length - 1 ? (
              <span
                aria-hidden="true"
                data-testid="why-akomapa-connector"
                className="absolute left-[5.5rem] top-[3.75rem] z-0 hidden h-px bg-[#0F4C5C]/25 dark:bg-[#66C4DC]/30 lg:block lg:-right-14"
              />
            ) : null}
            <h3 className="mt-6 font-heading text-xl font-semibold leading-snug text-[#0F4C5C] dark:text-[#66C4DC]">
              {step.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              {step.body}
            </p>
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
