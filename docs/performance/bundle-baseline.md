# Bundle baseline — AK-180 QA pass

Captured from `npm run build` on the QA branch before any optimization.

## Shared chunks

```
+ First Load JS shared by all                               226 kB
  ├ chunks/4bd1b696-*.js                                    54.4 kB
  ├ chunks/52774a7f-*.js                                    37.7 kB
  ├ chunks/9744-*.js                                         131 kB   <- largest shared chunk
  └ other shared chunks (total)                              3.12 kB
```

## Top routes by First Load JS (before)

| Route | Page Size | First Load JS |
|---|---:|---:|
| `/research/[slug]` | 114 kB | **389 kB** |
| `/` (homepage) | 60.9 kB | **362 kB** |
| `/resources` | 7.22 kB | 315 kB |
| `/contact` | 7.12 kB | 310 kB |
| `/partner` | 15.9 kB | 308 kB |
| `/about/team` | 11.7 kB | 307 kB |
| `/clinics/akomapa-ucc` | 12 kB | 296 kB |
| `/clinics/akomapa-nhp` | 10.9 kB | 295 kB |
| `/news` | 4.91 kB | 294 kB |
| `/news/[id]` | 5.11 kB | 294 kB |
| `/clinics/akomapa-ug` | 12.2 kB | 293 kB |
| `/programs/akomapa-ghltp` | 11.6 kB | 292 kB |
| `/programs` | 11 kB | 292 kB |
| `/clinics` | 9.92 kB | 291 kB |

## How to refresh

```bash
npm run build                # baseline numbers in console output
ANALYZE=true npm run build   # opens visual treemap of every chunk
```

`ANALYZE=true` writes `.next/analyze/{client,nodejs,edge}.html` you can open in
a browser to drill into individual modules — used to identify the biggest
client-side wins for the QA pass (Swiper, Framer Motion, Stripe.js, Lottie).

## Targets for the QA pass

The two highest-impact routes — `/research/[slug]` (389 kB) and `/` (362 kB) —
both bundle Swiper + Framer Motion + a pile of below-the-fold sections that
hydrate on every visit. The optimizations in section 3c of the plan target the
homepage's First Load JS specifically.
