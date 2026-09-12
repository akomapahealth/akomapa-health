import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/newsletter/route";
import { getMailerLiteClient, upsertSubscriber } from "@/lib/mailerlite";
import { resetNewsletterRateLimitForTests } from "@/lib/newsletter/security";

vi.mock("@/lib/mailerlite", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/mailerlite")>();
  return {
    ...actual,
    getMailerLiteClient: vi.fn(),
    upsertSubscriber: vi.fn(),
  };
});

function request(
  body: unknown,
  headers: Record<string, string> = {},
  rawBody = JSON.stringify(body),
) {
  return new NextRequest("https://akomapa.org/api/newsletter", {
    method: "POST",
    body: rawBody,
    headers: {
      "Content-Type": "application/json",
      Origin: "https://akomapa.org",
      "x-real-ip": "192.0.2.20",
      ...headers,
    },
  });
}

describe("newsletter route security", () => {
  beforeEach(() => {
    resetNewsletterRateLimitForTests();
    vi.mocked(getMailerLiteClient).mockResolvedValue({} as never);
    vi.mocked(upsertSubscriber).mockResolvedValue({
      status: 200,
      data: {
        data: { id: "subscriber-1", email: "person@example.com", status: "active" },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("accepts valid submissions without echoing personal data", async () => {
    const response = await POST(request({ email: "person@example.com" }));
    const body = await response.json();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(JSON.stringify(body)).not.toContain("person@example.com");
  });

  it.each([
    [request({ email: "person@example.com" }, { Origin: "https://attacker.example" }), 403],
    [request({ email: "person@example.com" }, { "Content-Type": "text/plain" }), 415],
    [request({}, {}, "x".repeat(2_049)), 413],
  ])("rejects unsafe requests", async (unsafeRequest, status) => {
    const response = await POST(unsafeRequest);
    expect(response.status).toBe(status);
    expect(upsertSubscriber).not.toHaveBeenCalled();
  });

  it("rate limits repeated submissions before provider calls", async () => {
    const responses = [];
    for (let index = 0; index < 6; index += 1) {
      responses.push(await POST(request({ email: `person${index}@example.com` })));
    }
    expect(responses.at(-1)?.status).toBe(429);
    expect(responses.at(-1)?.headers.get("retry-after")).toBe("600");
    expect(upsertSubscriber).toHaveBeenCalledTimes(5);
  });

  it("does not expose provider errors", async () => {
    vi.mocked(upsertSubscriber).mockRejectedValue({
      status: 401,
      response: { data: { apiKey: "provider-secret", detail: "upstream detail" } },
    });
    const response = await POST(request({ email: "person@example.com" }));
    const body = await response.text();
    expect(response.status).toBe(503);
    expect(body).not.toContain("provider-secret");
    expect(body).not.toContain("upstream detail");
  });
});
