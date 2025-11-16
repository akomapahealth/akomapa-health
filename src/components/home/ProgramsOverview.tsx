"use client";

import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "@/components/common/Image";
import { ArrowRight, Stethoscope, Network, GraduationCap, Globe2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgramModal from "@/components/shared/ProgramModal";
import { Program } from "@/lib/types";

type Pillar = {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  image: string;
  slug: string;
  category: string;
  established: string;
  peopleServed: string;
  locations: string[];
  keyPoints: string[];
  impacts: string[];
  href: string;
  ctaLabel: string;
};

const pillars: Pillar[] = [
  {
    id: 1,
    title: "Akomapa Clinics",
    shortDescription:
      "Student-led, faculty-supervised clinics delivering free, community-based care for the early detection and management of NCDs.",
    longDescription:
      "We establish interprofessional, expert-supervised clinics built in partnership with local health authorities, traditional leaders, and community members. These student-run clinics deliver free, community-based care focused on the early detection and management of non-communicable diseases (NCDs), serving as both real-world classrooms for students and lifelines for underserved communities.",
    icon: Stethoscope,
    image: "/highlights/Akomapa-62.jpg",
    slug: "akomapa-clinics",
    category: "Clinical Services",
    established: "2025",
    peopleServed: "50+",
    locations: ["Cape Coast", "Accra"],
    keyPoints: [
      "Interprofessional student teams under faculty supervision",
      "Free clinics embedded within communities",
      "Comprehensive NCD screening and management",
      "Hands-on clinical training for health students",
      "Co-designed with local partners"
    ],
    impacts: [
      "Increased access to essential NCD services in underserved communities",
      "Reduced healthcare costs for vulnerable populations",
      "Enhanced clinical skills and interprofessional collaboration among students",
      "Strengthened community trust in healthcare systems",
      "Sustainable model for healthcare delivery in resource-limited settings"
    ],
    href: "/programs/akomapa-clinics",
    ctaLabel: "Explore Akomapa Clinics"
  },
  {
    id: 2,
    title: "The Akomapa Network",
    shortDescription:
      "A global community of practice linking Akomapa chapters with partner student-run clinics to share mentorship, research, and innovation.",
    longDescription:
      "Our global community of practice connects Akomapa chapters with partner student-run clinics around the world—like SHAWCO, South Side SRFC, and Yale’s Neighborhood Health Project—to share best practices, mentorship, and collaborative research. Together, we’re turning local innovations into global impact.",
    icon: Network,
    image: "/highlights/Akomapa-10.jpg",
    slug: "akomapa-network",
    category: "Global Collaboration",
    established: "2025",
    peopleServed: "40+",
    locations: ["University of Cape Coast", "University of Ghana"],
    keyPoints: [
      "Comprehensive leadership training for health students",
      "Interdisciplinary team development",
      "Cultural competency and global health education",
      "Mentorship and peer-to-peer learning",
      "Innovation in healthcare delivery"
    ],
    impacts: [
      "Developed 40+ student leaders in global health",
      "Enhanced interprofessional collaboration skills",
      "Improved cultural competency in healthcare delivery",
      "Created sustainable leadership pipeline",
      "Fostered innovation in community healthcare"
    ],
    href: "/programs/akomapa-network",
    ctaLabel: "Discover the Akomapa Network"
  },
  {
    id: 3,
    title: "Global Health Leadership Training Program",
    shortDescription:
      "Courses, seminars, and mentorship equipping emerging health leaders to merge clinical care with leadership and systems thinking.",
    longDescription:
      "We equip emerging health leaders with the skills, ethics, and cross-cultural experience needed to drive equitable change. Through expert-led courses, interactive seminars, and global mentorship, students learn to merge clinical care with leadership and systems thinking.",
    icon: GraduationCap,
    image: "/highlights/Akomapa-20.jpg",
    slug: "global-health-leadership",
    category: "Leadership Development",
    established: "2025",
    peopleServed: "2 Communities",
    locations: ["Cape Coast", "Accra"],
    keyPoints: [
      "Collaboration with traditional leaders and community members",
      "Partnership with Ghana Health Service",
      "Community needs assessment and feedback",
      "Cultural competency in healthcare delivery",
      "Sustainable community-based healthcare model"
    ],
    impacts: [
      "Established trust with 2 communities",
      "Improved cultural competency in healthcare delivery",
      "Enhanced community engagement in health initiatives",
      "Strengthened partnerships with local health authorities",
      "Created sustainable healthcare models"
    ],
    href: "/programs/global-health-leadership",
    ctaLabel: "Join the Leadership Program"
  },
  {
    id: 4,
    title: "Global Health Immersion Camp",
    shortDescription:
      "A three-week summer immersion that bridges classroom learning with hands-on community and public health experience.",
    longDescription:
      "Starting in Ghana and expanding globally, our 3-week Summer Immersion Camp gives students hands-on exposure to community and public health in low-resource settings. Participants engage in clinical service, health education, and cultural exchange—bridging classroom learning with lived experience.",
    icon: Globe2,
    image: "/highlights/Akomapa-13.jpg",
    slug: "global-health-immersion",
    category: "Experiential Learning",
    established: "2025",
    peopleServed: "All Patients",
    locations: ["University of Cape Coast", "University of Ghana"],
    keyPoints: [
      "Licensed physicians, nurses, and public health faculty",
      "Real-time clinical guidance and oversight",
      "Quality assurance and patient safety protocols",
      "Professional development and mentorship",
      "Continuous learning and improvement"
    ],
    impacts: [
      "Maintained 100% patient safety record",
      "Enhanced clinical skills of student participants",
      "Improved quality of healthcare delivery",
      "Strengthened academic-clinical partnerships",
      "Established best practices in student supervision"
    ],
    href: "/programs/global-health-immersion",
    ctaLabel: "Experience the Immersion Camp"
  }
];

export default function ProgramsOverview() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProgramModal = (pillar: Pillar) => {
    const program: Program = {
      id: pillar.id.toString(),
      title: pillar.title,
      description: pillar.longDescription,
      image: pillar.image,
      slug: pillar.slug,
      category: pillar.category,
      established: pillar.established,
      peopleServed: pillar.peopleServed,
      locations: pillar.locations,
      keyPoints: pillar.keyPoints,
      impacts: pillar.impacts,
      fullDescription: pillar.longDescription,
      approach: pillar.shortDescription
    };
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, pillar: Pillar) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProgramModal(pillar);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#4F5554]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-lg mb-2">
            OUR PROGRAMS
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
            Students. Communities. Partnerships. One Vision for Health.
          </h3>
          <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
            From community-rooted clinics to global leadership development, our programs connect students,
            partners, and communities to deliver sustainable, preventative care and train the next generation
            of health leaders.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#FCFAEF] dark:bg-[#4F5554] rounded-xl overflow-hidden shadow-sm border border-[#E6E7E7] dark:border-[#2F3332] hover:shadow-md transition-shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0097b2] flex flex-col"
              onClick={() => openProgramModal(pillar)}
              onKeyDown={(event) => handleCardKeyDown(event, pillar)}
              role="button"
              tabIndex={0}
            >
              <div className="relative h-48">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center mb-4">
                  <div className="h-11 w-11 rounded-full bg-[#0097b2]/10 flex items-center justify-center mr-3">
                    <pillar.icon className="h-6 w-6 text-[#0097b2] dark:text-[#66C4DC]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">{pillar.title}</h3>
                </div>
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6 flex-grow">
                  {pillar.shortDescription}
                </p>
                <Link
                  href={pillar.href}
                  onClick={(event) => event.stopPropagation()}
                  className="mt-auto inline-flex items-center text-[#0097b2] dark:text-[#66C4DC] font-semibold hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                >
                  {pillar.ctaLabel}
                  <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF] transition-colors">
            <Link href="/programs" className="flex items-center">
              Explore All Programs <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Program Modal */}
      <ProgramModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}