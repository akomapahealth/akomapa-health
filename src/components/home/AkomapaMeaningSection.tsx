import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import {
  HomeArrowLink,
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
} from "@/components/home/_home-ui";

const values = [
  { name: "Empathy", number: "01" },
  { name: "Equity", number: "02" },
  { name: "Excellence", number: "03" },
] as const;

export default function AkomapaMeaningSection() {
  const headingId = "akomapa-meaning-heading";

  return (
    <HomeBand
      tone="cream"
      marker="06"
      aria-labelledby={headingId}
      data-values-section
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-7">
          <div data-values-copy>
            <HomeEyebrow tone="gold">Our Values</HomeEyebrow>
            <HomeHeading
              id={headingId}
              className="mt-4 max-w-3xl lg:text-[3.2rem]"
            >
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

            <ul
              aria-label="Akomapa values"
              data-values-list
              className="mt-9 grid border-y border-[#0097b2]/25 sm:grid-cols-3 dark:border-[#66C4DC]/25"
            >
              {values.map((value, index) => (
                <li
                  key={value.name}
                  className={`flex min-h-32 flex-col justify-between border-[#0097b2]/25 py-5 sm:px-5 dark:border-[#66C4DC]/25 ${
                    index > 0 ? "border-t sm:border-l sm:border-t-0" : ""
                  }`}
                >
                  <span className="font-subheading text-xs font-bold tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
                    {value.number}
                  </span>
                  <span className="font-heading text-2xl font-semibold text-[#0097b2] dark:text-[#66C4DC]">
                    {value.name}
                  </span>
                </li>
              ))}
            </ul>

            <HomeArrowLink href="/about" className="mt-8">
              Our story
            </HomeArrowLink>
          </div>
        </FadeIn>

        <FadeIn direction="left" className="lg:col-span-5">
          <div
            data-values-image
            className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden border-l-[6px] border-[#eeba2b] bg-[#E6E7E7] dark:bg-[#2F3332]"
          >
            <Image
              src="/highlights/Akomapa-48.jpg"
              alt="Akomapa health professionals offering compassionate community care"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 border-t border-white/30 bg-[#0F4C5C]/95 px-5 py-4 text-[#FCFAEF] backdrop-blur-sm">
              <p className="font-heading text-base font-semibold text-[#0097b2] dark:text-[#66C4DC]">
                Nya Akomapa
              </p>
              <p className="text-xs text-[#FCFAEF]/75">
                &ldquo;Have a good heart&rdquo;
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </HomeBand>
  );
}
