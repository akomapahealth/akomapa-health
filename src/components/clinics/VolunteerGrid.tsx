"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "@/components/common/Image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const volunteerImages = [
  "/ucc-team/volunteers/Akomapa-103.jpg",
  "/ucc-team/volunteers/Akomapa-105.jpg",
  "/ucc-team/volunteers/Akomapa-104.jpg",
  "/ucc-team/volunteers/Akomapa-106.jpg",
  "/ucc-team/volunteers/Akomapa-67.jpg",
  "/ucc-team/volunteers/Akomapa-69.jpg",
  "/ucc-team/volunteers/Akomapa-65.jpg",
  "/ucc-team/volunteers/Akomapa-48.jpg",
  "/ucc-team/volunteers/Akomapa-64.jpg",
  "/ucc-team/volunteers/Akomapa-47.jpg",
  "/ucc-team/volunteers/Akomapa-46.jpg",
  "/ucc-team/volunteers/Akomapa-63.jpg",
  "/ucc-team/volunteers/Akomapa-62.jpg",
  "/ucc-team/volunteers/Akomapa-45.jpg",
  "/ucc-team/volunteers/Akomapa-66.jpg",
  "/ucc-team/volunteers/Akomapa-50.jpg",
  "/ucc-team/volunteers/Akomapa-49.jpg",
  "/ucc-team/volunteers/Akomapa-71.jpg",
  "/ucc-team/volunteers/Akomapa-51.jpg",
  "/ucc-team/volunteers/Akomapa-55.jpg",
  "/ucc-team/volunteers/Akomapa-56.jpg",
  "/ucc-team/volunteers/Akomapa-101.jpg",
  "/ucc-team/volunteers/Akomapa-72.jpg",
  "/ucc-team/volunteers/Akomapa-54.jpg",
  "/ucc-team/volunteers/Akomapa-59.jpg",
  "/ucc-team/volunteers/Akomapa-100.jpg",
  "/ucc-team/volunteers/Akomapa-97.jpg",
  "/ucc-team/volunteers/Akomapa-52.jpg",
  "/ucc-team/volunteers/Akomapa-53.jpg",
  "/ucc-team/volunteers/Akomapa-95.jpg",
  "/ucc-team/volunteers/Akomapa-70.jpg",
  "/ucc-team/volunteers/Akomapa-58.jpg",
  "/ucc-team/volunteers/Akomapa-61.jpg",
  "/ucc-team/volunteers/Akomapa-98.jpg",
  "/ucc-team/volunteers/Akomapa-73.jpg",
  "/ucc-team/volunteers/Akomapa-75.jpg",
];

function VolunteerThumbnail({ src, index, onOpen }: { src: string; index: number; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white dark:border-[#3A3E3D] shadow-md hover:scale-110 hover:border-[#0097b2] focus:outline-none focus:ring-2 focus:ring-[#0097b2] focus:ring-offset-2 transition-all duration-200"
      aria-label="View volunteer photo"
    >
      <Image
        src={src}
        alt="Volunteer headshot"
        fill
        className="object-cover"
        sizes="56px"
        priority={index < 12}
      />
    </button>
  );
}

export default function VolunteerGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedImage) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, closeModal]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  return (
    <section className="py-12 md:py-16 bg-[#F4F1E8] dark:bg-[#2F3332] overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#0097b2] dark:text-[#66C4DC] mb-2">
            Our Volunteers
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
            Thank You to Our Amazing Team
          </h2>
          <p className="text-base text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
            Every clinic day is powered by the dedication of our incredible volunteers who give their time and hearts to serve our communities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-12 gap-2 sm:gap-3 justify-items-center mb-8 max-w-4xl mx-auto"
        >
          {volunteerImages.map((src, index) => (
            <VolunteerThumbnail
              key={src}
              src={src}
              index={index}
              onOpen={() => setSelectedImage(src)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8DD4E6]"
          >
            Join Our Team
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Volunteer photo preview"
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <button
              aria-label="Close preview"
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 z-10 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={closeModal}
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-md w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Volunteer"
                fill
                className="object-cover"
                sizes="(max-width: 448px) 100vw, 448px"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
