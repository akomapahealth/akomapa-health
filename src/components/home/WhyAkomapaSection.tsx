import { FadeIn } from "@/components/animations";
import {
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
} from "@/components/home/_home-ui";

const deserves = [
  {
    label: "Communities",
    body: "deserve high-quality, continuous primary care close to home.",
  },
  {
    label: "Students",
    body: "deserve an education that prepares them to become ethical, collaborative, community-centered professionals.",
  },
  {
    label: "Health systems",
    body: "deserve models that strengthen care and leadership simultaneously.",
  },
];

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
            Most organizations focus on either delivering healthcare or
            educating future professionals. Akomapa integrates both. Our
            Community Learning &amp; Care Hubs combine community-based prevention
            and primary care with ethical leadership training, interprofessional
            education, research, and long-term partnerships with existing health
            systems.
          </HomeLead>
        </div>
      </FadeIn>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-[#E6E7E7] bg-[#E6E7E7] dark:border-[#2F3332] dark:bg-[#2F3332] sm:grid-cols-3">
        {deserves.map((item, index) => (
          <FadeIn
            key={item.label}
            delay={index * 0.08}
            className="bg-white p-7 dark:bg-[#1C1F1E] md:p-8"
          >
            <p className="font-heading text-lg font-semibold text-[#0097b2] dark:text-[#66C4DC]">
              {item.label}
            </p>
            <p className="mt-2 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              {item.body}
            </p>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.1}>
        <p className="mt-12 max-w-3xl font-heading text-xl font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF] md:text-2xl">
          Building healthier communities by caring for today&rsquo;s patients
          and preparing tomorrow&rsquo;s health leaders.
        </p>
      </FadeIn>
    </HomeBand>
  );
}
