import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "../route";

const secret = "whsec_test_fixture";

function eventRequest({
  eventId = "evt_immersion_1",
  type = "checkout.session.completed",
  paymentStatus = "paid",
  paymentType = "deposit",
  amount = 124_950,
}: {
  eventId?: string;
  type?: string;
  paymentStatus?: string;
  paymentType?: string;
  amount?: number;
} = {}) {
  const body = JSON.stringify({
    id: eventId,
    type,
    livemode: false,
    data: {
      object: {
        id: "cs_immersion_1",
        object: "checkout.session",
        livemode: false,
        mode: "payment",
        payment_status: paymentStatus,
        payment_link: null,
        metadata: { program: "global-health-immersion", payment_type: paymentType, selected_email: "participant@example.com" },
        amount_total: amount,
        currency: "usd",
        customer_details: { name: "Test Participant", email: "participant@example.com" },
      },
    },
  });
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest("hex");
  return new Request("https://preview.example.com/api/stripe/immersion-webhook", {
    method: "POST",
    headers: { "stripe-signature": `t=${timestamp},v1=${signature}` },
    body,
  });
}

beforeEach(() => {
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED", "true");
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fixture");
  vi.stubEnv("STRIPE_IMMERSION_WEBHOOK_SECRET", secret);
  vi.stubEnv("STRIPE_IMMERSION_DEPOSIT_PRICE_ID", "price_deposit");
  vi.stubEnv("STRIPE_IMMERSION_FULL_PRICE_ID", "price_full");
  vi.stubEnv("IMMERSION_INVITE_TOKEN_SECRET", "x".repeat(48));
  vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([{ name: "Test Participant", email: "participant@example.com" }]));
  vi.stubEnv("RESEND_API_KEY", "resend-fixture");
  vi.stubEnv("FORM_NOTIFICATION_FROM", "Akomapa <payments@example.com>");
  vi.stubEnv("FORM_NOTIFICATION_TO", "staff@example.com");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Immersion Stripe webhook", () => {
  it("rejects an invalid signature", async () => {
    const request = eventRequest();
    request.headers.set("stripe-signature", "t=1,v1=invalid");
    expect((await POST(request)).status).toBe(400);
  });

  it("ignores an unpaid completed session", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect((await POST(eventRequest({ paymentStatus: "unpaid" }))).status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends a deposit alert with an event idempotency key", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    expect((await POST(eventRequest())).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers["Idempotency-Key"]).toBe("immersion-payment/evt_immersion_1");
    expect(init.body).toContain("Remaining program balance: USD 1,249.50");
    expect(init.body).toContain("participant@example.com");
  });

  it("sends a full-payment alert after delayed success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    expect(
      (await POST(eventRequest({
        type: "checkout.session.async_payment_succeeded",
        paymentType: "full",
        amount: 249_900,
      }))).status,
    ).toBe(200);
    expect(fetchMock.mock.calls[0][1].body).toContain("Program fee paid in full");
  });

  it("uses the same idempotency key when Stripe replays an event", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    expect((await POST(eventRequest())).status).toBe(200);
    expect((await POST(eventRequest())).status).toBe(200);
    expect(fetchMock.mock.calls[0][1].headers["Idempotency-Key"]).toBe(
      fetchMock.mock.calls[1][1].headers["Idempotency-Key"],
    );
  });

  it("rejects an unexpected amount for a known payment link", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect((await POST(eventRequest({ amount: 100 }))).status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not accept events outside preview", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    expect((await POST(eventRequest())).status).toBe(404);
  });

  it("retries when staff notification fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect((await POST(eventRequest())).status).toBe(503);
  });
});
