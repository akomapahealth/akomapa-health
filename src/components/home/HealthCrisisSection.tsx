"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeatureSectionWithBentoGrid, type BentoGridItem } from "@/components/ui/feature-section-with-bento-grid";
import { ArrowRight } from "lucide-react";

type CardContent = {
  badge: string;
  title: string;
  summary: string;
  highlight: string;
  highlightLabel: string;
  supportingCopy: string;
  items: BentoGridItem[];
  tone: "gold" | "teal";
};

const cards: CardContent[] = [
  {
    badge: "The Problem",
    title: "Prevention is not keeping pace",
    tone: "gold",
    summary:
      "Non-communicable diseases now drive most deaths worldwide, while access to screening and prevention still lags.",
    highlight: "70%",
    highlightLabel: "of global deaths each year are linked to NCDs",
    supportingCopy:
      "The gap is not only disease burden, but how late prevention begins when basic screening and education are still out of reach.",
    items: [
      {
        title: "Global burden",
        description:
          "NCDs are the leading cause of death worldwide, responsible for more than 70% of deaths each year.",
        span: "wide",
        eyebrow: "Worldwide"
      },
      {
        title: "Rapid escalation",
        description:
          "In the U.S., NCDs account for 9 in 10 deaths; in many African countries, they are projected to lead mortality by 2030.",
        eyebrow: "2030"
      },
      {
        title: "Missed prevention",
        description:
          "Millions still lack basic screening, education, and preventative care, leaving treatable conditions undetected for too long.",
        eyebrow: "Access gap"
      }
    ]
  },
  {
    badge: "Our Solution",
    title: "A student-powered response",
    tone: "teal",
    summary:
      "Akomapa pairs student leadership with expert supervision to bring prevention, continuity of care, and research closer to communities.",
    highlight: "Evidence-led",
    highlightLabel: "student-powered clinics and partnerships built for scale",
    supportingCopy:
      "The model combines service, training, and shared learning so early progress can grow into stronger local systems and cross-border collaboration.",
    items: [
      {
        title: "Community clinics",
        description:
          "Student-powered, expert-supervised clinics bring early screening, counseling, mental health support, and continuity of care into communities.",
        span: "wide",
        eyebrow: "Care first"
      },
      {
        title: "Training pipeline",
        description:
          "Leadership development and cross-site mentorship prepare students to lead ethically, think systemically, and improve care delivery.",
        eyebrow: "Training"
      },
      {
        title: "Research backbone",
        description:
          "Evidence from multi-country feasibility work and shared learning networks helps the model scale with credibility.",
        eyebrow: "Validated"
      }
    ]
  }
];

export default function HealthCrisisSection() {
  return (
    <section
      id="why-it-matters"
      className="py-16 md:py-24 bg-[#0097b2] dark:bg-[#1C1F1E] text-[#FCFAEF] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#0097b2]/20 blur-3xl"></div>
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-[#eeba2b]/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#F5C94D] font-bold text-lg mb-2">
            WHY IT MATTERS
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
            Responding to a Global Health Crisis with Innovation and Evidence
          </h3>
          <p className="text-lg text-[#E6E7E7]">
            Non-communicable diseases are a rising global crisis. We&apos;re meeting the challenge with student-led
            innovations—anchored in research, fueled by global partnerships, and built alongside communities.
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-10">
          {cards.map((card) => (
            <motion.div
              key={card.badge}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <FeatureSectionWithBentoGrid
                badge={card.badge}
                title={card.title}
                description={card.summary}
                tone={card.tone}
                compact
                highlightLabel={card.highlightLabel}
                highlightValue={card.highlight}
                supportingCopy={card.supportingCopy}
                items={card.items}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-14">
          <Button className="h-14 rounded-full px-8 text-base font-semibold bg-[#FCFAEF] text-[#0097b2] hover:bg-[#F5C94D] hover:text-[#1C1F1E] transition-colors cursor-pointer md:h-16 md:px-10 md:text-lg">
            <Link href="/research" className="flex items-center">
              Explore Our Science <ArrowRight size={20} className="ml-2.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
