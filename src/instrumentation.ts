import { loadSentry } from "@/lib/sentry";

const isSentryEnabled = process.env.SENTRY_ENABLED === "true";

export async function register() {
  if (!isSentryEnabled) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initSentry } = await import("../sentry.server.config");
    await initSentry();
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const { initSentry } = await import("../sentry.edge.config");
    await initSentry();
  }
}

export const onRequestError = async (...args: unknown[]) => {
  const Sentry = await loadSentry();
  return Sentry?.captureRequestError?.(...args);
};
