"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/Image";

interface PhotoCarouselProps {
  title: string;
  description: string;
  photos: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export default function PhotoCarousel({ 
  title, 
  description, 
  photos, 
  autoPlay = true, 
  interval = 5000,
  className = "" 
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, interval, photos.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (photos.length === 0) {
    return (
      <div className={`bg-white dark:bg-[#2F3332] rounded-2xl p-6 shadow-lg text-center ${className}`}>
        <h3 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">{title}</h3>
        <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-4">{description}</p>
        <p className="text-sm text-[#2F3332]/60 dark:text-[#E6E7E7]/60">No photos available</p>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-[#2F3332] rounded-2xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">{title}</h3>
          <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80">{description}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={togglePlayPause}
          className="border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF] dark:border-[#66C4DC] dark:text-[#66C4DC] dark:hover:bg-[#66C4DC]"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-xl bg-[#FCFAEF]/20 dark:bg-[#1C1F1E]/20">
        <div className="relative h-64 md:h-80">
          {photos.map((photo, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="sm"
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-[#2F3332]/80 border-white/20 dark:border-[#4F5554]/20 hover:bg-white dark:hover:bg-[#2F3332]"
        >
          <ChevronLeft size={20} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-[#2F3332]/80 border-white/20 dark:border-[#4F5554]/20 hover:bg-white dark:hover:bg-[#2F3332]"
        >
          <ChevronRight size={20} />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-[#0097b2] dark:bg-[#66C4DC]"
                  : "bg-white/50 dark:bg-[#E6E7E7]/50 hover:bg-white dark:hover:bg-[#E6E7E7]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Photo Counter */}
      <div className="mt-4 text-center">
        <span className="text-sm text-[#2F3332]/60 dark:text-[#E6E7E7]/60">
          {currentIndex + 1} of {photos.length}
        </span>
      </div>
    </div>
  );
} 