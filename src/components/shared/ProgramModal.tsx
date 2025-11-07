"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Program } from "@/lib/types";
import Image from "@/components/common/Image";

interface ProgramModalProps {
  program: Program | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgramModal({ program, isOpen, onClose }: ProgramModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!program) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#2F3332] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-[#2F3332]/80 backdrop-blur-sm hover:bg-white dark:hover:bg-[#2F3332] transition-colors"
            >
              <X size={20} className="text-[#1C1F1E] dark:text-[#FCFAEF]" />
            </button>

            {/* Program Image */}
            <div className="relative h-64 md:h-80 w-full">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover rounded-t-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-2xl" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-sm font-medium text-[#F5C94D] mb-1">
                  {program.category}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">{program.title}</h2>
              </div>
            </div>

            {/* Program Content */}
            <div className="p-6 md:p-8">
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] mb-6">
                {program.description}
              </p>

              {/* Program Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#0097b2] dark:text-[#66C4DC] mr-3" />
                  <div>
                    <div className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Locations</div>
                    <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                      {program.locations.join(", ")}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-[#0097b2] dark:text-[#66C4DC] mr-3" />
                  <div>
                    <div className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Established</div>
                    <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                      {program.established}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-[#0097b2] dark:text-[#66C4DC] mr-3" />
                  <div>
                    <div className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">People Served</div>
                    <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                      {program.peopleServed}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Points */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {program.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#0097b2] dark:text-[#66C4DC] mr-2 mt-1">•</span>
                      <span className="text-[#2F3332] dark:text-[#E6E7E7]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Impact */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Impact & Outcomes
                </h3>
                <ul className="space-y-2">
                  {program.impacts.map((impact, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#eeba2b] dark:text-[#F5C94D] mr-2 mt-1">✓</span>
                      <span className="text-[#2F3332] dark:text-[#E6E7E7]">{impact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#E6E7E7] dark:border-[#4F5554]">
                <Button 
                  onClick={onClose}
                  className="flex-1 bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF]"
                >
                  Close
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2]/10 dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC]/10"
                >
                  Get Involved
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 