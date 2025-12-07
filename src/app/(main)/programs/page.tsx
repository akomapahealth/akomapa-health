"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "@/components/common/Image";
import { ArrowRight, Globe, GraduationCap, Users, Building, ChevronsDown, Sparkles, Sprout } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";

// Program Data
interface Program {
  id: number;
  title: string;
  description: string;
  details: string[];
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgGradient: string;
  image: string;
  alt: string;
  features?: string[];
}

const programs: Program[] = [
  {
    id: 1,
    title: "Akomapa Clinics",
    description: "We establish interprofessional, expert-supervised clinics built in partnership with local health authorities, traditional leaders, and community members. These student-run clinics deliver free, community-based care focused on the early detection and management of non-communicable diseases (NCDs), serving as both real-world classrooms for students and lifelines for underserved communities.",
    details: [
      "Interprofessional student teams coordinate care across medical, nursing, pharmacy, nutrition, and public health disciplines",
      "Expert supervision ensures every patient encounter meets the highest clinical and ethical standards",
      "Community-rooted model transforms trusted spaces into care hubs accessible to families",
      "Free services focus on NCD screening, counseling, and referrals with cultural sensitivity"
    ],
    href: "/clinics",
    icon: Building,
    color: "#0097b2",
    bgGradient: "from-[#0097b2]/10 to-[#0097b2]/5",
    image: "/highlights/Akomapa-28.jpg",
    alt: "Akomapa clinic team providing community healthcare",
    features: [
      "Community-Based Care",
      "Student Leadership",
      "Expert Supervision",
      "Local Partnership"
    ]
  },
  {
    id: 2,
    title: "The Akomapa Network",
    description: "Our global community of practice connects Akomapa chapters with partner student-run clinics around the world—like SHAWCO, South Side SRFC, and Yale's Neighborhood Health Project—to share best practices, mentorship, and collaborative research. Together, we're turning local innovations into global impact.",
    details: [
      "Connects student-run clinics across continents to share innovations and learnings",
      "Facilitates mentorship exchanges between experienced and emerging clinic leaders",
      "Enables collaborative research that strengthens evidence for student-powered care",
      "Builds a global movement of health professionals committed to equity and access"
    ],
    href: "/programs/akomapa-network",
    icon: Globe,
    color: "#eeba2b",
    bgGradient: "from-[#eeba2b]/10 to-[#eeba2b]/5",
    image: "/highlights/Akomapa-40.jpg",
    alt: "Global network of student healthcare leaders",
    features: [
      "Global Community",
      "Knowledge Sharing",
      "Mentorship Exchange",
      "Collaborative Research"
    ]
  },
  {
    id: 3,
    title: "Global Health Leadership Training Program",
    description: "We equip emerging health leaders with the skills, ethics, and cross-cultural experience needed to drive equitable change. Through expert-led courses, interactive seminars, and global mentorship, students learn to merge clinical care with leadership and systems thinking.",
    details: [
      "Intensive leadership curriculum combining classroom learning with hands-on rotations",
      "Expert-led courses on ethics, cultural humility, and systems thinking",
      "Interactive seminars with global health leaders from Yale, UCLA, and University of Cape Coast",
      "Mentorship program connecting students with experienced practitioners worldwide"
    ],
    href: "/programs/akomapa-ghltp",
    icon: GraduationCap,
    color: "#0097b2",
    bgGradient: "from-[#0097b2]/10 to-[#0097b2]/5",
    image: "/highlights/Akomapa-66.jpg",
    alt: "Students participating in leadership training",
    features: [
      "Leadership Development",
      "Expert Mentorship",
      "Cross-Cultural Training",
      "Systems Thinking"
    ]
  },
  {
    id: 4,
    title: "Global Health Immersion Camp",
    description: "Starting in Ghana and expanding globally, our 3-week Summer Immersion Camp gives students hands-on exposure to community and public health in low-resource settings. Participants engage in clinical service, health education, and cultural exchange—bridging classroom learning with lived experience.",
    details: [
      "Three-week intensive program in Ghana combining clinical service with cultural immersion",
      "Hands-on experience in community health, public health, and primary care delivery",
      "Cultural exchange activities that build understanding and respect for local contexts",
      "Designed to bridge theoretical learning with real-world application in resource-limited settings"
    ],
    href: "/programs/akomapa-ghip",
    icon: Users,
    color: "#eeba2b",
    bgGradient: "from-[#eeba2b]/10 to-[#eeba2b]/5",
    image: "/highlights/Akomapa-61.jpg",
    alt: "Students participating in global health immersion program",
    features: [
      "Hands-On Experience",
      "Cultural Immersion",
      "Clinical Service",
      "Global Expansion"
    ]
  },
  {
    id: 5,
    title: "Akomapa Young Advocates",
    description: "The Akomapa Young Advocates Program is a youth empowerment and health education initiative that brings community health, mentorship, and leadership development directly to high schools. Led by interprofessional university health professional students trained through Akomapa clinics, the program equips young people with practical knowledge about non-communicable diseases (NCDs) and empowers them to become champions of healthy living and positive change in their schools and communities.",
    details: [
      "Interactive health education sessions delivered directly in high schools by trained student mentors",
      "Practical knowledge about non-communicable diseases (NCDs) and preventive health measures",
      "Ongoing mentorship that nurtures the next generation of ethical, community-minded leaders",
      "Bridges education and action, empowering youth to become health champions in their communities"
    ],
    href: "/programs/akomapa-young-advocates",
    icon: Sparkles,
    color: "#0097b2",
    bgGradient: "from-[#0097b2]/10 to-[#0097b2]/5",
    image: "/highlights/Akomapa-40.jpg",
    alt: "Young advocates participating in health education",
    features: [
      "Youth Empowerment",
      "Health Education",
      "Mentorship",
      "Leadership Development"
    ]
  },
  {
    id: 6,
    title: "Akomapa Foods & Stores",
    description: "The Akomapa Foods & Stores Initiative is the sustainability arm of the Akomapa Health model—connecting food security, economic empowerment, and healthcare access into one self-sustaining ecosystem. We believe that health doesn't start in hospitals; it starts in homes, kitchens, and markets. By linking agriculture and nutrition to our student-run clinics, Akomapa creates a cycle where communities not only receive care but also co-own the means to sustain it.",
    details: [
      "Community farms and food stores that make healthy, affordable food accessible to families",
      "Revenue from food sales directly supports clinic operations, creating a self-sustaining model",
      "Addresses food insecurity while promoting nutrition and reducing long-term health complications",
      "Economic empowerment that strengthens local economies and builds community ownership"
    ],
    href: "/programs/akomapa-foods",
    icon: Sprout,
    color: "#eeba2b",
    bgGradient: "from-[#eeba2b]/10 to-[#eeba2b]/5",
    image: "/highlights/Akomapa-19.jpg",
    alt: "Community farm and food store initiative",
    features: [
      "Food Security",
      "Economic Empowerment",
      "Self-Sustaining Model",
      "Community Ownership"
    ]
  }
];

const impactMetrics = [
  {
    value: 1000,
    suffix: "+",
    label: "Students Trained",
    description: "Emerging health leaders equipped with skills to transform healthcare systems",
    color: "#0097b2"
  },
  {
    value: 15,
    suffix: "+",
    label: "Partner Clinics",
    description: "Student-run clinics connected through the Akomapa Network worldwide",
    color: "#eeba2b"
  },
  {
    value: 6,
    label: "Programs & Initiatives",
    description: "Comprehensive programs working together to deliver holistic healthcare",
    color: "#0097b2"
  },
  {
    value: 50,
    suffix: "+",
    label: "Global Mentors",
    description: "Expert practitioners guiding the next generation of health leaders",
    color: "#eeba2b"
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
      className="text-4xl md:text-5xl font-semibold tracking-tight"
      style={{ color }}
    >
      {formatted}
    </span>
  );
}

export default function ProgramsPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col gap-12 sm:gap-14">
          <div className="max-w-5xl pt-4 sm:pt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Students. Communities. Partnerships. One Vision for Health.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              At Akomapa, we&apos;re reimagining how the next generation of health professionals learn, lead, and serve. Through our integrated programs, we build student-run clinics, leadership pathways, and global partnerships that make care more accessible—while preparing students to transform the health systems of tomorrow.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="relative w-full h-[280px] sm:h-[360px] md:h-[520px] lg:h-[640px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/highlights/Akomapa-47.jpg"
                alt="Akomapa programs and initiatives"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute -top-6 left-6 sm:left-8">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-[#0F4C5C] rounded-full" />
                  <div className="absolute inset-2 bg-gradient-to-br from-[#66C4DC] via-[#0097b2] to-[#0F4C5C] rounded-full opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center text-[#FCFAEF]">
                    <ChevronsDown className="w-8 h-8" />
                  </div>
                  <div className="absolute -bottom-5 inset-x-6 h-7 bg-[#0F4C5C] rounded-b-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                OUR PROGRAMS
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Integrated Pathways for Impact
              </h2>
              <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
                Each program is designed to build upon the others, creating a comprehensive ecosystem that prepares students, serves communities, and transforms healthcare systems.
              </p>
            </motion.div>
          </div>

          <div className="space-y-12 sm:space-y-16 lg:space-y-24">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div className={`${index % 2 === 0 ? "order-1" : "order-1 lg:order-2"} w-full h-full`}>
                    <div className="relative w-full min-h-[320px] h-[320px] sm:h-[360px] md:h-[420px] lg:h-[450px] xl:h-[500px] rounded-3xl overflow-hidden shadow-xl group">
                      <Image
                        src={program.image}
                        alt={program.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm bg-white/90 dark:bg-[#2F3332]/90"
                          style={{ border: `2px solid ${program.color}30` }}
                        >
                          <program.icon className="h-8 w-8" style={{ color: program.color }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`${index % 2 === 0 ? "order-2" : "order-2 lg:order-1"} h-full flex flex-col justify-center`}>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-1 w-8 rounded-full" style={{ backgroundColor: program.color }} />
                      <div className="h-1 w-1 rounded-full" style={{ backgroundColor: program.color }} />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                      {program.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed mb-6 max-w-xl">
                      {program.description}
                    </p>
                    
                    {program.features && (
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-6">
                        {program.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className={`bg-gradient-to-br ${program.bgGradient} dark:bg-[#2F3332] rounded-lg p-2 sm:p-3 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20`}
                          >
                            <p className="text-xs sm:text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-3 text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed max-w-xl mb-6">
                      {program.details.slice(0, 2).map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-sm md:text-base">{detail}</p>
                      ))}
                    </div>

                    <Button
                      asChild
                      className="w-full sm:w-auto bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] group"
                    >
                      <Link href={program.href} className="flex items-center justify-center">
                        {program.id === 1 ? "Explore Akomapa Clinics" : program.id === 2 ? "Discover the Akomapa Network" : program.id === 3 ? "Join the Leadership Program" : program.id === 4 ? "Experience the Immersion Camp" : program.id === 5 ? "Join the Akomapa Young Advocates" : program.id === 6 ? "Discover the Akomapa Foods & Stores" : "Learn More"}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#F5C94D] uppercase">
              Our Impact
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#FCFAEF] leading-tight">
              Building a Movement, One Program at a Time
            </h2>
            <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed">
              Our programs work together to create lasting change—training leaders, connecting communities, and transforming healthcare systems worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.4 }}
                className="group relative rounded-2xl bg-[#FCFAEF]/95 text-[#1C1F1E] shadow-xl border border-[#E6E7E7]/40 overflow-hidden p-6 md:p-8 flex flex-col hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#0097b2]/10 via-transparent to-[#F5C94D]/15" />
                <div className="relative flex flex-col h-full">
                  <ImpactCounter value={metric.value} suffix={metric.suffix} color={metric.color} />
                  <h3 className="mt-4 text-xl font-semibold uppercase tracking-[0.3em] text-[#1C1F1E] mb-3">
                    {metric.label}
                  </h3>
                  <p className="text-sm md:text-base text-[#2F3332]/85 leading-relaxed flex-1">
                    {metric.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#0B2F3A] text-[#FCFAEF] relative overflow-hidden">
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
                  Get Involved
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#FCFAEF] leading-tight">
                  Be Part of the Movement
                </h2>
              </div>
              <p className="text-base sm:text-lg md:text-xl text-[#FCFAEF]/85 leading-relaxed max-w-3xl mx-auto">
                Your support powers every program. Whether through financial contributions, in-kind donations, or strategic partnerships—there&apos;s a place for you at Akomapa.
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
                  <Link href="/partner" className="flex items-center whitespace-nowrap">
                    Partner with Us
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group border-2 border-[#FCFAEF] text-[#FCFAEF] bg-transparent hover:bg-[#FCFAEF] hover:text-[#0097b2] px-6 sm:px-8 py-6 h-auto text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  <Link href="mailto:akomapahealth@gmail.com" className="flex items-center">
                    Contact Us
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
