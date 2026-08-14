import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST as getInvolvedPost } from "@/app/api/intake/get-involved/route";
import { POST as partnershipPost } from "@/app/api/intake/partnership/route";
import { POST as programPost } from "@/app/api/intake/program-interest/route";
import { resetIntakeRateLimitForTests } from "@/lib/intake/server/handler";

const common = {
  name: "Ama Mensah",
  email: "ama@example.com",
  phone: "",
  sourcePath: "/programs?email=private@example.com",
  consent: true,
  company: "",
};

const validBodies = {
  program: {
    ...common,
    programId: "global-health-immersion-program",
  },
  partnership: {
    ...common,
    organization: "University of Ghana",
    category: "university",
    proposedContribution: "Clinical mentorship and teaching support.",
    geography: "Accra, Ghana",
    timeline: "2027 academic year",
  },
  getInvolved: {
    ...common,
    pathway: "volunteer",
    message: "I can support community outreach activities.",
  },
};

function formConfig() {
  const fieldNames = [
    "requestId",
    "submittedAt",
    "schemaVersion",
    "sourcePath",
    "formType",
    "name",
    "email",
    "phone",
    "consent",
    "programId",
    "cohortId",
    "affiliation",
    "message",
    "organization",
    "role",
    "category",
    "proposedContribution",
    "geography",
    "timeline",
    "pathway",
    "availability",
  ];
  const fields = Object.fromEntries(fieldNames.map((name) => [name, `q-${name}`]));
  return JSON.stringify(
    Object.fromEntries(
      [
        "general_inquiry",
        "program_interest",
        "partnership_request",
        "get_involved",
        "donation_follow_up",
      ].map((formType) => [formType, { formId: `form-${formType}`, fields }]),
    ),
  );
}

function request(path: string, body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest(`http://localhost${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "http://localhost",
      "x-real-ip": crypto.randomUUID(),
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

function successfulFetch() {
  return vi
    .fn()
    .mockResolvedValueOnce(
      new Response(
        JSON.stringify({ submissions: [{ submissionId: "submission-123" }] }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    )
    .mockResolvedValueOnce(new Response(null, { status: 200 }));
}

describe("purpose-specific intake routes", () => {
  beforeEach(() => {
    resetIntakeRateLimitForTests();
    process.env.FILLOUT_API_KEY = "fillout-test-key";
    process.env.FILLOUT_FORM_CONFIG = formConfig();
    process.env.RESEND_API_KEY = "resend-test-key";
    process.env.FORM_NOTIFICATION_FROM =
      "Akomapa Health Foundation <info@akomapa.org>";
    process.env.FORM_NOTIFICATION_TO = "akomapahealth@gmail.com";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    delete process.env.FILLOUT_API_KEY;
    delete process.env.FILLOUT_FORM_CONFIG;
    delete process.env.RESEND_API_KEY;
    delete process.env.FORM_NOTIFICATION_FROM;
    delete process.env.FORM_NOTIFICATION_TO;
  });

  it.each([
    ["/api/intake/program-interest", programPost, validBodies.program],
    ["/api/intake/partnership", partnershipPost, validBodies.partnership],
    ["/api/intake/get-involved", getInvolvedPost, validBodies.getInvolved],
  ] as const)("accepts a valid %s submission", async (path, post, body) => {
    const fetchMock = successfulFetch();
    vi.stubGlobal("fetch", fetchMock);

    const response = await post(request(path, body));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(result.success).toBe(true);
    expect(result.requestId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[0][1]?.body)).not.toContain(
      "private@example.com",
    );
  });

  it("rejects cross-origin, invalid, and oversized requests", async () => {
    const crossOrigin = await programPost(
      request("/api/intake/program-interest", validBodies.program, {
        Origin: "https://example.com",
      }),
    );
    const invalid = await programPost(
      request("/api/intake/program-interest", {
        ...validBodies.program,
        consent: false,
      }),
    );
    const oversized = await programPost(
      request("/api/intake/program-interest", {
        ...validBodies.program,
        name: "A".repeat(9_000),
      }),
    );

    expect(crossOrigin.status).toBe(403);
    expect(invalid.status).toBe(400);
    expect(oversized.status).toBe(413);
  });

  it("rejects unsupported content types", async () => {
    const response = await programPost(
      request("/api/intake/program-interest", validBodies.program, {
        "Content-Type": "text/plain",
      }),
    );

    expect(response.status).toBe(415);
    expect(response.headers.get("cache-control")).toBe("no-store");
  });

  it("silently accepts honeypot submissions without external requests", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await programPost(
      request("/api/intake/program-interest", {
        ...validBodies.program,
        company: "automated submission",
      }),
    );

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not notify when Fillout rejects storage", async () => {
    const logSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 503 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await programPost(
      request("/api/intake/program-interest", validBodies.program),
    );

    expect(response.status).toBe(502);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(logSpy.mock.calls)).not.toContain("ama@example.com");
  });

  it("fails closed when Fillout configuration is absent", async () => {
    delete process.env.FILLOUT_API_KEY;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await programPost(
      request("/api/intake/program-interest", validBodies.program),
    );

    expect(response.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rate limits repeated requests by form and client address", async () => {
    const responses = [];
    for (let index = 0; index < 6; index += 1) {
      responses.push(
        await programPost(
          request(
            "/api/intake/program-interest",
            { ...validBodies.program, company: "bot" },
            { "x-real-ip": "192.0.2.10" },
          ),
        ),
      );
    }

    expect(responses.slice(0, 5).every((response) => response.status === 200)).toBe(
      true,
    );
    expect(responses[5].status).toBe(429);
    expect(responses[5].headers.get("retry-after")).toBe("600");
  });
});
