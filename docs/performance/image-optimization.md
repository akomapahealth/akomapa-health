# Image optimization strategy (#99)

## Decision

| Asset class | Primary optimizer | Mechanism |
| --- | --- | --- |
| ImageKit CDN paths (relative, e.g. `/highlights/…`) | **ImageKit** | Custom `imageKitLoader` on `@/components/common/Image` |
| Absolute `*.imagekit.io` URLs | **ImageKit** | Same custom loader (applies/replaces `tr=f-auto,q-,w-`) |
| Local / `public/` and non-ImageKit remotes (e.g. YouTube thumbs) | **Next `/_next/image`** | Default `next/image` loader |

ImageKit is the primary optimizer for CDN assets. A custom `next/image` loader
makes Next emit `src` / `srcSet` pointing at ImageKit URLs; the browser fetches
those URLs directly. Next does **not** re-proxy them through `/_next/image`, so
there is no double optimization for the ImageKit path.

The loader explicitly requests `f-auto`. This lets ImageKit transcode source
assets such as HEIF and HEIC into a format supported by the requesting browser,
while retaining responsive width and quality transformations.

Do **not** set blanket `unoptimized` on the shared Image wrapper — that would
disable Next optimization for any non-ImageKit usage of `next/image` patterns
we rely on elsewhere (local logos, etc.).

## Code pointers

- [`src/components/common/Image.tsx`](../../src/components/common/Image.tsx) — loader selection via `isImageKitSrc`
- [`src/lib/imagekit.ts`](../../src/lib/imagekit.ts) — `getImageKitUrl`, `imageKitLoader`
- [`src/app/api/dev-imagekit/route.ts`](../../src/app/api/dev-imagekit/route.ts) — local fixtures for `next dev`
- [`src/components/immersion/ImmersionHeroMedia.tsx`](../../src/components/immersion/ImmersionHeroMedia.tsx) — hero video sources and transforms
- [`next.config.ts`](../../next.config.ts) — `images.remotePatterns` allowlist (ImageKit + YouTube)

Local `public/` assets should use `next/image` directly, not the common Image
wrapper (relative paths on the wrapper are treated as ImageKit CDN paths).

## LCP heroes

Homepage and marketing LCP images that use `@/components/common/Image` with
`priority` and `sizes` rely on ImageKit `tr=f-auto,q-,w-` for compatible output
and byte size. Keep those props accurate so the loader requests an appropriate
width.

## Local development and Lighthouse

`next dev` points generated ImageKit `src` values at [`/api/dev-imagekit`](../../src/app/api/dev-imagekit/route.ts). That route returns tiny local PNG/MP4 fixtures and does not fetch ImageKit. Production builds are unchanged. Opt out with `NEXT_PUBLIC_IMAGEKIT_DEV_FIXTURES=0`.

`scripts/lighthouse.mjs` intercepts `*.imagekit.io` in the audited Chrome session by default. Use `LIGHTHOUSE_IMAGEKIT_FIXTURES=0` only when the audit must measure real CDN bytes.

## Immersion hero video

The decorative hero on `/global-health-immersion-program` keeps `immersion-hero.mp4` at the same ImageKit path. It attaches `<source>` elements after the hero is in view, uses `preload="metadata"`, and requests `w-960` below 768px and `w-1280` otherwise (`q-60`). Autoplay, loop, and muted playback are unchanged. Reduced-motion visitors still get the static poster.

## How to verify

1. `npm run build && npm run start`
2. Open `/` (or another page with ImageKit heroes) in DevTools → Network → Img
3. Confirm ImageKit assets request `https://ik.imagekit.io/...?tr=f-auto,q-*,w-*` (not `/_next/image?...`)
4. Confirm local logos (e.g. brand marks from `public/`) request `/_next/image?...`

Collaborator validation (2026-07-05) already observed direct ImageKit URLs for
homepage CDN assets and `/_next/image` for local logos.
