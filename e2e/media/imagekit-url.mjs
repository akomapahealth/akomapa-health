/**
 * Pure ImageKit URL checks shared by Playwright isolation and node tests.
 * Host matching follows src/lib/imagekit.ts.
 */

export function isImageKitHostname(hostname) {
  return hostname === "imagekit.io" || hostname.endsWith(".imagekit.io");
}

export function isImageKitRequestUrl(url) {
  try {
    return isImageKitHostname(new URL(url).hostname);
  } catch {
    return false;
  }
}

export function isVideoRequestUrl(url) {
  try {
    return /\.(mp4|webm|mov|m4v)$/i.test(new URL(url).pathname);
  } catch {
    return false;
  }
}

/**
 * CDN requests the focused real-media check is allowed to continue.
 * The desktop immersion variant is intentionally absent.
 */
export function isRealMediaCdnRequest(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return false;
  }
  if (!isImageKitHostname(parsed.hostname)) return false;

  if (/\/images\/team\/jade_kissi\.heif$/i.test(parsed.pathname)) return true;
  if (/\/images\/team\/darren_markwei\.heic$/i.test(parsed.pathname)) return true;

  const transform = parsed.searchParams.get("tr") ?? "";
  return (
    /\/immersion-hero\.mp4$/i.test(parsed.pathname) &&
    /(?:^|,)w-960(?:,|$)/.test(transform)
  );
}

/**
 * Resolve a rendered <img>/<source> src that may be:
 * - an absolute ImageKit CDN URL (production), or
 * - a same-origin `/api/dev-imagekit?src=<encoded CDN URL>` fixture rewrite.
 *
 * @param {string} src
 * @param {string} [base]
 * @returns {URL}
 */
export function resolveRenderedImageKitUrl(src, base = "http://127.0.0.1") {
  const absolute = new URL(src, base);
  if (absolute.pathname === "/api/dev-imagekit" || absolute.pathname.endsWith("/api/dev-imagekit")) {
    const nested = absolute.searchParams.get("src");
    if (!nested) {
      throw new Error(`dev-imagekit src missing nested CDN URL: ${src}`);
    }
    return new URL(nested);
  }
  return absolute;
}
