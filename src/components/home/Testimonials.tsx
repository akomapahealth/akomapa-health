"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/common/Image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

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
    quote: "When we mention our health promotion efforts, it&apos;s necessary to mention that we love to collaborate. So, by all means, we&apos;ll collaborate because one cannot do the work all alone. Students can partner with the Wellness Clinics and support the work we do. That will surely increase access for so many people.",
    name: "Public Health Nurse",
    title: "Mfantseman District Municipality",
    image: "/avatar-2.jpg"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
            VOICES FROM THE FIELD
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
            Stories of Hope, Leadership, and Impact
          </h3>
          <p className="text-[#2F3332] dark:text-[#E6E7E7] text-lg">
            Hear firsthand how our programs are making a difference in the lives of individuals and communities.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-lg p-8 md:p-12"
            >
              <div className="absolute top-8 left-8 text-[#007A73] dark:text-[#63B0AC] opacity-20">
                <Quote size={64} />
              </div>
              
              <div className="relative z-10">
                <blockquote className="text-xl md:text-2xl leading-relaxed text-[#2F3332] dark:text-[#E6E7E7] mb-8">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </blockquote>
                
                <div className="flex items-center">
                  <div className="rounded-full overflow-hidden h-16 w-16 mr-4">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      width={64}
                      height={64}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-[#1C1F1E] dark:text-[#FCFAEF]">{testimonials[currentIndex].name}</div>
                    <div className="text-[#C37B1E] dark:text-[#F3C677]">{testimonials[currentIndex].title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex ? "bg-[#007A73] dark:bg-[#63B0AC]" : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white dark:bg-[#2F3332] rounded-full p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-[#2F3332] dark:text-[#E6E7E7]" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white dark:bg-[#2F3332] rounded-full p-2 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-[#2F3332] dark:text-[#E6E7E7]" />
          </button>
        </div>
      </div>
    </section>
  );
}