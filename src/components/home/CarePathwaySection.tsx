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
        data-care-pathway-bands
        className="mt-12 grid list-none overflow-hidden md:grid-cols-2 xl:grid-cols-6"
      >
        {carePathwaySteps.map((step, index) => (
          <FadeIn
            as="li"
            key={step.id}
            delay={index * 0.08}
            className="relative min-w-0 overflow-hidden border-b border-[#FCFAEF]/60 bg-[#0F4C5C] px-5 py-7 text-[#FCFAEF] last:border-b-0 even:bg-[#16697A] md:min-h-64 md:border-b md:border-r md:px-7 md:py-9 md:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(n+5)]:border-b-0 xl:min-h-80 xl:border-b-0 xl:border-r xl:px-5 xl:py-10 xl:last:border-r-0"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-3 right-3 font-heading text-[5.5rem] font-semibold leading-none tracking-[-0.08em] text-[#FCFAEF]/10 md:-bottom-4 md:text-[7rem] xl:-bottom-2 xl:right-2 xl:text-[5.5rem]"
            >
              {step.marker}
            </span>

            <div className="relative z-10 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 md:block">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  data-care-pathway-marker
                  className="font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#F5C94D]"
                >
                  Stage {step.marker}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px w-5 bg-[#F5C94D]/80"
                />
              </div>

              <div className="min-w-0 self-center md:mt-8">
                <h3 className="break-words font-heading text-xl font-semibold leading-snug text-[#FCFAEF] xl:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 break-words text-sm leading-relaxed text-[#FCFAEF]/90 md:mt-3 md:text-base xl:text-sm">
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
