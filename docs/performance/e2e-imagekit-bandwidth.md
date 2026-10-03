# E2E ImageKit bandwidth

Routine Playwright runs fulfill `*.imagekit.io` responses locally. Generated `src` and `srcSet` values stay on `https://ik.imagekit.io/akomapa`. One CI check still downloads two team portraits and the mobile immersion video.

Production paths, filenames, and the ImageKit loader are unchanged. `scripts/lighthouse.mjs` launches Chrome outside Playwright, so a Lighthouse run still downloads production media.

## September 2026 context

ImageKit's invoice for 1 Sep–1 Oct 2026 was the Lite plan plus 70 GB of bandwidth overage. Usage analytics for that period, captured 1 Oct 2026, showed 110.40 GB and 678.16K requests. The referrer view attributed 90.7 GB and 634.0K requests to `127.0.0.1`, and 13.5 GB and 12.5K requests to `akomapa.org`. Referrer identifies the requesting page, not which machine or workflow issued it.

GitHub Actions in that window, from `gh run list` on 3 Oct 2026:

| Workflow | Runs | `pull_request` | `push` |
| --- | ---: | ---: | ---: |
| CI (`345215953`) | 65 | 42 | 23 |
| Lint, typecheck, build, and E2E (`207384218`) | 65 | 42 | 23 |

Both workflows had the same daily counts: 3 Sep 4, 4 Sep 16, 7 Sep 2, 8 Sep 5, 9 Sep 5, 10 Sep 5, 11 Sep 8, 12 Sep 1, 13 Sep 2, 14 Sep 3, 18 Sep 2, 21 Sep 3, 25 Sep 2, 28 Sep 5, 29 Sep 2. The CI history returned for this query starts on 29 Aug 2026, and the E2E history in the same page starts on 12 Mar 2026, so the September counts are inside the returned pages.

ImageKit's daily series is not in this repository. These run dates cannot be matched to bandwidth spikes, and they do not show how much of the 90.7 GB was CI versus local browsing. The invoice estimate that removing all localhost-referrer delivery would have left about 19.7 GB is still a counterfactual, not a result of this change.

## Representative sample before isolation

One Chromium pass on 3 Oct 2026 against a local production build at `http://127.0.0.1:3099`. Each route was opened once, then scrolled in 600px steps. Bytes are the sum of `content-length` response headers. Every response in this pass had that header.

| Route | Viewport | ImageKit responses | `content-length` bytes |
| --- | --- | ---: | ---: |
| `/` | 1440×900 | 2 | 181,484 |
| `/about/team` | 1440×900 | 35 | 146,532 |
| `/community-hubs/ucc` | 1440×900 | 12 | 333,080 |
| `/global-health-immersion-program` | 390×844 | 9 | 13,737,078 |
| Total |  | 58 | 14,398,174 |

The immersion response was `GET /akomapa/immersion-hero.mp4?tr=q-60,w-960`, HTTP 206, `video/webm`, `content-length` 13,352,800. That header is 92.7% of the sample total above. This pass did not request `w-1920`.

The team route did not request `darren_markwei.HEIC`. Stepped scrolling did not load every lazy image, so this table is one observed pass, not an inventory of every asset on those pages and not a full-suite total.

## Routine suite after isolation

`npm run test:e2e` on 3 Oct 2026: 835 passed, 2 skipped, 0 failed, 3.1 minutes. The run log `test-results/imagekit-account.log` recorded 5,650 local fixture responses and 0 production ImageKit responses. A response without the fixture header fails the test.

That is the observed delivery count for this run. It is not a measured byte saving, and it should not be multiplied into a September forecast.

## Real-media check

`npm run test:e2e:real-media` on 3 Oct 2026, one passing run, no retry. Playwright routing disables the HTTP cache, so these are network responses. Other ImageKit URLs on the same pages were fulfilled locally.

| Request | Status | Type | `content-length` bytes |
| --- | ---: | --- | ---: |
| `jade_kissi.heif?tr=f-auto,q-75,w-48` | 200 | `image/webp` | 1,252 |
| `jade_kissi.heif?tr=f-auto,q-75,w-256` | 200 | `image/webp` | 15,454 |
| `darren_markwei.HEIC?tr=f-auto,q-75,w-256` | 200 | `image/webp` | 8,636 |
| `immersion-hero.mp4?tr=q-60,w-960` | 206 | `video/webm` | 13,352,800 |

Sum of those `content-length` values: 13,378,142 bytes. The video `content-range` was `bytes 0-13352799/13352800`, so that 206 response carried the whole object. The desktop `w-1920` URL was present on the `<source>` element and was not requested from ImageKit. Both portraits decoded with `naturalWidth > 0`. The video reached `videoWidth > 0` and `videoHeight > 0`, then playback was stopped and the page was closed.

The project retries once. A failed attempt can download these objects again. This run did not retry.

CI runs this command only in `.github/workflows/ci.yml`, after the isolated suite, for `main` and `dev`. `.github/workflows/e2e-tests.yml` runs the isolated suite and does not run the CDN check, including on `develop`.

## After rollout

Compare the next full ImageKit billing period with September's 110.40 GB, the 90.7 GB localhost-referrer share, and the 13.5 GB `akomapa.org` share. Local development and Lighthouse still use the production CDN. Revisit a move to Cloudflare R2 or Bunny only after visitor bandwidth is separated from that remaining non-production traffic.
