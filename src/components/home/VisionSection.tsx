import { FadeIn } from "@/components/animations";
import { HomeBand, HomeEyebrow, HomeHeading } from "@/components/home/_home-ui";

export default function VisionSection() {
  const headingId = "vision-heading";

  return (
    <HomeBand tone="white" marker="07" aria-labelledby={headingId}>
      <FadeIn className="mx-auto max-w-3xl text-center">
        <HomeEyebrow className="inline-block">Our Vision</HomeEyebrow>
        <HomeHeading id={headingId} className="mt-5">
          Every community deserves high-quality chronic disease care.
        </HomeHeading>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
          We envision a future where preventable complications from
          hypertension, diabetes, and other noncommunicable diseases become
          increasingly rare — because every community has access to
          compassionate, continuous, community-centered primary care delivered
          by ethical health leaders.
        </p>
      </FadeIn>
    </HomeBand>
  );
}
