# Cookie Consent And Analytics Gating

The site asks first-time visitors whether optional cookies may be used, and
loads Google Analytics only after they accept. Everything else the site stores
in the browser is strictly necessary. The public explanation lives at
[`/cookie-policy`](../../src/app/(main)/cookie-policy/Content.tsx), and the
Privacy Policy links to it.

## How It Fits Together

| Piece | Location | Role |
| --- | --- | --- |
| Consent store | `src/lib/consent.ts` | Versioned, expiring record in localStorage (`akomapa-cookie-consent`), validated with zod. Falls back to memory for the current page when storage is blocked. |
| Provider | `src/components/consent/ConsentProvider.tsx` | Reads the record after hydration (`status: "unknown"` on the server, so the banner never flashes), exposes `useCookieConsent()`, and owns the settings dialog. |
| Banner | `src/components/consent/CookieBanner.tsx` | Non-modal region rendered first in the DOM, with equally styled **Accept optional cookies** and **Reject optional cookies** buttons. It swaps to a focused confirmation after a choice made on that page. |
| Settings | `CookieSettingsDialog.tsx`, `CookieSettingsButton.tsx` | Radix dialog for revisiting or withdrawing the choice, opened from the banner, the footer, and the Cookie Policy. |
| GA loader | `src/components/consent/ConsentedAnalytics.tsx` | Renders `@next/third-parties` `<GoogleAnalytics>` only after acceptance. |
| Event backstop | `src/lib/analytics.ts` | `trackEvent()` no-ops without analytics consent. |
| Inventory | `src/config/cookies.ts` | Every cookie and storage key, rendered by the Cookie Policy. |

## Google Analytics Behaviour

This follows Google's "basic" consent mode: the Google tag is blocked until the
visitor grants consent
([Google guide](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic)).

- **Before a choice, or after rejection.** No gtag.js request, no page view, no
  `_ga` cookies. Nothing GA-related appears in the server HTML.
- **On acceptance.** `grantAnalyticsConsent()` queues
  `gtag('consent', 'default', …)` with `analytics_storage: 'granted'` and every
  `ad_*` signal `'denied'`. Then `<GoogleAnalytics>` loads gtag.js and sends
  `config`.
- **On withdrawal.**
  - `revokeAnalyticsConsent()` sets Google's documented
    `window['ga-disable-<ID>'] = true` opt-out and pushes a denied consent
    update.
  - `clearAnalyticsCookies()` expires `_ga` and `_ga_<container-id>` on the
    host and on each parent domain.
  - The global click tracker unmounts.
- **Re-accepting in the same page load.** Sends a consent `update` rather than
  a second `default`.

The report-only CSP in `src/config/security-headers.ts` allows Google's
documented GA4 origins, so consented traffic is not reported as a violation.

## When Visitors Are Asked Again

A stored choice stops counting, and the banner returns, when:

1. `CONSENT_POLICY_VERSION` in `src/lib/consent.ts` changes, or
2. the choice is older than `CONSENT_MAX_AGE_MS` (12 months).

Bump the version only for **material** changes: a new optional purpose, a new
optional provider, or a changed use of optional data. Copy edits and new
necessary storage do not need a bump.

## Adding A Tracker Or Browser Storage

1. Add it to `src/config/cookies.ts` (or `thirdPartyServices`) with an accurate
   purpose and duration. Put new key names in `src/config/storage-keys.ts` so
   server pages can import them.
2. If it is not strictly necessary, gate it on `useCookieConsent().analytics`
   (or a new category) and bump `CONSENT_POLICY_VERSION`.
3. Update the Cookie Policy and Privacy Policy copy and their **Last updated**
   dates, and have the policy owner review the wording.
4. Add any new script, image, frame, or connect origins to the CSP.
   Third-party embeds (maps, players, forms) should load only when the
   visitor asks for them. `src/components/contact/LocationMap.tsx` is the
   reference: an offline placeholder, an explicit action that loads the frame
   and moves focus to it, and a plain link to the provider as an alternative.
5. Extend `src/config/__tests__/cookies.test.ts` and
   `e2e/cookie-consent.spec.ts`.

## Testing

- **Unit:**
  - `src/lib/__tests__/consent.test.ts`
  - `src/lib/__tests__/analytics.test.ts`
  - `src/components/consent/__tests__/*`
  - the Cookie Policy content test and the inventory parity test
- **E2E:** `e2e/cookie-consent.spec.ts` covers:
  - the first-visit banner
  - equal button weight
  - keyboard use
  - persistence
  - re-prompting
  - withdrawal
  - layouts from 320px to 200% zoom in both themes
  - Google network gating
- **Consent seeding in other specs.** Routine specs start with the banner
  already answered through the shared fixture (`e2e/media/playwright.ts`). Use
  `test.use({ cookieConsent: "unset" })` to see it.
- **GA network checks** need a build with `NEXT_PUBLIC_GA_MEASUREMENT_ID`. CI
  uses the sentinel `G-E2ETEST000`, and the spec stubs every Google endpoint.
  Run them locally with:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-E2ETEST000 npm run build
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-E2ETEST000 npx playwright test e2e/cookie-consent.spec.ts
```
