import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import {
  MediaFrame,
  PublicCta,
  PublicSection,
  SectionEyebrow,
} from "@/components/shared/PublicPagePrimitives";
import { goodIntentionsContent } from "@/data/homepage-narrative";

export default function GoodIntentionsSection() {
  const headingId = "good-intentions-heading";

  return (
    <PublicSection aria-labelledby={headingId} tone="cream" withTexture>
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
        <FadeIn className="order-2 md:order-1">
          <div className="max-w-2xl">
            <SectionEyebrow>A Different Future</SectionEyebrow>
            <h2
              id={headingId}
              className="mt-4 font-heading text-4xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-5xl lg:text-6xl"
            >
              {goodIntentionsContent.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#2F3332] dark:text-[#E6E7E7] md:text-xl">
              {goodIntentionsContent.body}
            </p>
            <PublicCta
              href={goodIntentionsContent.cta.href}
              variant="teal"
              className="mt-8"
            >
              {goodIntentionsContent.cta.label}
            </PublicCta>
          </div>
        </FadeIn>

        <FadeIn direction="left" delay={0.1} className="order-1 md:order-2">
          <MediaFrame className="mx-auto w-full max-w-xl" aspect="portrait">
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
          </MediaFrame>
        </FadeIn>
      </div>
    </PublicSection>
  );
}
