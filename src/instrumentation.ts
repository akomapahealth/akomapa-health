import type { Instrumentation } from "next";

import { isSentryEnabled, loadSentry } from "@/lib/sentry";
import { isKnownDonateRouterStateSkewError } from "@/lib/sentry-config";

export async function register() {
  if (!isSentryEnabled()) return;

  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initSentry } = await import("../sentry.server.config");
    await initSentry();
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const { initSentry } = await import("../sentry.edge.config");
    await initSentry();
  }
}

export const onRequestError: Instrumentation.onRequestError = async (
  error,
  request,
  context
) => {
  const Sentry = await loadSentry();
  if (!Sentry) return;

  if (isKnownDonateRouterStateSkewError(error, request, context)) {
    Sentry.logger?.info("Filtered known Next.js router-state version skew", {
      "error.category": "next_router_state_version_skew",
      "next.error_code": "E10",
      "request.route": "/(main)/donate/page",
      "telemetry.filtered": true,
    });
    return;
  }

  Sentry.captureRequestError?.(error, request, context);
};
