import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import { ncdFutureVisionContent } from "@/data/ncd-impact";

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ctaStyles = {
  amber:
    "bg-[#eeba2b] text-[#FCFAEF] shadow-lg hover:bg-[#eeba2b]/80 hover:shadow-xl focus-visible:ring-[#F5C94D]",
  teal:
    "bg-[#0097b2] text-[#FCFAEF] shadow-lg hover:bg-[#0097b2]/80 hover:shadow-xl focus-visible:ring-[#8DD4E6]",
} as const;

export default function NCDFutureVision() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 text-[#FCFAEF] sm:py-20 md:py-28"
      aria-labelledby="ncd-future-heading"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <FadeIn
          direction="up"
          className="mx-auto mb-12 max-w-3xl space-y-4 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5C94D]">
            {ncdFutureVisionContent.eyebrow}
          </p>
          <h2
            id="ncd-future-heading"
            className="text-2xl font-bold sm:text-3xl md:text-4xl"
          >
            {ncdFutureVisionContent.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
            {ncdFutureVisionContent.description}
          </p>
        </FadeIn>

        {/* Future targets */}
        <FadeInStagger
          className="mx-auto mb-12 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4"
          staggerDelay={0.1}
        >
          {ncdFutureVisionContent.targets.map((target) => (
            <FadeInStaggerItem key={target.label} direction="up">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center sm:rounded-2xl sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5C94D]">
                  By {target.futureYear}
                </p>
                <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {target.futureValue}
                </p>
                <p className="mt-2 text-xs leading-snug text-white/70 sm:text-sm">
                  {target.label}
                </p>
              </div>
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        {/* CTAs */}
        <FadeIn direction="up" delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {ncdFutureVisionContent.ctas.map((cta) => (
              <Button
                key={cta.label}
                asChild
                className={`${ctaBaseClass} ${ctaStyles[cta.variant]}`}
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
