"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Array of hero images
const heroImages = [
  {
    src: "/images/hero-image.jpg",
    alt: "Healthcare professionals working in a community clinic",
    tagline: "Community Healthcare",
    caption: "Supporting communities with accessible healthcare services"
  },
  {
    src: "/images/hero-image-2.jpg",
    alt: "Community healthcare worker with patients",
    tagline: "Health Education",
    caption: "Empowering communities through knowledge and prevention"
  },
  {
    src: "/images/hero-image-3.jpg",
    alt: "Healthcare outreach in rural communities",
    tagline: "Rural Outreach",
    caption: "Bringing quality healthcare to remote and underserved areas"
  },
  {
    src: "/images/hero-image-4.jpg",
    alt: "Medical professionals collaborating on healthcare solutions",
    tagline: "Innovation & Research",
    caption: "Developing sustainable solutions for healthcare challenges"
  },
];

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-[#FCFAEF] to-[#E6E7E7] dark:from-[#1C1F1E] dark:to-[#2F3332] overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/patterns/dots-pattern4.jpeg"
          alt=""
          fill
          className="object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left lg:col-span-5"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1F1E] dark:text-[#FCFAEF] mb-6">
              Can student health leaders tackle Africa's NCD crisis?
            </h1>
            <p className="text-xl md:text-2xl text-[#007A73] dark:text-[#63B0AC] font-medium mb-8 max-w-2xl mx-auto lg:mx-0">
              Guided by experts, powered by students, rooted in communities – Akomapa is reimagining preventative primary care in Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start flex-wrap">
              <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] px-8 py-6 h-auto text-lg">
                <Link href="/join">Join the Movement</Link>
              </Button>
              <Button className="bg-[#C37B1E] hover:bg-[#007A73] text-[#FCFAEF] px-8 py-6 h-auto text-lg">
                <Link href="/donate">Support Our Work</Link>
              </Button>
            </div>
          </motion.div>
          
          <div className="relative h-[450px] md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden shadow-xl lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={heroImages[currentImageIndex].src}
                  alt={heroImages[currentImageIndex].alt}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F1E]/60 via-transparent to-transparent"></div>
              </motion.div>
            </AnimatePresence>
            
            {/* Image overlay and caption */}
            <div className="absolute bottom-6 left-6 right-6 text-[#FCFAEF]">
              <span className="bg-[#007A73]/90 text-[#FCFAEF] px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {heroImages[currentImageIndex].tagline}
              </span>
              <p className="text-lg font-medium mt-2">
                {heroImages[currentImageIndex].caption}
              </p>
            </div>
            
            {/* Slideshow indicators */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 pb-4">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentImageIndex === index 
                      ? "bg-[#C37B1E] scale-110" 
                      : "bg-[#FCFAEF]/60 hover:bg-[#FCFAEF]/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}