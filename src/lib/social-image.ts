import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Social share images (og:image / twitter:image) are fetched by third-party
 * crawlers, so they must be absolute, public, and never routed through the
 * dev/preview ImageKit fixture rewrite. Every image reference used in page
 * metadata is resolved through here.
 *
 * Server-only: metadata is generated at build time, and the local-vs-CDN
 * decision reads the filesystem.
 */

export const SOCIAL_IMAGE_WIDTH = 1200;
export const SOCIAL_IMAGE_HEIGHT = 630;

/** Public ImageKit endpoint; identical in every environment. */
export const IMAGEKIT_PUBLIC_ENDPOINT = "https://ik.imagekit.io/akomapa";

const SITE_ORIGIN = "https://akomapa.org";
const PUBLIC_DIR = join(process.cwd(), "public");
/** Generated social cards are a route, not a file, but are served by the site. */
const GENERATED_CARD_PREFIX = "/og/";

/** Crawlers don't negotiate formats, so request a concrete JPEG. */
const SOCIAL_TRANSFORM = `w-${SOCIAL_IMAGE_WIDTH},h-${SOCIAL_IMAGE_HEIGHT},fo-auto,f-jpg,q-80`;

export type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export type SocialImageSource = {
  src: string;
  alt: string;
  /** Intrinsic size of a local or remote asset. Omit for ImageKit paths. */
  width?: number;
  height?: number;
};

function imageKitEndpoint() {
  const configured = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim();
  const endpoint = configured || IMAGEKIT_PUBLIC_ENDPOINT;
  return endpoint.endsWith("/") ? endpoint.slice(0, -1) : endpoint;
}

function isAbsolute(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

function isImageKitHost(src: string) {
  try {
    const { hostname } = new URL(src);
    return hostname === "imagekit.io" || hostname.endsWith(".imagekit.io");
  } catch {
    return false;
  }
}

/**
 * A relative path is a committed `public/` asset when the file exists on disk;
 * otherwise it is an ImageKit CDN path. `/images/` holds both kinds, so the
 * prefix alone cannot decide.
 */
export function isLocalPublicAsset(src: string) {
  if (isAbsolute(src)) return false;
  if (src.startsWith(GENERATED_CARD_PREFIX)) return true;
  const relative = src.startsWith("/") ? src.slice(1) : src;
  return existsSync(join(PUBLIC_DIR, relative));
}

/**
 * ImageKit CDN path or URL → a 1200×630 smart-cropped JPEG on the CDN, so the
 * declared dimensions are true rather than assumed.
 */
function resolveImageKit(src: string, alt: string): SocialImage {
  const url = isAbsolute(src)
    ? new URL(src)
    : new URL(`${imageKitEndpoint()}/${src.startsWith("/") ? src.slice(1) : src}`);
  url.searchParams.set("tr", SOCIAL_TRANSFORM);

  return {
    url: url.href,
    width: SOCIAL_IMAGE_WIDTH,
    height: SOCIAL_IMAGE_HEIGHT,
    alt,
  };
}

/**
 * Resolve any image reference used in metadata to a crawler-safe social image.
 *
 * - Committed `public/` files → production origin, real dimensions.
 * - ImageKit paths and `*.imagekit.io` URLs → CDN with a social crop.
 * - Other absolute URLs (e.g. YouTube poster frames) pass through.
 */
export function resolveSocialImage(source: SocialImageSource): SocialImage {
  const { src, alt } = source;
  const width = source.width ?? SOCIAL_IMAGE_WIDTH;
  const height = source.height ?? SOCIAL_IMAGE_HEIGHT;

  if (isLocalPublicAsset(src)) {
    return {
      url: `${SITE_ORIGIN}${src.startsWith("/") ? src : `/${src}`}`,
      width,
      height,
      alt,
    };
  }

  if (isAbsolute(src) && !isImageKitHost(src)) {
    return { url: src, width, height, alt };
  }

  return resolveImageKit(src, alt);
}
