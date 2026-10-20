import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { signInviteToken, IMMERSION_COOKIE } from "@/lib/payments/immersion";
import { IMMERSION_TERMS_VERSION } from "@/lib/payments/immersion-terms";
import { POST as requestLink } from "../request-link/route";
import { GET as verify } from "../verify/route";
import { GET as status } from "../status/route";
import { POST as checkout } from "../checkout/route";

const createCustomer = vi.fn().mockResolvedValue({ id: "cus_test" });
const createSession = vi.fn().mockResolvedValue({ url: "https://checkout.stripe.com/c/pay/cs_test" });
const listCustomers = vi.fn();
const listSessions = vi.fn();
const retrievePrice = vi.fn();
vi.mock("stripe", () => ({ default: class { customers = { create: createCustomer, list: listCustomers }; checkout = { sessions: { create: createSession, list: listSessions } }; prices = { retrieve: retrievePrice }; } }));

const secret = "x".repeat(48);
const base = "https://preview.example.com";
function post(path: string, body: object, cookie?: string) {
  return new NextRequest(`${base}${path}`, {
    method: "POST",
    headers: { origin: base, "content-type": "application/json", ...(cookie ? { cookie } : {}) },
    body: JSON.stringify(path.endsWith("/checkout") ? { acceptedTerms: true, termsVersion: IMMERSION_TERMS_VERSION, ...body } : body),
  });
}

beforeEach(() => {
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED", "true");
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fixture");
  vi.stubEnv("STRIPE_IMMERSION_DEPOSIT_PRICE_ID", "price_deposit");
  vi.stubEnv("STRIPE_IMMERSION_FULL_PRICE_ID", "price_full");
  vi.stubEnv("STRIPE_IMMERSION_BALANCE_PRICE_ID", "price_balance");
  vi.stubEnv("IMMERSION_INVITE_TOKEN_SECRET", secret);
  vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([{ name: "Test Participant", email: "test@example.com" }]));
  vi.stubEnv("RESEND_API_KEY", "re_fixture");
  vi.stubEnv("FORM_NOTIFICATION_FROM", "Akomapa <test@example.com>");
  vi.stubEnv("FORM_NOTIFICATION_TO", "staff@example.com");
  listCustomers.mockResolvedValue({ data: [], has_more: false });
  listSessions.mockResolvedValue({ data: [], has_more: false });
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.useRealTimers(); vi.clearAllMocks(); });

describe("Immersion invite routes", () => {
  it("does not disclose membership or email a non-selected address", async () => {
    const send = vi.fn();
    vi.stubGlobal("fetch", send);
    const response = await requestLink(post("/api/immersion/request-link", { email: "unknown@example.com" }));
    expect(response.status).toBe(200);
    expect((await response.json()).message).toMatch(/If this address is on the selected cohort list/);
    expect(send).not.toHaveBeenCalled();
  });

  it("emails a short-lived link only to the selected address", async () => {
    const send = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", send);
    const response = await requestLink(post("/api/immersion/request-link", { email: "TEST@example.com" }));
    expect(response.status).toBe(200);
    expect(JSON.stringify(await response.json())).not.toContain("token=");
    const mail = JSON.parse(send.mock.calls[0][1].body);
    expect(mail.to).toEqual(["test@example.com"]);
    expect(mail.text).toContain("/api/immersion/verify?token=");
  });

  it("sets an HttpOnly cookie after verification and exposes first name only with it", async () => {
    const token = signInviteToken("test@example.com", "email", secret, 60);
    const response = await verify(new NextRequest(`${base}/api/immersion/verify?token=${token}`));
    expect(response.status).toBe(307);
    const cookie = response.headers.get("set-cookie") || "";
    expect(cookie).toContain("HttpOnly");
    expect(cookie).toContain("Secure");
    const lookup = await status(new NextRequest(`${base}/api/immersion/status`, { headers: { cookie } }));
    expect(await lookup.json()).toEqual({ verified: true, firstName: "Test", paymentStage: "initial" });
    const denied = await status(new NextRequest(`${base}/api/immersion/status`));
    expect((await denied.json()).verified).toBe(false);
  });

  it("rejects checkout without verification and uses the selected price with verification", async () => {
    const denied = await checkout(post("/api/immersion/checkout", { choice: "deposit" }));
    expect(denied.status).toBe(401);
    expect(createCustomer).not.toHaveBeenCalled();
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const response = await checkout(post("/api/immersion/checkout", { choice: "deposit" }, `${IMMERSION_COOKIE}=${token}`));
    expect(response.status).toBe(200);
    expect((await response.json()).url).toMatch(/^https:\/\/checkout\.stripe\.com\//);
    expect(createCustomer).toHaveBeenCalledWith(expect.objectContaining({ email: "test@example.com" }), expect.objectContaining({ idempotencyKey: expect.any(String) }));
    expect(createSession).toHaveBeenCalledWith(expect.objectContaining({
      customer: "cus_test", line_items: [{ price: "price_deposit", quantity: 1 }],
      payment_intent_data: { description: "Akomapa January 2027 Immersion Program — 50% deposit" },
      metadata: expect.objectContaining({ terms_version: IMMERSION_TERMS_VERSION }),
    }), expect.objectContaining({ idempotencyKey: expect.any(String) }));
    const fullResponse = await checkout(post("/api/immersion/checkout", { choice: "full" }, `${IMMERSION_COOKIE}=${token}`));
    expect(fullResponse.status).toBe(200);
    expect(createSession).toHaveBeenLastCalledWith(expect.objectContaining({
      line_items: [{ price: "price_full", quantity: 1 }],
      payment_intent_data: { description: "Akomapa January 2027 Immersion Program — full fee" },
    }), expect.objectContaining({ idempotencyKey: expect.stringContaining("-initial-full-") }));
  });

  it("requires acceptance of the current payment terms", async () => {
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const response = await checkout(post("/api/immersion/checkout", { choice: "deposit", acceptedTerms: false }, `${IMMERSION_COOKIE}=${token}`));
    expect(response.status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
  });

  it("uses only a validated live Price and records accepted terms in production", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-20T12:00:00Z"));
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("IMMERSION_STRIPE_LIVE_ENABLED", "true");
    vi.stubEnv("STRIPE_IMMERSION_LIVE_RESTRICTED_KEY", "rk_live_fixture");
    vi.stubEnv("STRIPE_IMMERSION_LIVE_DEPOSIT_PRICE_ID", "price_live_deposit");
    vi.stubEnv("STRIPE_IMMERSION_LIVE_FULL_PRICE_ID", "price_live_full");
    vi.stubEnv("STRIPE_IMMERSION_LIVE_BALANCE_PRICE_ID", "price_live_balance");
    vi.stubEnv("STRIPE_IMMERSION_LIVE_WEBHOOK_SECRET", "whsec_live_fixture");
    vi.stubEnv("IMMERSION_LIVE_BASE_URL", "https://akomapa.org");
    retrievePrice.mockResolvedValue({ active: true, currency: "usd", unit_amount: 124_950, type: "one_time", livemode: true });
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const cookie = `${IMMERSION_COOKIE}=${token}`;
    const response = await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie));
    expect(response.status).toBe(200);
    expect(retrievePrice).toHaveBeenCalledWith("price_live_deposit");
    expect(createSession).toHaveBeenCalledWith(expect.objectContaining({
      line_items: [{ price: "price_live_deposit", quantity: 1 }],
      success_url: "https://akomapa.org/global-health-immersion-program?payment=success",
      metadata: expect.objectContaining({ terms_version: IMMERSION_TERMS_VERSION }),
      expires_at: expect.any(Number),
    }), expect.objectContaining({ idempotencyKey: expect.stringContaining("-initial-deposit-") }));
    createSession.mockClear();
    retrievePrice.mockResolvedValueOnce({ active: true, currency: "usd", unit_amount: 100, type: "one_time", livemode: true });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const invalid = await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie));
    expect(invalid.status).toBe(503);
    expect(createSession).not.toHaveBeenCalled();
  });

  it("allows a balance checkout only after a paid deposit and reuses its Stripe customer", async () => {
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const cookie = `${IMMERSION_COOKIE}=${token}`;
    expect((await checkout(post("/api/immersion/checkout", { choice: "balance" }, cookie))).status).toBe(409);
    listCustomers.mockResolvedValue({ data: [{ id: "cus_test", metadata: { program: "global-health-immersion" } }], has_more: false });
    listSessions.mockResolvedValue({ data: [{ id: "cs_deposit", status: "complete", payment_status: "paid", livemode: false,
      mode: "payment", payment_link: null, metadata: { program: "global-health-immersion", payment_type: "deposit", selected_email: "test@example.com" },
      amount_total: 124_950, currency: "usd", customer_details: { email: "test@example.com" }, customer: "cus_test" }], has_more: false });
    const statusResponse = await status(new NextRequest(`${base}/api/immersion/status`, { headers: { cookie } }));
    expect((await statusResponse.json()).paymentStage).toBe("balance");
    expect((await checkout(post("/api/immersion/checkout", { choice: "full" }, cookie))).status).toBe(409);
    const response = await checkout(post("/api/immersion/checkout", { choice: "balance" }, cookie));
    expect(response.status).toBe(200);
    expect(createCustomer).not.toHaveBeenCalled();
    expect(createSession).toHaveBeenCalledWith(expect.objectContaining({
      customer: "cus_test", line_items: [{ price: "price_balance", quantity: 1 }],
      payment_intent_data: { description: "Akomapa January 2027 Immersion Program — remaining balance" },
      metadata: expect.objectContaining({ deposit_session_id: "cs_deposit" }),
    }), expect.any(Object));
  });

  it("reuses an open checkout and blocks a second choice", async () => {
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const cookie = `${IMMERSION_COOKIE}=${token}`;
    listCustomers.mockResolvedValue({ data: [{ id: "cus_test", metadata: { program: "global-health-immersion" } }], has_more: false });
    listSessions.mockResolvedValue({ data: [{ id: "cs_open", status: "open", payment_status: "unpaid", livemode: false,
      mode: "payment", payment_link: null, metadata: { program: "global-health-immersion", payment_type: "deposit", selected_email: "test@example.com" },
      amount_total: 124_950, currency: "usd", customer_details: { email: "test@example.com" }, customer: "cus_test",
      url: "https://checkout.stripe.com/c/pay/existing", expires_at: Math.floor(Date.now() / 1000) + 3600 }], has_more: false });
    const existing = await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie));
    expect(await existing.json()).toEqual({ url: "https://checkout.stripe.com/c/pay/existing" });
    expect((await checkout(post("/api/immersion/checkout", { choice: "full" }, cookie))).status).toBe(409);
    expect(createSession).not.toHaveBeenCalled();
  });
});
