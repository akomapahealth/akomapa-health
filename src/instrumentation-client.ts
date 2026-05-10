// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    "https://0642fc20ef5cf0282a9b63cfd47ed24e@o4510806105915392.ingest.us.sentry.io/4510806113189888",

  // Sample 10% of transactions in production; capture replays only on errors to avoid performance regressions.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.0,

  enableLogs: true,
  sendDefaultPii: true,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
