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
