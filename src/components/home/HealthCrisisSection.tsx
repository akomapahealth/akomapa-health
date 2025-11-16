"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Users2, GraduationCap, Globe2, ArrowRight, Book, HeartHandshake, Ambulance, Stethoscope, User } from "lucide-react";

type Bullet = {
  text: string;
  icon?: React.ReactNode;
};

type CardContent = {
  title: string;
  bullets: Bullet[];
  accentColor: string;
  icon: React.ReactNode;
};

const cards: CardContent[] = [
  {
    title: "The Problem",
    accentColor: "#F5C94D",
    icon: <AlertTriangle className="h-7 w-7 text-[#F5C94D]" aria-hidden="true" />,
    bullets: [
      {
        text: "Non-communicable diseases (NCDs) are the leading cause of death worldwide, responsible for over 70% of global deaths each year.",
        icon: <HeartHandshake className="h-5 w-5 text-[#F5C94D]" aria-hidden="true" />
      },
      {
        text: "In the United States, NCDs account for 9 in 10 deaths; in many African countries, they are projected to become the top cause of mortality by 2030.",
        icon: <Ambulance className="h-5 w-5 text-[#F5C94D]" aria-hidden="true" />
      },
      {
        text: "Across settings, millions still lack access to basic screening, education, and preventative care—leaving treatable conditions undetected until it’s too late.",
        icon: <Stethoscope className="h-5 w-5 text-[#F5C94D]" aria-hidden="true" />
      }
    ]
  },
  {
    title: "Our Solution",
    accentColor: "#66C4DC",
    icon: <Users2 className="h-7 w-7 text-[#66C4DC]" aria-hidden="true" />,
    bullets: [
      {
        text: "Student-powered, expert-supervised clinics bring early screening, counseling, and continuity of care directly into communities.",
        icon: <User className="h-5 w-5 text-[#66C4DC]" aria-hidden="true" />
      },
      {
        text: "Global health training programs equip students with leadership, ethics, and systems-thinking skills to drive equitable change.",
        icon: <GraduationCap className="h-5 w-5 text-[#66C4DC]" aria-hidden="true" />
      },
      {
        text: "An international network links clinics across countries, fostering shared learning, mentorship, and collaborative research.",
        icon: <Globe2 className="h-5 w-5 text-[#66C4DC]" aria-hidden="true" />
      },
      {
        text: "Evidence from our multi-country feasibility study shows that with expert guidance, students are capable, trusted agents of change—able to strengthen health systems from the ground up.",
        icon: <Book className="h-5 w-5 text-[#66C4DC]" aria-hidden="true" />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-80px" }}
              className="bg-[#0F4C5C]/60 dark:bg-[#2F3332] rounded-2xl p-6 md:p-8 shadow-xl border border-[#66C4DC]/20 backdrop-blur-sm"
            >
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-[#FCFAEF]/10 flex items-center justify-center mr-4">
                  {card.icon}
                </div>
                <h4 className="text-2xl font-semibold">{card.title}</h4>
              </div>

              <ul className="space-y-4 md:space-y-5 text-[#E6E7E7] text-base md:text-lg leading-relaxed">
                {card.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {bullet.icon ? (
                      <span className="mt-1.5">{bullet.icon}</span>
                    ) : (
                      <span
                        className="mt-2 block h-2 w-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: card.accentColor }}
                      />
                    )}
                    <span className="flex-1">{bullet.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-14">
          <Button className="bg-[#FCFAEF] text-[#0097b2] hover:bg-[#F5C94D] hover:text-[#1C1F1E] transition-colors cursor-pointer">
            <Link href="/research" className="flex items-center">
              Explore Our Science <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}