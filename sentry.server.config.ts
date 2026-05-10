// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn:
    process.env.NEXT_PUBLIC_SENTRY_DSN ||
    "https://0642fc20ef5cf0282a9b63cfd47ed24e@o4510806105915392.ingest.us.sentry.io/4510806113189888",

  // Sample 10% of transactions in production to avoid performance regressions.
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,

  enableLogs: true,
  sendDefaultPii: true,
});
