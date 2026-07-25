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
  kind?: "statement";
};

export const careGapMetrics = [
  {
    value: "74%",
    label:
      "of deaths worldwide are caused by noncommunicable diseases with 75% of them in low and middle-income countries.",
  },
  {
    value: "34M+",
    label:
      "adults in the WHO African Region are without essential NCD care, many because they remain undiagnosed.",
  },
  {
    value: "1 in 3",
    label:
      "patients with hypertension or diabetes in a large Ghanaian study were lost to follow-up after entering care.",
  },
  {
    value: "Tomorrow's health systems need better-prepared professionals.",
    label:
      "Future healthcare leaders need more opportunities to learn community-based, interprofessional, and ethical models of care before entering practice.",
    kind: "statement",
  },
] satisfies readonly CareGapMetric[];

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
            The world&apos;s fastest-growing health crisis demands a better
            system of care.
          </HomeHeading>
          <div className="mt-6 max-w-2xl space-y-5">
            <HomeLead>
              Noncommunicable diseases—including hypertension, diabetes,
              cardiovascular disease, and chronic kidney disease—are
              responsible for 74% of deaths worldwide. Their burden is rising
              fastest in low- and middle-income countries, where communities
              face growing rates of chronic illness but often lack reliable
              access to prevention, early diagnosis, and continuous primary
              care.
            </HomeLead>
            <HomeLead>
              Hypertension and diabetes have become silent epidemics. Millions
              of people remain undiagnosed until preventable complications such
              as stroke, heart failure, kidney disease, or blindness occur.{" "}
              Even after diagnosis, too many patients never begin treatment or
              are lost during follow-up, allowing preventable diseases to
              become life-threatening.
            </HomeLead>
            <HomeLead>
              But the challenge extends beyond access to care. Health systems
              need stronger community-based models that guide people from
              screening to diagnosis, treatment, and lifelong care. They also
              need a new generation of health professionals equipped to lead
              that transformation through ethical, interprofessional, and
              community-centred practice.
            </HomeLead>
          </div>
          <p className="mt-7 max-w-2xl font-heading text-xl font-semibold leading-snug text-[#0097b2] dark:text-[#66C4DC] md:text-2xl">
            That&apos;s the gap Akomapa was created to close.
          </p>
        </FadeIn>

        <dl className="divide-y divide-[#D8D6C8] border-y border-[#D8D6C8] dark:divide-[#2F3332] dark:border-[#2F3332] lg:col-span-5">
          {careGapMetrics.map((metric, index) => (
            <FadeIn
              key={metric.value}
              as="div"
              direction="left"
              delay={index * motionDurations.stagger}
              className="min-w-0 py-6 first:pt-0 last:pb-0"
            >
              <dt
                className={
                  metric.kind === "statement"
                    ? "max-w-xl font-heading text-2xl font-semibold leading-tight text-[#0097b2] dark:text-[#66C4DC] md:text-3xl"
                    : "font-heading text-5xl font-semibold tracking-tight text-[#0097b2] dark:text-[#66C4DC] md:text-6xl"
                }
              >
                {metric.value}
              </dt>
              <dd className="mt-2 min-w-0 text-sm font-semibold leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7] md:text-base">
                {metric.label}
              </dd>
            </FadeIn>
          ))}
        </dl>
      </div>
    </HomeBand>
  );
}
