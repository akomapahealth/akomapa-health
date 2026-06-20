import { loadSentry } from "@/lib/sentry";

void loadSentry().then((Sentry) => {
  Sentry?.init?.({
    dsn:
      process.env.NEXT_PUBLIC_SENTRY_DSN ||
      "https://0642fc20ef5cf0282a9b63cfd47ed24e@o4510806105915392.ingest.us.sentry.io/4510806113189888",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1,
    enableLogs: true,
    sendDefaultPii: true,
  });
});
