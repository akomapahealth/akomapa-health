import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  PublicCta,
  PublicSection,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";

const philosophyStats = [
  {
    value: "43M",
    label: "NCD deaths globally in 2021",
  },
  {
    value: "73%",
    label: "of NCD deaths in low- and middle-income countries",
  },
  {
    value: "9",
    label: "principles shaping Akomapa's approach",
  },
] as const;

export default function PhilosophyHero() {
  return (
    <PublicSection
      tone="dark"
      spacing="spacious"
      className="border-y border-[#FCFAEF]/10"
      containerClassName="max-w-7xl"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/highlights/Akomapa-73.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
          style={{ objectPosition: "center" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#0097b2]/85 via-[#0F4C5C]/88 to-[#121514]/96"
        />
      </div>

      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <FadeIn className="max-w-5xl">
          <SectionEyebrow tone="gold">Ethics, Partnership, Impact</SectionEyebrow>
          <h1 className="mt-5 max-w-4xl font-heading text-5xl font-bold leading-tight text-[#FCFAEF] sm:text-6xl lg:text-7xl">
            Our Philosophy
          </h1>
          <p className="mt-6 max-w-3xl font-body text-xl leading-9 text-[#FCFAEF]/88 md:text-2xl">
            Building a different future for global health &mdash; one rooted in
            ethics, partnership, and sustainable impact.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <PublicCta href="/get-involved" variant="gold">
              Join Us
            </PublicCta>
            <PublicCta href="/partnerships" variant="outline-light">
              Partner With Us
            </PublicCta>
          </div>
        </FadeIn>

        <FadeInStagger className="grid gap-4" amount="some">
          {philosophyStats.map((stat) => (
            <FadeInStaggerItem key={stat.label}>
              <div className="rounded-xl border border-[#FCFAEF]/18 bg-[#121514]/42 p-5 shadow-[0_20px_55px_rgba(0,0,0,0.2)] backdrop-blur-md">
                <p className="font-heading text-3xl font-bold text-[#F5C94D]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#FCFAEF]/78">
                  {stat.label}
                </p>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </PublicSection>
  );
}
