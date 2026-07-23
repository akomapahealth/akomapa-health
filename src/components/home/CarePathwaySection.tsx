import { FadeIn } from "@/components/animations";
import {
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
} from "@/components/home/_home-ui";

type CarePathwayStep = Readonly<{
  id: string;
  marker: string;
  title: string;
  description: string;
}>;

const carePathwaySteps = [
  {
    id: "screened",
    marker: "01",
    title: "Screened",
    description:
      "Community members screened for blood pressure, glucose, BMI, and related risk factors.",
  },
  {
    id: "identified",
    marker: "02",
    title: "Identified",
    description:
      "New suspected hypertension, diabetes, or high-risk cases detected.",
  },
  {
    id: "referred",
    marker: "03",
    title: "Referred",
    description:
      "Patients referred to clinics, providers, or partner facilities.",
  },
  {
    id: "linked-to-care",
    marker: "04",
    title: "Linked to care",
    description:
      "Referred patients who complete a care visit or verified follow-up.",
  },
  {
    id: "followed-up",
    marker: "05",
    title: "Followed up",
    description:
      "Patients contacted after outreach to encourage continuity of care.",
  },
  {
    id: "leaders-trained",
    marker: "06",
    title: "Leaders trained",
    description:
      "Student leaders and health professionals trained in NCD prevention, ethical leadership, referral support, and community-based care.",
  },
] as const satisfies readonly CarePathwayStep[];

export default function CarePathwaySection() {
  const headingId = "care-pathway-heading";

  return (
    <HomeBand tone="cream" marker="03" aria-labelledby={headingId}>
      <FadeIn>
        <div className="max-w-3xl">
          <HomeEyebrow>What We Measure</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4">
            From screening numbers to care outcomes.
          </HomeHeading>
          <HomeLead className="mt-6">
            Akomapa measures success beyond the number of people reached. Our
            goal is to understand whether people at risk are identified,
            referred, connected to care, and supported over time.
          </HomeLead>
        </div>
      </FadeIn>

      <ol className="mt-12 grid list-none gap-x-6 gap-y-8 md:grid-cols-2 md:gap-y-10 xl:grid-cols-6 xl:gap-x-5">
        {carePathwaySteps.map((step, index) => (
          <FadeIn
            as="li"
            key={step.id}
            delay={index * 0.08}
            className="relative min-w-0 pl-16 md:pl-0"
          >
            <div className="homepage-hover-card relative z-10 h-full rounded-xl border border-[#8C908E] bg-white p-5 dark:border-[#69706E] dark:bg-[#1C1F1E] md:p-6 xl:p-5">
              <span
                aria-hidden="true"
                className="absolute -left-16 top-0 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-[#0F4C5C] bg-[#0F4C5C] font-subheading text-sm font-bold tracking-[0.12em] text-[#FCFAEF] dark:border-[#66C4DC] dark:bg-[#66C4DC] dark:text-[#121514] md:static"
              >
                {step.marker}
              </span>
              <h3 className="font-heading text-xl font-semibold leading-snug text-[#0097b2] dark:text-[#66C4DC] md:mt-6 xl:text-lg">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base xl:text-sm">
                {step.description}
              </p>
            </div>

            {index < carePathwaySteps.length - 1 ? (
              <>
                <span
                  aria-hidden="true"
                  data-testid="care-pathway-mobile-connector"
                  className="absolute -bottom-8 left-7 top-14 w-px bg-[#527B80] dark:bg-[#7AAAB4] md:hidden"
                />
                <span
                  aria-hidden="true"
                  data-testid="care-pathway-desktop-connector"
                  className="absolute left-[4.75rem] right-[-1.25rem] top-12 z-20 hidden h-px bg-[#527B80] dark:bg-[#7AAAB4] xl:block"
                />
              </>
            ) : null}
          </FadeIn>
        ))}
      </ol>
    </HomeBand>
  );
}
