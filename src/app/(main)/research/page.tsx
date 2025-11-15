"use client";

import Image from "@/components/common/Image";
import Link from "next/link";
import { ArrowRight, ChevronsDown } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { motion } from "framer-motion";

interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  date: string;
  pdfUrl: string;
  image: string;
  slug: string;
}

const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "Student-Powered Community Clinics: A Model for Sustainable Healthcare Delivery in Underserved Communities",
    authors: "B. A. Fleischer, E. B. Berkoh, B. Amoh, et al.",
    abstract: "This research presents the Akomapa model of student-powered community clinics, examining their effectiveness in delivering primary care and chronic disease management in underserved communities across Ghana. We analyze clinical outcomes, patient satisfaction, and the educational impact on student healthcare leaders.",
    date: "2024",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-28.jpg",
    slug: "student-powered-community-clinics"
  },
  {
    id: "2",
    title: "Impact of Interprofessional Education on Community Health Outcomes: A Longitudinal Study",
    authors: "E. B. Berkoh, D. K. Ofosu, H. Shaban, et al.",
    abstract: "Longitudinal analysis of how interprofessional student teams trained through the Akomapa Leadership Program deliver coordinated care that improves health outcomes in rural and peri-urban settings. This study tracks patient outcomes, student learning gains, and community engagement metrics over a 24-month period.",
    date: "2024",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-40.jpg",
    slug: "interprofessional-education-impact"
  },
  {
    id: "3",
    title: "Non-Communicable Disease Screening and Management in Low-Resource Settings: Evidence from Community-Based Clinics",
    authors: "A. Badu, W. Obeng, S. Dankwa, et al.",
    abstract: "This paper examines the effectiveness of free community-based screening programs for hypertension, diabetes, and other non-communicable diseases in Ghana. We present data on early detection rates, treatment adherence, and the role of community partnerships in sustaining these initiatives.",
    date: "2023",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-61.jpg",
    slug: "ncd-screening-management"
  },
  {
    id: "4",
    title: "Global Health Leadership Training: Preparing the Next Generation of Ethical Practitioners",
    authors: "N. A. Ocran, C. A. Buckman, D. A. Tuoyire, et al.",
    abstract: "Evaluation of the Akomapa Global Health Leadership Training Program, assessing how intensive leadership curricula combined with hands-on clinical rotations prepare students to address health inequities with cultural humility, evidence-based practice, and systems thinking.",
    date: "2023",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-66.jpg",
    slug: "global-health-leadership-training"
  }
];

export default function ResearchPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-full flex flex-col lg:flex-row lg:items-center gap-12 sm:gap-14">
          <div className="flex-1 max-w-3xl pt-4 sm:pt-8 lg:pt-0">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Evidence-based research driving healthcare innovation.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light"
            >
              Our research explores student-powered healthcare models, community-based interventions, and leadership development programs that transform how care is delivered in underserved communities.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full lg:max-w-[600px] lg:ml-auto"
          >
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/highlights/Akomapa-61.jpg"
                alt="Research and data collection in community settings"
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

      {/* Research Papers Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                OUR SCIENCE
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Research Publications
              </h2>
              <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed max-w-3xl mx-auto">
                Explore our latest research findings and contributions to healthcare innovation, student-powered care models, and community health outcomes.
              </p>
            </motion.div>
          </div>

          <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
            {researchPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/research/${paper.slug}`}
                  className="group block relative rounded-2xl bg-white dark:bg-[#2F3332] border border-[#E6E7E7]/80 dark:border-[#4F5554]/80 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-0">
                    {/* Image */}
                    <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                      <Image
                        src={paper.image}
                        alt={paper.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#0097b2]/90 backdrop-blur-sm text-[#FCFAEF] text-xs sm:text-sm font-medium rounded-full">
                          {paper.date}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#1C1F1E] dark:text-[#FCFAEF] group-hover:text-[#0097b2] dark:group-hover:text-[#66C4DC] transition-colors">
                          {paper.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[#0097b2] dark:text-[#66C4DC] font-medium mb-4">
                          {paper.authors}
                        </p>
                        <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed line-clamp-3">
                          {paper.abstract}
                        </p>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                        <span className="text-[#0097b2] dark:text-[#66C4DC] font-medium inline-flex items-center group-hover:translate-x-2 transition-transform">
                          Read Paper <ArrowRight size={16} className="ml-2" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#FCFAEF]">
                  Questions About Our Research?
                </h2>
                <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed max-w-2xl mx-auto">
                  For inquiries about our research, collaborations, or data access, please reach out to our research team.
                </p>
              </div>
              <div className="mt-8">
                <a
                  href="mailto:akomapahealth@gmail.com"
                  className="inline-flex items-center text-[#F5C94D] font-medium hover:text-[#FCFAEF] transition-colors text-lg"
                >
                  akomapahealth@gmail.com
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
