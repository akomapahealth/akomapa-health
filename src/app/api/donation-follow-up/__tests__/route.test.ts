import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/donation-follow-up/route";

const validBody = {
  name: "Ama Mensah",
  email: "ama@example.com",
  flow: "oneTime",
  selectedGivingLevel: "$25 one time",
  company: "",
};

function createRequest(
  body: unknown,
  options: { origin?: string; ip?: string } = {},
) {
  return new NextRequest("http://localhost/api/donation-follow-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: options.origin ?? "http://localhost",
      "x-real-ip": options.ip ?? crypto.randomUUID(),
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/donation-follow-up", () => {
  beforeEach(() => {
    process.env.WEB3FORMS_API_KEY = "test-access-key";
    process.env.WEB3FORMS_API_URL = "https://api.web3forms.com/submit";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.WEB3FORMS_API_KEY;
    delete process.env.WEB3FORMS_API_URL;
  });

  it("rejects cross-origin requests", async () => {
    const response = await POST(
      createRequest(validBody, { origin: "https://example.com" }),
    );

    expect(response.status).toBe(403);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("validates donor details at the server boundary", async () => {
    const response = await POST(
      createRequest({ ...validBody, email: "not-an-email" }),
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid follow-up details",
    });
  });

  it("fails closed when the configured notification URL is not allowlisted", async () => {
    process.env.WEB3FORMS_API_URL = "https://example.com/submit";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(createRequest(validBody));

    expect(response.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends a server-controlled follow-up notification without confirming payment", async () => {
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
    const formData = init.body as FormData;
    expect(formData.get("subject")).toBe("Donation follow-up request");
    expect(formData.get("replyto")).toBe("ama@example.com");
    expect(formData.get("message")).toContain(
      "does not verify or confirm that a payment was completed",
    );
    expect(formData.get("message")).toContain("unverified context only");
  });
});
