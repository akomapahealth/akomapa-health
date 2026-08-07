import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { academyCurriculum } from "@/data/academy";
import { LEADERSHIP_APP_FORM_URL } from "@/config/links";

const certificationRequirements = [
  "Complete all 8 core modules",
  "Participate in faculty and peer learning sessions",
  "Present an applied community-centered capstone project",
] as const;

export default function CertificationSection() {
  return (
    <EditorialBand
      tone="teal"
      marker="04"
      id="certification"
      aria-labelledby="certification-heading"
      className="border-y border-[#FCFAEF]/15 bg-[#0F4C5C]"
    >
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn direction="up" delay={0.1} className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C] lg:aspect-[4/5]">
            <Image
              src="/highlights/Akomapa-40.jpg"
              alt="Academy scholars in a capstone presentation"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.15} className="lg:col-span-7">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Certification
          </EditorialEyebrow>
          <EditorialHeading
            id="certification-heading"
            className="mt-4 text-[#FCFAEF]"
          >
            {academyCurriculum.certificationName}
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            {academyCurriculum.certificationDescription}
          </EditorialLead>

          <ul className="mt-8 space-y-4 border-t border-[#FCFAEF]/25 pt-6">
            {certificationRequirements.map((requirement) => (
              <li
                key={requirement}
                className="border-b border-[#FCFAEF]/15 pb-4 text-base leading-relaxed text-[#FCFAEF]/90 last:border-b-0 last:pb-0"
              >
                {requirement}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <EditorialButton
              href={LEADERSHIP_APP_FORM_URL}
              variant="amber"
              external
            >
              Apply Now
            </EditorialButton>
          </div>
        </FadeIn>
      </div>
    </EditorialBand>
  );
}
