"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";

const coreThemes = [
  {
    id: "theme-1",
    title: "Community Engagement",
    description: "Partnering authentically with local voices and systems.",
    color: "#0097b2"
  },
  {
    id: "theme-2",
    title: "Cultural Humility",
    description: "Practicing reflective, inclusive leadership.",
    color: "#eeba2b"
  },
  {
    id: "theme-3",
    title: "Ethical Leadership",
    description: "Navigating complexity with transparency and accountability.",
    color: "#0097b2"
  },
  {
    id: "theme-4",
    title: "Interprofessional Collaboration",
    description: "Working across disciplines for integrated care.",
    color: "#eeba2b"
  },
  {
    id: "theme-5",
    title: "Health Systems Innovation",
    description: "Designing and scaling creative, context-driven solutions.",
    color: "#0097b2"
  },
  {
    id: "theme-6",
    title: "Sustainable Systems Building",
    description: "Ensuring impact that outlives projects and individuals.",
    color: "#eeba2b"
  }
];

const programFeatures = [
  {
    id: "feature-1",
    title: "Featured Speaker Series",
    description: "Renowned global health leaders from WHO, Yale, UCLA, University of Ghana, and beyond share insights on leadership and equity.",
    color: "#0097b2"
  },
  {
    id: "feature-2",
    title: "Student-Led Discussions",
    description: "Each week, students moderate conversations, lead reflections, and present on local/global case studies.",
    color: "#eeba2b"
  },
  {
    id: "feature-3",
    title: "Interactive Assignments",
    description: "Real-world challenges drawn from Akomapa's clinics and global partner sites, encouraging systems thinking and problem-solving.",
    color: "#0097b2"
  },
  {
    id: "feature-4",
    title: "Capstone Project",
    description: "Each participant designs a practical, community-driven intervention plan with mentorship from Akomapa faculty and field partners.",
    color: "#eeba2b"
  }
];

const learningBenefits = [
  {
    id: "benefit-1",
    title: "Mentorship Access",
    description: "Mentorship from Akomapa's global advisory network",
    color: "#0097b2"
  },
  {
    id: "benefit-2",
    title: "Case-Based Learning",
    description: "Case-based learning from active student-run clinics",
    color: "#eeba2b"
  },
  {
    id: "benefit-3",
    title: "Immersion Program",
    description: "Invitations to the Akomapa Global Health Immersion Program",
    color: "#0097b2"
  },
  {
    id: "benefit-4",
    title: "Networking Sessions",
    description: "Global networking sessions and leadership roundtables",
    color: "#eeba2b"
  },
  {
    id: "benefit-5",
    title: "Leadership Summit",
    description: "Priority participation in the annual Akomapa Global Health Leadership Summit",
    color: "#0097b2"
  }
];

const facultyInstitutions = [
  {
    id: "faculty-1",
    name: "Yale School of Medicine",
    logo: "/images/partners/yale-sm-logo.png",
    width: 280,
    height: 140
  },
  {
    id: "faculty-2",
    name: "University of Cape Coast",
    logo: "/images/partners/ucc.png",
    width: 280,
    height: 140
  },
  {
    id: "faculty-3",
    name: "University of Ghana",
    logo: "/images/partners/ug-logo.png",
    width: 280,
    height: 140
  },
  {
    id: "faculty-4",
    name: "David Geffen School of Medicine at UCLA",
    logo: "/images/partners/ucla.png",
    width: 280,
    height: 140
  },
  {
    id: "faculty-5",
    name: "Ghana Health Service",
    logo: "/images/partners/ghana-health-service-logo.png",
    width: 280,
    height: 140
  }
];

const testimonials = [
  {
    id: 1,
    quote: "The Akomapa Program changed how I see leadership. It's not about titles — it's about empathy, ethics, and action.",
    name: "Program Fellow",
    title: "Ghana",
    image: "/avatar-2.jpg"
  },
  {
    id: 2,
    quote: "Learning directly from world leaders while engaging with peers across continents gave me the confidence to lead in my own community.",
    name: "Student",
    title: "Yale University",
    image: "/avatar-2.jpg"
  }
];

function ImpactCounter({ value, suffix = "", color }: { value: number; suffix?: string; color: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 120, damping: 20, mass: 0.8 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [springValue]);

  const formatted = `${Math.round(displayValue).toLocaleString()}${suffix}`;

  return (
    <span
      ref={ref}
      className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
      style={{ color }}
    >
      {formatted}
    </span>
  );
}

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

export default function GHLTPPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0B2F3A] via-[#0F4C5C] to-[#0097b2] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-4 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-2"
          >
            <Link 
              href="/programs" 
              className="inline-flex items-center text-[#FCFAEF]/80 hover:text-[#FCFAEF] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Link>
          </motion.div>
          <div className="max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="uppercase tracking-[0.3em] text-sm font-semibold text-[#FCFAEF]/80 mb-6"
            >
              Akomapa Global Health Leadership Training Program
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Training the Next Generation of Ethical, Compassionate, and Impact-Driven Health Leaders
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/85 font-light max-w-3xl"
            >
              A semester-long, certificate-bearing course that equips emerging health professionals with the knowledge, empathy, and vision to lead transformative change in global health.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button asChild className={primaryCtaClass}>
                <Link href="/join">Apply Now</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/#">Become a Mentor</Link>
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
                src="/highlights/Akomapa-40.jpg"
                alt="Global health leadership training program"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About the Program Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6">
                About the Program
              </h2>
              <div className="space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                <p>
                  The Akomapa Global Health Leadership Training Program is a semester-long, certificate-bearing course that equips emerging health professionals with the knowledge, empathy, and vision to lead transformative change in global health.
                </p>
                <p>
                  Taught by world experts from leading universities across Africa, the United States, and beyond, and from top global health organizations, this program unites students passionate about reimagining healthcare — from classrooms to communities.
                </p>
                <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Rooted in Akomapa&apos;s philosophy of leadership through service, the course blends rigorous academic instruction with mentorship, live dialogue, and hands-on learning from the field.
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
                  src="/highlights/Akomapa-66.jpg"
                  alt="Students in global health leadership training"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-10 h-56 w-56 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Vision
              </h2>
              <p className="text-lg md:text-xl text-[#FCFAEF]/90 leading-relaxed">
                To train a new generation of 1,000+ global health leaders who lead with integrity, humility, and innovation — bridging the gap between care and justice, and between learning and leadership.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
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
              What You&apos;ll Learn
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              Our curriculum integrates cross-disciplinary theory, ethical frameworks, and practice-based learning — all grounded in real case studies from Akomapa clinics across Ghana and the United States.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-8 text-center">
              Core Themes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {coreThemes.map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group relative rounded-2xl bg-white dark:bg-[#2F3332] p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#0097b2]/5 via-transparent to-[#eeba2b]/5 rounded-2xl" />
                  <div className="relative">
                    <div 
                      className="h-1 w-16 rounded-full mb-4"
                      style={{ backgroundColor: theme.color }}
                    />
                    <h4 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3">
                      {theme.title}
                    </h4>
                    <p className="text-sm md:text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How the Program Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F4C5C] via-[#0097b2] to-[#0B2F3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-10 h-56 w-56 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              How the Program Works
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#FCFAEF]/10 backdrop-blur-md rounded-2xl p-6 border border-[#FCFAEF]/20">
                <h3 className="text-lg font-semibold mb-2">Duration</h3>
                <p className="text-[#FCFAEF]/90">10–16 weeks (semester-long)</p>
              </div>
              <div className="bg-[#FCFAEF]/10 backdrop-blur-md rounded-2xl p-6 border border-[#FCFAEF]/20">
                <h3 className="text-lg font-semibold mb-2">Format</h3>
                <p className="text-[#FCFAEF]/90">Virtual and hybrid delivery (live + asynchronous)</p>
              </div>
              <div className="bg-[#FCFAEF]/10 backdrop-blur-md rounded-2xl p-6 border border-[#FCFAEF]/20">
                <h3 className="text-lg font-semibold mb-2">Structure</h3>
                <p className="text-[#FCFAEF]/90">Weekly live sessions, peer discussions, and applied projects</p>
              </div>
              <div className="bg-[#FCFAEF]/10 backdrop-blur-md rounded-2xl p-6 border border-[#FCFAEF]/20">
                <h3 className="text-lg font-semibold mb-2">Certification</h3>
                <p className="text-[#FCFAEF]/90">Akomapa Certificate in Global Health Leadership awarded upon completion</p>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center">
              Program Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {programFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative rounded-2xl bg-[#FCFAEF]/95 text-[#1C1F1E] p-6 md:p-8 shadow-xl border border-[#E6E7E7]/40"
                >
                  <div 
                    className="h-1 w-16 rounded-full mb-4"
                    style={{ backgroundColor: feature.color }}
                  />
                  <h4 className="text-lg md:text-xl font-semibold mb-3 text-[#1C1F1E]">
                    {feature.title}
                  </h4>
                  <p className="text-sm md:text-base text-[#2F3332]/85 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Faculty & Contributors Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                Faculty & Contributors
              </h2>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed max-w-3xl mx-auto">
                Taught and mentored by faculty and practitioners from leading institutions and organizations worldwide.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {facultyInstitutions.map((institution, index) => (
                <motion.div
                  key={institution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="group flex-shrink-0"
                >
                  <div className="relative flex items-center justify-center h-[55px] sm:h-[75px] md:h-[95px] lg:h-[115px] w-auto px-4 sm:px-6 opacity-75 hover:opacity-100 transition-opacity duration-300">
                    <NextImage
                      src={institution.logo}
                      alt={institution.name}
                      width={institution.width}
                      height={institution.height}
                      className="object-contain h-full w-auto transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Beyond the Classroom Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-10 h-56 w-56 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Learning Beyond the Classroom
            </h2>
            <p className="text-lg text-[#FCFAEF]/90 leading-relaxed">
              Students gain exclusive access to:
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {learningBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative rounded-2xl bg-[#FCFAEF]/95 text-[#1C1F1E] p-6 md:p-8 shadow-xl border border-[#E6E7E7]/40"
                >
                  <div 
                    className="h-1 w-16 rounded-full mb-4"
                    style={{ backgroundColor: benefit.color }}
                  />
                  <h4 className="text-lg font-semibold mb-3 text-[#1C1F1E]">
                    {benefit.title}
                  </h4>
                  <p className="text-sm md:text-base text-[#2F3332]/85 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Goal Section */}
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
              Impact Goal
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              By 2027, we aim to:
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-white dark:bg-[#2F3332] text-[#1C1F1E] dark:text-[#FCFAEF] p-6 md:p-8 shadow-xl border border-[#E6E7E7]/40 dark:border-[#4F5554]/40 flex flex-col"
              >
                <div 
                  className="h-1 w-16 rounded-full mb-6"
                  style={{ backgroundColor: "#0097b2" }}
                />
                <div className="mb-4">
                  <ImpactCounter value={1000} suffix="+" color="#0097b2" />
                </div>
                <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed flex-1">
                  Train students and young professionals in ethical, community-driven leadership
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-white dark:bg-[#2F3332] text-[#1C1F1E] dark:text-[#FCFAEF] p-6 md:p-8 shadow-xl border border-[#E6E7E7]/40 dark:border-[#4F5554]/40 flex flex-col"
              >
                <div 
                  className="h-1 w-16 rounded-full mb-6"
                  style={{ backgroundColor: "#eeba2b" }}
                />
                <div className="mb-4">
                  <ImpactCounter value={5} suffix="+" color="#eeba2b" />
                </div>
                <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed flex-1">
                  Build a sustainable pipeline of interprofessional global health leaders across countries
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-white dark:bg-[#2F3332] text-[#1C1F1E] dark:text-[#FCFAEF] p-6 md:p-8 shadow-xl border border-[#E6E7E7]/40 dark:border-[#4F5554]/40 flex flex-col"
              >
                <div 
                  className="h-1 w-16 rounded-full mb-6"
                  style={{ backgroundColor: "#0097b2" }}
                />
                <div className="mb-4">
                  <ImpactCounter value={1} suffix="" color="#0097b2" />
                </div>
                <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed flex-1">
                  Strengthen links between academic learning and real-world systems change through the Akomapa Network
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Voices from Participants Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Voices from Participants
            </h2>
          </div>
          
          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 dark:bg-[#2F3332] rounded-2xl shadow-xl p-8 md:p-12 min-h-[300px] flex flex-col"
              >
                <div className="absolute top-8 left-8 text-[#0097b2] dark:text-[#66C4DC] opacity-20">
                  <Quote size={64} />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex-1 flex flex-col justify-center">
                    <blockquote className="text-xl md:text-2xl leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]">
                      &quot;{testimonials[currentIndex].quote}&quot;
                    </blockquote>
                  </div>

                  <div className="flex items-center mt-8">
                    <div className="rounded-full overflow-hidden h-16 w-16 mr-4">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        width={64}
                        height={64}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-[#1C1F1E] dark:text-[#FCFAEF]">{testimonials[currentIndex].name}</div>
                      <div className="text-[#eeba2b] dark:text-[#F5C94D]">{testimonials[currentIndex].title}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === currentIndex ? "bg-[#F5C94D]" : "bg-[#FCFAEF]/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white/90 dark:bg-[#2F3332] rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="h-6 w-6 text-[#0097b2]" />
                </button>
                
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white/90 dark:bg-[#2F3332] rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="h-6 w-6 text-[#0097b2]" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Join the Next Cohort CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F4C5C] via-[#0097b2] to-[#0B2F3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              className="space-y-6"
            >
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-[#F5C94D] uppercase mb-4">
                  Join the Next Cohort
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#FCFAEF] leading-tight">
                  Become Part of a Global Movement
                </h2>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-[#FCFAEF]/85 leading-relaxed max-w-3xl mx-auto">
                Shape the future of compassionate, ethical healthcare through our Global Health Leadership Training Program.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6"
              >
                <Button
                  asChild
                  size="lg"
                  className="group bg-[#FCFAEF] text-[#0097b2] hover:bg-[#F5C94D] hover:text-[#1C1F1E] px-6 sm:px-8 py-6 h-auto text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/join" className="flex items-center whitespace-nowrap">
                    Apply Now
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group border-2 border-[#FCFAEF] text-[#FCFAEF] bg-transparent hover:bg-[#FCFAEF] hover:text-[#0097b2] px-6 sm:px-8 py-6 h-auto text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/programs" className="flex items-center">
                    Download Program Overview
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group border-2 border-[#F5C94D] text-[#F5C94D] bg-transparent hover:bg-[#F5C94D] hover:text-[#1C1F1E] px-6 sm:px-8 py-6 h-auto text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="/partner" className="flex items-center whitespace-nowrap">
                    Partner to Teach
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
