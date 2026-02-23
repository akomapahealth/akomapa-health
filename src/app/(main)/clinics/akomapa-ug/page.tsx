"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { LEADERSHIP_APP_FORM_URL } from "@/config/links";
import LeadershipApplicationCTA from "@/components/cta/LeadershipApplicationCTA";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ChevronDown, ArrowLeft } from "lucide-react";

const developmentMilestones = [
  {
    id: "dev-1",
    eyebrow: "Phase 01",
    title: "Recruit Student Leaders",
    description:
      "Build an interprofessional team of medical, nursing, pharmacy, and public health volunteers ready to launch operations.",
    accentColor: "#F5C94D"
  },
  {
    id: "dev-2",
    eyebrow: "Phase 02",
    title: "Confirm Faculty Mentorship",
    description:
      "Finalize advisory roles with experienced clinicians who will guide protocols, training, and governance.",
    accentColor: "#66C4DC"
  },
  {
    id: "dev-3",
    eyebrow: "Phase 03",
    title: "Select Clinic Sites",
    description:
      "Identify community locations across Greater Accra where screening, education, and follow-up can be delivered consistently.",
    accentColor: "#eeba2b"
  },
  {
    id: "dev-4",
    eyebrow: "Phase 04",
    title: "Pilot Launch Preparation",
    description:
      "Complete logistics, training, and community onboarding to open the Akomapa–UG Clinic pilot in mid-2026.",
    accentColor: "#0097b2"
  }
];

const achievementCards = [
  {
    id: "goal-1",
    eyebrow: "Community Care",
    title: "Free Hypertension & Diabetes Screening",
    description:
      "Provide no-cost screening and early intervention for chronic conditions in neighborhoods with limited access to preventative care.",
    accentColor: "#0097b2"
  },
  {
    id: "goal-2",
    eyebrow: "Health Education",
    title: "Nutrition & Lifestyle Coaching",
    description:
      "Deliver culturally attuned education sessions and workshops that equip families with tools to manage chronic diseases.",
    accentColor: "#F5C94D"
  },
  {
    id: "goal-3",
    eyebrow: "Coverage & Continuity",
    title: "NHIS Navigation",
    description:
      "Facilitate National Health Insurance Scheme registration and follow-up so patients stay connected to ongoing care.",
    accentColor: "#66C4DC"
  },
  {
    id: "goal-4",
    eyebrow: "Learning & Leadership",
    title: "Interprofessional Training Lab",
    description:
      "Create an immersive platform where students across disciplines learn together, deliver care together, and accelerate leadership skills.",
    accentColor: "#eeba2b"
  },
  {
    id: "goal-5",
    eyebrow: "Research & Collaboration",
    title: "University–Community Partnership",
    description:
      "Strengthen relationships between UG, community leaders, and national health partners through shared research and service delivery.",
    accentColor: "#0097b2"
  }
];

type AccordionItem = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  accentColor: string;
};

function AccordionGroup({
  items,
  appearance = "light"
}: {
  items: AccordionItem[];
  appearance?: "light" | "floral" | "hero";
}) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const config: Record<"light" | "floral" | "hero", { container: string; icon: string; body: string; title: string }> = {
    light: {
      container:
        "overflow-hidden rounded-3xl border border-neutral-200/50 bg-white text-[#0F4C5C] shadow-md shadow-black/10 " +
        "transition-colors dark:border-[#2F3332] dark:bg-[#2F3332] dark:text-[#FCFAEF] dark:shadow-black/30",
      icon: "text-[#0F4C5C] dark:text-[#FCFAEF]",
      body: "text-[#2F3332] dark:text-[#E6E7E7]",
      title: "text-[#0F4C5C] dark:text-[#FCFAEF]"
    },
    floral: {
      container:
        "overflow-hidden rounded-3xl border border-[#F5C94D]/30 bg-[#FFFAF1] text-[#0F4C5C] shadow-md shadow-[#F5C94D]/20 " +
        "transition-colors dark:border-[#3A3E3D] dark:bg-[#2F3332] dark:text-[#FCFAEF] dark:shadow-black/30",
      icon: "text-[#0F4C5C] dark:text-[#FCFAEF]",
      body: "text-[#2F3332]/85 dark:text-[#E6E7E7]",
      title: "text-[#0F4C5C] dark:text-[#FCFAEF]"
    },
    hero: {
      container:
        "overflow-hidden rounded-3xl border border-white/20 bg-[#0B2F3A]/60 text-[#FCFAEF] shadow-lg shadow-black/30 backdrop-blur-sm",
      icon: "text-[#FCFAEF]",
      body: "text-[#FCFAEF]/85",
      title: "text-[#FCFAEF]"
    }
  };
  const appearanceStyles = config[appearance];

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div
            key={item.id}
            className={`${appearanceStyles.container} transition-all duration-200 hover:-translate-y-0.5`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-start sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left"
            >
              <div className="space-y-2 sm:space-y-3 flex-1 min-w-0">
                {item.eyebrow ? (
                  <span
                    className="inline-flex items-center rounded-full px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] sm:tracking-[0.3em]"
                    style={{
                      color: item.accentColor,
                      backgroundColor: `${item.accentColor}1A`
                    }}
                  >
                    {item.eyebrow}
                  </span>
                ) : null}
                <h3 className={`text-base sm:text-lg md:text-xl font-semibold leading-tight ${appearanceStyles.title}`}>
                  {item.title}
                </h3>
              </div>
              <ChevronDown
                className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform duration-200 mt-1 sm:mt-0 ${
                  isOpen ? "rotate-180" : ""
                } ${appearanceStyles.icon}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className={`px-4 sm:px-6 pb-4 sm:pb-6 text-sm leading-relaxed sm:text-base ${appearanceStyles.body}`}
                  >
                    {item.description}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const partners = [
  {
    name: "College of Health Sciences, University of Ghana",
    logo: "/images/partners/ug-logo.png"
  },
  {
    name: "Akomapa Health Foundation",
    logo: "/images/partners/akomapa-logo.png"
  },
  {
    name: "Ghana Health Service",
    logo: "/images/partners/ghana-health-service-logo.png"
  },
  {
    name: "National Health Insurance Scheme (NHIS)",
    logo: "/images/partners/african-health-logo.png"
  }
];

const foundingTeam = [
  {
    name: "Dr. Patrick Ampofo",
    role: "UGMS Alum; New Clinics Expansion Lead, Akomapa Health",
    bio: "Leads the strategy and partnerships that guide new clinic development across Ghana.",
    image: "/images/team/patrick-ampofo.jpg"
  },
  {
    name: "Dr. Afriyie Badu",
    role: "UGMS Alum; Co-founder & Finance Officer, Akomapa Health",
    bio: "Builds sustainable financial models that ensure clinics deliver equitable access to care.",
    image: "/images/team/afriyie-badu.jpg"
  },
  {
    name: "Dr. Esi Bon Berkoh",
    role: "Co-founder & Vice President, Akomapa Health",
    bio: "Guides student leadership development and community partnerships with a global health lens.",
    image: "/images/team/esi-bon-berkoh.jpg"
  }
];

const timelinePhases = [
  {
    id: "timeline-1",
    title: "Site & Student Team Selection",
    period: "May–Jul 2025",
    focus:
      "Recruiting multidisciplinary student leaders and confirming community locations for the clinic.",
    color: "bg-[#0097b2]"
  },
  {
    id: "timeline-2",
    title: "Faculty & Stakeholder Consultations",
    period: "Jan–Apr 2026",
    focus:
      "Aligning with faculty mentors, university leadership, and community partners on clinic governance.",
    color: "bg-[#eeba2b]"
  },
  {
    id: "timeline-3",
    title: "Pre-launch Training",
    period: "Aug 2026",
    focus:
      "Delivering rigorous clinical, operational, and community engagement training for student teams.",
    color: "bg-[#0F4C5C]"
  },
  {
    id: "timeline-4",
    title: "Pilot Launch",
    period: "Oct 2026",
    focus:
      "Opening the Akomapa–UG Clinic to deliver patient care and evaluate the student-powered model.",
    color: "bg-[#66C4DC]"
  }
];

const approachPillars = [
  {
    title: "Interprofessional Collaboration",
    description:
      "Students from medicine, nursing, pharmacy, and public health learn and lead together in every clinic."
  },
  {
    title: "Community Partnership",
    description:
      "Clinic design is shaped alongside local leaders and health authorities to build trust and sustainability."
  },
  {
    title: "Expert Supervision",
    description:
      "Experienced mentors guide student teams, ensuring safe, high-quality care and meaningful learning."
  },
  {
    title: "Research-Driven Practice",
    description:
      "Continuous evaluation strengthens the model and informs a pathway for nationwide scale-up."
  }
];

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

export default function UGClinicPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="relative min-h-[80vh] py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0B2F3A] via-[#0F4C5C] to-[#0097b2] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-12 sm:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-2"
          >
            <Link 
              href="/clinics" 
              className="inline-flex items-center text-[#FCFAEF]/80 hover:text-[#FCFAEF] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Clinics
            </Link>
          </motion.div>
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="uppercase tracking-[0.3em] text-sm font-semibold text-[#FCFAEF]/80 mb-6"
            >
              Akomapa UG Clinic
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Expanding Access. Empowering Students. Transforming Care.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/85 font-light max-w-3xl"
            >
              The next chapter in student-powered care, bringing preventative health services and
              leadership training to the University of Ghana community and beyond.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Button asChild className={primaryCtaClass}>
                <a
                  href={LEADERSHIP_APP_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap"
                >
                  Apply Now
                </a>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/donate" className="whitespace-nowrap">Donate</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/partners" className="whitespace-nowrap">Partner with Us</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="w-full"
          >
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[520px] lg:h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/university-of-ghana.jpg"
                alt="Student leaders planning the Akomapa UG Clinic launch"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                About the Clinic
              </h2>
              <div className="space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                <p>
                  The Akomapa Student-Run Clinic at the University of Ghana brings our community-based
                  preventative care model to the Greater Accra Region, expanding access for patients and
                  creating transformative learning for students.
                </p>
                <p>
                  Building on the successful pilot at the University of Cape Coast, the UG Clinic unites
                  medical, nursing, pharmacy, and public health students with expert mentors to deliver
                  free screening, health education, and chronic disease management.
                </p>
                <p>
                  In partnership with the College of Health Sciences, the Akomapa Health Foundation, the
                  Ghana Health Service, and the National Health Insurance Scheme, this clinic will bridge
                  the gap between classroom training and community trust.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-2"
            >
              <div className="relative w-full min-h-[320px] h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/highlights/Akomapa-18.jpg"
                  alt="Students collaborating to design the Akomapa UG Clinic"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-10 h-56 w-56 bg-[#FCFAEF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 bg-[#F5C94D]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative order-2 md:order-1 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] lg:h-full rounded-3xl overflow-hidden border border-white/20 bg-white/10 shadow-2xl shadow-black/30"
            >
              <Image
                src="/highlights/Akomapa-7.jpg"
                alt="Students collaborating to design the Akomapa UG Clinic"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#FCFAEF] mb-2 sm:mb-3">Vision</h3>
                <p className="text-xs sm:text-sm md:text-base text-[#FCFAEF]/85 leading-relaxed">
                  To establish a student-powered, expert-supervised, and community-anchored clinic that
                  strengthens Ghana&apos;s primary healthcare system and equips future leaders to deliver
                  compassionate, evidence-based, and sustainable care.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 md:order-2 w-full max-w-full md:max-w-xl"
            >
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-[#FCFAEF]">In Development</h3>
                <p className="text-xs sm:text-sm text-[#FCFAEF]/75 leading-relaxed">
                  A phased build ensures infrastructure, talent, and community partnerships are ready
                  for launch.
                </p>
              </div>
              <AccordionGroup items={developmentMilestones} appearance="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F4F1E8] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              What We Aim to Achieve
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              The Akomapa–UG Clinic will build continuity of care and interprofessional learning that
              meets the needs of communities across Greater Accra.
            </p>
            </motion.div>

          <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 w-full max-w-full md:max-w-xl"
            >
              <AccordionGroup items={achievementCards} appearance="floral" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative order-2 min-h-[280px] sm:min-h-[320px] lg:min-h-[360px] lg:h-full rounded-3xl overflow-hidden border border-[#F5C94D]/30"
            >
              <Image
                src="/highlights/Akomapa-5.jpg"
                alt="Community outreach event led by student volunteers"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              Key Partners
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              Our founding partners bring institutional strength, community insight, and national
              health leadership to the Akomapa–UG Clinic.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {partners.map((partner) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group relative flex h-16 w-40 sm:h-20 sm:w-48 md:h-24 md:w-56 lg:h-28 lg:w-64 flex-shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl border border-[#E6E7E7]/60 bg-white px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-[#2F3332] dark:bg-[#2F3332]"
              >
                <div className="relative h-10 w-28 sm:h-12 sm:w-36 md:h-16 md:w-44 lg:h-20 lg:w-52">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain transition-transform duration-300 ease-out filter grayscale group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0B2F3A] via-[#0F4C5C] to-[#0097b2] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FCFAEF]">
              Founding Team
            </h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              Experienced Ghanaian clinicians and global health innovators are guiding a clinic model
              where student leadership and community service go hand in hand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {foundingTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur-sm shadow-2xl flex flex-col"
              >
                <div className="relative h-80 sm:h-96">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-[#FCFAEF]">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-[#F5C94D]">
                    {member.role}
                  </p>
                  <p className="text-sm text-[#FCFAEF]/85 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              Launch Timeline
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              A phased approach positions the Akomapa–UG Clinic for thoughtful growth and lasting
              impact.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#0097b2] dark:bg-[#66C4DC] h-full" />

              {timelinePhases.map((phase, index) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex flex-col md:flex-row items-center`}
                >
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full ${phase.color} border-4 border-white dark:border-[#2F3332] z-10`}
                  />

                  <div
                    className={`w-full md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    } text-center md:text-left`}
                  >
                    <Card className="bg-white dark:bg-[#2F3332] shadow-lg border-0">
                      <CardHeader>
                        <CardTitle className="text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {phase.title}
                        </CardTitle>
                        <CardDescription className="text-[#0097b2] dark:text-[#66C4DC] font-medium">
                          {phase.period}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#2F3332] dark:text-[#E6E7E7]">{phase.focus}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
                </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0B2F3A] via-[#0097b2] to-[#0F4C5C] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Our Approach</h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              A values-driven framework ensures the clinic delivers impact for patients, students, and
              partners alike.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {approachPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-6 sm:px-6 sm:py-8 shadow-xl"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{pillar.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-[#FCFAEF]/85 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LeadershipApplicationCTA
        primaryHref={LEADERSHIP_APP_FORM_URL}
        openInNewTab
        secondaryButtons={[
          { label: "Partner with Us", href: "/partners" },
          { label: "Donate", href: "/donate" },
        ]}
      />

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F4C5C] via-[#0097b2] to-[#0B2F3A] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">From the Founders</h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed italic">
              “The Akomapa–UG Clinic represents the next chapter in our shared vision for equitable,
              community-driven care. Together, we are redefining how students learn to serve and how
              communities receive the care they deserve.”
            </p>
            <p className="text-base font-semibold text-[#F5C94D]">
              — Akomapa Executive Team
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

