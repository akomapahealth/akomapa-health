# Image optimization strategy (#99)

## Decision

| Asset class | Primary optimizer | Mechanism |
| --- | --- | --- |
| ImageKit CDN paths (relative, e.g. `/highlights/…`) | **ImageKit** | Custom `imageKitLoader` on `@/components/common/Image` |
| Absolute `*.imagekit.io` URLs | **ImageKit** | Same custom loader (applies/replaces `tr=w-,q-`) |
| Local / `public/` and non-ImageKit remotes (e.g. YouTube thumbs) | **Next `/_next/image`** | Default `next/image` loader |

ImageKit is the primary optimizer for CDN assets. A custom `next/image` loader
makes Next emit `src` / `srcSet` pointing at ImageKit URLs; the browser fetches
those URLs directly. Next does **not** re-proxy them through `/_next/image`, so
there is no double optimization for the ImageKit path.

Do **not** set blanket `unoptimized` on the shared Image wrapper — that would
disable Next optimization for any non-ImageKit usage of `next/image` patterns
we rely on elsewhere (local logos, etc.).

## Code pointers

- [`src/components/common/Image.tsx`](../../src/components/common/Image.tsx) — loader selection via `isImageKitSrc`
- [`src/lib/imagekit.ts`](../../src/lib/imagekit.ts) — `getImageKitUrl`, `imageKitLoader`
- [`next.config.ts`](../../next.config.ts) — `images.remotePatterns` allowlist (ImageKit + YouTube)

Local `public/` assets should use `next/image` directly, not the common Image
wrapper (relative paths on the wrapper are treated as ImageKit CDN paths).

## LCP heroes

Homepage and marketing LCP images that use `@/components/common/Image` with
`priority` and `sizes` rely on ImageKit `tr=w-,q-` for byte size. Keep those
props accurate so the loader requests an appropriate width.

## How to verify

1. `npm run build && npm run start`
2. Open `/` (or another page with ImageKit heroes) in DevTools → Network → Img
3. Confirm ImageKit assets request `https://ik.imagekit.io/...?tr=q-*,w-*` (not `/_next/image?...`)
4. Confirm local logos (e.g. brand marks from `public/`) request `/_next/image?...`

Collaborator validation (2026-07-05) already observed direct ImageKit URLs for
homepage CDN assets and `/_next/image` for local logos.
