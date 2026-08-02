"use client";

import NextImage from "next/image";
import type { ComponentProps } from "react";
import { imageKitLoader, isImageKitSrc } from "@/lib/imagekit";

type Props = Omit<ComponentProps<typeof NextImage>, "src" | "loader"> & {
  src: string;
  minWidth?: number;
  minHeight?: number;
};

/**
 * App image wrapper with a split optimization strategy:
 *
 * - **ImageKit CDN** (relative paths, or absolute `*.imagekit.io` URLs): custom
 *   `imageKitLoader` — browser fetches ImageKit directly with `tr=w-,q-`.
 * - **Local / other remotes**: Next.js default `/_next/image` optimizer.
 *
 * Do not pass local `public/` paths here; use `next/image` directly for those.
 * See `docs/performance/image-optimization.md`.
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
  const useImageKitLoader = isImageKitSrc(src);

  const resolvedLoading =
    loading !== undefined
      ? loading
      : priority
        ? undefined
        : ("lazy" as const);

  return (
    <NextImage
      {...rest}
      loader={useImageKitLoader ? imageKitLoader : undefined}
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
