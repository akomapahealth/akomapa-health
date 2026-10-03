export const MEDIA_FIXTURE_HEADER: string;
export const DEV_IMAGEKIT_FIXTURE_PATH: string;
export const TINY_PNG: Buffer;
export const TINY_MP4: Buffer;
export function isImageKitHostname(hostname: string): boolean;
export function isVideoAssetUrl(url: string): boolean;
export function shouldUseDevImageKitFixtures(): boolean;
export function bytesForRange(
  body: Buffer,
  rangeHeader: string | undefined,
): { status: number; body: Buffer; contentRange?: string };
export function localMediaFixture(
  url: string,
  rangeHeader?: string,
): {
  status: number;
  body: Buffer;
  contentType: string;
  acceptRanges: string;
  contentRange?: string;
};
