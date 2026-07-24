"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, MotionDiv } from "@/components/motion/framer";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Image from "@/components/common/Image";

const testimonials = [
  {
    id: 1,
    quote:
      "The Akomapa Program changed how I see leadership. It's not about titles — it's about empathy, ethics, and action.",
    name: "Program Fellow",
    title: "Ghana",
    image: "/avatar-2.jpg",
  },
  {
    id: 2,
    quote:
      "Learning directly from world leaders while engaging with peers across continents gave me the confidence to lead in my own community.",
    name: "Student",
    title: "Yale University",
    image: "/avatar-2.jpg",
  },
];

export default function GhltpTestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <MotionDiv
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/90 dark:bg-[#2F3332] rounded-2xl shadow-xl p-8 md:p-12 min-h-[300px] flex flex-col"
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

            <div className="flex items-center mt-8">
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
                <div className="font-bold text-lg text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-[#eeba2b] dark:text-[#F5C94D]">
                  {testimonials[currentIndex].title}
                </div>
              </div>
            </div>
          </div>
        </MotionDiv>
      </AnimatePresence>

      <div className="flex justify-center mt-8 gap-2">
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

      {testimonials.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white/90 dark:bg-[#2F3332] rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-6 w-6 text-[#0097b2]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white/90 dark:bg-[#2F3332] rounded-full p-2 shadow-md hover:bg-white dark:hover:bg-gray-700 transition"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-6 w-6 text-[#0097b2]" />
          </button>
        </>
      )}
    </div>
  );
}
