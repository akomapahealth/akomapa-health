import { FadeIn } from "@/components/animations";
import { HomeBand, HomeEyebrow, HomeHeading } from "@/components/home/_home-ui";

const visionPriorities = [
  "Compassionate care",
  "Continuous access",
  "Ethical leadership",
] as const;

export default function VisionSection() {
  const headingId = "vision-heading";

  return (
    <HomeBand
      tone="white"
      marker="07"
      aria-labelledby={headingId}
      data-vision-section
    >
      <span
        aria-hidden="true"
        className="absolute left-4 top-0 h-1 w-24 bg-[#eeba2b] md:w-40"
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <FadeIn className="lg:col-span-8">
          <div data-vision-statement>
            <HomeEyebrow>Our Vision</HomeEyebrow>
            <HomeHeading
              id={headingId}
              className="mt-5 max-w-4xl text-[2.35rem] md:text-[3.5rem] lg:text-[4.35rem]"
            >
              Every community deserves high-quality chronic disease care.
            </HomeHeading>
          </div>
        </FadeIn>

        <FadeIn delay={0.12} className="lg:col-span-4">
          <p
            data-vision-copy
            className="border-l-2 border-[#0097b2] pl-6 text-base leading-relaxed text-[#2F3332]/80 dark:border-[#66C4DC] dark:text-[#E6E7E7]/80 md:text-lg"
          >
            We envision a future where preventable complications from
            hypertension, diabetes, and other noncommunicable diseases become
            increasingly rare — because every community has access to
            compassionate, continuous, community-centered primary care delivered
            by ethical health leaders.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.18}>
        <ul
          aria-label="Vision priorities"
          data-vision-priorities
          className="mt-14 grid border-y border-[#1C1F1E]/15 sm:grid-cols-3 dark:border-[#FCFAEF]/20"
        >
          {visionPriorities.map((priority, index) => (
            <li
              key={priority}
              className={`flex items-center gap-4 border-[#1C1F1E]/15 py-5 sm:px-6 dark:border-[#FCFAEF]/20 ${
                index > 0 ? "border-t sm:border-l sm:border-t-0" : ""
              }`}
            >
              <span className="font-subheading text-xs font-bold tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
                0{index + 1}
              </span>
              <span className="font-heading text-lg font-semibold">
                {priority}
              </span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </HomeBand>
  );
}
