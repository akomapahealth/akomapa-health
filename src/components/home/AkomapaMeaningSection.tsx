import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import {
  HomeArrowLink,
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
} from "@/components/home/_home-ui";

const values = ["Empathy", "Equity", "Excellence"];

export default function AkomapaMeaningSection() {
  const headingId = "akomapa-meaning-heading";

  return (
    <HomeBand tone="cream" marker="06" aria-labelledby={headingId}>
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn direction="right" className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-[#E6E7E7] dark:border-[#2F3332]">
            <Image
              src="/highlights/Akomapa-48.jpg"
              alt="Akomapa health professionals offering compassionate community care"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 rounded-lg bg-[#FCFAEF] px-4 py-3 text-[#1C1F1E] shadow-sm dark:bg-[#1C1F1E] dark:text-[#FCFAEF]">
              <p className="font-heading text-base font-semibold text-[#0097b2] dark:text-[#66C4DC]">
                Nya Akomapa
              </p>
              <p className="text-xs text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
                &ldquo;Have a good heart&rdquo;
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn className="lg:col-span-7">
          <HomeEyebrow tone="gold">Our Values</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4">
            Akomapa means &quot;A Good Heart.&quot;
          </HomeHeading>
          <div className="mt-6 max-w-2xl space-y-5">
            <HomeLead>
              In Akan, Akomapa represents more than compassion. It reflects our
              belief that meaningful healthcare begins with both clinical
              excellence and moral leadership.
            </HomeLead>
            <HomeLead>
              We believe every person deserves compassionate care, every
              community deserves equitable access to high-quality healthcare,
              and every health professional has a responsibility to lead with
              humility, integrity, and service.
            </HomeLead>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {values.map((value) => (
              <li
                key={value}
                className="rounded-full border border-[#0097b2]/25 px-5 py-2 font-heading text-base font-semibold text-[#0097b2] dark:border-[#66C4DC]/30 dark:text-[#66C4DC]"
              >
                {value}
              </li>
            ))}
          </ul>

          <HomeArrowLink href="/about" className="mt-8">
            Our story
          </HomeArrowLink>
        </FadeIn>
      </div>
    </HomeBand>
  );
}
