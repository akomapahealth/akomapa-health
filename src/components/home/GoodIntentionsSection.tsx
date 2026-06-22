import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { goodIntentionsContent } from "@/data/homepage-narrative";

export default function GoodIntentionsSection() {
  const headingId = "good-intentions-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="relative overflow-hidden bg-floralwhite py-16 text-onyx-800 dark:bg-onyx-800 dark:text-floralwhite md:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-skobeloff/10 blur-3xl dark:bg-skobeloff/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-amber/15 blur-3xl dark:bg-amber/10"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <FadeIn direction="right" className="order-2 md:order-1">
            <div className="max-w-2xl">
              <p className="mb-4 font-subheading text-sm font-bold uppercase tracking-[0.18em] text-skobeloff dark:text-[#66C4DC]">
                A Different Future
              </p>
              <h2
                id={headingId}
                className="font-heading text-4xl font-bold leading-tight text-onyx-800 dark:text-floralwhite md:text-5xl lg:text-6xl"
              >
                {goodIntentionsContent.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-onyx-600 dark:text-onyx-100 md:text-xl">
                {goodIntentionsContent.body}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-auto rounded-half px-8 py-4 text-base shadow-lg md:text-lg"
              >
                <Link href={goodIntentionsContent.cta.href}>
                  {goodIntentionsContent.cta.label}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1} className="order-1 md:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[2rem] border border-skobeloff/15 shadow-2xl dark:border-white/10">
              <Image
                src={goodIntentionsContent.image.src}
                alt={goodIntentionsContent.image.alt}
                fill
                sizes="(min-width: 1280px) 560px, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
                style={{
                  objectPosition: goodIntentionsContent.image.position,
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-onyx-900/45 via-transparent to-transparent"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
