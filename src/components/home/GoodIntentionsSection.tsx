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
      className="relative overflow-hidden bg-[#FCFAEF] py-16 text-[#1C1F1E] dark:bg-[#1C1F1E] dark:text-[#FCFAEF] md:py-24"
    >
      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#0097b2]/10 blur-3xl dark:bg-[#0097b2]/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#eeba2b]/15 blur-3xl dark:bg-[#eeba2b]/10"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <FadeIn className="order-2 md:order-1">
            <div className="max-w-2xl">
              <p className="mb-4 font-subheading text-sm font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
                A Different Future
              </p>
              <h2
                id={headingId}
                className="font-heading text-4xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-5xl lg:text-6xl"
              >
                {goodIntentionsContent.heading}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#2F3332] dark:text-[#E6E7E7] md:text-xl">
                {goodIntentionsContent.body}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-auto rounded-half bg-[#0097b2] px-8 py-4 text-base text-[#FCFAEF] shadow-lg hover:bg-[#eeba2b] hover:text-[#1C1F1E] md:text-lg"
              >
                <Link href={goodIntentionsContent.cta.href}>
                  {goodIntentionsContent.cta.label}
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1} className="order-1 md:order-2">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[2rem] border border-[#0097b2]/15 shadow-2xl dark:border-white/10">
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
                className="absolute inset-0 bg-gradient-to-t from-[#121514]/45 via-transparent to-transparent"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
