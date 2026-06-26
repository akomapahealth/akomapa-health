import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  PublicCta,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";
import { LEADERSHIP_APP_FORM_URL } from "@/config/links";

export default function ApplySection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[#121514] py-20 text-[#FCFAEF] md:py-28"
      aria-labelledby="apply-heading"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/highlights/Akomapa-62.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
          style={{ objectPosition: "center" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#121514]/90 via-[#121514]/60 to-[#121514]/90"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(238,186,43,0.12),transparent_50%)]"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <SectionEyebrow tone="gold">Become a Scholar</SectionEyebrow>
          <h2
            id="apply-heading"
            className="mt-4 font-heading text-4xl font-bold leading-tight text-[#FCFAEF] md:text-5xl lg:text-6xl"
          >
            Ready to Lead With Purpose?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#FCFAEF]/84 md:text-xl">
            The Akomapa Academy welcomes students and emerging health
            professionals who are committed to ethical leadership, community
            partnership, and creating lasting change in global health.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <PublicCta
              variant="gold"
              asChild
              icon
              className="px-10 py-5 text-lg md:text-xl"
            >
              <a
                href={LEADERSHIP_APP_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply to the Academy
              </a>
            </PublicCta>
            <PublicCta href="/get-involved" variant="outline-light">
              Other Ways to Get Involved
            </PublicCta>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
