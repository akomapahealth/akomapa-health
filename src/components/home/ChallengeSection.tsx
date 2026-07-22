import { FadeIn } from "@/components/animations";
import {
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
} from "@/components/home/_home-ui";
import { motionDurations } from "@/lib/motion/tokens";

export type CareGapMetric = {
  value: string;
  label: string;
  sourceLabel: string;
  sourceUrl: string;
  sourceYear: number;
  dataYear?: number;
};

export const careGapMetrics = [
  {
    // Source: WHO NCD Fact Sheet, updated 25 September 2025.
    // Mortality data year: 2021.
    value: "43M",
    label: "people died from NCDs globally in 2021.",
    sourceLabel: "WHO NCD Fact Sheet",
    sourceUrl:
      "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
    sourceYear: 2025,
    dataYear: 2021,
  },
  {
    // Source: WHO NCD Fact Sheet, updated 25 September 2025.
    // Mortality data year: 2021.
    value: "75%",
    label:
      "of non-pandemic-related global deaths were caused by NCDs in 2021.",
    sourceLabel: "WHO NCD Fact Sheet",
    sourceUrl:
      "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
    sourceYear: 2025,
    dataYear: 2021,
  },
  {
    // Source: WHO NCD Fact Sheet, updated 25 September 2025.
    // Mortality data year: 2021.
    value: "73%",
    label:
      "of all NCD deaths occur in low- and middle-income countries.",
    sourceLabel: "WHO NCD Fact Sheet",
    sourceUrl:
      "https://www.who.int/news-room/fact-sheets/detail/noncommunicable-diseases",
    sourceYear: 2025,
    dataYear: 2021,
  },
  {
    // Source: Ghana STEPS Report 2023.
    // Report year: 2023.
    value: "51.1%",
    label:
      "of Ghanaian adults aged 18–69 with elevated blood pressure had not previously been diagnosed.",
    sourceLabel: "Ghana STEPS Report",
    sourceUrl:
      "https://www.afro.who.int/sites/default/files/2024-11/GHANA%20STEPS%20REPORT%202023.pdf",
    sourceYear: 2023,
  },
] satisfies readonly CareGapMetric[];

function getSourceText(metric: CareGapMetric) {
  if (metric.dataYear) {
    return `${metric.sourceLabel}, updated ${metric.sourceYear}; mortality data year ${metric.dataYear}`;
  }

  return `${metric.sourceLabel} ${metric.sourceYear}`;
}

export default function ChallengeSection() {
  const headingId = "challenge-heading";

  return (
    <HomeBand tone="cream" marker="01" aria-labelledby={headingId}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-7">
          <HomeEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            The Care Gap
          </HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4 max-w-2xl">
            The crisis is not only disease burden. It is the gap between risk,
            diagnosis, and care.
          </HomeHeading>
          <div className="mt-6 max-w-2xl space-y-5">
            <HomeLead>
              Noncommunicable diseases such as hypertension, diabetes,
              cardiovascular disease, chronic kidney disease, and stroke are
              among the defining health challenges of our time. Globally, NCDs
              caused at least 43 million deaths in 2021, with most NCD deaths
              occurring in low- and middle-income countries. In Ghana and
              across similar contexts, the challenge is not only disease
              burden. It is the gap between early risk, diagnosis, referral,
              follow-up, and long-term primary care.
            </HomeLead>
            <HomeLead>
              Too many people learn their risk only after preventable
              complications have already begun. Screening can reveal danger
              earlier, but screening alone is not enough. Communities need
              systems that help people move from risk identification to care,
              and health professionals need training to lead that process with
              competence, humility, and ethical responsibility.
            </HomeLead>
          </div>
          <p className="mt-7 max-w-2xl font-heading text-xl font-semibold leading-snug text-[#0097b2] dark:text-[#66C4DC] md:text-2xl">
            A stronger response must do two things at once: catch preventable
            disease earlier and prepare ethical health leaders who can keep
            communities connected to care.
          </p>
        </FadeIn>

        <dl className="divide-y divide-[#D8D6C8] border-y border-[#D8D6C8] dark:divide-[#2F3332] dark:border-[#2F3332] lg:col-span-5">
          {careGapMetrics.map((metric, index) => {
            const sourceText = getSourceText(metric);

            return (
              <FadeIn
                key={metric.value}
                as="div"
                direction="left"
                delay={index * motionDurations.stagger}
                className="min-w-0 py-6 first:pt-0 last:pb-0"
              >
                <dt className="font-heading text-5xl font-semibold tracking-tight text-[#0097b2] dark:text-[#66C4DC] md:text-6xl">
                  {metric.value}
                </dt>
                <dd className="mt-2 min-w-0 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base">
                  <p>{metric.label}</p>
                  <a
                    href={metric.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Source for ${metric.value}: ${sourceText} (opens in a new tab)`}
                    className="mt-2 inline-block max-w-full break-words rounded-sm text-sm font-medium text-[#2F3332] underline decoration-[#0F4C5C]/45 underline-offset-4 transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:text-[#E6E7E7] dark:decoration-[#66C4DC]/55 dark:hover:text-[#F5C94D] dark:focus-visible:ring-[#F5C94D] dark:focus-visible:ring-offset-[#121514]"
                  >
                    {sourceText}
                  </a>
                </dd>
              </FadeIn>
            );
          })}
        </dl>
      </div>
    </HomeBand>
  );
}
