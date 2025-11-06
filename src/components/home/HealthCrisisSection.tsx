"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Stats for animation
const stats = [
  {
    id: 1,
    highlight: "2030",
    description: "NCDs are projected to be Africa&apos;s leading cause of death by 2030.",
    icon: "📈",
    color: "#0097b2"
  },
  {
    id: 2,
    highlight: "15.3%",
    description: "In Ghana, hypertension is the leading cause of death, accounting for 15.3% of total deaths.",
    icon: "💔",
    color: "#eeba2b"
  },
  {
    id: 3,
    highlight: "85%+",
    description: "Of surveyed health professional students expressed strong interest in leading change.",
    icon: "👩🏽‍⚕️",
    color: "#0097b2"
  },
  {
    id: 4,
    highlight: "100%",
    description: "Community members and institutions have voiced strong support for supervised, student-run clinics.",
    icon: "🤝",
    color: "#eeba2b"
  }
];

// Counter animation for statistics
function Counter({ value, suffix = "" }: { value: string, suffix?: string }) {
  const [count, setCount] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  useEffect(() => {
    if (isInView) {
      setCount(value);
    }
  }, [isInView, value]);
  
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HealthCrisisSection() {
  return (
    <section id="why-it-matters" className="py-16 md:py-24 bg-[#0097b2] dark:bg-[#1C1F1E] text-[#FCFAEF]">
      {/* Background decorative elements */}
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#0097b2]/20 blur-3xl"></div>
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-[#eeba2b]/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#F5C94D] font-bold text-lg mb-2">
            WHY IT MATTERS
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
            Responding to an Urgent Health Crisis with Innovation and Evidence
          </h3>
          <div className="h-1 w-20 bg-[#0097b2] mx-auto mb-8"></div>
          <p className="text-lg text-[#E6E7E7]">
            Non-communicable diseases are rapidly becoming a major health challenge across Africa,
            requiring innovative approaches to healthcare delivery and prevention.
          </p>
        </div>
        
        {/* Chart visualization - Optional */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 p-4 md:p-6 lg:p-8 bg-[#2F3332] rounded-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start lg:items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#FCFAEF]">The Growing Burden of NCDs in Africa</h3>
              <p className="text-sm md:text-base text-[#E6E7E7] mb-6 leading-relaxed">
                Non-communicable diseases (NCDs) like hypertension, diabetes, and cancer are 
                projected to overtake infectious diseases as the leading causes of death across Africa by 2030.
                This shift requires new approaches to healthcare that emphasize prevention and early intervention.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 mb-4">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-[#0097b2]">67%</div>
                  <div className="text-xs md:text-sm text-[#E6E7E7]">Projected NCD deaths by 2030</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-[#eeba2b]">48M</div>
                  <div className="text-xs md:text-sm text-[#E6E7E7]">Africans with diabetes by 2045</div>
                </div>
              </div>
              
              <Button className="bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF] mt-2">
                <Link href="/research" className="flex items-center">
                  Read Our Award-Winning Research <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              {/* Infographic section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 relative">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative bg-[#2F3332] rounded-xl p-4 md:p-6 border-l-4 h-auto"
                    style={{ borderLeftColor: stat.color }}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 md:mr-4 text-2xl md:text-3xl flex-shrink-0" aria-hidden="true">{stat.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1" style={{ color: stat.color }}>
                          <Counter value={stat.highlight} />
                        </h5>
                        <p className="text-sm md:text-base text-[#E6E7E7] leading-relaxed">{stat.description}</p>
                      </div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 md:-bottom-3 md:-right-3 h-8 w-8 md:h-12 md:w-12 rounded-full bg-gradient-to-br" 
                      style={{ backgroundImage: `linear-gradient(to bottom right, ${stat.color}30, ${stat.color}05)` }}></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* <div className="text-center mt-12">
          <Button className="bg-[#eeba2b] hover:bg-[#0097b2] text-[#FCFAEF]">
            <Link href="/about/impact" className="flex items-center">
              Learn About Our Impact <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
}