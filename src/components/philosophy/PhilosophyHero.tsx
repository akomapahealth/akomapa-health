import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { PublicCta, SectionEyebrow } from "@/components/shared/PublicPagePrimitives";

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
    <section
      className="relative isolate overflow-hidden border-y border-[#0097b2]/15 bg-[#121514] text-[#FCFAEF]"
      aria-labelledby="philosophy-hero-heading"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/highlights/Akomapa-73.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
          style={{ objectPosition: "center" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#0097b2]/88 via-[#0F4C5C]/90 to-[#121514]/96"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(238,186,43,0.18),transparent_30%),linear-gradient(90deg,rgba(18,21,20,0.2),rgba(18,21,20,0.86))]"
        />
      </div>

      <div className="container mx-auto grid min-h-[460px] max-w-7xl items-center gap-8 px-4 py-14 sm:py-18 lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] lg:gap-16 lg:py-20">
        <FadeIn className="max-w-5xl">
          <SectionEyebrow tone="gold">Ethics, Partnership, Impact</SectionEyebrow>
          <h1
            id="philosophy-hero-heading"
            className="mt-5 max-w-4xl font-heading text-5xl font-bold leading-tight text-[#FCFAEF] sm:text-6xl lg:text-7xl"
          >
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

        <FadeInStagger
          className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-4"
          amount="some"
        >
          {philosophyStats.map((stat) => (
            <FadeInStaggerItem key={stat.label}>
              <div className="h-full rounded-xl border border-[#FCFAEF]/20 bg-[#121514]/44 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.24)] backdrop-blur-md lg:p-5">
                <p className="font-heading text-3xl font-bold leading-none text-[#F5C94D]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#FCFAEF]/78 sm:text-xs lg:text-sm">
                  {stat.label}
                </p>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
