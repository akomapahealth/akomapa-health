import { AlertTriangle, Shield, Sparkles } from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  IconBadge,
  MediaFrame,
  PublicSection,
  PublicSectionHeader,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import { academyOverview } from "@/data/academy";

const reasons = [
  {
    icon: AlertTriangle,
    title: "The Gap in Health Education",
    description:
      "Most health professional training emphasizes clinical knowledge but overlooks ethics, power analysis, and community partnership — the skills that determine whether interventions help or harm.",
  },
  {
    icon: Shield,
    title: "Why Ethics and Partnership Matter",
    description:
      "Health professionals make decisions that affect communities, institutions, and public trust. Ethical leadership equips them to examine power, listen across differences, and use evidence responsibly.",
  },
  {
    icon: Sparkles,
    title: "The Akomapa Difference",
    description:
      "The Academy combines faculty dialogue, case-based study, community practice, and mentorship — preparing leaders who build solutions with the people those solutions are intended to serve.",
  },
] as const;

export default function WhyEthicalLeadership() {
  return (
    <PublicSection tone="cream" spacing="normal" withTexture>
      <PublicSectionHeader
        eyebrow="Why It Matters"
        title="The Case for Ethical Leadership"
        description={academyOverview.whyItMatters}
        alignment="center"
        className="mb-12 md:mb-16"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
        <FadeIn direction="left" amount="some">
          <MediaFrame className="mx-auto w-full max-w-xl" aspect="wide">
            <Image
              src="/highlights/Akomapa-61.jpg"
              alt="Students and faculty engaged in collaborative learning"
              fill
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "center" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#121514]/48 via-transparent to-transparent"
            />
          </MediaFrame>
        </FadeIn>

        <FadeIn direction="right" delay={0.08} amount="some">
          <div className="space-y-4">
            {reasons.map((reason) => (
              <SurfaceCard key={reason.title} className="p-5">
                <div className="flex items-start gap-4">
                  <IconBadge>
                    <reason.icon className="h-5 w-5" />
                  </IconBadge>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                      {reason.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </FadeIn>
      </div>
    </PublicSection>
  );
}
