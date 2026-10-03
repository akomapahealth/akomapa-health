/**
 * Tiny valid image/video bytes for local development, Lighthouse, and E2E.
 * These are never a proxy to ImageKit — callers must not fetch the CDN URL.
 */

export const MEDIA_FIXTURE_HEADER = "x-akomapa-media-fixture";
export const DEV_IMAGEKIT_FIXTURE_PATH = "/api/dev-imagekit";

/** 1×1 PNG. Layout boxes come from CSS, not intrinsic image size. */
export const TINY_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

/** One black 16×16 H.264 frame, generated locally. Valid for Chromium decode. */
export const TINY_MP4 = Buffer.from(
  "AAAAHGZ0eXBtcDQyAAAAAWlzb21tcDQxbXA0MgAAAAFtZGF0AAAAAAAAAIUAAAA7BgUyR1ZK3FxMQz+U78URPNFDqAEAAAMAAQMAAAMAAQIAAeYACwAAAwAAAwAAAwA8DAOJHQEN/////4AAAAAyJbggH94I5Uz/gswem1JEAFF721iPegoZHua5g6fVtrKB82GsqGNvqOenAAA2gBXDPRgAAAKnbW9vdgAAAGxtdmhkAAAAAObmSAzm5kgMAAACWAAAABQAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAjN0cmFrAAAAXHRraGQAAAAB5uZIDObmSAwAAAABAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAABAAAAAQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAAUAAAAAAABAAAAAAGrbWRpYQAAACBtZGhkAAAAAObmSAzm5kgMAAACWAAAAChVxAAAAAAAMWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABDb3JlIE1lZGlhIFZpZGVvAAAAAVJtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAESc3RibAAAAKFzdHNkAAAAAAAAAAEAAACRYXZjMQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAQABAASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAACdhdmNDAWQAC//hAAwnZAALrFZQw3gWYKUBAAQo7jyw/fj4AAAAAApmaWVsAQAAAAAKY2hybQAAAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAAoAAAADXNkdHAAAAAAIAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAB1AAAAAQAAABRzdGNvAAAAAAAAAAEAAAAs",
  "base64",
);

export function isImageKitHostname(hostname) {
  return hostname === "imagekit.io" || hostname.endsWith(".imagekit.io");
}

export function isVideoAssetUrl(url) {
  try {
    return /\.(mp4|webm|mov|m4v)$/i.test(new URL(url).pathname);
  } catch {
    return false;
  }
}

export function shouldUseDevImageKitFixtures() {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.NEXT_PUBLIC_IMAGEKIT_DEV_FIXTURES !== "0"
  );
}

export function bytesForRange(body, rangeHeader) {
  if (!rangeHeader) return { status: 200, body };

  const match = /^bytes=(\d+)-(\d*)$/.exec(rangeHeader);
  if (!match) return { status: 200, body };

  const start = Number(match[1]);
  const requestedEnd = match[2] ? Number(match[2]) : body.length - 1;
  const end = Math.min(requestedEnd, body.length - 1);
  if (!Number.isInteger(start) || start < 0 || start > end) {
    return { status: 200, body };
  }

  return {
    status: 206,
    body: Buffer.from(body.subarray(start, end + 1)),
    contentRange: `bytes ${start}-${end}/${body.length}`,
  };
}

export function localMediaFixture(url, rangeHeader) {
  const video = isVideoAssetUrl(url);
  const payload = video ? TINY_MP4 : TINY_PNG;
  const ranged = video ? bytesForRange(payload, rangeHeader) : { status: 200, body: payload };
  return {
    ...ranged,
    contentType: video ? "video/mp4" : "image/png",
    acceptRanges: video ? "bytes" : "none",
  };
}
