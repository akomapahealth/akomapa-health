import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";

const CONTACT_EMAIL = "akomapahealth@gmail.com";

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export default function GetInvolvedCTA() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-20 text-[#FCFAEF] md:py-28"
      aria-labelledby="get-involved-cta-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-12 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 -left-16 h-80 w-80 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5C94D]/8 blur-3xl" />
      </div>

      <div className="site-container relative z-10 mx-auto px-4 sm:px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F5C94D]">
            Still deciding?
          </p>
          <h2
            id="get-involved-cta-heading"
            className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
          >
            Have questions? Reach out.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
            Not sure which pathway fits you best? We&apos;re happy to help you
            find the right way to get involved with Akomapa.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              asChild
              className={`${ctaBaseClass} bg-[#eeba2b] text-[#FCFAEF] shadow-lg hover:bg-[#eeba2b]/80 hover:shadow-xl focus-visible:ring-[#F5C94D]`}
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              className={`${ctaBaseClass} bg-[#0097b2] text-[#FCFAEF] shadow-lg hover:bg-[#0097b2]/80 hover:shadow-xl focus-visible:ring-[#8DD4E6]`}
            >
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Mail className="h-5 w-5" aria-hidden="true" />
                Email Us
              </a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-[#FCFAEF]/75">
            Or email us directly at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-[#F5C94D] underline-offset-4 transition-colors hover:text-[#FCFAEF] hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
