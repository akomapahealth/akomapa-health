import { ExternalLink } from "lucide-react";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import Image from "@/components/common/Image";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import {
  MediaFrame,
  PublicCta,
  PublicSection,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";
import { silentEpidemicContent } from "@/data/homepage-narrative";

export default function SilentEpidemicSection() {
  const headingId = "silent-epidemic-heading";

  return (
    <PublicSection aria-labelledby={headingId} tone="teal">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn direction="right" className="lg:col-span-5">
            <MediaFrame className="mx-auto w-full max-w-xl" aspect="portrait">
              <Image
                src={silentEpidemicContent.image.src}
                alt={silentEpidemicContent.image.alt}
                fill
                sizes="(min-width: 1280px) 500px, (min-width: 1024px) 42vw, 100vw"
                className="object-cover"
                style={{
                  objectPosition: silentEpidemicContent.image.position,
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#121514]/65 via-transparent to-transparent"
              />
            </MediaFrame>
          </FadeIn>

          <div className="lg:col-span-7">
            <FadeIn>
              <SectionEyebrow tone="gold">Why We Began</SectionEyebrow>
              <h2
                id={headingId}
                className="font-heading text-4xl font-bold leading-tight text-[#FCFAEF] md:text-5xl lg:text-6xl"
              >
                {silentEpidemicContent.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#FCFAEF]/85 md:text-xl">
                {silentEpidemicContent.body}
              </p>
            </FadeIn>

            <FadeInStagger className="mt-8 grid gap-4 sm:grid-cols-3">
              {silentEpidemicContent.metrics.map((metric) => {
                const accessibleValue = `${metric.prefix ?? ""}${metric.value}${metric.suffix ?? ""}`;

                return (
                  <FadeInStaggerItem key={metric.id}>
                    <dl
                      data-testid="ncd-metric"
                      data-metric-id={metric.id}
                    className="h-full rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                    >
                      <dd
                        aria-label={accessibleValue}
                        className="font-heading text-3xl font-bold text-[#F5C94D] lg:text-4xl"
                      >
                        <AnimatedMetric
                          value={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                        />
                      </dd>
                      <dt className="mt-2 text-sm leading-snug text-[#FCFAEF]/80">
                        {metric.label}
                      </dt>
                    </dl>
                  </FadeInStaggerItem>
                );
              })}
            </FadeInStagger>

            <FadeIn delay={0.15} className="mt-8">
              <a
                href={silentEpidemicContent.source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#FCFAEF]/75 underline decoration-[#FCFAEF]/35 underline-offset-4 hover:text-[#F5C94D]"
              >
                {silentEpidemicContent.source.label}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </FadeIn>

            <FadeIn delay={0.2} className="mt-8">
              <PublicCta href={silentEpidemicContent.cta.href} variant="gold">
                {silentEpidemicContent.cta.label}
              </PublicCta>
            </FadeIn>
          </div>
        </div>
    </PublicSection>
  );
}
