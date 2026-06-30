import { FadeIn } from "@/components/animations";
import {
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
} from "@/components/home/_home-ui";

const stats = [
  {
    value: "74%",
    label: "of deaths worldwide are caused by noncommunicable diseases.",
  },
  {
    value: "43M",
    label: "lives were lost to NCDs in 2021 alone.",
  },
  {
    value: "73%",
    label: "of NCD deaths occur in low- and middle-income countries.",
  },
];

export default function ChallengeSection() {
  const headingId = "challenge-heading";

  return (
    <HomeBand tone="cream" marker="01" aria-labelledby={headingId}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-7">
          <HomeEyebrow>The Challenge</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4 max-w-2xl">
            The world&rsquo;s fastest-growing health crisis deserves a stronger
            response.
          </HomeHeading>
          <div className="mt-6 max-w-2xl space-y-5">
            <HomeLead>
              Noncommunicable diseases — including hypertension, diabetes,
              cardiovascular disease, and chronic kidney disease — are
              responsible for 74% of deaths worldwide. Their burden is rising
              fastest in low- and middle-income countries, where communities
              face growing rates of chronic illness but often lack reliable
              access to prevention, early diagnosis, and continuous primary
              care.
            </HomeLead>
            <HomeLead>
              Hypertension and diabetes have become silent epidemics across the
              region. Too many people are diagnosed only after suffering
              preventable complications such as stroke, heart failure, kidney
              disease, or blindness.
            </HomeLead>
          </div>
          <p className="mt-7 max-w-2xl font-heading text-xl font-semibold leading-snug text-[#0097b2] dark:text-[#66C4DC] md:text-2xl">
            But the challenge extends beyond access alone. Communities need
            stronger systems of care — and tomorrow&rsquo;s professionals need
            better preparation to lead them. Improving outcomes requires both.
          </p>
        </FadeIn>

        <FadeIn direction="left" className="lg:col-span-5">
          <dl className="divide-y divide-[#D8D6C8] border-y border-[#D8D6C8] dark:divide-[#2F3332] dark:border-[#2F3332]">
            {stats.map((stat) => (
              <div key={stat.value} className="py-6 first:pt-0 last:pb-0">
                <dt className="font-heading text-5xl font-semibold tracking-tight text-[#0097b2] dark:text-[#66C4DC] md:text-6xl">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75 md:text-base">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
    </HomeBand>
  );
}
