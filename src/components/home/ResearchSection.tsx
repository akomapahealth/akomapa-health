"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Partner logos with increased dimensions
const partners = [
  {
    name: "University of Cape Coast",
    logo: "/images/partners/ucc-logo.webp", 
    width: 220,  
    height: 110  
  },
  {
    name: "University of Ghana",
    logo: "/images/partners/ug-logo.png",
    width: 220,  
    height: 110  
  },
  {
    name: "Yale School of Medicine",
    logo: "/images/partners/yale-logo.png",
    width: 220,  
    height: 110  
  },
  {
    name: "David Geffen School of Medicine at UCLA",
    logo: "/images/partners/ucla-logo.png",
    width: 220,  
    height: 110  
  },
  {
    name: "Ghana Health Service",
    logo: "/images/partners/ghana-health-service-logo.jpg",
    width: 220,  
    height: 110  
  }
];

// Duplicate the partners array for seamless infinite scroll
const allPartners = [...partners, ...partners];

export default function ResearchSection() {
  // Controls for the logo animation
  const controls = useAnimation();

  // Start the animation when component mounts
  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <section id="research" className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-lg mb-2">
            BACKED BY RESEARCH
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
            Designed with Evidence. Driven by Collaboration.
          </h3>
          <p className="text-[#2F3332] dark:text-[#E6E7E7] text-lg">
            Akomapa&apos;s clinic model is grounded in rigorous qualitative and quantitative research 
            involving 316 health professional students, university faculty, Ghana Health Service officials, 
            and community members. The data is clear: supervised, student-led, interprofessional clinics are 
            not only welcomed—they are essential to addressing Ghana&apos;s NCD burden.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-[#0097b2]/5 dark:bg-[#0097b2]/10 rounded-xl p-6 md:p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
            <div className="md:w-1/4">
              <div className="aspect-square w-16 h-16 flex items-center justify-center rounded-full bg-[#0097b2]/10 dark:bg-[#0097b2]/20 mb-4">
                <span className="text-[#0097b2] dark:text-[#66C4DC] text-2xl">💡</span>
              </div>
              <h4 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Key Insights</h4>
            </div>
            <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 md:p-5 shadow-sm border-l-4 border-[#0097b2] dark:border-[#66C4DC]">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#0097b2]/10 dark:bg-[#66C4DC]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="text-[#0097b2] dark:text-[#66C4DC] text-sm">👨‍⚕️</span>
                  </div>
                  <p className="text-[#2F3332] dark:text-[#E6E7E7] text-sm md:text-base leading-relaxed">
                    Strong student interest across health disciplines
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 md:p-5 shadow-sm border-l-4 border-[#eeba2b] dark:border-[#F5C94D]">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#eeba2b]/10 dark:bg-[#F5C94D]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="text-[#eeba2b] dark:text-[#F5C94D] text-sm">🎓</span>
                  </div>
                  <p className="text-[#2F3332] dark:text-[#E6E7E7] text-sm md:text-base leading-relaxed">
                    University leadership sees clinics as a win for community health and student training
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 md:p-5 shadow-sm border-l-4 border-[#0097b2] dark:border-[#66C4DC]">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#0097b2]/10 dark:bg-[#66C4DC]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="text-[#0097b2] dark:text-[#66C4DC] text-sm">🏥</span>
                  </div>
                  <p className="text-[#2F3332] dark:text-[#E6E7E7] text-sm md:text-base leading-relaxed">
                    Mission aligns with the Ghana Health Service focus on community-based preventive care
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 md:p-5 shadow-sm border-l-4 border-[#eeba2b] dark:border-[#F5C94D]">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-[#eeba2b]/10 dark:bg-[#F5C94D]/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="text-[#eeba2b] dark:text-[#F5C94D] text-sm">👁️</span>
                  </div>
                  <p className="text-[#2F3332] dark:text-[#E6E7E7] text-sm md:text-base leading-relaxed">
                    Expert supervision is essential for ensuring patient safety and high-quality student learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center mb-8">
          <p className="text-[#2F3332] dark:text-[#E6E7E7] font-medium mb-6">
            This research was conducted in partnership with leading institutions committed to health equity and innovation:
          </p>
        </div>

        {/* Logo carousel container */}
        <div className="w-full overflow-hidden my-12 relative">
          {/* Add fading edges to enhance the scrolling effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#FCFAEF] to-transparent dark:from-[#1C1F1E]"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#FCFAEF] to-transparent dark:from-[#1C1F1E]"></div>
          
          {/* The animated logo container */}
          <motion.div 
            className="flex items-center"
            animate={controls}
            style={{ width: "fit-content" }}
          >
            {allPartners.map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`} 
                className="mx-10 flex-shrink-0 grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300"
              >
                {/* Updated logo container with larger dimensions */}
                <div 
                  className="bg-[#FCFAEF] dark:bg-[#2F3332] rounded-lg p-5 flex items-center justify-center" 
                  style={{ width: partner.width, height: partner.height }}
                >
                  {/* Image with adjusted dimensions to fit the larger container */}
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={partner.width - 30}  
                    height={partner.height - 30}
                    className="object-contain max-w-full max-h-full"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJPO6cqhwAAAABJRU5ErkJggg=="
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF]">
            <Link href="/research" className="flex items-center">
              Read the Research <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}