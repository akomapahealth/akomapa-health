import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { academyOverview } from "@/data/academy";

const reasons = [
  {
    title: "The Gap in Health Education",
    description:
      "Most health professional training emphasizes clinical knowledge but overlooks ethics, power analysis, and community partnership — the skills that determine whether interventions help or harm.",
  },
  {
    title: "Why Ethics and Partnership Matter",
    description:
      "Health professionals make decisions that affect communities, institutions, and public trust. Ethical leadership equips them to examine power, listen across differences, and use evidence responsibly.",
  },
  {
    title: "The Akomapa Difference",
    description:
      "The Academy combines faculty dialogue, case-based study, community practice, and mentorship — preparing leaders who build solutions with the people those solutions are intended to serve.",
  },
] as const;

export default function WhyEthicalLeadership() {
  return (
    <EditorialBand
      tone="cream"
      marker="01"
      id="why-ethical-leadership"
      aria-labelledby="why-ethical-leadership-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Why It Matters
          </EditorialEyebrow>
          <EditorialHeading id="why-ethical-leadership-heading" className="mt-4">
            The Case for Ethical Leadership
          </EditorialHeading>
          <EditorialLead className="mt-5">
            {academyOverview.whyItMatters}
          </EditorialLead>
        </div>
      </FadeIn>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn direction="up" delay={0.1} className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#1C1F1E]/15 bg-[#FCFAEF] dark:border-[#FCFAEF]/20 dark:bg-[#121514]">
            <Image
              src="/highlights/Akomapa-61.jpg"
              alt="Students and faculty engaged in collaborative learning"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="lg:col-span-7">
          <ol className="border-t border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20">
            {reasons.map((reason, index) => (
              <li
                key={reason.title}
                className="grid gap-4 border-b border-[#1C1F1E]/15 py-7 sm:grid-cols-[auto_1fr] sm:gap-8 dark:border-[#FCFAEF]/20"
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#0097b2]/55 dark:text-[#66C4DC]/65"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base">
                    {reason.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </FadeIn>
      </div>
    </EditorialBand>
  );
}
