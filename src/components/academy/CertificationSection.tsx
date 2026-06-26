import { CheckCircle2 } from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  MediaFrame,
  PublicCta,
  PublicSection,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";
import { academyCurriculum } from "@/data/academy";
import { LEADERSHIP_APP_FORM_URL } from "@/config/links";

const certificationRequirements = [
  "Complete all 8 core modules",
  "Participate in faculty and peer learning sessions",
  "Present an applied community-centered capstone project",
] as const;

export default function CertificationSection() {
  return (
    <PublicSection tone="dark" spacing="normal" containerClassName="max-w-7xl">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <FadeIn direction="left" amount="some">
          <MediaFrame className="mx-auto w-full max-w-xl" aspect="wide">
            <Image
              src="/highlights/Akomapa-40.jpg"
              alt="Academy scholars in a capstone presentation"
              fill
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#121514]/48 via-transparent to-transparent"
            />
          </MediaFrame>
        </FadeIn>

        <FadeIn direction="right" delay={0.08} amount="some">
          <div>
            <SectionEyebrow tone="gold">Certification</SectionEyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-[#FCFAEF] md:text-4xl">
              {academyCurriculum.certificationName}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#FCFAEF]/84">
              {academyCurriculum.certificationDescription}
            </p>

            <ul className="mt-6 space-y-3">
              {certificationRequirements.map((requirement) => (
                <li key={requirement} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F5C94D]" />
                  <span className="text-base text-[#FCFAEF]/90">
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <PublicCta variant="gold" asChild icon>
                <a
                  href={LEADERSHIP_APP_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply Now
                </a>
              </PublicCta>
            </div>
          </div>
        </FadeIn>
      </div>
    </PublicSection>
  );
}
