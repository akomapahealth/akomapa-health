import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { signInviteToken, IMMERSION_COOKIE } from "@/lib/payments/immersion";
import { POST as requestLink } from "../request-link/route";
import { GET as verify } from "../verify/route";
import { GET as status } from "../status/route";
import { POST as checkout } from "../checkout/route";

const createCustomer = vi.fn().mockResolvedValue({ id: "cus_test" });
const createSession = vi.fn().mockResolvedValue({ url: "https://checkout.stripe.com/c/pay/cs_test" });
vi.mock("stripe", () => ({ default: class { customers = { create: createCustomer }; checkout = { sessions: { create: createSession } }; } }));

const secret = "x".repeat(48);
const base = "https://preview.example.com";
function post(path: string, body: object, cookie?: string) {
  return new NextRequest(`${base}${path}`, {
    method: "POST",
    headers: { origin: base, "content-type": "application/json", ...(cookie ? { cookie } : {}) },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED", "true");
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fixture");
  vi.stubEnv("STRIPE_IMMERSION_DEPOSIT_PRICE_ID", "price_deposit");
  vi.stubEnv("STRIPE_IMMERSION_FULL_PRICE_ID", "price_full");
  vi.stubEnv("IMMERSION_INVITE_TOKEN_SECRET", secret);
  vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([{ name: "Test Participant", email: "test@example.com" }]));
  vi.stubEnv("RESEND_API_KEY", "re_fixture");
  vi.stubEnv("FORM_NOTIFICATION_FROM", "Akomapa <test@example.com>");
  vi.stubEnv("FORM_NOTIFICATION_TO", "staff@example.com");
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.clearAllMocks(); });

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
    expect(await lookup.json()).toEqual({ verified: true, firstName: "Test" });
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
    expect(createCustomer).toHaveBeenCalledWith(expect.objectContaining({ email: "test@example.com" }));
    expect(createSession).toHaveBeenCalledWith(expect.objectContaining({
      customer: "cus_test", line_items: [{ price: "price_deposit", quantity: 1 }],
    }));
  });
});
