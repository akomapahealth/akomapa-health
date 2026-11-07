import { getImageKitUrl } from "@/lib/imagekit";
import {
  IMMERSION_HERO_DESKTOP_VIDEO_WIDTH,
  IMMERSION_HERO_MOBILE_VIDEO_WIDTH,
  IMMERSION_HERO_VIDEO_QUALITY,
} from "@/components/immersion/immersion-hero-video-shared";

export {
  IMMERSION_HERO_DESKTOP_VIDEO_WIDTH,
  IMMERSION_HERO_MOBILE_MEDIA_QUERY,
  IMMERSION_HERO_MOBILE_VIDEO_WIDTH,
  IMMERSION_HERO_VIDEO_QUALITY,
} from "@/components/immersion/immersion-hero-video-shared";

/**
 * Resolve immersion hero video URLs on the server (or at build time).
 * Do not call this from client components — Next cannot reliably inline the
 * ImageKit fixture flag into every client graph, and client-only resolution
 * previously rewrote CDN URLs to `/api/dev-imagekit` in real-media CI.
 */
export function resolveImmersionHeroVideoSrcs(videoSrc: string): {
  mobileVideoSrc: string;
  desktopVideoSrc: string;
} {
  return {
    mobileVideoSrc: getImageKitUrl(videoSrc, {
      width: IMMERSION_HERO_MOBILE_VIDEO_WIDTH,
      quality: IMMERSION_HERO_VIDEO_QUALITY,
    }),
    desktopVideoSrc: getImageKitUrl(videoSrc, {
      width: IMMERSION_HERO_DESKTOP_VIDEO_WIDTH,
      quality: IMMERSION_HERO_VIDEO_QUALITY,
    }),
  };
}
