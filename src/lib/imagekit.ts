/**
 * ImageKit URL generation utility.
 * Generates ImageKit CDN URLs with `tr=` transformations for responsive sizing.
 *
 * Strategy (see docs/performance/image-optimization.md): ImageKit is the primary
 * optimizer for CDN assets. The custom `next/image` loader returns ImageKit URLs
 * that the browser fetches directly — Next does not re-proxy them through `/_next/image`.
 */

interface ImageKitTransformations {
  format?: "auto" | "avif" | "jpeg" | "jpg" | "png" | "webp";
  quality?: number;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
}

function isImageKitHostname(hostname: string): boolean {
  return hostname === "imagekit.io" || hostname.endsWith(".imagekit.io");
}

/**
 * Whether `src` should use the ImageKit custom loader.
 * Relative paths are treated as ImageKit CDN paths (app convention for
 * `@/components/common/Image`). Absolute URLs use ImageKit only when hosted
 * on `*.imagekit.io`.
 */
export function isImageKitSrc(src: string): boolean {
  if (!src.startsWith("http://") && !src.startsWith("https://")) {
    return true;
  }

  try {
    return isImageKitHostname(new URL(src).hostname);
  } catch {
    return false;
  }
}

function buildTransformParams(
  transformations?: ImageKitTransformations,
): string[] {
  if (!transformations) return [];

  const transformParams: string[] = [];
  const width = transformations.minWidth || transformations.width;
  const height = transformations.minHeight || transformations.height;

  if (transformations.format !== undefined) {
    transformParams.push(`f-${transformations.format}`);
  }
  if (transformations.quality !== undefined) {
    transformParams.push(`q-${transformations.quality}`);
  }
  if (width !== undefined) {
    transformParams.push(`w-${width}`);
  }
  if (height !== undefined) {
    transformParams.push(`h-${height}`);
  }

  return transformParams;
}

/**
 * Generates an ImageKit URL with optional transformations
 * @param path - The image path in ImageKit (e.g., "/gallery/image.jpg") or a full ImageKit URL
 * @param transformations - Optional transformation parameters
 * @returns The complete ImageKit URL
 */
export function getImageKitUrl(
  path: string,
  transformations?: ImageKitTransformations,
): string {
  const transformParams = buildTransformParams(transformations);

  if (path.startsWith("http://") || path.startsWith("https://")) {
    // Non-ImageKit remotes: pass through unchanged.
    if (!isImageKitSrc(path)) {
      return path;
    }

    // Absolute ImageKit URLs: apply/replace `tr=` so loader width/quality stick.
    try {
      const url = new URL(path);
      if (transformParams.length > 0) {
        url.searchParams.set("tr", transformParams.join(","));
      }
      return url.href;
    } catch {
      return path;
    }
  }

  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!urlEndpoint) {
    console.warn("NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is not set");
    return path;
  }

  // Remove leading slash from path if present (ImageKit handles it)
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Ensure urlEndpoint doesn't have trailing slash
  const baseUrl = urlEndpoint.endsWith("/")
    ? urlEndpoint.slice(0, -1)
    : urlEndpoint;

  // ImageKit URL format: {urlEndpoint}/{path}?tr={transformations}
  const imageUrl = `${baseUrl}/${cleanPath}`;

  if (transformParams.length > 0) {
    return `${imageUrl}?tr=${transformParams.join(",")}`;
  }

  return imageUrl;
}

/**
 * Generates a responsive srcSet for ImageKit images
 * @param path - The image path in ImageKit
 * @param sizes - Array of width sizes for responsive images
 * @param transformations - Base transformation parameters
 * @returns A srcSet string for use in img tags
 */
export function getImageKitSrcSet(
  path: string,
  sizes: number[],
  transformations?: Omit<ImageKitTransformations, "width" | "minWidth">,
): string {
  return sizes
    .map((width) => {
      const url = getImageKitUrl(path, { ...transformations, width });
      return `${url} ${width}w`;
    })
    .join(", ");
}

/** Parameters passed by `next/image` to a custom loader (see Next.js Image docs). */
export type ImageKitLoaderParams = {
  src: string;
  width: number;
  quality?: number;
};

/**
 * `next/image` loader for ImageKit asset paths (e.g. `/highlights/photo.jpg`)
 * and absolute `*.imagekit.io` URLs.
 *
 * Applies `tr=f-auto`, `tr=w-`, and `tr=q-` so ImageKit transcodes source
 * formats (including HEIF/HEIC) for the requesting browser and serves
 * appropriately sized bytes.
 * With a custom loader, Next emits these URLs directly on `<img>` — the browser
 * fetches ImageKit; Next does not re-optimize through `/_next/image`.
 */
export function imageKitLoader({
  src,
  width,
  quality,
}: ImageKitLoaderParams): string {
  const q = quality ?? 75;
  return getImageKitUrl(src, { format: "auto", width, quality: q });
}
