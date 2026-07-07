# Sentry Privacy And Noise Controls

This project uses Sentry for deployed error monitoring while keeping local
development quiet by default. The shared configuration lives in
`src/lib/sentry-config.ts` and is used by the browser, server, and edge runtime
initializers.

## Enablement

Local development does not emit Sentry events unless explicitly enabled:

```bash
SENTRY_ENABLED=true NEXT_PUBLIC_SENTRY_ENABLED=true npm run dev
```

Preview and production builds are enabled by default. To disable Sentry in a
deployed environment, set the matching flag to `false`:

```bash
SENTRY_ENABLED=false
NEXT_PUBLIC_SENTRY_ENABLED=false
```

## Environment And Release Metadata

Sentry environments resolve in this order:

1. `SENTRY_ENVIRONMENT` or `NEXT_PUBLIC_SENTRY_ENVIRONMENT`
2. `VERCEL_ENV` (`production` or `preview`)
3. `NODE_ENV=production`
4. `development`

Sentry releases resolve in this order:

1. `SENTRY_RELEASE`
2. `NEXT_PUBLIC_SENTRY_RELEASE`
3. `VERCEL_GIT_COMMIT_SHA`
4. `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA`

`next.config.ts` injects public environment and release values at build time so
browser, server, and edge events can be separated in Sentry.

## Privacy Defaults

Default PII collection is disabled with `sendDefaultPii: false` in every
runtime. Re-enable it only after documenting a product requirement and the
fields that must be collected.

Session Replay is configured to protect page content by default:

- `maskAllText: true`
- `maskAllInputs: true`
- `blockAllMedia: true`
- `replaysSessionSampleRate: 0.0`
- `replaysOnErrorSampleRate: 1.0`

## Event Scrubbing

`beforeSend` removes sensitive data before events leave the app:

- user email, username, and IP address
- cookies and request bodies
- form bodies and Server Action payloads
- `$ACTION_*`, `Next-Action`, and related Server Action references
- authorization, cookie, forwarding, IP, proxy, webhook, Stripe, and API-key
  headers
- common proxy/client IP headers and request environment fields
- nested sensitive fields in extras, contexts, and breadcrumb data

Donation, contact, volunteer application, and notification routes may receive
PII. Do not attach raw request bodies, form data, or upstream payloads to Sentry
events from those routes.

## Noise Filtering

Known third-party and local-development signatures are filtered narrowly:

- local `.next/vendor-chunks/@sentry.js` build/dev collisions
- local webpack `undefined.call` collisions
- local Fast Refresh generic `Event` rejections
- Instagram Android in-app-browser native bridge errors from
  `app://navigation_performance_logger_android`
- `Object Not Found Matching Id` only when the event has no application frame

The browser SDK also uses Sentry's first-party bundle metadata with the
application key `akomapa-web` and drops errors whose stack frames are
exclusively third-party.

Hydration errors are not broadly filtered. They are tagged with
`error.category=hydration`, receive hydration context, and use a stable
fingerprint so recurrence stays observable.

## Troubleshooting

To intentionally test Sentry locally:

1. Run `nvm use 22`.
2. Set `SENTRY_ENABLED=true` and `NEXT_PUBLIC_SENTRY_ENABLED=true`.
3. Confirm `NEXT_PUBLIC_SENTRY_DSN` is available.
4. Start the app and visit `/sentry-example-page`.
5. Trigger the sample frontend/API error and confirm it appears in the expected
   Sentry environment.

If events are missing in preview or production, check the Sentry DSN, Vercel
environment variables, and whether `SENTRY_ENABLED=false` or
`NEXT_PUBLIC_SENTRY_ENABLED=false` was set.

## Issue Closure Guidance

The following historical events can be closed as local-development noise:

- `7565273432`
- `7565273322`
- `7565273344`

The following historical events can be closed as third-party/native-bridge
noise:

- `7542158663`
- `7540993818`

Keep `7471787783` open or monitored as hydration-related application signal.
