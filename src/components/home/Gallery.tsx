"use client";

import { useState, useEffect } from "react";
import Image from "@/components/common/Image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Define type for gallery items
type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/gallery/student-training.jpg",
    alt: "Medical students practicing clinical skills",
    category: "students",
    featured: true,
  },
  {
    id: 2,
    src: "/gallery/community-outreach.jpg",
    alt: "Community health education session in Saltpond",
    category: "community",
  },
  {
    id: 3,
    src: "/gallery/faculty-mentor.jpg",
    alt: "Faculty supervisor guiding student examination",
    category: "faculty",
  },
  {
    id: 4,
    src: "/gallery/clinic-exterior.jpg",
    alt: "Exterior of Winneba pilot clinic",
    category: "clinics",
  },
  {
    id: 5,
    src: "/gallery/patient-consultation.jpg",
    alt: "Student conducting patient consultation with supervision",
    category: "students",
    featured: true,
  },
  {
    id: 6,
    src: "/gallery/community-meeting.jpg",
    alt: "Town hall meeting with community leaders",
    category: "community",
  },
  {
    id: 7,
    src: "/gallery/faculty-team.jpg",
    alt: "Faculty supervisors planning session",
    category: "faculty",
  },
  {
    id: 8,
    src: "/gallery/clinic-waiting-area.jpg",
    alt: "Patients in clinic waiting area",
    category: "clinics",
  },
  {
    id: 9,
    src: "/gallery/student-group.jpg",
    alt: "Interprofessional student team discussing patient care",
    category: "students",
  },
  {
    id: 10,
    src: "/gallery/health-fair.jpg",
    alt: "Community health fair in Saltpond",
    category: "community",
    featured: true,
  },
  {
    id: 11,
    src: "/gallery/faculty-demonstration.jpg",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 12,
    src: "/gallery/clinic-treatment.jpg",
    alt: "Treatment room in pilot clinic",
    category: "clinics",
  },
];

// Category definitions
const categories = [
  { id: "all", label: "All" },
  { id: "students", label: "Students" },
  { id: "community", label: "Community" },
  { id: "faculty", label: "Faculty" },
  { id: "clinics", label: "Clinics" },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Filter gallery items based on selected category
  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  // Handle image click to open lightbox
  const openLightbox = (image: GalleryItem, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  // Handle navigation in lightbox
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[newIndex]);
    setCurrentIndex(newIndex);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[newIndex]);
    setCurrentIndex(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  // Prevent scrolling when lightbox is open
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
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
            OUR WORK IN ACTION
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
            Gallery
          </h3>
          <p className="text-[#2F3332] dark:text-[#E6E7E7] text-lg">
            Highlight our students, community events, faculty supervisors, and pilot clinics in action—offering a human view of our mission at work.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#007A73] text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-[#2F3332] dark:text-[#E6E7E7] hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  item.featured ? "sm:col-span-2 sm:row-span-2" : ""
                } overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-[#2F3332]`}
                onClick={() => openLightbox(item, index)}
              >
                <div className="relative w-full h-full" style={{ 
                  aspectRatio: item.featured ? "16/9" : "4/3" 
                }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white text-sm">{item.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="max-w-5xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
                <div className="relative w-full" style={{ maxHeight: "80vh" }}>
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    width={1200}
                    height={800}
                    className="object-contain max-h-[80vh] rounded"
                  />
                </div>
                <div className="p-4 bg-[#1C1F1E] text-[#FCFAEF] rounded-b">
                  <p>{selectedImage.alt}</p>
                  <p className="text-sm text-[#C37B1E] mt-1 capitalize">Category: {selectedImage.category}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}