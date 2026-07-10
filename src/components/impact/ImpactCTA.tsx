import { FadeIn } from "@/components/animations";
import { PublicCta } from "@/components/shared/PublicPagePrimitives";

export default function ImpactCTA() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 text-[#FCFAEF] sm:py-20 md:py-28"
      aria-labelledby="impact-cta-heading"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="site-container relative z-10 mx-auto px-4 sm:px-6">
        <FadeIn
          direction="up"
          className="mx-auto max-w-3xl space-y-6 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#F5C94D]">
            Join the Movement
          </p>
          <h2
            id="impact-cta-heading"
            className="font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
          >
            Help us reach our 2028 goals
          </h2>
          <p className="text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
            Every partnership, every gift, and every student leader moves us
            closer to healthier communities and a new model for global health.
            Add your strength to the movement.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row sm:gap-4">
            <PublicCta href="/get-involved" variant="gold">
              Get Involved
            </PublicCta>
            <PublicCta href="/donate" variant="outline-light">
              Donate
            </PublicCta>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
