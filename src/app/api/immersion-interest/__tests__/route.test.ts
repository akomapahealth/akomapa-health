import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const {
  getMailerLiteClientMock,
  getSubscriberByEmailMock,
  upsertSubscriberMock,
} = vi.hoisted(() => ({
  getMailerLiteClientMock: vi.fn(),
  getSubscriberByEmailMock: vi.fn(),
  upsertSubscriberMock: vi.fn(),
}));

vi.mock("@/lib/mailerlite", async () => {
  const actual = await vi.importActual<typeof import("@/lib/mailerlite")>(
    "@/lib/mailerlite",
  );
  return {
    ...actual,
    getMailerLiteClient: getMailerLiteClientMock,
    getSubscriberByEmail: getSubscriberByEmailMock,
    upsertSubscriber: upsertSubscriberMock,
  };
});

import { POST } from "@/app/api/immersion-interest/route";

function createValidBody(email = `${crypto.randomUUID()}@example.com`) {
  return {
    firstName: "Ama",
    email,
    interestAs: "undergraduate_premed" as const,
    consent: true as const,
    company: "",
  };
}

function createRequest(
  body: unknown,
  options: { origin?: string; ip?: string; contentType?: string } = {},
) {
  return new NextRequest("http://localhost/api/immersion-interest", {
    method: "POST",
    headers: {
      "Content-Type": options.contentType ?? "application/json",
      Origin: options.origin ?? "http://localhost",
      "x-real-ip": options.ip ?? crypto.randomUUID(),
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/immersion-interest", () => {
  beforeEach(() => {
    process.env.MAILERLITE_API_KEY = "test-mailerlite-key";
    process.env.MAILERLITE_IMMERSION_GROUP_ID = "group-123";
    getMailerLiteClientMock.mockResolvedValue({ subscribers: {} });
    getSubscriberByEmailMock.mockResolvedValue(null);
    upsertSubscriberMock.mockResolvedValue({
      status: 201,
      data: {
        data: {
          id: "1",
          email: "ama@example.com",
          status: "unconfirmed",
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    delete process.env.MAILERLITE_API_KEY;
    delete process.env.MAILERLITE_IMMERSION_GROUP_ID;
  });

  it("rejects unsupported content types", async () => {
    const response = await POST(
      createRequest(createValidBody(), { contentType: "text/plain" }),
    );
    expect(response.status).toBe(415);
  });

  it("rejects cross-origin requests", async () => {
    const response = await POST(
      createRequest(createValidBody(), { origin: "https://example.com" }),
    );
    expect(response.status).toBe(403);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("validates immersion alert details at the server boundary", async () => {
    const response = await POST(
      createRequest({ ...createValidBody(), email: "not-an-email" }),
    );
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid immersion alert details",
    });
    expect(upsertSubscriberMock).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies", async () => {
    const response = await POST(
      createRequest({
        ...createValidBody(),
        firstName: "A".repeat(9_000),
      }),
    );
    expect(response.status).toBe(413);
  });

  it("silently accepts honeypot submissions without contacting MailerLite", async () => {
    const response = await POST(
      createRequest({ ...createValidBody(), company: "bot-field" }),
    );
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      outcome: "pending_confirmation",
    });
    expect(getSubscriberByEmailMock).not.toHaveBeenCalled();
    expect(upsertSubscriberMock).not.toHaveBeenCalled();
  });

  it("fails closed when MailerLite env is missing", async () => {
    delete process.env.MAILERLITE_IMMERSION_GROUP_ID;
    const response = await POST(createRequest(createValidBody()));
    expect(response.status).toBe(503);
    expect(upsertSubscriberMock).not.toHaveBeenCalled();
  });

  it("upserts new subscribers as unconfirmed with the immersion group", async () => {
    const body = createValidBody("new.subscriber@example.com");
    const response = await POST(createRequest(body));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      outcome: "pending_confirmation",
    });
    expect(upsertSubscriberMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        email: "new.subscriber@example.com",
        status: "unconfirmed",
        groups: ["group-123"],
        fields: expect.objectContaining({
          name: "Ama",
          signup_source: "immersion-program-page",
          immersion_interest_as: "undergraduate_premed",
        }),
      }),
    );
    const upsertArgs = upsertSubscriberMock.mock.calls[0]?.[1] as Record<
      string,
      unknown
    >;
    expect(upsertArgs).not.toHaveProperty("resubscribe");
  });

  it("treats active subscribers as already registered without forcing status", async () => {
    const body = createValidBody("active.subscriber@example.com");
    getSubscriberByEmailMock.mockResolvedValue({
      id: "1",
      email: body.email,
      status: "active",
    });

    const response = await POST(createRequest(body));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      outcome: "already_registered",
    });
    expect(upsertSubscriberMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        email: body.email,
        groups: ["group-123"],
      }),
    );
    const upsertArgs = upsertSubscriberMock.mock.calls[0]?.[1] as Record<
      string,
      unknown
    >;
    expect(upsertArgs).not.toHaveProperty("status");
    expect(upsertArgs).not.toHaveProperty("resubscribe");
  });

  it("does not resubscribe suppressed subscribers", async () => {
    const body = createValidBody("suppressed@example.com");
    getSubscriberByEmailMock.mockResolvedValue({
      id: "1",
      email: body.email,
      status: "unsubscribed",
    });

    const response = await POST(createRequest(body));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      success: true,
      outcome: "suppressed",
    });
    expect(upsertSubscriberMock).not.toHaveBeenCalled();
  });

  it("maps MailerLite 401 to service unavailable", async () => {
    getSubscriberByEmailMock.mockRejectedValue({ status: 401 });

    const response = await POST(createRequest(createValidBody()));
    expect(response.status).toBe(503);
  });

  it("maps MailerLite 422 to validation failure", async () => {
    upsertSubscriberMock.mockRejectedValue({ status: 422 });

    const response = await POST(createRequest(createValidBody()));
    expect(response.status).toBe(400);
  });

  it("maps MailerLite 429 to rate limited", async () => {
    upsertSubscriberMock.mockRejectedValue({ status: 429 });

    const response = await POST(createRequest(createValidBody()));
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("600");
  });

  it("maps network failures to 502", async () => {
    getSubscriberByEmailMock.mockRejectedValue(new TypeError("fetch failed"));

    const response = await POST(createRequest(createValidBody()));
    expect(response.status).toBe(502);
  });

  it("rate limits repeated requests from the same IP", async () => {
    const ip = `203.0.113.${Math.floor(Math.random() * 200) + 1}`;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const response = await POST(
        createRequest(createValidBody(`user${attempt}-${ip}@example.com`), {
          ip,
        }),
      );
      expect(response.status).toBe(200);
    }

    const limited = await POST(
      createRequest(createValidBody(`limited-${ip}@example.com`), { ip }),
    );
    expect(limited.status).toBe(429);
  });
});
