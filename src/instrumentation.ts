import { loadSentry } from "@/lib/sentry";

const isSentryEnabled = process.env.SENTRY_ENABLED === "true";

export async function register() {
  if (!isSentryEnabled) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError = async (...args: unknown[]) => {
  const Sentry = await loadSentry();
  return Sentry?.captureRequestError?.(...args);
};
