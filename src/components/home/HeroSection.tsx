"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronUp } from "lucide-react";
import Image from "@/components/common/Image";

// Background options
const backgroundOptions = {
  static: {
    type: "static",
    color: "bg-gradient-to-r from-[#FCFAEF] to-[#E6E7E7] dark:from-[#1C1F1E] dark:to-[#2F3332]"
  },
  slideshow: {
    type: "slideshow",
    images: [
      {
        src: "/highlights/Akomapa-28.jpg",
        alt: "Healthcare professionals working in a community clinic"
      },
      {
        src: "/highlights/Akomapa-2.jpg",
        alt: "Community healthcare worker with patients"
      },
      {
        src: "/highlights/Akomapa-38.jpg",
        alt: "Healthcare outreach in rural communities"
      },
      {
        src: "/highlights/Akomapa-4.jpg",
        alt: "Medical professionals collaborating on healthcare solutions"
      },
      {
        src: "/highlights/Akomapa-5.jpg",
        alt: "UCC Dream Team"
      }
    ]
  },
  video: {
    type: "video",
    src: "/videos/hero-background.mp4" // You can add a video file here
  }
};

interface HeroSectionProps {
  backgroundType?: "static" | "slideshow" | "video";
  height?: "full" | "large" | "medium";
  textAlign?: "left" | "center";
  overlay?: boolean;
}

export default function HeroSection({
  backgroundType = "slideshow",
  height = "full",
  textAlign = "left",
  overlay = true
}: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate through images for slideshow
  useEffect(() => {
    if (backgroundType === "slideshow") {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === backgroundOptions.slideshow.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000); // Changed from 5000ms to 10000ms (10 seconds)

      return () => clearInterval(interval);
    }
  }, [backgroundType]);

  const heightClasses = {
    full: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[60vh]",
  };

  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
  };

  const renderBackground = () => {
    switch (backgroundType) {
      case "video":
        return (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundOptions.video.src} type="video/mp4" />
          </video>
        );
      
      case "slideshow":
        return (
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
                src={backgroundOptions.slideshow.images[currentImageIndex].src}
                alt={backgroundOptions.slideshow.images[currentImageIndex].alt}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        );
      
      default:
        return (
          <div className={`absolute inset-0 ${backgroundOptions.static.color}`}>
            <div className="absolute inset-0 z-0 opacity-20">
              <Image
                src="/images/patterns/dot-pattern3.webp"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <section
      className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {renderBackground()}
        
        {/* Overlay */}
        {overlay && backgroundType !== "static" && (
          <div className="absolute inset-0 bg-black/40" />
        )}
        
        {/* Left-side gradient fade - stronger on left, fading to transparent */}
        {backgroundType !== "static" && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0097b2]/70 dark:from-[#0097b2]/70 via-[#0097b2]/30 dark:via-[#0097b2]/30 to-transparent" />
        )}
        
        {/* Left-side gradient fade for static backgrounds - more opaque from left */}
        {backgroundType === "static" && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0097b2]/60 dark:from-[#0097b2]/60 via-[#0097b2]/20 dark:via-[#0097b2]/20 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className={`max-w-4xl ${textAlign === "center" ? "mx-auto" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={textAlignClasses[textAlign]}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight text-[#FCFAEF] dark:text-[#FCFAEF] mb-6 leading-tight text-balance font-medium"
            >
              Can a <span className="text-[#8DD4E6] dark:text-[#B0E8F5]">global partnership</span> of <span className="text-[#eeba2b] dark:text-[#eeba2b]">students</span> lead the fight against NCDs?
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-xl md:text-2xl text-[#FCFAEF] dark:text-[#FCFAEF] font-medium mb-8 leading-relaxed max-w-2xl"
            >
              Student-powered. <span className="text-[#8DD4E6] dark:text-[#B0E8F5]">Expert-supervised</span>. Community-rooted.<br />
              Akomapa is redefining preventative primary care.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className={`flex flex-col sm:flex-row gap-4 ${textAlign === "center" ? "justify-center" : ""} flex-wrap`}
            >
              <Button
                asChild
                size="lg"
                className="group bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] px-8 py-6 h-auto text-lg font-medium rounded-half transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Link href="/join" className="flex items-center space-x-2">
                  <span>Join the Movement</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                className="group bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] px-8 py-6 h-auto text-lg font-medium rounded-half transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Link href="/partner" className="flex items-center space-x-2">
                  <span>Support Our Work</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Slideshow indicators for slideshow background */}
      {backgroundType === "slideshow" && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {backgroundOptions.slideshow.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentImageIndex === index 
                  ? "bg-[#eeba2b] scale-110" 
                  : "bg-[#FCFAEF]/60 hover:bg-[#FCFAEF]/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator - Right Side with Arc Boundary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 right-8 z-20 flex items-center justify-center"
      >
        <div className="relative w-16 h-16">
          {/* Arc Boundary */}
          <svg
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="32"
              cy="32"
              r="30"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="94 188"
              strokeLinecap="round"
              className="text-[#FCFAEF]/60 dark:text-[#FCFAEF]/60"
            />
          </svg>
          
          {/* Scroll Button */}
          <button
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-[#FCFAEF]/80 dark:border-[#FCFAEF]/80 bg-[#FCFAEF]/10 dark:bg-[#FCFAEF]/10 backdrop-blur-sm hover:bg-[#FCFAEF]/20 dark:hover:bg-[#FCFAEF]/20 transition-all duration-300 flex items-center justify-center group"
            aria-label="Scroll down"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronUp className="w-5 h-5 text-[#FCFAEF] dark:text-[#FCFAEF] rotate-180 group-hover:scale-110 transition-transform" />
            </motion.div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}