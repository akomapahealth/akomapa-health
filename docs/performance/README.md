# Performance pass — AK-180

This directory captures the before/after measurements for the comprehensive QA,
performance, and stability pass.

## How to reproduce

```bash
# 1. Build a production bundle
npm run build

# 2. Capture baseline (or after) Lighthouse scores against the prod build.
#    The script boots `next start` on :3100, audits each route, and writes a
#    JSON per route plus a markdown summary table.
LIGHTHOUSE_LABEL=before node scripts/lighthouse.mjs
LIGHTHOUSE_LABEL=after  node scripts/lighthouse.mjs

# 3. (Optional) Open the bundle treemap to find heavy modules.
ANALYZE=true npm run build
# .next/analyze/{client,nodejs,edge}.html
```

## Lighthouse — before vs after (mobile profile, 4× CPU throttle)

| Route | Perf | LCP | TBT | A11y | BP | SEO |
|---|---|---|---|---|---|---|
| `/` | 49 → **51** | 5.6 s → **5.4 s** | 1,350 ms → **1,130 ms** | 94 → 94 | 73 → **77** | 91 → 91 |
| `/news` | 70 → **73** | 8.0 s → **7.3 s** | 270 ms → **190 ms** | 95 → 95 | 100 → 100 | 91 → 91 |
| `/about/team` | 51 → **58** | 9.3 s → **7.0 s** | 470 ms → 470 ms | 92 → 92 | 100 → 100 | 91 → 91 |
| `/programs` | 65 → **71** | 7.7 s → **6.1 s** | 410 ms → **290 ms** | 96 → 96 | 100 → 100 | 91 → 91 |
| `/programs/akomapa-ghltp` | 70 → 65 | 6.9 s → 6.7 s | 290 ms → 440 ms | 91 → 91 | 100 → 100 | 91 → 91 |

Net: every measured route except `/programs/akomapa-ghltp` (within run-to-run
noise) improved on Performance, LCP, or both. `/about/team` saw the largest
LCP win (-2.3 s), and the homepage Best Practices score went up because
the broken `dots-pattern.webp` 404 was eliminated.

## Bundle First Load JS — before vs after

| Route | Before | After | Δ |
|---|---:|---:|---:|
| `/` | 362 kB | **353 kB** | -9 kB |
| `/research/[slug]` | 389 kB | 389 kB | 0 |

The homepage drop comes from splitting `Testimonials`, `Gallery`,
`UpdatesFeed`, and `CallToAction` into their own dynamically-imported chunks
and from deferring `HeroVideoModal` (Radix Dialog + iframe wiring) until the
user actually clicks a video CTA. Full route table is in
[`bundle-baseline.md`](./bundle-baseline.md).

## Fixes applied

1. `src/components/home/HeroSlider.tsx` — `HeroVideoModal` is now loaded via
   `next/dynamic` with `ssr: false`. Saves Radix Dialog + iframe wiring from
   the initial hero hydration.
2. `src/app/(main)/page.tsx` — `Testimonials`, `Gallery`, `UpdatesFeed`,
   and `CallToAction` are now `next/dynamic` imports so the homepage's first
   load no longer ships their JS.
3. `src/components/home/NkwapaSection.tsx` — removed `loading="eager"` on the
   below-the-fold product screenshot; `next/image` now lazy-loads it
   normally.
4. `src/components/home/AkomapaMeaningSection.tsx` — fixed broken background
   pattern that was being routed through the ImageKit loader (404 against
   the CDN). Local `public/` assets now use `next/image` directly per the
   wrapper's documented contract in `src/components/common/Image.tsx`.
5. `src/app/not-found.tsx` — `lottie-react` is now a `next/dynamic` import,
   so its runtime is only paid when a 404 actually renders.
6. `next.config.ts` — added `@next/bundle-analyzer` (gated on
   `ANALYZE=true`).
