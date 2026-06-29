import { FadeIn } from "@/components/animations";
import {
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
} from "@/components/home/_home-ui";

const components = [
  {
    title: "Community Learning & Care Hubs",
    body: "Supervised interprofessional student teams deliver screening, diagnosis, education, treatment, referral, and longitudinal follow-up — while the hubs double as living classrooms.",
  },
  {
    title: "Ethical Leadership Academy",
    body: "Preparing the next generation of health professionals through online learning, mentorship, and community-based service.",
  },
  {
    title: "Research & Innovation",
    body: "Generating evidence that improves care, informs policy, and strengthens health systems.",
  },
  {
    title: "Nkwapa Digital Health Platform",
    body: "Secure patient records, longitudinal follow-up, quality improvement, and impact measurement across every hub.",
  },
  {
    title: "Systems Partnerships",
    body: "Working alongside communities, universities, ministries of health, and institutions to build sustainable primary care.",
  },
];

export default function OurModelSection() {
  const headingId = "our-model-heading";

  return (
    <HomeBand tone="white" marker="04" aria-labelledby={headingId}>
      <FadeIn>
        <div className="max-w-3xl">
          <HomeEyebrow>Our Model</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4">
            Five components, one connected system.
          </HomeHeading>
          <HomeLead className="mt-6">
            Each part reinforces the others: every clinic improves care for
            today&rsquo;s patients, every student encounter prepares
            tomorrow&rsquo;s workforce, and every partnership strengthens local
            health systems.
          </HomeLead>
        </div>
      </FadeIn>

      <div className="relative mt-14">
        <div
          aria-hidden="true"
          className="absolute inset-x-[10%] top-7 hidden border-t border-dashed border-[#C1C3C3] dark:border-[#4F5554] lg:block"
        />
        <ol className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
          {components.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.06} as="li" className="relative">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-md border border-[#1C1F1E]/25 bg-white font-subheading text-base font-bold tracking-[0.1em] text-[#0097b2] dark:border-[#FCFAEF]/25 dark:bg-[#1C1F1E] dark:text-[#66C4DC]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                {item.body}
              </p>
            </FadeIn>
          ))}
        </ol>
      </div>
    </HomeBand>
  );
}
