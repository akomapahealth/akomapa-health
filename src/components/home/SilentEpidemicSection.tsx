import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import Image from "@/components/common/Image";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import { Button } from "@/components/ui/button";
import { silentEpidemicContent } from "@/data/homepage-narrative";

export default function SilentEpidemicSection() {
  const headingId = "silent-epidemic-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden bg-gradient-to-br from-onyx-900 via-[#123C42] to-[#075E6E] py-16 text-floralwhite md:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(238,186,43,0.2),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(0,151,178,0.32),transparent_34%)]"
      />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn direction="right" className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl">
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
                className="absolute inset-0 bg-gradient-to-t from-onyx-900/65 via-transparent to-transparent"
              />
            </div>
          </FadeIn>

          <div className="lg:col-span-7">
            <FadeIn direction="left">
              <p className="mb-4 font-subheading text-sm font-bold uppercase tracking-[0.18em] text-amber-300">
                Why We Began
              </p>
              <h2
                id={headingId}
                className="font-heading text-4xl font-bold leading-tight text-floralwhite md:text-5xl lg:text-6xl"
              >
                {silentEpidemicContent.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-floralwhite/85 md:text-xl">
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
                      className="h-full rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
                    >
                      <dd
                        aria-label={accessibleValue}
                        className="font-heading text-3xl font-bold text-amber-300 lg:text-4xl"
                      >
                        <AnimatedMetric
                          value={metric.value}
                          prefix={metric.prefix}
                          suffix={metric.suffix}
                        />
                      </dd>
                      <dt className="mt-2 text-sm leading-snug text-floralwhite/80">
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
                className="inline-flex items-center gap-2 text-sm text-floralwhite/75 underline decoration-floralwhite/35 underline-offset-4 hover:text-amber-300"
              >
                {silentEpidemicContent.source.label}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </FadeIn>

            <FadeIn delay={0.2} className="mt-8">
              <Button
                asChild
                size="lg"
                variant="amber"
                className="h-auto rounded-half px-8 py-4 text-base shadow-lg md:text-lg"
              >
                <Link href={silentEpidemicContent.cta.href}>
                  {silentEpidemicContent.cta.label}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
