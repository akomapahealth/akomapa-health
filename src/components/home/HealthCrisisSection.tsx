"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// Stats for animation
const stats = [
  {
    id: 1,
    highlight: "2030",
    description: "NCDs are projected to be Africa's leading cause of death by 2030.",
    icon: "📈",
    color: "#007A73"
  },
  {
    id: 2,
    highlight: "15.3%",
    description: "In Ghana, hypertension is the leading cause of death, accounting for 15.3% of total deaths.",
    icon: "💔",
    color: "#C37B1E"
  },
  {
    id: 3,
    highlight: "85%+",
    description: "Of surveyed health professional students expressed strong interest in leading change.",
    icon: "👩🏽‍⚕️",
    color: "#007A73"
  },
  {
    id: 4,
    highlight: "100%",
    description: "Community members and institutions have voiced strong support for supervised, student-run clinics.",
    icon: "🤝",
    color: "#C37B1E"
  }
];

// Counter animation for statistics
function Counter({ value, suffix = "", duration = 2 }: { value: string, suffix?: string, duration?: number }) {
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
    <section className="py-16 md:py-24 bg-[#005A9C] dark:bg-[#1C1F1E] text-[#FCFAEF]">
      {/* Background decorative elements */}
      <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-[#007A73]/20 blur-3xl"></div>
      <div className="absolute left-0 bottom-0 w-96 h-96 rounded-full bg-[#C37B1E]/20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#F3C677] font-bold text-lg mb-2">
            WHY IT MATTERS
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
            Responding to an Urgent Health Crisis with Innovation and Evidence
          </h3>
          <div className="h-1 w-20 bg-[#007A73] mx-auto mb-8"></div>
          <p className="text-lg text-[#E6E7E7]">
            Non-communicable diseases are rapidly becoming a major health challenge across Africa,
            requiring innovative approaches to healthcare delivery and prevention.
          </p>
        </div>
        
        {/* Infographic section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Africa map background (subtle) */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <Image
              src="/images/africa-map.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative bg-[#2F3332] rounded-xl p-6 border-l-4"
              style={{ borderLeftColor: stat.color }}
            >
              <div className="flex items-start">
                <div className="mr-4 text-4xl" aria-hidden="true">{stat.icon}</div>
                <div>
                  <h4 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: stat.color }}>
                    <Counter value={stat.highlight} />
                  </h4>
                  <p className="text-[#E6E7E7]">{stat.description}</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-full bg-gradient-to-br" 
                style={{ backgroundImage: `linear-gradient(to bottom right, ${stat.color}30, ${stat.color}05)` }}></div>
            </motion.div>
          ))}
        </div>
        
        {/* Chart visualization - Optional */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-24 p-8 bg-[#2F3332] rounded-xl relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#FCFAEF]">The Growing Burden of NCDs in Africa</h3>
              <p className="text-[#E6E7E7] mb-6">
                Non-communicable diseases (NCDs) like hypertension, diabetes, and cancer are 
                projected to overtake infectious diseases as the leading causes of death across Africa by 2030.
                This shift requires new approaches to healthcare that emphasize prevention and early intervention.
              </p>
              
              <div className="flex space-x-8 mb-4">
                <div>
                  <div className="text-2xl font-bold text-[#007A73]">67%</div>
                  <div className="text-sm text-[#E6E7E7]">Projected NCD deaths by 2030</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#C37B1E]">48M</div>
                  <div className="text-sm text-[#E6E7E7]">Africans with diabetes by 2045</div>
                </div>
              </div>
              
              <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] mt-2">
                <Link href="/research" className="flex items-center">
                  View Research <ArrowRight size={16} className="ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="relative h-64 md:h-80">
              {/* Simple chart visualization */}
              <div className="absolute inset-0 flex items-end">
                <div className="w-1/4 h-30 bg-gradient-to-t from-[#007A73] to-[#007A73]/70 mx-1 rounded-t-md relative">
                  <span className="absolute -top-6 left-0 right-0 text-center text-xs">2000</span>
                  <span className="absolute -bottom-6 left-0 right-0 text-center text-xs">Infectious</span>
                </div>
                <div className="w-1/4 h-50 bg-gradient-to-t from-[#007A73] to-[#007A73]/70 mx-1 rounded-t-md relative">
                  <span className="absolute -top-6 left-0 right-0 text-center text-xs">2010</span>
                </div>
                <div className="w-1/4 h-70 bg-gradient-to-t from-[#C37B1E] to-[#C37B1E]/70 mx-1 rounded-t-md relative">
                  <span className="absolute -top-6 left-0 right-0 text-center text-xs">2020</span>
                </div>
                <div className="w-1/4 h-80 bg-gradient-to-t from-[#C37B1E] to-[#C37B1E]/70 mx-1 rounded-t-md relative">
                  <span className="absolute -top-6 left-0 right-0 text-center text-xs">2030</span>
                  <span className="absolute -bottom-6 left-0 right-0 text-center text-xs">NCDs</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <div className="text-center mt-12">
          <Button className="bg-[#C37B1E] hover:bg-[#007A73] text-[#FCFAEF]">
            <Link href="/about/impact" className="flex items-center">
              Learn About Our Impact <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}