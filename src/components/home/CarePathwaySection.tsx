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

const desktopStepOffsets = [
  "xl:mt-0",
  "xl:mt-[1.5rem]",
  "xl:mt-[3rem]",
  "xl:mt-[4.5rem]",
  "xl:mt-[6rem]",
  "xl:mt-[7.5rem]",
] as const;

export default function CarePathwaySection() {
  const headingId = "care-pathway-heading";

  return (
    <HomeBand
      tone="teal"
      marker="03"
      aria-labelledby={headingId}
      className="bg-[#0F4C5C]"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <HomeEyebrow tone="light">What We Measure</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4">
            From screening numbers to care outcomes.
          </HomeHeading>
          <HomeLead className="mt-6 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            Akomapa measures success beyond the number of people reached. Our
            goal is to understand whether people at risk are identified,
            referred, connected to care, and supported over time.
          </HomeLead>
        </div>
      </FadeIn>

      <ol
        data-care-pathway-staircase
        className="mt-12 grid list-none gap-y-2 md:grid-cols-2 md:gap-x-10 md:gap-y-10 xl:grid-cols-6 xl:items-start xl:gap-x-5 xl:gap-y-0"
      >
        {carePathwaySteps.map((step, index) => (
          <FadeIn
            as="li"
            key={step.id}
            delay={index * 0.08}
            className={`relative min-w-0 border-b border-[#66C4DC] py-7 last:border-b-0 md:border-b-0 md:border-t-2 md:pb-0 md:pt-6 ${desktopStepOffsets[index]}`}
          >
            <span
              aria-hidden="true"
              className="absolute -top-0.5 left-0 hidden h-0.5 w-10 bg-[#eeba2b] md:block"
            />

            <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-5 md:block">
              <div className="flex items-start gap-2">
                <span
                  aria-hidden="true"
                  data-care-pathway-marker
                  className="font-heading text-[3rem] font-semibold leading-none tracking-[-0.06em] text-[#FCFAEF]/80 md:text-[3.5rem] xl:text-[3.25rem]"
                >
                  {step.marker}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 font-subheading text-lg font-bold leading-none text-[#eeba2b]"
                >
                  /
                </span>
              </div>

              <div className="min-w-0 self-center md:mt-6">
                <h3 className="break-words font-heading text-xl font-semibold leading-snug text-[#F5C94D] xl:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 break-words text-sm leading-relaxed text-[#FCFAEF]/85 md:mt-3 md:text-base xl:text-sm">
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
