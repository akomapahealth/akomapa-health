"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";

const whatWeDo = [
  {
    id: "ncd-education",
    title: "Educate on NCDs",
    description:
      "We translate complex topics like hypertension, diabetes, nutrition, and mental wellness into relatable lessons tailored for high school students.",
    color: "#0097b2"
  },
  {
    id: "screenings",
    title: "Provide Health Screenings",
    description:
      "Students receive free blood pressure and glucose checks with pathways to local Akomapa clinics for follow-up care when needed.",
    color: "#eeba2b"
  },
  {
    id: "healthy-lifestyles",
    title: "Promote Healthy Lifestyles",
    description:
      "Interactive demonstrations share practical strategies for balanced nutrition, movement, and stress management that families can use immediately.",
    color: "#0F4C5C"
  },
  {
    id: "advocate-training",
    title: "Train Young Advocates",
    description:
      "We mentor student leaders to run awareness campaigns, lead peer education, and champion wellness initiatives on their campuses.",
    color: "#0097b2"
  },
  {
    id: "career-mentorship",
    title: "Offer Career Mentorship",
    description:
      "Storytelling circles expose students to careers in medicine, nursing, pharmacy, public health, and leadership while demystifying the journey ahead.",
    color: "#eeba2b"
  }
];

const mentorshipBenefits = [
  {
    title: "Leadership Coaching",
    description:
      "Continued mentorship in health leadership, communication, and advocacy keeps every Young Advocate supported.",
    color: "#0097b2"
  },
  {
    title: "Training Studios",
    description:
      "Periodic workshops dive into community engagement and NCD prevention using real cases from Akomapa clinics.",
    color: "#eeba2b"
  },
  {
    title: "Student Projects",
    description:
      "Advocates design and lead school-based health campaigns, service projects, and storytelling activations.",
    color: "#0F4C5C"
  },
  {
    title: "Youth Forums",
    description:
      "Invitations to leadership forums and community health days connect students to regional clinic partners.",
    color: "#8DD4E6"
  }
];

const mentorshipHighlights = [
  {
    label: "Mentor Circles",
    title: "Guided by University Mentors",
    description:
      "Each advocate is paired with an interprofessional mentor who blends compassion, accountability, and lived experience.",
    accent: "#F5C94D"
  },
  {
    label: "Leadership in Action",
    title: "Projects that Matter",
    description:
      "Students launch wellness clubs, awareness drives, and research projects that keep momentum alive between visits.",
    accent: "#66C4DC"
  },
  {
    label: "Community Connection",
    title: "Clinic-Linked Support",
    description:
      "Mentorship stays tethered to Akomapa clinics so referrals, data, and storytelling always feed back into care.",
    accent: "#E6E7E7"
  }
];

const howItWorks = [
  {
    eyebrow: "Step 01",
    title: "Clinic Partnerships",
    description:
      "Local Akomapa clinics collaborate with nearby high schools to co-design immersive health education experiences."
  },
  {
    eyebrow: "Step 02",
    title: "Student Facilitation",
    description:
      "Interprofessional university teams deliver interactive sessions that blend storytelling, demonstrations, and screenings."
  },
  {
    eyebrow: "Step 03",
    title: "Young Advocate Pathway",
    description:
      "Students who show passion join the Young Advocates track for deeper mentorship and leadership development."
  },
  {
    eyebrow: "Step 04",
    title: "Sustained Engagement",
    description:
      "Regional clinic teams host mentorship circles, community projects, and annual leadership events to keep momentum strong."
  }
];

const impactMetrics = [
  {
    id: "students",
    value: 10000,
    suffix: "+",
    label: "Students Reached",
    description: "Educate 10,000+ high school students on NCD prevention and health literacy.",
    color: "#0097b2"
  },
  {
    id: "advocates",
    value: 300,
    suffix: "+",
    label: "Youth Advocates",
    description: "Train and mentor hundreds of advocates who lead change on their campuses.",
    color: "#eeba2b"
  },
  {
    id: "partnerships",
    value: 6,
    suffix: "+",
    label: "Clinic Regions",
    description: "Strengthen university–community partnerships across Ghana and beyond.",
    color: "#0F4C5C"
  },
  {
    id: "pipeline",
    value: 1,
    suffix: "",
    label: "Leadership Pipeline",
    description: "Create an early pathway for global health and leadership talent.",
    color: "#0097b2"
  }
];

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

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

export default function YoungAdvocatesPage() {
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
              Akomapa Young Advocates Program
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Educating. Empowering. Inspiring the Next Generation of Health Leaders.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/85 font-light max-w-3xl"
            >
              Led by university students trained through Akomapa clinics, the Young Advocates Program brings community health, mentorship, and leadership development directly to high schools.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button asChild className={primaryCtaClass}>
                <Link href="/partner">Partner with Us</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/join">Volunteer as a University Student</Link>
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
                alt="Young advocates participating in a health education session"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                About the Program
              </h2>
              <div className="space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                <p>
                  The Young Advocates Program brings community health, mentorship, and leadership development directly to high schools. University student teams trained through Akomapa clinics facilitate learning, screenings, and storytelling that meet teens where they are.
                </p>
                <p>
                  Through interactive sessions, health screenings, and ongoing mentorship, students gain practical knowledge about non-communicable diseases and learn how to transform that knowledge into action.
                </p>
                <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Every session bridges education and community care—nurturing ethical, community-minded leaders who champion health in their schools and neighborhoods.
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
                  alt="University mentors guiding high school students"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
            <p className="text-lg text-[#FCFAEF]/90 leading-relaxed">
              To cultivate youth leaders who understand their power to improve community health, advocate for well-being, and serve as role models of compassion and integrity.
            </p>
          </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">What We Do</h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              University student teams lead immersive sessions that turn classrooms into hubs of curiosity, health literacy, and leadership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative rounded-2xl bg-white dark:bg-[#2F3332] p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E6E7E7]/30 dark:border-[#4F5554]/30 hover:-translate-y-1"
              >
                <div
                  className="h-1 w-16 rounded-full mb-4"
                  style={{ backgroundColor: item.color }}
                />
                <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F4C5C] via-[#0097b2] to-[#0B2F3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-16 items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.35em] uppercase text-[#F5C94D]/80">
                  Beyond a single visit
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">Ongoing Mentorship</h2>
                <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
                  Students who show enthusiasm join a long-term mentorship journey guided by university mentors from local Akomapa clinics—turning curiosity into consistent leadership.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mentorshipHighlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/15 bg-white/5 p-5 shadow-lg backdrop-blur-[2px]"
                  >
                    <p
                      className="text-xs font-semibold tracking-[0.3em] uppercase"
                      style={{ color: highlight.accent }}
                    >
                      {highlight.label}
                    </p>
                    <h3 className="text-lg font-semibold text-white mt-2">{highlight.title}</h3>
                    <p className="text-sm text-[#FCFAEF]/80 leading-relaxed mt-1">
                      {highlight.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <div className="absolute -top-6 -right-6 h-24 w-24 bg-[#FCFAEF]/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {mentorshipBenefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="relative overflow-hidden rounded-3xl border border-[#E6E7E7]/40 bg-[#FCFAEF] p-5 sm:p-6 shadow-2xl"
                    >
                      <div className="pointer-events-none absolute inset-0 opacity-40">
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white/60" />
                        <div className="absolute inset-0 mix-blend-multiply">
                          <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(250,244,228,0.8),_transparent_60%)]" />
                        </div>
                      </div>
                      <div className="relative space-y-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="h-10 w-10 rounded-2xl flex items-center justify-center text-sm font-semibold border border-[#E6E7E7]"
                            style={{
                              backgroundColor: `${benefit.color}22`,
                              color: benefit.color
                            }}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <h3 className="text-lg font-semibold text-[#1C1F1E]">{benefit.title}</h3>
                        </div>
                        <p className="text-sm md:text-base text-[#2F3332] leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">How It Works</h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              A simple, repeatable model ensures every region delivers quality mentorship anchored in community care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl bg-white dark:bg-[#2F3332] p-6 md:p-8 shadow-xl border border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
              >
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[#0097b2] dark:text-[#66C4DC] mb-3">
                  {step.eyebrow}
                </p>
                <h3 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-[#2F3332] dark:text-[#E6E7E7]/90 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            <h2 className="text-3xl md:text-4xl font-bold">Our Impact</h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              Every classroom conversation is part of a larger movement to build a healthier, more compassionate generation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl bg-[#FCFAEF]/95 text-[#1C1F1E] p-6 md:p-8 shadow-xl border border-[#E6E7E7]/40 flex flex-col gap-4"
              >
                <ImpactCounter value={metric.value} suffix={metric.suffix} color={metric.color} />
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#1C1F1E]/70">
                  {metric.label}
                </p>
                <p className="text-sm md:text-base text-[#2F3332]/85 leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#F4F1E8] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-2 lg:order-1 space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Powered by Akomapa Clinics
              </h2>
              <p>
                Each local Akomapa clinic leads the Young Advocates Program in its region. The Akomapa UCC Clinic runs the initiative across high schools in Cape Coast and surrounding towns, mentoring students to become youth health ambassadors connected to real community care.
              </p>
              <p>
                Partnerships between clinics, faculty mentors, and education authorities ensure students receive accurate information, compassionate guidance, and real pathways to care.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="order-1 lg:order-2 relative w-full min-h-[320px] h-[320px] sm:h-[380px] md:h-[420px] lg:h-[460px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/highlights/Akomapa-19.jpg"
                alt="Akomapa clinic mentors supporting youth"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

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
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center">From the Founders</h2>
            <div className="relative bg-[#FCFAEF]/10 backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-xl border border-[#FCFAEF]/20">
              <blockquote className="relative z-10 text-lg md:text-xl text-[#FCFAEF]/90 leading-relaxed italic">
                “The Akomapa Young Advocates Program believes that leadership begins with empathy. By empowering young people to care for their health and their communities, we are building a generation of changemakers with good hearts.”
              </blockquote>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#F5C94D]/40 shadow-lg flex-shrink-0 bg-white/90">
                <Image
                  src="/images/logo.svg"
                  alt="Akomapa Health"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-base font-semibold text-[#F5C94D]">
                  Akomapa Executive Team
                </p>
                <p className="text-sm text-[#FCFAEF]/80">
                  Founders of the Young Advocates Program
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              Partner or Get Involved
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              We welcome partnerships with schools, education authorities, and organizations dedicated to youth development and community health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className={primaryCtaClass}>
                <Link href="/partner" className="flex items-center">
                  Partner with Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/join" className="flex items-center">
                  Volunteer as a Student
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                className={`${ctaBaseClass} border-2 border-[#0097b2] text-[#0097b2] bg-transparent hover:bg-[#0097b2]/10 hover:text-[#1C1F1E] shadow-none focus-visible:ring-[#8DD4E6]`}
              >
                <Link href="/donate" className="flex items-center">
                  Support the Program
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

