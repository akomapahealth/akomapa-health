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
 * ImageKit-backed image using `next/image` with a custom loader (`imageKitLoader`).
 * Use for remote paths served via `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` (e.g. `/highlights/...`).
 * Local-only assets under `public/` should use `next/image` directly without this wrapper.
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

  const resolvedLoading =
    loading !== undefined
      ? loading
      : priority
        ? undefined
        : ("lazy" as const);

  return (
    <NextImage
      {...rest}
      loader={imageKitLoader}
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
