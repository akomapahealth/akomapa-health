import { loadSentry } from "@/lib/sentry";

export const dynamic = "force-dynamic";

class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}

// A faulty API route to test Sentry's error monitoring
export async function GET() {
  const Sentry = await loadSentry();
  Sentry?.logger?.info("Sentry example API called");

  throw new SentryExampleAPIError(
    "This error is raised on the backend called by the example page.",
  );
}
