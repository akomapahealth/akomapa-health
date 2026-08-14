import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { IntakeRecord } from "@/lib/intake/contracts";
import { deliverIntakeRecord } from "@/lib/intake/server/deliver";
import { IntakeProviderError } from "@/lib/intake/server/errors";
import { createFilloutSubmission } from "@/lib/intake/server/fillout";

const record: IntakeRecord<"program_interest"> = {
  formType: "program_interest",
  requestId: "90bf6ba5-2da9-4cc7-b3af-8a39ab51a784",
  submittedAt: "2026-08-14T18:00:00.000Z",
  schemaVersion: 1,
  sourcePath: "/programs",
  data: {
    name: "Ama Mensah",
    email: "ama@example.com",
    phone: "",
    consent: true,
    programId: "global-health-immersion-program",
    cohortId: "",
    affiliation: "University of Ghana",
    message: "Please share the next cohort dates.",
  },
};

function formConfig(overrides: Record<string, string> = {}) {
  const fields = Object.fromEntries(
    [
      "requestId",
      "submittedAt",
      "schemaVersion",
      "sourcePath",
      "formType",
      ...Object.keys(record.data),
    ].map((key) => [key, `question-${key}`]),
  );
  const forms = Object.fromEntries(
    [
      "general_inquiry",
      "program_interest",
      "partnership_request",
      "get_involved",
      "donation_follow_up",
    ].map((formType) => [
      formType,
      { formId: `form-${formType}`, fields: { ...fields, ...overrides } },
    ]),
  );
  return JSON.stringify(forms);
}

describe("intake provider delivery", () => {
  beforeEach(() => {
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

  it("sends a mapped record to the fixed Fillout API origin", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ submissions: [{ submissionId: "submission-123" }] }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(createFilloutSubmission(record)).resolves.toBe("submission-123");

    const [url, init] = fetchMock.mock.calls[0] as [URL, RequestInit];
    expect(url.toString()).toBe(
      "https://api.fillout.com/v1/api/forms/form-program_interest/submissions",
    );
    expect(new Headers(init.headers).get("authorization")).toBe(
      "Bearer fillout-test-key",
    );
    expect(init.redirect).toBe("error");
    const body = JSON.parse(String(init.body));
    expect(body.submissions[0].submissionTime).toBe(record.submittedAt);
    expect(body.submissions[0].questions).toContainEqual({
      id: "question-requestId",
      value: record.requestId,
    });
    expect(String(init.body)).not.toContain("fillout-test-key");
  });

  it.each([
    [401, "unauthorized"],
    [429, "rate_limited"],
    [422, "invalid_contract"],
    [503, "upstream_rejected"],
  ] as const)("maps Fillout status %s to %s", async (status, category) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status })));

    await expect(createFilloutSubmission(record)).rejects.toMatchObject({
      category,
    });
  });

  it("classifies timeouts and malformed success responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValueOnce(new DOMException("Timed out", "TimeoutError")),
    );
    await expect(createFilloutSubmission(record)).rejects.toMatchObject({
      category: "timeout",
    });

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        new Response(JSON.stringify({ submissions: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    await expect(createFilloutSubmission(record)).rejects.toMatchObject({
      category: "invalid_contract",
    });
  });

  it("fails before fetch when a required question mapping is absent", async () => {
    const parsed = JSON.parse(formConfig());
    delete parsed.program_interest.fields.requestId;
    process.env.FILLOUT_FORM_CONFIG = JSON.stringify(parsed);
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(createFilloutSubmission(record)).rejects.toMatchObject({
      category: "invalid_contract",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("stores first and sends a plain-text Resend notification second", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ submissions: [{ submissionId: "submission-123" }] }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        ),
      )
      .mockResolvedValueOnce(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(deliverIntakeRecord(record)).resolves.toEqual({
      filloutSubmissionId: "submission-123",
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const [url, init] = fetchMock.mock.calls[1] as [URL, RequestInit];
    expect(url.toString()).toBe("https://api.resend.com/emails");
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      from: "Akomapa Health Foundation <info@akomapa.org>",
      to: ["akomapahealth@gmail.com"],
      reply_to: "ama@example.com",
      subject: "New program interest request",
    });
    expect(body.html).toBeUndefined();
    expect(body.text).toContain("Request ID: 90bf6ba5");
  });

  it("returns stored success when notification delivery fails", async () => {
    const logSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(
          new Response(
            JSON.stringify({ submissions: [{ submissionId: "submission-123" }] }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          ),
        )
        .mockResolvedValueOnce(new Response(null, { status: 500 })),
    );

    await expect(deliverIntakeRecord(record)).resolves.toEqual({
      filloutSubmissionId: "submission-123",
    });
    expect(logSpy).toHaveBeenCalledWith("Intake notification failed", {
      requestId: record.requestId,
      formType: record.formType,
      category: "notification_failed",
    });
    expect(JSON.stringify(logSpy.mock.calls)).not.toContain(record.data.email);
  });

  it("fails closed when provider configuration is missing", async () => {
    delete process.env.FILLOUT_API_KEY;

    await expect(createFilloutSubmission(record)).rejects.toBeInstanceOf(
      IntakeProviderError,
    );
  });

  it("rejects notification sender values containing header newlines", async () => {
    process.env.FORM_NOTIFICATION_FROM = "Akomapa\r\nBcc: attacker@example.com";
    const fetchMock = vi.fn().mockResolvedValueOnce(
      new Response(
        JSON.stringify({ submissions: [{ submissionId: "submission-123" }] }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );
    const logSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    vi.stubGlobal("fetch", fetchMock);

    await expect(deliverIntakeRecord(record)).resolves.toEqual({
      filloutSubmissionId: "submission-123",
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      "Intake notification failed",
      expect.objectContaining({ category: "misconfigured" }),
    );
  });
});
