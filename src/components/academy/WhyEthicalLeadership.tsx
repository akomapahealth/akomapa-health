import { AlertTriangle, Shield, Sparkles } from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { academyOverview } from "@/data/academy";

const reasons = [
  {
    icon: AlertTriangle,
    title: "The Gap in Health Education",
    description:
      "Most health professional training emphasizes clinical knowledge but overlooks ethics, power analysis, and community partnership — the skills that determine whether interventions help or harm.",
    accentColor: "#0097b2",
  },
  {
    icon: Shield,
    title: "Why Ethics and Partnership Matter",
    description:
      "Health professionals make decisions that affect communities, institutions, and public trust. Ethical leadership equips them to examine power, listen across differences, and use evidence responsibly.",
    accentColor: "#eeba2b",
  },
  {
    icon: Sparkles,
    title: "The Akomapa Difference",
    description:
      "The Academy combines faculty dialogue, case-based study, community practice, and mentorship — preparing leaders who build solutions with the people those solutions are intended to serve.",
    accentColor: "#0F4C5C",
  },
] as const;

export default function WhyEthicalLeadership() {
  return (
    <section className="overflow-x-hidden bg-[#FCFAEF] py-16 dark:bg-[#1C1F1E] md:py-24">
      <div className="site-container mx-auto px-4 sm:px-6">
        <FadeIn direction="up" className="mx-auto mb-10 max-w-3xl space-y-3 text-center sm:space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            Why It Matters
          </p>
          <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl">
            The Case for Ethical Leadership
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            {academyOverview.whyItMatters}
          </p>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="up" delay={0.1}>
            <div className="relative h-[280px] w-full overflow-hidden rounded-3xl shadow-2xl sm:h-[360px] md:h-[420px]">
              <Image
                src="/highlights/Akomapa-61.jpg"
                alt="Students and faculty engaged in collaborative learning"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
          </FadeIn>

          <FadeInStagger className="space-y-4" staggerDelay={0.1}>
            {reasons.map((reason) => (
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
                      <reason.icon className="h-5 w-5" />
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
            ))}
          </FadeInStagger>
        </div>
      </div>
    </section>
  );
}
