import { afterEach, describe, expect, it, vi } from "vitest";

import { GET } from "@/app/api/sentry-example-api/route";
import { loadSentry } from "@/lib/sentry";

vi.mock("@/lib/sentry", () => ({ loadSentry: vi.fn() }));

describe("Sentry example API", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("is not publicly triggerable in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const response = await GET();
    expect(response.status).toBe(404);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(loadSentry).not.toHaveBeenCalled();
  });
});
