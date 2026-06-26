import { CheckCircle2 } from "lucide-react";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations";
import { academyCurriculum } from "@/data/academy";
import { LEADERSHIP_APP_FORM_URL } from "@/config/links";

const certificationRequirements = [
  "Complete all 8 core modules",
  "Participate in faculty and peer learning sessions",
  "Present an applied community-centered capstone project",
] as const;

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export default function CertificationSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 text-[#FCFAEF] md:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 left-12 h-48 w-48 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="up" delay={0.1}>
            <div className="relative h-[280px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[360px] md:h-[420px]">
              <Image
                src="/highlights/Akomapa-40.jpg"
                alt="Academy scholars in a capstone presentation"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F5C94D]">
                Certification
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                {academyCurriculum.certificationName}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
                {academyCurriculum.certificationDescription}
              </p>

              <ul className="mt-6 space-y-3">
                {certificationRequirements.map((requirement) => (
                  <li key={requirement} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#F5C94D]" />
                    <span className="text-base text-[#FCFAEF]/90">
                      {requirement}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  asChild
                  className={`${ctaBaseClass} bg-[#eeba2b] text-[#FCFAEF] shadow-lg hover:bg-[#eeba2b]/80 hover:shadow-xl focus-visible:ring-[#F5C94D]`}
                >
                  <a
                    href={LEADERSHIP_APP_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Now
                  </a>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
