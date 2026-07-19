import Image from "@/components/common/Image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";

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

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export default function PhilosophyHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 sm:py-20 md:py-28"
      aria-labelledby="philosophy-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 h-96 w-96 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="site-container relative z-10 mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <FadeIn className="max-w-3xl flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5C94D] sm:text-sm">
              Ethics, Partnership, Impact
            </p>
            <h1
              id="philosophy-hero-heading"
              className="mt-4 text-3xl font-light leading-tight text-[#FCFAEF] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            >
              Our Philosophy
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg md:text-xl">
              Building a different future for global health &mdash; one rooted in
              ethics, partnership, and sustainable impact.
            </p>

            <FadeInStagger
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
              staggerDelay={0.1}
            >
              {philosophyStats.map((stat) => (
                <FadeInStaggerItem key={stat.label} direction="up">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:rounded-2xl sm:p-4">
                    <p className="text-2xl font-semibold text-white sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs leading-snug text-white/70 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>

            <FadeIn direction="up" delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Button
                  asChild
                  className={`${ctaBaseClass} bg-[#eeba2b] text-[#FCFAEF] shadow-lg hover:bg-[#eeba2b]/80 hover:shadow-xl focus-visible:ring-[#F5C94D]`}
                >
                  <Link href="/get-involved">Join Us</Link>
                </Button>
                <Button
                  asChild
                  className={`${ctaBaseClass} bg-[#0097b2] text-[#FCFAEF] shadow-lg hover:bg-[#0097b2]/80 hover:shadow-xl focus-visible:ring-[#8DD4E6]`}
                >
                  <Link href="/partnerships">Partner With Us</Link>
                </Button>
              </div>
            </FadeIn>
          </FadeIn>

          <FadeIn direction="left" delay={0.2} className="w-full lg:max-w-md xl:max-w-lg">
            <div className="relative h-[280px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[360px] md:h-[420px] lg:h-[480px]">
              <Image
                src="/highlights/Akomapa-73.jpg"
                alt="Akomapa student leaders and community partners gathered together"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
