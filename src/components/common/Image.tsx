"use client";

/* eslint-disable @next/next/no-img-element */
// Using standard img tag for ImageKit CDN optimization and better browser caching
// ImageKit's CDN already provides optimization, so Next.js Image component overhead is unnecessary

import { useState, useEffect, useMemo } from "react";
import { getImageKitUrl } from "@/lib/imagekit";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  style?: React.CSSProperties;
  quality?: number;
  minWidth?: number;
  minHeight?: number;
}

export default function Image({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  fill, 
  priority,
  sizes,
  style,
  quality = 100,
  minWidth,
  minHeight
}: ImageProps) {
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate display dimensions - use minWidth/minHeight if provided, otherwise use width/height
  // This ensures consistency between URL generation and img element attributes
  const displayWidth = minWidth || width;
  const displayHeight = minHeight || height;

  // Generate ImageKit URL with transformations
  // Use useMemo to ensure consistent URLs for caching (prevents unnecessary re-renders and API calls)
  const imageUrl = useMemo(() => {
    return getImageKitUrl(src, {
      quality,
      width: displayWidth,
      height: displayHeight,
    });
  }, [src, quality, displayWidth, displayHeight]);

  // Reset loading state when image URL changes
  // This ensures the placeholder shows when switching between images
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [imageUrl]);

  // Show placeholder during SSR and initial client render
  if (!isClient) {
    return (
      <div 
        className="bg-gray-200 dark:bg-gray-700 animate-pulse"
        style={{
          ...(fill && {
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: 0,
            minHeight: '100px', // Fallback minimum height for fill mode
          }),
          ...(displayWidth && displayHeight && !fill && {
            width: `${displayWidth}px`,
            height: `${displayHeight}px`,
          }),
        }}
        aria-hidden="true"
      />
    );
  }

  const imageStyle: React.CSSProperties = {
    ...style,
    ...(fill && {
      position: "absolute",
      height: "100%",
      width: "100%",
      inset: 0,
    }),
    // Always include transition so opacity changes animate smoothly
    transition: "opacity 0.3s ease-in-out",
    ...(!imageLoaded && {
      opacity: 0,
    }),
    ...(imageLoaded && {
      opacity: 1,
    }),
  };

  // Placeholder style - separate from image style to avoid className conflicts
  // Don't include className here to prevent sizing conflicts
  const placeholderStyle: React.CSSProperties = {
    ...(fill && {
      position: "absolute",
      height: "100%",
      width: "100%",
      inset: 0,
      zIndex: 1,
      // Ensure placeholder has proper dimensions even in fill mode
      minHeight: '100px', // Fallback minimum height for fill mode
    }),
    ...(displayWidth && displayHeight && !fill && {
      width: `${displayWidth}px`,
      height: `${displayHeight}px`,
    }),
  };

  return (
    <>
      {imageError ? (
        <div 
          className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm"
          style={placeholderStyle}
          role="alert"
          aria-label="Image failed to load"
        >
          <span>Failed to load image</span>
        </div>
      ) : (
        <>
          {!imageLoaded && (
            <div 
              className="bg-gray-200 dark:bg-gray-700 animate-pulse"
              style={placeholderStyle}
              aria-hidden="true"
            />
          )}
          <img
            src={imageUrl}
            alt={alt}
            width={fill ? undefined : displayWidth}
            height={fill ? undefined : displayHeight}
            className={className}
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
            style={imageStyle}
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              setImageError(true);
              setImageLoaded(false);
            }}
            // Add fetchPriority (uppercase HTML attribute) for priority images to improve caching behavior
            {...(priority && { fetchPriority: "high" })}
          />
        </>
      )}
    </>
  );
}