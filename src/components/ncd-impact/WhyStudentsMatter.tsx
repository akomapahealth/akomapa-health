import { GraduationCap, HeartHandshake, Sprout } from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { whyStudentsMatterContent } from "@/data/ncd-impact";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  GraduationCap,
  HeartHandshake,
  Sprout,
};

export default function WhyStudentsMatter() {
  return (
    <section
      className="overflow-x-hidden bg-[#FCFAEF] py-16 dark:bg-[#1C1F1E] md:py-24"
      aria-labelledby="why-students-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <FadeIn
          direction="up"
          className="mx-auto mb-10 max-w-3xl space-y-3 text-center sm:space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            {whyStudentsMatterContent.eyebrow}
          </p>
          <h2
            id="why-students-heading"
            className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl"
          >
            {whyStudentsMatterContent.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            {whyStudentsMatterContent.description}
          </p>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <FadeIn direction="up" delay={0.1}>
            <div className="relative h-[280px] w-full overflow-hidden rounded-3xl shadow-2xl sm:h-[360px] md:h-[420px]">
              <Image
                src={whyStudentsMatterContent.image.src}
                alt={whyStudentsMatterContent.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </FadeIn>

          {/* Reason cards */}
          <FadeInStagger className="space-y-4" staggerDelay={0.1}>
            {whyStudentsMatterContent.reasons.map((reason) => {
              const Icon = iconMap[reason.icon];
              return (
                <FadeInStaggerItem key={reason.title} direction="up">
                  <div className="rounded-2xl border border-[#E6E7E7]/80 bg-white/95 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95">
                    <div className="flex items-start gap-4">
                      <span
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${reason.accentColor}15`,
                          color: reason.accentColor,
                        }}
                      >
                        {Icon ? <Icon className="h-5 w-5" /> : null}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {reason.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeInStaggerItem>
              );
            })}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
