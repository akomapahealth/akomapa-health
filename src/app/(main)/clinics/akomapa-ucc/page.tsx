"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin, ArrowLeft } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import Gallery, { type GalleryItem } from "@/components/home/Gallery";
import VolunteerGrid from "@/components/clinics/VolunteerGrid";
import { Button } from "@/components/ui/button";

const impactHighlights = [
  {
    value: "1,000+",
    label: "Patients Served",
    description:
      "Neighbors receiving free screening, counseling, and follow-up through our community-based clinics.",
    accentColor: "#0097b2"
  },
  {
    value: "75+",
    label: "Students Trained",
    description:
      "Interprofessional health students leading care with mentorship from experienced clinicians.",
    accentColor: "#eeba2b"
  },
  {
    value: "2",
    label: "Community Sites",
    description:
      "Serving Abeadze Dominase and Abura with accessible, trusted, and equitable primary care.",
    accentColor: "#0F4C5C"
  }
];

const studentLeaders = [
  {
    name: "David Ofosu",
    role: "Co-Director, Medical Student",
    image: "/ucc-team/david_kojo_ofosu.JPG"
  },
  {
    name: "Hafiz Shaban",
    role: "Co-Director, Nursing Student",
    image: "/ucc-team/hafiz_shaban.JPG"
  },
  {
    name: "Getwell Essuman",
    role: "Volunteer Recruitment Co-Lead, Medical Laboratory Science Student",
    image: "/ucc-team/getwell_ebiram_essuman.JPG"
  },
  {
    name: "David Konadu Kombate",
    role: "Volunteer Recruitment Co-Lead, Medical Laboratory Science Student",
    image: "/ucc-team/david_konadu_kombate.JPG"
  },
  {
    name: "Wilfred Obeng",
    role: "Training & Standards Coordinator, Medical Student",
    image: "/ucc-team/wilfred_obeng.JPG"
  },
  {
    name: "Belinda Odoom",
    role: "Training & Standards Coordinator, Nursing Student",
    image: "/ucc-team/belinda_odoom.JPG"
  },
  {
    name: "Geraldine-Cristal Apeadua Agyapong",
    role: "Finance Officer, Medical Student",
    image: "/ucc-team/geraldine_cristal_apeadua_agyepong.JPG"
  },
  {
    name: "Frederick Baffour",
    role: "Finance Officer, Optometry Student",
    image: "/ucc-team/frederick_baffour.JPG"
  },
  {
    name: "Gloria Tawiah Blay",
    role: "Community Engagement Liaison, Pharmacy Student",
    image: "/ucc-team/gloria_tawia_blay.JPG"
  },
  {
    name: "Prince Nyarko",
    role: "Community Engagement Liaison, Optometry Student",
    image: "/ucc-team/prince_nyarkoh.JPG"
  },
  {
    name: "Queenstar Aduse Opoku",
    role: "Supplies & Logistics Manager, Pharmacy Student",
    image: "/ucc-team/queenster_aduse_opoku.JPG"
  },
  {
    name: "Martha Bawa",
    role: "Supplies & Logistics Manager, Nursing Student",
    image: "/ucc-team/martha_bawa.JPG"
  }
];

const facultyMentors = [
  {
    name: "Dr. Derek Anamaale Tuoyire",
    title: "Head, Department of Community Medicine, UCC",
    image: "/images/team/dr-tuoyire.jpeg"
  },
  {
    name: "Prof. Martins Ekor",
    title: "Provost, College of Health and Allied Sciences, UCC",
    image: "/images/team/prof-martin-ekor.jpg"
  },
  {
    name: "Prof. Samuel Kyei",
    title: "Professor of Optometry, UCC",
    image: "/images/team/prof-samuel-kyei.png"
  }
];

const servicesOffered = [
  "Blood pressure and glucose screening",
  "Medication counseling",
  "Home health visits",
  "Nutrition and lifestyle education",
  "NHIS registration support",
  "Referral and follow-up coordination"
];

const testimonials = [
  {
    quote:
      "When we come here, the students make us feel cared for. They check our blood pressure, teach us about food, and make sure we understand our medicine.",
    name: "Community Member",
    title: "Abeadze Dominase"
  },
  {
    quote: "I feel proud to serve my community while learning to be a doctor.",
    name: "UCC Medical Student",
    title: "Clinic Volunteer"
  }
];

const uccGalleryItems: GalleryItem[] = [
  {
    id: 201,
    src: "/gallery/gallery-pic-1.jpg",
    alt: "First meeting of the Akomapa UCC clinic team",
    category: "students",
    featured: true
  },
  {
    id: 202,
    src: "/gallery/gallery-pic-2.jpg",
    alt: "Akomapa UCC clinic team with volunteers",
    category: "community"
  },
  {
    id: 203,
    src: "/gallery/gallery-pic-3.jpg",
    alt: "Akomapa UCC clinic team with volunteers",
    category: "students"
  },
  {
    id: 204,
    src: "/gallery/gallery-pic-4.jpg",
    alt: "Akomapa UCC meeting session with volunteers",
    category: "faculty",
    featured: true
  },
  {
    id: 205,
    src: "/gallery/gallery-pic-10.jpg",
    alt: "Volunteers preparing educational materials for outreach",
    category: "community"
  },
  {
    id: 206,
    src: "/gallery/gallery-pic-12.jpg",
    alt: "Educational session with community members",
    category: "clinics"
  },
  {
    id: 207,
    src: "/gallery/gallery-pic-7.jpg",
    alt: "Faculty supervisors aligning on clinic standards",
    category: "faculty"
  },
  {
    id: 208,
    src: "/gallery/gallery-pic-5.jpg",
    alt: "Akomapa UCC clinic team with volunteers",
    category: "students"
  },
  {
    id: 209,
    src: "/akomapa-hangout/Akomapa_hangout-31.jpg",
    alt: "Akomapa UCC hangout session",
    category: "community"
  },
  {
    id: 210,
    src: "/akomapa-hangout/Akomapa_hangout-108.jpg",
    alt: "Akomapa UCC hangout session",
    category: "students"
  },
  {
    id: 211,
    src: "/akomapa-hangout/Akomapa_hangout-2.jpg",
    alt: "Akomapa UCC hangout session",
    category: "community"
  },
  {
    id: 212,
    src: "/akomapa-hangout/Akomapa_hangout-100.jpg",
    alt: "Akomapa UCC hangout session",
    category: "students"
  },
  {
    id: 213,
    src: "/akomapa-hangout/Akomapa_hangout-81.jpg",
    alt: "Akomapa UCC hangout session",
    category: "community"
  },
  {
    id: 214,
    src: "/akomapa-hangout/Akomapa_hangout-6.jpg",
    alt: "Akomapa UCC hangout session",
    category: "students"
  }
];

const coDirectors = [
  {
    name: "David Ofosu",
    image: "/ucc-team/david_kojo_ofosu.JPG"
  },
  {
    name: "Hafiz Shaban",
    image: "/ucc-team/hafiz_shaban.JPG"
  }
];

const ctaBaseClass =
  "group inline-flex items-center justify-center gap-2 rounded-half px-8 py-6 h-auto text-base sm:text-lg font-medium transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const primaryCtaClass =
  `${ctaBaseClass} bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#8DD4E6]`;

const secondaryCtaClass =
  `${ctaBaseClass} bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl focus-visible:ring-[#F5C94D]`;

export default function UCCClinicPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <section className="relative min-h-[80vh] py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
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
              Akomapa UCC Clinic
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Empathy. Equity. Excellence.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/85 font-light max-w-3xl"
            >
              The Akomapa Student-Run Clinic at the University of Cape Coast is the first in a
              growing global network of student-powered, expert-supervised primary care clinics
              delivering free, community-based screening and education for chronic diseases.
            </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button asChild className={primaryCtaClass}>
              <Link href="/join">Volunteer with Us</Link>
            </Button>
            <Button asChild className={secondaryCtaClass}>
              <Link href="/donate">Donate</Link>
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
                src="/akomapa-hangout/Akomapa_hangout-114.jpg"
                alt="Akomapa clinic team supporting community members at UCC"
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
                About the Clinic
              </h2>
              <div className="space-y-5 text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                <p>
                  Founded with the University of Cape Coast College of Health and Allied Sciences,
                  the Ghana Health Service, and community leaders, Akomapa at UCC delivers free,
                  community-based screening and education for non-communicable diseases such as
                  hypertension and diabetes.
                </p>
                <p>
                  The clinic serves as a real-world classroom for medical, nursing, pharmacy,
                  nutrition, optometry, and public health students who work together to make care more
                  accessible, trusted, and equitable.
                </p>
                <p>
                  Students lead with empathy and are guided by experienced clinicians, building a new
                  generation of ethical, community-centered health leaders for Ghana and beyond.
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
                  src="/highlights/Akomapa-69.jpg"
                  alt="Students collaborating inside the Akomapa UCC clinic"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] relative overflow-x-hidden overflow-y-visible">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.4 }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
          >
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#F5C94D]">
              Since October 2025
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              A student-powered clinic delivering measurable impact
            </h2>
            <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed">
              Our model pairs interprofessional student leadership with expert supervision to deliver
              high-quality care in the communities we call home.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {impactHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.4 }}
                className="relative rounded-2xl bg-[#FCFAEF]/95 text-[#1C1F1E] shadow-xl border border-[#E6E7E7]/40 overflow-hidden p-6 md:p-8 flex flex-col"
              >
                <div
                  className="h-1 w-16 rounded-full mb-4"
                  style={{ backgroundColor: highlight.accentColor }}
                />
                <span
                  className="text-4xl font-semibold tracking-tight"
                  style={{ color: highlight.accentColor }}
                >
                  {highlight.value}
                </span>
                <h3 className="mt-4 text-lg font-semibold uppercase tracking-[0.2em] text-[#1C1F1E]/70">
                  {highlight.label}
                </h3>
                <p className="mt-3 text-sm md:text-base text-[#2F3332]/85 leading-relaxed flex-1">
                  {highlight.description}
                </p>
              </motion.div>
            ))}
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
            className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[1.1fr,1.2fr] items-center"
          >
            <div className="grid grid-cols-2 gap-4 w-full">
              {coDirectors.map((director) => (
                <div
                  key={director.name}
                  className="relative min-h-[340px] sm:min-h-[440px] lg:min-h-[520px] rounded-3xl overflow-hidden shadow-xl"
                >
                  <Image
                    src={director.image}
                    alt={director.name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 50vw"
                    priority
                  />
                </div>
              ))}
            </div>
            <div className="bg-white/90 dark:bg-[#2F3332] rounded-3xl p-8 md:p-12 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Welcome from the Co-Directors
              </h2>
              <p className="text-lg md:text-xl italic text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed mb-6">
                &quot;Welcome to Akomapa at UCC — where care meets compassion and learning meets
                purpose. We are proud to serve our communities with heart, professionalism, and hope.
                We are also proud to be the first clinic of its kind in Ghana. This clinic is proof that
                when students lead with empathy and are guided by experts, lasting change follows.&quot;
              </p>
              <p className="text-lg font-semibold text-[#0097b2] dark:text-[#66C4DC]">
                — David Ofosu & Hafiz Shaban
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF] overflow-x-hidden overflow-y-visible relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 left-12 h-48 w-48 bg-[#FCFAEF]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 bg-[#F5C94D]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-4xl mx-auto text-center mb-10 space-y-4"
          >
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#F5C94D]">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Compassionate care powered by student leadership.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-5xl mx-auto text-center space-y-6 text-base sm:text-lg leading-relaxed text-[#FCFAEF]/90"
          >
            <p>
              We strengthen access to compassionate, high-quality care for chronic diseases while
              training the next generation of ethical, community-centered health leaders.
            </p>
            <p>
              Students from across the College of Health and Allied Sciences deliver care that is
              evidence-based and deeply human. Their leadership is guided by rigorous training,
              reflective practice, and a commitment to dignity for every patient served.
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              Our Student Leaders
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              The clinic is powered by an interprofessional team of students who coordinate patient
              care, community engagement, and clinic operations. 
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentLeaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-80 sm:h-96">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                    {leader.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <VolunteerGrid />

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-4xl mx-auto mb-12 space-y-4"
          >
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#F5C94D]">
              Our Faculty Mentors
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Expert guidance from trusted institutional leaders
            </h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              Experienced faculty mentors and advisors ensure every clinic day upholds excellence in
              education, ethics, and patient care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facultyMentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl bg-white/10 backdrop-blur-sm border border-white/15 px-6 py-8 shadow-xl text-center flex flex-col items-center"
              >
                <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-white/40 shadow-lg mb-4">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover object-center"
                    sizes="112px"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {mentor.name}
                </h3>
                <p className="text-sm md:text-base text-[#FCFAEF]/80 leading-relaxed">
                  {mentor.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Gallery items={uccGalleryItems} />

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
          >
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#F5C94D]">
              Clinic Operations
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Consistent access for every clinic day
            </h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              Akomapa UCC Clinic runs on a dependable rhythm so patients know when and where to find
              care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-3xl bg-[#FFF9EF] border border-[#F5C94D]/40 p-8 shadow-xl flex flex-col gap-4 text-[#1C1F1E]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F5C94D]/30 text-[#0F4C5C]">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold">
                Hours & Locations
              </h3>
              <div className="space-y-3 text-[#2F3332]">
                <p className="text-lg font-semibold">
                  Every Saturday · 10:00 AM – 2:00 PM
                </p>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#0097b2] mt-1" />
                  <span>
                    Abeadze Dominase &amp; Abura, Central Region, Ghana
                  </span>
                </div>
                <p className="text-sm text-[#5A5E5D]">
                  Rotating teams ensure both zones receive continuous coverage and follow-up.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-3xl bg-[#FFF9EF] border border-[#F5C94D]/40 p-8 shadow-xl text-[#1C1F1E]"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0097b2]/15 text-[#0097b2]">
                <MapPin className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-4">
                Services Provided
              </h3>
              <ul className="space-y-4 text-[#2F3332] leading-relaxed">
                {servicesOffered.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <span className="mt-[10px] h-2 w-2 rounded-full flex-shrink-0 bg-[#0097b2]" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
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
            className="text-center max-w-3xl mx-auto mb-12 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
              Voices from the Field
            </h2>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
              Patients and students share the impact of student-powered care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.quote}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white dark:bg-[#2F3332] rounded-3xl p-8 shadow-lg border border-[#E6E7E7]/60 dark:border-[#3A3E3D]"
              >
                <p className="text-lg md:text-xl text-[#1C1F1E] dark:text-[#FCFAEF] leading-relaxed italic mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="text-sm font-medium text-[#0097b2] dark:text-[#66C4DC]">
                  {testimonial.name}{" "}
                  <span className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">| {testimonial.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0F4C5C] via-[#0097b2] to-[#0B2F3A] text-[#FCFAEF]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Support Our Work</h2>
            <p className="text-lg text-[#FCFAEF]/85 leading-relaxed">
              Your support helps us reach more patients, train more students, and expand the Akomapa
              model to other communities. Join us in building a healthier Ghana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className={primaryCtaClass}
              >
                <Link href="/join">Volunteer with Us</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/donate">Donate</Link>
              </Button>
              <Button asChild className={secondaryCtaClass}>
                <Link href="/partners">Partner with Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

