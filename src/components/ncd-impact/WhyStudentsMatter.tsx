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
      className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 text-[#FCFAEF] md:py-24"
      aria-labelledby="why-students-heading"
    >
      {/* Decorative blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 left-12 h-48 w-48 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#F5C94D]/10 blur-3xl" />
      </div>

      <div className="site-container relative z-10 mx-auto px-4 sm:px-6">
        <FadeIn
          direction="up"
          className="mx-auto mb-10 max-w-3xl space-y-3 text-center sm:space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#F5C94D] sm:text-sm">
            {whyStudentsMatterContent.eyebrow}
          </p>
          <h2
            id="why-students-heading"
            className="text-2xl font-bold sm:text-3xl md:text-4xl"
          >
            {whyStudentsMatterContent.heading}
          </h2>
          <p className="text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
            {whyStudentsMatterContent.description}
          </p>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <FadeIn direction="up" delay={0.1}>
            <div className="relative h-[280px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:h-[360px] md:h-[420px]">
              <Image
                src={whyStudentsMatterContent.image.src}
                alt={whyStudentsMatterContent.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </FadeIn>

          {/* Reason cards */}
          <FadeInStagger className="space-y-4" staggerDelay={0.1}>
            {whyStudentsMatterContent.reasons.map((reason) => {
              const Icon = iconMap[reason.icon];
              return (
                <FadeInStaggerItem key={reason.title} direction="up">
                  <div className="rounded-2xl border border-white/20 bg-[#0B2F3A]/60 p-6 shadow-lg shadow-black/30 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5">
                    <div className="flex items-start gap-4">
                      <span
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${reason.accentColor}25`,
                          color: "#FCFAEF",
                        }}
                      >
                        {Icon ? <Icon className="h-5 w-5" /> : null}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-[#FCFAEF]">
                          {reason.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#FCFAEF]/85">
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
