import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { signInviteToken, IMMERSION_COOKIE } from "@/lib/payments/immersion";
import { createDirectInviteToken, IMMERSION_DIRECT_INVITE_EXPIRES_AT } from "@/lib/payments/immersion-direct-invite";
import { IMMERSION_TERMS_VERSION } from "@/lib/payments/immersion-terms";
import { POST as requestLink } from "../request-link/route";
import { GET as verify } from "../verify/route";
import { GET as status } from "../status/route";
import { POST as checkout } from "../checkout/route";

const createCustomer = vi.fn().mockResolvedValue({ id: "cus_test" });
const createSession = vi.fn().mockResolvedValue({ url: "https://checkout.stripe.com/c/pay/cs_test" });
const expireSession = vi.fn();
const listCustomers = vi.fn();
const listSessions = vi.fn();
const retrievePrice = vi.fn();
const retrieveCoupon = vi.fn();
vi.mock("stripe", () => ({ default: class { customers = { create: createCustomer, list: listCustomers }; checkout = { sessions: { create: createSession, list: listSessions, expire: expireSession } }; prices = { retrieve: retrievePrice }; coupons = { retrieve: retrieveCoupon }; } }));

const secret = "x".repeat(48);
const base = "https://preview.example.com";
function post(path: string, body: object, cookie?: string) {
  return new NextRequest(`${base}${path}`, {
    method: "POST",
    headers: { origin: base, "content-type": "application/json", ...(cookie ? { cookie } : {}) },
    body: JSON.stringify(path.endsWith("/checkout") ? { acceptedTerms: true, termsVersion: IMMERSION_TERMS_VERSION, ...body } : body),
  });
}

function configureLive() {
  vi.stubEnv("VERCEL_ENV", "production");
  vi.stubEnv("IMMERSION_STRIPE_LIVE_ENABLED", "true");
  vi.stubEnv("STRIPE_IMMERSION_LIVE_RESTRICTED_KEY", "rk_live_fixture");
  vi.stubEnv("STRIPE_IMMERSION_LIVE_FULL_PRICE_ID", "price_live_full");
  vi.stubEnv("STRIPE_IMMERSION_LIVE_WEBHOOK_SECRET", "whsec_live_fixture");
  vi.stubEnv("IMMERSION_LIVE_BASE_URL", "https://www.akomapa.org");
  retrievePrice.mockResolvedValue({ currency: "usd", type: "one_time", livemode: true, product: "prod_immersion" });
}

beforeEach(() => {
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED", "true");
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fixture");
  vi.stubEnv("STRIPE_IMMERSION_DEPOSIT_PRICE_ID", "price_deposit");
  vi.stubEnv("STRIPE_IMMERSION_FULL_PRICE_ID", "price_full");
  vi.stubEnv("STRIPE_IMMERSION_BALANCE_PRICE_ID", "price_balance");
  vi.stubEnv("IMMERSION_INVITE_TOKEN_SECRET", secret);
  vi.stubEnv("IMMERSION_DIRECT_INVITE_SECRET", undefined);
  vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([{ name: "Test Participant", email: "test@example.com" }]));
  vi.stubEnv("RESEND_API_KEY", "re_fixture");
  vi.stubEnv("FORM_NOTIFICATION_FROM", "Akomapa <test@example.com>");
  vi.stubEnv("FORM_NOTIFICATION_TO", "staff@example.com");
  listCustomers.mockResolvedValue({ data: [], has_more: false });
  listSessions.mockResolvedValue({ data: [], has_more: false });
  retrievePrice.mockResolvedValue({ active: true, currency: "usd", type: "one_time", livemode: false, product: "prod_immersion" });
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.useRealTimers(); vi.clearAllMocks(); });

describe("Immersion invite routes", () => {
  it.each([
    ["2026-11-30T05:00:00Z", true],
    ["2026-12-12T04:59:59Z", true],
    ["2026-12-12T05:00:00Z", false],
  ] as const)("enforces the roster's first-payment extension at %s", async (now, open) => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(now));
    configureLive();
    const firstPaymentDeadline = "2026-12-12T04:59:59Z";
    vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([
      { name: "Extended Participant", email: "test@example.com", firstPaymentDeadline },
      { name: "Standard Participant", email: "other@example.com" },
    ]));
    const cookie = `${IMMERSION_COOKIE}=${signInviteToken("test@example.com", "session", secret, 60)}`;
    const lookup = await status(new NextRequest(`${base}/api/immersion/status`, { headers: { cookie } }));
    expect(await lookup.json()).toMatchObject({ paymentStage: open ? "initial" : "closed", firstPaymentDeadline });
    for (const choice of ["deposit", "full"] as const) {
      expect((await checkout(post("/api/immersion/checkout", { choice }, cookie))).status).toBe(open ? 200 : 409);
    }
    if (open) {
      const expiry = createSession.mock.lastCall?.[0].expires_at;
      expect(expiry).toBeGreaterThan(Date.now() / 1000);
      expect(expiry).toBeLessThanOrEqual(Math.floor(Math.max(Date.now() + 31 * 60 * 1000, Date.parse(firstPaymentDeadline)) / 1000));
    } else {
      expect(createSession).not.toHaveBeenCalled();
    }
    const otherCookie = `${IMMERSION_COOKIE}=${signInviteToken("other@example.com", "session", secret, 60)}`;
    const other = await status(new NextRequest(`${base}/api/immersion/status`, { headers: { cookie: otherCookie } }));
    expect(await other.json()).toMatchObject({ paymentStage: "closed" });
    // Client-supplied deadlines cannot extend a different participant's offer.
    expect((await checkout(post("/api/immersion/checkout", { choice: "full", firstPaymentDeadline }, otherCookie))).status).toBe(409);
  });

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
    expect(await lookup.json()).toMatchObject({ verified: true, firstName: "Test", paymentStage: "initial", totalCents: 229_900 });
    const denied = await status(new NextRequest(`${base}/api/immersion/status`));
    expect((await denied.json()).verified).toBe(false);
  });

  it("accepts a private direct link for an active invitee without exposing their email in the URL", async () => {
    const directSecret = "d".repeat(48);
    vi.stubEnv("IMMERSION_DIRECT_INVITE_SECRET", directSecret);
    const token = createDirectInviteToken("test@example.com", directSecret);
    expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(token).not.toContain("test@example.com");
    const response = await verify(new NextRequest(`${base}/api/immersion/verify?invite=${token}`));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(`${base}/global-health-immersion-program?immersionVerification=success`);
    expect(response.headers.get("referrer-policy")).toBe("no-referrer");
    const cookie = response.headers.get("set-cookie") || "";
    expect(cookie).toContain("HttpOnly");
    const lookup = await status(new NextRequest(`${base}/api/immersion/status`, { headers: { cookie } }));
    expect(await lookup.json()).toMatchObject({ verified: true, firstName: "Test", paymentStage: "initial", totalCents: 229_900 });
  });

  it("rejects unknown, disabled, and expired direct links without affecting email links", async () => {
    const directSecret = "d".repeat(48);
    const token = createDirectInviteToken("test@example.com", directSecret);
    let response = await verify(new NextRequest(`${base}/api/immersion/verify?invite=${token}`));
    expect(response.headers.get("set-cookie")).toBeNull();
    vi.stubEnv("IMMERSION_DIRECT_INVITE_SECRET", directSecret);
    response = await verify(new NextRequest(`${base}/api/immersion/verify?invite=${"a".repeat(43)}`));
    expect(response.headers.get("set-cookie")).toBeNull();
    response = await verify(new NextRequest(`${base}/api/immersion/verify?invite=${createDirectInviteToken("other@example.com", directSecret)}`));
    expect(response.headers.get("set-cookie")).toBeNull();
    vi.useFakeTimers();
    vi.setSystemTime(IMMERSION_DIRECT_INVITE_EXPIRES_AT + 1);
    response = await verify(new NextRequest(`${base}/api/immersion/verify?invite=${token}`));
    expect(response.headers.get("location")).toContain("immersionVerification=expired");
    expect(response.headers.get("set-cookie")).toBeNull();
    const emailToken = signInviteToken("test@example.com", "email", secret, 60);
    response = await verify(new NextRequest(`${base}/api/immersion/verify?token=${emailToken}`));
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
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
      customer: "cus_test", line_items: [{ price_data: { currency: "usd", unit_amount: 114_950, product: "prod_immersion" }, quantity: 1 }],
      payment_intent_data: { description: "Akomapa January 2027 Immersion Program — 50% deposit" },
      metadata: expect.objectContaining({ terms_version: IMMERSION_TERMS_VERSION }),
    }), expect.objectContaining({ idempotencyKey: expect.any(String) }));
    const fullResponse = await checkout(post("/api/immersion/checkout", { choice: "full" }, `${IMMERSION_COOKIE}=${token}`));
    expect(fullResponse.status).toBe(200);
    expect(createSession).toHaveBeenLastCalledWith(expect.objectContaining({
      line_items: [{ price_data: { currency: "usd", unit_amount: 229_900, product: "prod_immersion" }, quantity: 1 }],
      payment_intent_data: { description: "Akomapa January 2027 Immersion Program — full fee" },
    }), expect.objectContaining({ idempotencyKey: expect.stringContaining("-initial-full-") }));
  });

  it("requires acceptance of the current payment terms", async () => {
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const response = await checkout(post("/api/immersion/checkout", { choice: "deposit", acceptedTerms: false }, `${IMMERSION_COOKIE}=${token}`));
    expect(response.status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
  });

  it("offers Valerie equal halves of her individual $2,239 fee", async () => {
    vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([
      { name: "Valerie", email: "test@example.com", totalCents: 223_900 },
      { name: "Other Participant", email: "other@example.com" },
    ]));
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const cookie = `${IMMERSION_COOKIE}=${token}`;
    const lookup = await status(new NextRequest(`${base}/api/immersion/status`, { headers: { cookie } }));
    expect(await lookup.json()).toMatchObject({ verified: true, firstName: "Valerie", totalCents: 223_900, depositCents: 111_950 });
    expect((await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie))).status).toBe(200);
    expect(createSession.mock.lastCall?.[0]).toMatchObject({
      line_items: [{ price_data: { currency: "usd", unit_amount: 111_950, product: "prod_immersion" }, quantity: 1 }],
      metadata: { fee_total_cents: "223900" },
    });
    expect((await checkout(post("/api/immersion/checkout", { choice: "full" }, cookie))).status).toBe(200);
    expect(createSession.mock.lastCall?.[0].line_items[0].price_data.unit_amount).toBe(223_900);
  });

  it("resets only Valerie's refunded credit and follows her new deposit through final payment", async () => {
    const roster = [
      { name: "Valerie", email: "test@example.com", totalCents: 223_900, refundedCheckoutSessionIds: ["cs_test_refunded"] },
      { name: "Other Participant", email: "other@example.com" },
    ];
    vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([
      { name: "Valerie", email: "test@example.com", totalCents: 223_900 }, roster[1],
    ]));
    listCustomers.mockResolvedValue({ data: [{ id: "cus_test", metadata: { program: "global-health-immersion" } }], has_more: false });
    const old = { id: "cs_test_refunded", status: "complete", payment_status: "paid", livemode: false,
      mode: "payment", payment_link: null, metadata: { program: "global-health-immersion", payment_type: "deposit", selected_email: "test@example.com" },
      amount_total: 124_950, currency: "usd", customer_details: { email: "test@example.com" }, customer: "cus_test" };
    listSessions.mockResolvedValue({ data: [old], has_more: false });
    const cookie = `${IMMERSION_COOKIE}=${signInviteToken("test@example.com", "session", secret, 60)}`;
    const lookup = () => status(new NextRequest(`${base}/api/immersion/status`, { headers: { cookie } }));
    expect(await (await lookup()).json()).toMatchObject({ paymentStage: "balance", balanceCents: 98_950 });
    vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify(roster));
    const initial = await (await lookup()).json();
    expect(initial).toMatchObject({ paymentStage: "initial", totalCents: 223_900, depositCents: 111_950, balanceCents: 111_950 });
    expect(initial).not.toHaveProperty("refundedCheckoutSessionIds");
    expect((await checkout(post("/api/immersion/checkout", { choice: "balance" }, cookie))).status).toBe(409);
    for (const [choice, amount] of [["deposit", 111_950], ["full", 223_900]] as const) {
      expect((await checkout(post("/api/immersion/checkout", { choice }, cookie))).status).toBe(200);
      expect(createSession.mock.lastCall?.[0].line_items[0].price_data.unit_amount).toBe(amount);
      expect(createSession.mock.lastCall?.[1].idempotencyKey).toContain("-reset-");
    }
    expect(createCustomer).not.toHaveBeenCalled();

    const deposit = { ...old, id: "cs_test_newdeposit", amount_total: 111_950,
      metadata: { ...old.metadata, fee_total_cents: "223900" } };
    listSessions.mockResolvedValue({ data: [old, deposit], has_more: false });
    expect(await (await lookup()).json()).toMatchObject({ paymentStage: "balance", balanceCents: 111_950 });
    expect((await checkout(post("/api/immersion/checkout", { choice: "full" }, cookie))).status).toBe(409);
    expect((await checkout(post("/api/immersion/checkout", { choice: "balance" }, cookie))).status).toBe(200);
    expect(createSession.mock.lastCall?.[0]).toMatchObject({
      line_items: [{ price_data: { unit_amount: 111_950 }, quantity: 1 }],
      metadata: { deposit_session_id: deposit.id, deposit_amount_cents: "111950" },
    });
    const balance = { ...deposit, id: "cs_test_newbalance",
      metadata: { ...deposit.metadata, payment_type: "balance", deposit_session_id: deposit.id, deposit_amount_cents: "111950" } };
    listSessions.mockResolvedValue({ data: [old, deposit, balance], has_more: false });
    expect(await (await lookup()).json()).toMatchObject({ paymentStage: "paid" });
    expect((await checkout(post("/api/immersion/checkout", { choice: "balance" }, cookie))).status).toBe(409);

    const full = { ...deposit, id: "cs_test_newfull", amount_total: 223_900,
      metadata: { ...deposit.metadata, payment_type: "full" } };
    listSessions.mockResolvedValue({ data: [old, full], has_more: false });
    expect(await (await lookup()).json()).toMatchObject({ paymentStage: "paid" });
    createSession.mockClear();
    expect((await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie))).status).toBe(409);
    expect(createSession).not.toHaveBeenCalled();

    // A separate roster entry still receives credit for its historical deposit.
    listSessions.mockResolvedValue({ data: [{ ...old, id: "cs_test_otherdeposit", metadata: { ...old.metadata, selected_email: "other@example.com" },
      customer_details: { email: "other@example.com" } }], has_more: false });
    const otherCookie = `${IMMERSION_COOKIE}=${signInviteToken("other@example.com", "session", secret, 60)}`;
    const otherStatus = await status(new NextRequest(`${base}/api/immersion/status`, { headers: { cookie: otherCookie } }));
    expect(await otherStatus.json()).toMatchObject({ paymentStage: "balance", totalCents: 229_900, balanceCents: 104_950 });
    expect((await checkout(post("/api/immersion/checkout", { choice: "balance" }, otherCookie))).status).toBe(200);
    expect(createSession.mock.lastCall?.[0].line_items[0].price_data.unit_amount).toBe(104_950);
    expect(createSession.mock.lastCall?.[1].idempotencyKey).not.toContain("-reset-");
  });

  it("separates reset checkout keys from pre-refund keys and still reuses an open checkout", async () => {
    const person = { name: "Valerie", email: "test@example.com", totalCents: 223_900 };
    vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([person]));
    const cookie = `${IMMERSION_COOKIE}=${signInviteToken(person.email, "session", secret, 60)}`;
    await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie));
    const beforeKey = createSession.mock.lastCall?.[1].idempotencyKey;
    vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([{ ...person, refundedCheckoutSessionIds: ["cs_test_refunded"] }]));
    await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie));
    const resetKey = createSession.mock.lastCall?.[1].idempotencyKey;
    expect(resetKey).not.toBe(beforeKey);
    await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie));
    expect(createSession.mock.lastCall?.[1].idempotencyKey).toBe(resetKey);

    listCustomers.mockResolvedValue({ data: [{ id: "cus_test", metadata: { program: "global-health-immersion" } }], has_more: false });
    const open = { ...createSession.mock.lastCall?.[0], id: "cs_test_open", status: "open", payment_status: "unpaid", livemode: false,
      payment_link: null, amount_total: 111_950, currency: "usd", url: "https://checkout.stripe.com/c/pay/newdeposit",
      expires_at: Math.floor(Date.now() / 1000) + 3600 };
    listSessions.mockResolvedValue({ data: [open], has_more: false });
    createSession.mockClear();
    const reused = await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie));
    expect(await reused.json()).toEqual({ url: open.url });
    expect((await checkout(post("/api/immersion/checkout", { choice: "full" }, cookie))).status).toBe(409);
    expect(createSession).not.toHaveBeenCalled();
  });

  it("does not accept refund exclusions from the checkout request", async () => {
    listCustomers.mockResolvedValue({ data: [{ id: "cus_test", metadata: { program: "global-health-immersion" } }], has_more: false });
    listSessions.mockResolvedValue({ data: [{ id: "cs_test_paid", status: "complete", payment_status: "paid", livemode: false,
      mode: "payment", payment_link: null, metadata: { program: "global-health-immersion", payment_type: "full", selected_email: "test@example.com", fee_total_cents: "229900" },
      amount_total: 229_900, currency: "usd", customer_details: { email: "test@example.com" }, customer: "cus_test" }], has_more: false });
    const cookie = `${IMMERSION_COOKIE}=${signInviteToken("test@example.com", "session", secret, 60)}`;
    const response = await checkout(post("/api/immersion/checkout", { choice: "full", refundedCheckoutSessionIds: ["cs_test_paid"] }, cookie));
    expect(response.status).toBe(409);
    expect(createSession).not.toHaveBeenCalled();
  });

  it("expires an older open checkout before using the new fee", async () => {
    listCustomers.mockResolvedValue({ data: [{ id: "cus_test", metadata: { program: "global-health-immersion" } }], has_more: false });
    const old = { id: "cs_old", status: "open", payment_status: "unpaid", livemode: false,
      mode: "payment", payment_link: null, metadata: { program: "global-health-immersion", payment_type: "full", selected_email: "test@example.com" },
      amount_total: 249_900, currency: "usd", customer_details: { email: "test@example.com" }, customer: "cus_test",
      url: "https://checkout.stripe.com/c/pay/old", expires_at: Math.floor(Date.now() / 1000) + 3600 };
    listSessions.mockResolvedValueOnce({ data: [old], has_more: false }).mockResolvedValueOnce({ data: [{ ...old, status: "expired", url: null }], has_more: false });
    expireSession.mockResolvedValue({ ...old, status: "expired" });
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const response = await checkout(post("/api/immersion/checkout", { choice: "full" }, `${IMMERSION_COOKIE}=${token}`));
    expect(response.status).toBe(200);
    expect(expireSession).toHaveBeenCalledWith("cs_old");
    expect(createSession.mock.lastCall?.[0].line_items[0].price_data.unit_amount).toBe(229_900);
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
    retrievePrice.mockResolvedValue({ active: true, currency: "usd", type: "one_time", livemode: true, product: "prod_immersion" });
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const cookie = `${IMMERSION_COOKIE}=${token}`;
    const response = await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie));
    expect(response.status).toBe(200);
    expect(retrievePrice).toHaveBeenCalledWith("price_live_full");
    expect(createSession).toHaveBeenCalledWith(expect.objectContaining({
      line_items: [{ price_data: { currency: "usd", unit_amount: 114_950, product: "prod_immersion" }, quantity: 1 }],
      success_url: "https://akomapa.org/global-health-immersion-program?payment=success",
      metadata: expect.objectContaining({ terms_version: IMMERSION_TERMS_VERSION }),
      expires_at: expect.any(Number),
    }), expect.objectContaining({ idempotencyKey: expect.stringContaining("-initial-deposit-") }));
    createSession.mockClear();
    retrievePrice.mockResolvedValueOnce({ active: true, currency: "eur", type: "one_time", livemode: true, product: "prod_immersion" });
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
      customer: "cus_test", line_items: [{ price_data: { currency: "usd", unit_amount: 104_950, product: "prod_immersion" }, quantity: 1 }],
      payment_intent_data: { description: "Akomapa January 2027 Immersion Program — remaining balance" },
      metadata: expect.objectContaining({ deposit_session_id: "cs_deposit" }),
    }), expect.any(Object));
  });

  it("reuses an open checkout and blocks a second choice", async () => {
    const token = signInviteToken("test@example.com", "session", secret, 60);
    const cookie = `${IMMERSION_COOKIE}=${token}`;
    listCustomers.mockResolvedValue({ data: [{ id: "cus_test", metadata: { program: "global-health-immersion" } }], has_more: false });
    listSessions.mockResolvedValue({ data: [{ id: "cs_open", status: "open", payment_status: "unpaid", livemode: false,
      mode: "payment", payment_link: null, metadata: { program: "global-health-immersion", payment_type: "deposit", selected_email: "test@example.com", fee_total_cents: "229900", terms_version: IMMERSION_TERMS_VERSION },
      amount_total: 114_950, currency: "usd", customer_details: { email: "test@example.com" }, customer: "cus_test",
      url: "https://checkout.stripe.com/c/pay/existing", expires_at: Math.floor(Date.now() / 1000) + 3600 }], has_more: false });
    const existing = await checkout(post("/api/immersion/checkout", { choice: "deposit" }, cookie));
    expect(await existing.json()).toEqual({ url: "https://checkout.stripe.com/c/pay/existing" });
    expect((await checkout(post("/api/immersion/checkout", { choice: "full" }, cookie))).status).toBe(409);
    expect(createSession).not.toHaveBeenCalled();
  });
});
