"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "@/components/common/Image";
import Link from "next/link";
import { ArrowRight, MapPin, ArrowLeft as ChevronLeft, ArrowRight as ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Array of community photos for slideshow
const communityPhotos = [
  {
    src: "/highlights/Akomapa-20.jpg",
    alt: "Healthcare students providing care in Saltpond",
    location: "Saltpond"
  },
  {
    src: "/highlights/Akomapa-42.jpg",
    alt: "Community engagement session in Winneba",
    location: "Winneba"
  },
  {
    src: "/highlights/Akomapa-37.jpg",
    alt: "Health education outreach with local community members",
    location: "Saltpond"
  },
  {
    src: "/highlights/Akomapa-11.jpg",
    alt: "Student healthcare workers collaborating with local practitioners",
    location: "Winneba"
  }
];

export default function LocationsSection() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Auto rotate through photos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === communityPhotos.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === communityPhotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => 
      prevIndex === 0 ? communityPhotos.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
            Our First Clinic - Akomapa Free Clinic UCC Chapter
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
            Local Impact with National Potential
          </h3>
          <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
            We're piloting our first student-run clinics in Saltpond and Abura in partnership 
            with the University of Cape Coast College of Health Sciences. These sites serve as 
            epicenters for innovation, care, and training.
          </p>
        </div>

        {/* Top section: Photo slideshow and descriptive text side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* Photos slideshow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl border-2 border-[#E6E7E7] dark:border-[#2F3332]">
              {/* Current photo */}
              <Image
                src={communityPhotos[currentPhotoIndex].src}
                alt={communityPhotos[currentPhotoIndex].alt}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
              
              {/* Overlay with gradient and caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1F1E]/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-[#FCFAEF]">
                <span className="bg-[#007A73]/90 text-[#FCFAEF] px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {communityPhotos[currentPhotoIndex].location}
                </span>
                <p className="text-lg font-medium mt-2">
                  {communityPhotos[currentPhotoIndex].alt}
                </p>
              </div>
              
              {/* Navigation buttons */}
              <button 
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#FCFAEF]/30 hover:bg-[#FCFAEF]/50 rounded-full p-2 text-[#1C1F1E] backdrop-blur-sm transition-all"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button 
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FCFAEF]/30 hover:bg-[#FCFAEF]/50 rounded-full p-2 text-[#1C1F1E] backdrop-blur-sm transition-all"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            {/* Photo indicators */}
            <div className="flex justify-center space-x-2 mt-4">
              {communityPhotos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPhotoIndex === index 
                      ? "bg-[#007A73] scale-110 w-4" 
                      : "bg-[#007A73]/30 hover:bg-[#007A73]/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                ></button>
              ))}
            </div>
          </motion.div>

          {/* Descriptive content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h4 className="text-2xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
              Building Health Capacity in Central Ghana
            </h4>
            <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">
              Our pilot locations in Saltpond and Abura were strategically chosen for their 
              mix of urban and rural populations, proximity to the University of Cape Coast, 
              and demonstrated need for expanded NCD care.
            </p>
            <div className="mb-6">
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">Saltpond</div>
                  <div className="text-[#2F3332] dark:text-[#E6E7E7]">
                    A coastal town with approximately 24,000 residents and limited specialty healthcare services. 
                    Our program works closely with the Saltpond Municipal Hospital.
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-[#C37B1E] dark:text-[#F3C677] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">Abura</div>
                  <div className="text-[#2F3332] dark:text-[#E6E7E7]">
                    An educational hub with a population of around 60,000, housing the University of Cape Coast. 
                    Our clinic partners with local health authorities to reach underserved communities.
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] w-fit">
              <Link href="/our-ucc-clinic" className="flex items-center">
                Visit Our Clinic <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Full-width map section with hidden header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative rounded-xl overflow-hidden shadow-lg border-2 border-[#E6E7E7] dark:border-[#2F3332]"
        >
          {/* Using the wrapper div with overflow hidden technique from Stack Overflow */}
          <div style={{ width: "100%", overflow: "hidden", height: "550px" }}>
            <iframe 
              src="https://www.google.com/maps/d/embed?mid=1qJUWg-0TeIfD_zTnUhkTJE7DplYWnVg&ehbc=2E312F" 
              width="100%" 
              height="600"
              style={{ border: 0, marginTop: "-50px" }}  // Negative margin to hide the header
              title="Akomapa Health Clinic Locations"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1C1F1E]/80 to-transparent p-4 text-[#FCFAEF]">
            <p className="font-medium">Our clinic locations in Ghana's Central Region</p>
          </div>
        </motion.div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6 max-w-2xl mx-auto">
            With successful implementation in our pilot locations, we aim to expand our model across Ghana, 
            creating a network of student-run clinics that serve communities and train the next generation of healthcare leaders.
          </p>
          {/* <Button className="bg-[#C37B1E] hover:bg-[#007A73] text-[#FCFAEF]">
            <Link href="/about/expansion" className="flex items-center">
              Our Expansion Plan <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button> */}
        </div>
      </div>
    </section>
  );
}