import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import {
  createInMemoryRateLimiter,
  readSecureJson,
} from "@/lib/http/public-api-security";

function request(body: string, headers: Record<string, string> = {}) {
  return new NextRequest("https://akomapa.org/api/example", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Origin: "https://akomapa.org",
      ...headers,
    },
  });
}

describe("public API request security", () => {
  it("accepts bounded same-origin JSON", async () => {
    const result = await readSecureJson(request('{"ok":true}'), 64);
    expect(result).toEqual({ ok: true, body: { ok: true } });
  });

  it.each([
    ["cross-origin", { Origin: "https://attacker.example" }, 403],
    ["missing origin", { Origin: "" }, 403],
    ["unsupported media type", { "Content-Type": "text/plain" }, 415],
    ["lookalike media type", { "Content-Type": "application/json-patch+json" }, 415],
  ])("rejects %s requests", async (_label, headers, status) => {
    const result = await readSecureJson(request("{}", headers), 64);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(status);
      expect(result.response.headers.get("cache-control")).toBe("no-store");
    }
  });

  it("measures UTF-8 bytes instead of JavaScript characters", async () => {
    const result = await readSecureJson(request(JSON.stringify({ value: "💚💚" })), 16);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.response.status).toBe(413);
  });

  it("bounds rate-limit state and resets after the window", () => {
    const limiter = createInMemoryRateLimiter({
      maxEntries: 2,
      maxRequests: 2,
      windowMs: 1_000,
    });
    expect(limiter.isLimited("a", 0)).toBe(false);
    expect(limiter.isLimited("a", 1)).toBe(false);
    expect(limiter.isLimited("a", 2)).toBe(true);
    expect(limiter.isLimited("a", 1_001)).toBe(false);
  });
});
