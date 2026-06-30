import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export default function PhilosophyVision() {
  return (
    <section className="relative overflow-hidden border-t border-[#FCFAEF]/15 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-20 text-[#FCFAEF] md:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-12 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 -left-16 h-80 w-80 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5C94D]/8 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <FadeIn className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F5C94D]">
            Our Vision For Global Health
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Transform how global health is taught, practiced, and led.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg md:text-xl">
            Akomapa is building a movement where students, faculty, health
            professionals, and communities learn together, lead ethically, and
            strengthen systems that last beyond any single project.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
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
      </div>
    </section>
  );
}
