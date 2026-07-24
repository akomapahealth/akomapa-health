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

      <ol
        data-care-pathway-ledger
        className="mt-12 grid list-none border-y border-[#527B80] md:grid-cols-2 xl:grid-cols-6 dark:border-[#7AAAB4]"
      >
        {carePathwaySteps.map((step, index) => (
          <FadeIn
            as="li"
            key={step.id}
            delay={index * 0.08}
            className="relative min-w-0 border-b border-[#527B80] py-7 last:border-b-0 md:border-b md:px-7 md:py-9 md:[&:nth-child(2n+1)]:border-r md:[&:nth-child(n+5)]:border-b-0 xl:border-b-0 xl:border-r xl:px-5 xl:py-10 xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0 dark:border-[#7AAAB4]"
          >
            <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 md:block">
              <div className="flex items-center gap-3 md:block">
                <span
                  aria-hidden="true"
                  data-care-pathway-marker
                  className="font-heading text-[2.75rem] font-semibold leading-none tracking-[-0.06em] text-[#0F4C5C]/65 dark:text-[#66C4DC]/65 md:text-[3.25rem] xl:text-[3rem]"
                >
                  {step.marker}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-5 bg-[#C9920F] md:mt-5 md:block md:w-8 dark:bg-[#F5C94D]"
                />
              </div>

              <div className="min-w-0 self-center md:mt-7">
                <h3 className="break-words font-heading text-xl font-semibold leading-snug text-[#0F4C5C] dark:text-[#66C4DC] xl:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 break-words text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:mt-3 md:text-base xl:text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </ol>
    </HomeBand>
  );
}
