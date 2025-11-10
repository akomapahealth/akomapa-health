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
    logo: "/images/partners/ucc.png", 
    width: 280,  
    height: 140  
  },
  {
    name: "University of Ghana",
    logo: "/images/partners/ug-logo.png",
    width: 280,  
    height: 140  
  },
  {
    name: "Yale School of Medicine",
    logo: "/images/partners/yale-sm-logo.png",
    width: 280,  
    height: 140  
  },
  {
    name: "David Geffen School of Medicine at UCLA",
    logo: "/images/partners/ucla.png",
    width: 280,  
    height: 140  
  },
  {
    name: "Ghana Health Service",
    logo: "/images/partners/ghana-health-service-logo.png",
    width: 280,  
    height: 140  
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
    <section
      id="research"
      className="py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] dark:bg-[#1C1F1E] relative overflow-hidden text-[#FCFAEF]"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-[#F5C94D] font-bold text-lg mb-2">
            OUR RESEARCH & ACADEMIC PARTNERS
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
            Designed with Evidence. Driven by Collaboration.
          </h3>
          <p className="text-[#FCFAEF]/85 text-lg">
            In collaboration with leading universities, health systems, and student-run clinics worldwide,
            we generate the research and real-world evidence that powers Akomapa&apos;s model.
          </p>
        </div>

        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-sm text-[#F5C94D]/80 mb-3">
            In collaboration with
          </p>
          <p className="text-[#FCFAEF]/80 text-base md:text-lg max-w-2xl mx-auto">
            These partners power our research agenda, strengthen our clinics, and help us translate evidence into impact.
          </p>
        </div>

        {/* Logo carousel container */}
        <div className="w-full overflow-hidden my-12 relative">
          {/* Add fading edges to enhance the scrolling effect */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#0097b2] via-[#0097b2]/60 to-transparent dark:from-[#1C1F1E] dark:via-[#1C1F1E]/60"></div>
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#0F4C5C] via-[#0F4C5C]/60 to-transparent dark:from-[#1C1F1E] dark:via-[#1C1F1E]/60"></div>
          
          {/* The animated logo container */}
          <motion.div 
            className="flex items-center"
            animate={controls}
            style={{ width: "fit-content" }}
          >
            {allPartners.map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`} 
                className="group mx-6 sm:mx-10 lg:mx-12 flex-shrink-0 opacity-85 hover:opacity-100 transition-all duration-300"
              >
                {/* Updated logo container with larger dimensions */}
                <div 
                  className="relative bg-transparent dark:bg-transparent rounded-xl p-4 sm:p-6 flex items-center justify-center w-[180px] h-[90px] sm:w-[220px] sm:h-[110px] lg:w-[280px] lg:h-[140px]"
                >
                  {/* Image with adjusted dimensions to fit the larger container */}
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Button className="bg-[#FCFAEF] text-[#0097b2] hover:bg-[#F5C94D] hover:text-[#FCFAEF] transition-colors cursor-pointer">
            <Link href="/research" className="flex items-center">
              Explore Our Science <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}