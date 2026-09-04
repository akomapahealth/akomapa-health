import { loadSentry } from "@/lib/sentry";
import { noStoreJson } from "@/lib/http/public-api-security";

export const dynamic = "force-dynamic";

class SentryExampleAPIError extends Error {
  constructor(message: string | undefined) {
    super(message);
    this.name = "SentryExampleAPIError";
  }
}

// A faulty API route to test Sentry's error monitoring
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return noStoreJson({ error: "Not found" }, 404);
  }

  const Sentry = await loadSentry();
  Sentry?.logger?.info("Sentry example API called");

  throw new SentryExampleAPIError(
    "This error is raised on the backend called by the example page.",
  );
}
