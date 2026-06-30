import { loadSentry } from "@/lib/sentry";

const isSentryEnabled = process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true";

if (isSentryEnabled) {
  void loadSentry().then((Sentry) => {
    if (!Sentry?.init || !Sentry.replayIntegration) return;

    Sentry.init({
      dsn:
        process.env.NEXT_PUBLIC_SENTRY_DSN ||
        "https://0642fc20ef5cf0282a9b63cfd47ed24e@o4510806105915392.ingest.us.sentry.io/4510806113189888",
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
  });
}

export function onRouterTransitionStart(...args: unknown[]) {
  if (!isSentryEnabled) return;

  void loadSentry().then((Sentry) => {
    Sentry?.captureRouterTransitionStart?.(...args);
  });
}
