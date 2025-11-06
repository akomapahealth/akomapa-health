"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "@/components/common/Image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgramModal from "@/components/shared/ProgramModal";
import { Program } from "@/lib/types";

const pillars = [
  {
    id: 1,
    title: "Low-Cost Clinics",
    shortDescription: "Under the supervision of licensed faculty, health professional students lead weekend clinics that are interprofessional, free, and based within communities to increase access to essential NCD services.",
    longDescription: "Our low-cost clinics represent the cornerstone of Akomapa&apos;s approach to healthcare delivery. Under the careful supervision of licensed faculty from local institutions, health professional students from diverse backgrounds—medical, nursing, pharmacy, optometry, and allied health—come together to lead weekend clinics that are truly interprofessional, completely free, and strategically based within communities to maximize access to essential non-communicable disease (NCD) services. These clinics operate on a rotating schedule, ensuring consistent care while providing students with hands-on clinical experience in a real-world setting. The interprofessional model allows for comprehensive patient care, where each student contributes their unique expertise while learning to work as part of a cohesive healthcare team. This approach not only addresses immediate healthcare needs but also builds the foundation for sustainable, community-based healthcare solutions.",
    icon: "🏥",
    image: "/highlights/Akomapa-62.jpg",
    slug: "low-cost-clinics",
    category: "Clinical Services",
    established: "2025",
    peopleServed: "50+",
    locations: ["Cape Coast", "Accra"],
    keyPoints: [
      "Interprofessional student teams under faculty supervision",
      "Free weekend clinics in community settings",
      "Comprehensive NCD screening and management",
      "Hands-on clinical training for health students",
      "Community-based healthcare delivery model"
    ],
    impacts: [
      "Increased access to essential NCD services in underserved communities",
      "Reduced healthcare costs for vulnerable populations",
      "Enhanced clinical skills and interprofessional collaboration among students",
      "Strengthened community trust in healthcare systems",
      "Sustainable model for healthcare delivery in resource-limited settings"
    ]
  },
  {
    id: 2,
    title: "Global Health Leadership",
    shortDescription: "Interdisciplinary teams of health professional students—medical, nursing, pharmacy, optometry, and allied health—are trained and equipped to lead clinical care, patient education, and follow-up.",
    longDescription: "Our Global Health Leadership program represents a comprehensive approach to developing the next generation of healthcare leaders. Interdisciplinary teams of health professional students—medical, nursing, pharmacy, optometry, and allied health—are trained through a global health leadership program taught by faculty from the University of Cape Coast, the University of California, Los Angeles, and Yale. They are equipped to work interprofessionally and trained to lead clinical care, patient education, follow-up, and manage the administrative affairs of the clinic. ",
    icon: "👩🏽‍⚕️",
    image: "/highlights/Akomapa-10.jpg",
    slug: "student-leadership",
    category: "Leadership Development",
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
    ]
  },
  {
    id: 3,
    title: "Community Partnership",
    shortDescription: "Designed in collaboration with traditional leaders, community members, and the Ghana Health Service to ensure local trust and sustainability.",
    longDescription: "Our Community Partnership program is built on the fundamental principle that sustainable healthcare solutions must be co-created with the communities they serve. We work in close collaboration with traditional leaders, community members, and the Ghana Health Service to ensure local trust, cultural relevance, and long-term sustainability. This partnership approach involves extensive community engagement, including regular meetings with traditional leaders, community health workers, and local stakeholders. We conduct needs assessments, gather feedback, and adapt our programs based on community input. This collaborative model ensures that our healthcare interventions are not only medically sound but also culturally appropriate and socially acceptable. By building strong relationships with community leaders and members, we create a foundation of trust that enables effective healthcare delivery and ensures the long-term success of our programs.",
    icon: "🤝",
    image: "/highlights/Akomapa-20.jpg",
    slug: "community-partnership",
    category: "Community Engagement",
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
    ]
  },
  {
    id: 4,
    title: "Expert Supervision",
    shortDescription: "Every clinic is guided by licensed physicians, nurses, and public health faculty from local institutions.",
    longDescription: "Our Expert Supervision program ensures that every aspect of our clinical operations meets the highest standards of healthcare delivery. Every clinic is carefully guided by licensed physicians, nurses, and public health faculty from local institutions, providing comprehensive oversight and mentorship. These expert supervisors bring decades of combined experience in clinical practice, public health, and medical education. They work closely with student teams, providing real-time guidance, reviewing patient cases, and ensuring that all clinical decisions meet established medical standards. The supervision model includes regular case reviews, clinical skills assessments, and ongoing professional development for both students and supervisors. This expert oversight not only ensures patient safety and quality of care but also provides students with invaluable mentorship and professional development opportunities. The program maintains strict quality assurance protocols while fostering an environment of continuous learning and improvement.",
    icon: "🎓",
    image: "/highlights/Akomapa-13.jpg",
    slug: "expert-supervision",
    category: "Quality Assurance",
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
    ]
  }
];

export default function ProgramsOverview() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (slug: string) => {
    const pillar = pillars.find(p => p.slug === slug);
    if (pillar) {
      // Create a Program object from pillar data
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
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#4F5554]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-lg mb-2">
            HOW WE WORK
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
            A Scalable, Sustainable, Community-Based Model
          </h3>
          <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
            Our approach combines clinical excellence, education, and community engagement
            to create lasting healthcare solutions in underserved communities.
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
              className="group bg-[#FCFAEF] dark:bg-[#4F5554] rounded-xl overflow-hidden shadow-sm border border-[#E6E7E7] dark:border-[#2F3332] hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-[#0097b2]/10 flex items-center justify-center mr-3">
                    <span className="text-xl" aria-hidden="true">{pillar.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">{pillar.title}</h3>
                </div>
                <p className="text-[#2F3332] mb-4 dark:text-[#E6E7E7]">
                  {pillar.shortDescription}
                </p>
                <button
                  onClick={() => handleLearnMore(pillar.slug)}
                  className="inline-flex items-center text-[#0097b2] dark:text-[#66C4DC] font-medium hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                >
                  Learn More <ArrowRight size={16} className="ml-1" />
                </button>
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