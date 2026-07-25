import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

const validBody = {
  name: "Ama Mensah",
  email: "ama@example.com",
  phone: "+233 50 123 4567",
  subject: "Volunteer inquiry",
  message: "I would like to learn more about volunteering.",
  partnershipType: "General Inquiry",
  company: "",
};

function createRequest(
  body: unknown,
  options: { origin?: string; ip?: string; contentType?: string } = {},
) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": options.contentType ?? "application/json",
      Origin: options.origin ?? "http://localhost",
      "x-real-ip": options.ip ?? crypto.randomUUID(),
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    process.env.WEB3FORMS_API_KEY = "test-access-key";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.WEB3FORMS_API_KEY;
  });

  it("rejects unsupported content types and cross-origin requests", async () => {
    const unsupported = await POST(
      createRequest(validBody, { contentType: "text/plain" }),
    );
    const crossOrigin = await POST(
      createRequest(validBody, { origin: "https://example.com" }),
    );

    expect(unsupported.status).toBe(415);
    expect(crossOrigin.status).toBe(403);
    expect(unsupported.headers.get("cache-control")).toBe("no-store");
  });

  it("validates and limits request bodies at the server boundary", async () => {
    const invalid = await POST(
      createRequest({ ...validBody, email: "not-an-email" }),
    );
    const oversized = await POST(
      createRequest({ ...validBody, message: "A".repeat(9_000) }),
    );

    expect(invalid.status).toBe(400);
    expect(oversized.status).toBe(413);
  });

  it("silently accepts honeypot submissions without contacting Web3Forms", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      createRequest({ ...validBody, company: "automated submission" }),
    );

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns service unavailable when the access key is missing", async () => {
    delete process.env.WEB3FORMS_API_KEY;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(createRequest(validBody));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      message:
        "Contact service is temporarily unavailable. Please email us directly.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits normalized contact details to the fixed Web3Forms endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(createRequest(validBody));

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [URL, RequestInit];
    expect(url.toString()).toBe("https://api.web3forms.com/submit");
    expect(init.signal).toBeInstanceOf(AbortSignal);
    const formData = init.body as FormData;
    expect(formData.get("access_key")).toBe("test-access-key");
    expect(formData.get("replyto")).toBe(validBody.email);
    expect(formData.get("subject")).toBe(
      `Akomapa Health Foundation - ${validBody.subject}`,
    );
    expect(formData.get("message")).toContain("Partnership Type: General Inquiry");
  });

  it.each([
    { ok: false, json: vi.fn(), label: "HTTP failure" },
    {
      ok: true,
      json: vi.fn().mockResolvedValue({ success: false }),
      label: "provider rejection",
    },
  ])("returns bad gateway for $label", async ({ ok, json }) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok, status: 401, json }));

    const response = await POST(createRequest(validBody));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      message:
        "We could not send your message right now. Please email us directly.",
    });
  });
});
