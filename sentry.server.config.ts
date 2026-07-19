import { getSentryBaseOptions } from "@/lib/sentry-config";
import { loadSentry } from "@/lib/sentry";

export async function initSentry() {
  const Sentry = await loadSentry();
  Sentry?.init?.(getSentryBaseOptions());
}
