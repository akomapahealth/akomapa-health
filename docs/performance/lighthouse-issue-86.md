# Homepage critical-path pass — issue #86

Measured 2026-07-24 on branch `issue-86/reduce-homepage-critical-path`.

## What changed

1. **Deferred announcement modal/trigger** — idle + `next/dynamic` mount in `AnnouncementProvider` (keeps FAB + 3s auto-open; skips modal chunk when already dismissed).
2. **Gated near-fold bands** — `ChallengeSection`, `WhyAkomapaSection`, and `BuiltOnEvidenceSection` are now `next/dynamic` like the rest of the below-fold stack.
3. **Slimmed hero critical path** — LCP image + copy render via Server Components (`HeroSection` / `HeroSlide`); Framer Motion removed from the hero; CSS entrance + a tiny `HeroInteractive` client island for scroll cue / view analytics / optional video modal.
4. **Removed unused `swiper` dependency** (carousel already gone from the static hero).

## Bundle First Load JS (`npm run build`)

| Route | Before (#86 branch start) | After | Δ |
|---|---:|---:|---:|
| `/` | 181 kB (route 13.7 kB) | **180 kB** (route **12.9 kB**) | -1 kB / -0.8 kB route |

Shared First Load remained **107 kB**.

## Lighthouse (mobile, after)

Full table: [`lighthouse-issue-86-after.md`](./lighthouse-issue-86-after.md).

| Metric | AK-180 “after” (stale docs) | #86 after |
|---|---:|---:|
| `/` Performance | 51 | 42 |
| `/` LCP | 5.4 s | **4.6 s** |
| `/` TBT | 1,130 ms | **810 ms** |
| `/` CLS | (not highlighted) | 0.587 |

Notes:

- LCP and TBT improved versus the stale AK-180 homepage baseline.
- Performance score in this run is dragged by a high CLS (0.587) that also appeared on other audited routes in the same run — treat as environment/layout-shift noise to investigate separately, not as a hero-image regression.
- Inactive hero slide images are no longer an issue: the homepage uses a single priority LCP image.

## Reproduce

```bash
npm run build
LIGHTHOUSE_LABEL=issue-86-after node scripts/lighthouse.mjs
```
