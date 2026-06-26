import { Heart } from "lucide-react";
import { FadeIn } from "@/components/animations";
import Image from "@/components/common/Image";
import {
  IconBadge,
  MediaFrame,
  PublicCta,
  PublicSection,
  SectionEyebrow,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";

export default function AkomapaMeaningSection() {
  const headingId = "akomapa-meaning-heading";

  return (
    <PublicSection aria-labelledby={headingId} tone="white">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <FadeIn direction="right" className="lg:col-span-5">
          <MediaFrame className="mx-auto w-full max-w-xl" aspect="portrait">
            <Image
              src="/highlights/Akomapa-48.jpg"
              alt="Healthcare professionals showing compassion and care"
              fill
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 42vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#121514]/55 via-transparent to-transparent"
            />
            <SurfaceCard className="absolute bottom-5 left-5 max-w-[calc(100%-2.5rem)] bg-[#FCFAEF]/95 p-5 text-[#1C1F1E] dark:bg-[#1C1F1E]/95 dark:text-[#FCFAEF] sm:max-w-xs">
              <div className="flex items-center gap-3">
                <IconBadge className="bg-[#0097b2] text-[#FCFAEF] dark:bg-[#66C4DC] dark:text-[#1C1F1E]">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                </IconBadge>
                <div>
                  <p className="font-heading text-lg font-bold text-[#0097b2] dark:text-[#66C4DC]">
                    Nya Akomapa
                  </p>
                  <p className="text-sm text-[#2F3332]/78 dark:text-[#E6E7E7]/78">
                    &quot;Have a good heart&quot;
                  </p>
                </div>
              </div>
            </SurfaceCard>
          </MediaFrame>
        </FadeIn>

        <FadeIn className="lg:col-span-7">
          <div className="max-w-3xl">
            <SectionEyebrow>Akomapa Means Good Heart</SectionEyebrow>
            <h2
              id={headingId}
              className="mt-4 font-heading text-4xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-5xl lg:text-6xl"
            >
              In Akan, Akomapa means &quot;a good heart.&quot;
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#2F3332]/84 dark:text-[#E6E7E7]/84 md:text-xl">
              <p>
                It is more than a name. It is the belief that health leadership
                begins with empathy, dignity, and a willingness to stay close to
                the people most often left out of care.
              </p>
              <p>
                Akomapa cares for the physical heart through screening,
                prevention, nutrition, and wellness support. We also care for
                the moral heart of healthcare: the part that listens, learns,
                and refuses to walk away from communities because the work is
                hard.
              </p>
            </div>
            <p className="mt-7 font-heading text-2xl font-semibold leading-snug text-[#0097b2] dark:text-[#66C4DC]">
              Welcome to a family with a good heart.
            </p>
            <PublicCta href="/about" variant="teal" className="mt-8">
              Our Story
            </PublicCta>
          </div>
        </FadeIn>
      </div>
    </PublicSection>
  );
}
