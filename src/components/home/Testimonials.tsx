"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "@/components/common/Image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { PublicSectionHeader } from "@/components/shared/PublicPagePrimitives";

const testimonials = [
  {
    id: 1,
    quote: "I feel proud to serve my community while learning to be a doctor.",
    name: "Medical Student",
    title: "University of Cape Coast",
    image: "/avatar-2.jpg"
  },
  {
    id: 2,
    quote: "These students are coming to practice what they have been taught in taking care of us. And if these students are not given the requisite practical training, how then will they be able to effectively go about their future career, which entails taking care of us?",
    name: "Community Elder",
    title: "Saltpond",
    image: "/avatar-2.jpg"
  },
  {
    id: 3,
    quote: "When we mention our health promotion efforts, it's necessary to mention that we love to collaborate. So, by all means, we'll collaborate because one cannot do the work all alone. Students can partner with the Wellness Clinics and support the work we do. That will surely increase access for so many people.",
    name: "Public Health Nurse",
    title: "Mfantseman District Municipality",
    image: "/avatar-2.jpg"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isHovered || shouldReduceMotion) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 30000);

    return () => clearInterval(timer);
  }, [isHovered, shouldReduceMotion]);
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="overflow-x-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 text-[#FCFAEF] md:py-24 dark:from-[#121514] dark:to-[#0F4C5C]">
      <div className="site-container mx-auto px-4">
        <PublicSectionHeader
          eyebrow="Voices from the Field"
          eyebrowTone="gold"
          title="Stories of Hope, Leadership, and Impact"
          description="Hear firsthand how our programs are making a difference in the lives of individuals and communities."
          className="mb-12"
          titleClassName="text-[#FCFAEF] dark:text-[#FCFAEF]"
          descriptionClassName="text-[#FCFAEF]/85"
        />
        
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.3 }}
              className="flex min-h-[440px] flex-col rounded-xl border border-white/15 bg-[#FCFAEF]/95 p-8 shadow-xl md:min-h-[420px] md:p-12 dark:bg-[#2F3332]"
            >
              <div className="absolute top-8 left-8 text-[#0097b2] dark:text-[#66C4DC] opacity-20">
                <Quote size={64} />
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex-1 flex flex-col justify-center">
                  <blockquote className="text-xl md:text-2xl leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]">
                    &quot;{testimonials[currentIndex].quote}&quot;
                  </blockquote>
                </div>

                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden h-16 w-16 mr-4">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={`Headshot of ${testimonials[currentIndex].name}, ${testimonials[currentIndex].title}`}
                      width={64}
                      height={64}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-[#1C1F1E] dark:text-[#FCFAEF]">{testimonials[currentIndex].name}</div>
                    <div className="text-[#eeba2b] dark:text-[#F5C94D]">{testimonials[currentIndex].title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex ? "bg-[#F5C94D]" : "bg-[#FCFAEF]/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#E6E7E7] bg-[#FCFAEF] text-[#0097b2] shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#66C4DC] dark:border-[#2F3332] dark:bg-[#2F3332] dark:text-[#66C4DC] md:-left-3"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-[#E6E7E7] bg-[#FCFAEF] text-[#0097b2] shadow-md transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#66C4DC] dark:border-[#2F3332] dark:bg-[#2F3332] dark:text-[#66C4DC] md:-right-3"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
