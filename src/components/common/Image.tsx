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

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate ImageKit URL with transformations
  // Use useMemo to ensure consistent URLs for caching (prevents unnecessary re-renders and API calls)
  const imageUrl = useMemo(() => {
    return getImageKitUrl(src, {
      quality,
      width: minWidth || width,
      height: minHeight || height,
    });
  }, [src, quality, width, height, minWidth, minHeight]);

  // Reset loading state when image URL changes
  // This ensures the placeholder shows when switching between images
  useEffect(() => {
    setImageLoaded(false);
  }, [imageUrl]);

  // Show placeholder during SSR and initial client render
  if (!isClient) {
    return (
      <div 
        className={`${className || ''} bg-gray-200 dark:bg-gray-700 animate-pulse`}
        style={{
          ...style,
          ...(fill && {
            position: "absolute",
            height: "100%",
            width: "100%",
            inset: 0,
          }),
          ...(width && height && !fill && {
            width: `${width}px`,
            height: `${height}px`,
          }),
        }}
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

  return (
    <>
      {!imageLoaded && (
        <div 
          className={`${className || ''} bg-gray-200 dark:bg-gray-700 animate-pulse`}
          style={{
            ...style,
            ...(fill && {
              position: "absolute",
              height: "100%",
              width: "100%",
              inset: 0,
            }),
            ...(width && height && !fill && {
              width: `${width}px`,
              height: `${height}px`,
            }),
          }}
        />
      )}
      <img
        src={imageUrl}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        style={imageStyle}
        onLoad={() => setImageLoaded(true)}
        // Add fetchpriority for priority images to improve caching behavior
        {...(priority && { fetchPriority: "high" })}
      />
    </>
  );
}