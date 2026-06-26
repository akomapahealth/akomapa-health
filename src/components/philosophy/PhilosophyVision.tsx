import { FadeIn } from "@/components/animations";
import {
  PublicCta,
  PublicSection,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";

export default function PhilosophyVision() {
  return (
    <PublicSection
      tone="teal"
      spacing="spacious"
      className="border-t border-[#FCFAEF]/15"
      containerClassName="max-w-5xl"
    >
      <FadeIn className="text-center">
        <SectionEyebrow tone="gold">Our Vision For Global Health</SectionEyebrow>
        <h2 className="mx-auto mt-4 max-w-4xl font-heading text-4xl font-bold leading-tight text-[#FCFAEF] md:text-5xl lg:text-6xl">
          Transform how global health is taught, practiced, and led.
        </h2>
        <p className="mx-auto mt-6 max-w-3xl font-body text-lg leading-8 text-[#FCFAEF]/84 md:text-xl">
          Akomapa is building a movement where students, faculty, health
          professionals, and communities learn together, lead ethically, and
          strengthen systems that last beyond any single project.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <PublicCta href="/get-involved" variant="gold">
            Join Us
          </PublicCta>
          <PublicCta href="/partnerships" variant="outline-light">
            Partner With Us
          </PublicCta>
        </div>
      </FadeIn>
    </PublicSection>
  );
}
