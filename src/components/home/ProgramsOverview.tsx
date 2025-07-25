"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "@/components/common/Image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgramModal from "@/components/shared/ProgramModal";
import { programs } from "@/data/programs";
import { Program } from "@/lib/types";

const pillars = [
  {
    id: 1,
    title: "Low-Cost Clinics",
    description: "Weekend clinics that are interprofessional, free, and based within communities to increase access to essential NCD services.",
    icon: "🏥",
    image: "/highlights/Akomapa-62.jpg",
    slug: "low-cost-clinics"
  },
  {
    id: 2,
    title: "Student Leadership",
    description: "Interdisciplinary teams of health professional students—medical, nursing, pharmacy, optometry, and allied health—are trained and equipped to lead clinical care, patient education, and follow-up.",
    icon: "👩🏽‍⚕️",
    image: "/highlights/Akomapa-10.jpg",
    slug: "student-leadership"
  },
  {
    id: 3,
    title: "Community Partnership",
    description: "Designed in collaboration with traditional leaders, community members, and the Ghana Health Service to ensure local trust and sustainability.",
    icon: "🤝",
    image: "/highlights/Akomapa-20.jpg",
    slug: "community-partnership"
  },
  {
    id: 4,
    title: "Expert Supervision",
    description: "Every clinic is guided by licensed physicians, nurses, and public health faculty from local institutions.",
    icon: "🎓",
    image: "/highlights/Akomapa-13.jpg",
    slug: "expert-supervision"
  }
];

export default function ProgramsOverview() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (slug: string) => {
    const program = programs.find(p => p.slug === slug);
    if (program) {
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
          <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
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
                  <div className="h-10 w-10 rounded-full bg-[#007A73]/10 flex items-center justify-center mr-3">
                    <span className="text-xl" aria-hidden="true">{pillar.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">{pillar.title}</h3>
                </div>
                <p className="text-[#2F3332] mb-4 dark:text-[#E6E7E7]">
                  {pillar.description}
                </p>
                <button
                  onClick={() => handleLearnMore(pillar.slug)}
                  className="inline-flex items-center text-[#007A73] dark:text-[#63B0AC] font-medium hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
                >
                  Learn More <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] transition-colors">
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