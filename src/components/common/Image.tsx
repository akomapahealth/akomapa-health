"use client";

import NextImage from "next/image";
import type { ComponentProps } from "react";
import { imageKitLoader } from "@/lib/imagekit";

type Props = Omit<ComponentProps<typeof NextImage>, "src" | "loader"> & {
  src: string;
  minWidth?: number;
  minHeight?: number;
};

/**
 * ImageKit-backed image using `next/image` with a custom loader for ImageKit
 * paths. Absolute remote URLs use Next.js' default optimizer so responsive
 * width parameters are retained.
 */
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
  quality = 75,
  minWidth,
  minHeight,
  loading,
  ...rest
}: Props) {
  const resolvedWidth = minWidth ?? width;
  const resolvedHeight = minHeight ?? height;
  const resolvedSizes = fill ? (sizes ?? "100vw") : sizes;
  const isAbsoluteRemoteUrl =
    src.startsWith("https://") || src.startsWith("http://");

  const resolvedLoading =
    loading !== undefined
      ? loading
      : priority
        ? undefined
        : ("lazy" as const);

  return (
    <NextImage
      {...rest}
      loader={isAbsoluteRemoteUrl ? undefined : imageKitLoader}
      src={src}
      alt={alt}
      width={fill ? undefined : resolvedWidth}
      height={fill ? undefined : resolvedHeight}
      fill={fill}
      priority={priority}
      sizes={resolvedSizes}
      quality={quality}
      className={className}
      style={style}
      loading={resolvedLoading}
    />
  );
}
