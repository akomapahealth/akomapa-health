import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import { LEADERSHIP_APP_FORM_URL } from "@/config/links";

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export default function ApplySection() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-20 text-[#FCFAEF] md:py-28"
      aria-labelledby="apply-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 right-12 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 -left-16 h-80 w-80 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5C94D]/8 blur-3xl" />
      </div>

      <div className="site-container relative z-10 mx-auto px-4 sm:px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F5C94D]">
            Become a Scholar
          </p>
          <h2
            id="apply-heading"
            className="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
          >
            Ready to Lead With Purpose?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
            The Akomapa Academy welcomes students and emerging health
            professionals who are committed to ethical leadership, community
            partnership, and creating lasting change in global health.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              asChild
              className={`${ctaBaseClass} bg-[#eeba2b] px-10 py-7 text-lg text-[#FCFAEF] shadow-lg hover:bg-[#eeba2b]/80 hover:shadow-xl focus-visible:ring-[#F5C94D] md:text-xl`}
            >
              <a
                href={LEADERSHIP_APP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply to the Academy
              </a>
            </Button>
            <Button
              asChild
              className={`${ctaBaseClass} bg-[#0097b2] text-[#FCFAEF] shadow-lg hover:bg-[#0097b2]/80 hover:shadow-xl focus-visible:ring-[#8DD4E6]`}
            >
              <Link href="/get-involved">Other Ways to Get Involved</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
