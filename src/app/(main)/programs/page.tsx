"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import ProgramModal from "@/components/shared/ProgramModal";
import { programs } from "@/data/programs";
import { Button } from "@/components/ui/button";
import { Program } from "@/lib/types";

export default function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (program: Program) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="bg-[#FCFAEF] dark:bg-[#1C1F1E] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Our Healthcare Programs"
            description="Discover our four-pillar approach designed to improve healthcare access, education, and outcomes for communities in Ghana."
          />
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {programs.map((program, index) => (
              <motion.div 
                key={program.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                } gap-8 md:gap-12 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="text-sm font-medium text-[#007A73] dark:text-[#63B0AC] mb-2">
                    {program.category}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {program.title}
                  </h2>
                  <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6 text-lg">
                    {program.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {program.keyPoints.slice(0, 3).map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#007A73] dark:text-[#63B0AC] mr-2 mt-1">•</span>
                        <span className="text-[#2F3332] dark:text-[#E6E7E7]">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => handleLearnMore(program)}
                    className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] transition-colors"
                  >
                    <span className="flex items-center">
                      Learn More <ArrowRight size={16} className="ml-2" />
                    </span>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-[#FCFAEF] dark:bg-[#1C1F1E] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
            Want to Support Our Programs?
          </h2>
          <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-8 max-w-2xl mx-auto text-lg">
            We're always looking for partners, volunteers, and supporters to help us expand our healthcare initiatives and reach more communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#C37B1E] hover:bg-[#007A73] text-[#FCFAEF] transition-colors">
              <Link href="/join">
                <span className="flex items-center">
                  Get Involved <ArrowRight size={16} className="ml-2" />
                </span>
              </Link>
            </Button>
            <Button variant="outline" className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF] dark:border-[#63B0AC] dark:text-[#63B0AC] dark:hover:bg-[#63B0AC]/10">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Program Modal */}
      <ProgramModal
        program={selectedProgram}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}