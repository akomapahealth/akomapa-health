"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "@/components/common/Image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";

// Define type for gallery items
export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
};

const defaultGalleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/gallery/gallery-pic-1.jpg",
    alt: "Medical students practicing clinical skills",
    category: "students",
    featured: true,
  },
  {
    id: 2,
    src: "/gallery/gallery-pic-2.jpg",
    alt: "Community health education session in Saltpond",
    category: "community",
  },
  {
    id: 3,
    src: "/gallery/gallery-pic-3.jpg",
    alt: "Faculty supervisor guiding student examination",
    category: "faculty",
  },
  {
    id: 4,
    src: "/gallery/gallery-pic-4.jpg",
    alt: "Exterior of Winneba pilot clinic",
    category: "clinics",
  },
  {
    id: 5,
    src: "/gallery/gallery-pic-5.jpg",
    alt: "Student conducting patient consultation with supervision",
    category: "students",
    featured: true,
  },
  {
    id: 6,
    src: "/gallery/gallery-pic-6.jpg",
    alt: "Town hall meeting with community leaders",
    category: "community",
  },
  {
    id: 7,
    src: "/gallery/gallery-pic-7.jpg",
    alt: "Faculty supervisors planning session",
    category: "faculty",
  },
  {
    id: 8,
    src: "/gallery/gallery-pic-8.jpg",
    alt: "Patients in clinic waiting area",
    category: "clinics",
  },
  {
    id: 9,
    src: "/gallery/gallery-pic-9.jpg",
    alt: "Interprofessional student team discussing patient care",
    category: "students",
  },
  {
    id: 10,
    src: "/gallery/gallery-pic-10.jpg",
    alt: "Community health fair in Saltpond",
    category: "community",
    featured: true,
  },
  {
    id: 11,
      src: "/gallery/gallery-pic-11.jpg",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 12,
    src: "/gallery/gallery-pic-12.jpg",
    alt: "Treatment room in pilot clinic",
    category: "clinics",
  },
  {
    id: 13,
    src: "/gallery/gallery-pic-13.jpg",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },

  {
    id: 14,
    src: "/gallery/gallery-pic-14.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 15,
    src: "/gallery/gallery-pic-15.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 16,
    src: "/gallery/gallery-pic-16.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 17,
    src: "/gallery/gallery-pic-17.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 18,
    src: "/gallery/gallery-pic-18.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 19,
    src: "/gallery/gallery-pic-19.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 20,
    src: "/gallery/gallery-pic-20.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 21,
    src: "/gallery/gallery-pic-21.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 22,
    src: "/gallery/gallery-pic-22.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  {
    id: 23,
    src: "/gallery/gallery-pic-23.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
  },
  
  {
    id: 24,
    src: "/gallery/gallery-pic-24.JPG",
    alt: "Faculty member demonstrating clinical procedure",
    category: "faculty",
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

export type GalleryProps = {
  items?: GalleryItem[];
};

export default function Gallery({ items }: GalleryProps = {}) {
  const sourceItems = items ?? defaultGalleryItems;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Filter gallery items based on selected category
  const filteredItems =
    selectedCategory === "all"
      ? sourceItems
      : sourceItems.filter((item) => item.category === selectedCategory);

  // Get items to display based on expansion state
  const displayedItems = isExpanded ? filteredItems : filteredItems.slice(0, 4);

  // Handle image click to open lightbox
  const openLightbox = (image: GalleryItem, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  // Handle navigation in lightbox
  const goToNext = useCallback(() => {
    if (filteredItems.length === 0) return;
    const newIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[newIndex]);
    setCurrentIndex(newIndex);
  }, [currentIndex, filteredItems]);

  const goToPrevious = useCallback(() => {
    if (filteredItems.length === 0) return;
    const newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[newIndex]);
    setCurrentIndex(newIndex);
  }, [currentIndex, filteredItems]);

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
  }, [selectedImage, currentIndex, goToNext, goToPrevious]);

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

  // Reset expansion when category changes
  useEffect(() => {
    setIsExpanded(false);
  }, [selectedCategory]);

  useEffect(() => {
    if (filteredItems.length === 0) {
      setSelectedImage(null);
      setCurrentIndex(0);
      return;
    }

    if (currentIndex >= filteredItems.length) {
      setCurrentIndex(0);
      setSelectedImage(null);
    } else if (selectedImage) {
      setSelectedImage(filteredItems[currentIndex]);
    }
  }, [filteredItems, currentIndex, selectedImage]);

  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-lg mb-2">
            OUR WORK IN ACTION
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
            Gallery
          </h3>
          <p className="text-[#2F3332] dark:text-[#E6E7E7] text-lg">
            Highlight our students, community events, faculty supervisors, and pilot clinics in action offering a human view of our mission at work.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              aria-pressed={selectedCategory === category.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#0097b2] text-white"
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
            {displayedItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.alt}`}
                className={`${
                  item.featured ? "sm:col-span-2 sm:row-span-2" : ""
                } overflow-hidden rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-[#2F3332] focus:outline-none focus:ring-2 focus:ring-[#0097b2] focus:ring-offset-2`}
                onClick={() => openLightbox(item, index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(item, index);
                  }
                }}
              >
                <div 
                  className="relative w-full" 
                  style={{ 
                    paddingBottom: item.featured ? "56.25%" : "75%",
                    aspectRatio: item.featured ? "16/9" : "4/3" 
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    priority={index < 4}
                    sizes={item.featured 
                      ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                      : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    }
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

        {/* Show more/less button */}
        {filteredItems.length > 4 && (
          <div className="text-center mt-8">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0097b2] text-white rounded-full font-medium hover:bg-[#005A55] transition-colors duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? (
                <>
                  Show Less
                  <span className="w-4 h-4 rotate-180 transition-transform duration-200"><ChevronUp size={16} /></span>
                </>
              ) : (
                <>
                  Show More ({filteredItems.length - 4} more)
                  <span className="w-4 h-4 transition-transform duration-200"><ChevronDown size={16} /></span>
                </>
              )}
            </motion.button>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label="Image lightbox"
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                aria-label="Close lightbox"
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 z-10 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              
              <button 
                aria-label="Previous image"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 z-10 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                aria-label="Next image"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 z-10 focus:outline-none focus:ring-2 focus:ring-white"
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
                  <p className="text-sm text-[#eeba2b] mt-1 capitalize">Category: {selectedImage.category}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}