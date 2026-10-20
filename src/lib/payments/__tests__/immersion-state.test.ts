import { describe, expect, it } from "vitest";
import type Stripe from "stripe";
import { summarizeImmersionSessions } from "../immersion-state";

const email = "participant@example.com";

function session(id: string, choice: "deposit" | "full" | "balance", status: "complete" | "open" | "expired" = "complete", paymentStatus: "paid" | "unpaid" = "paid") {
  return {
    id, status, payment_status: paymentStatus, livemode: false, mode: "payment", payment_link: null,
    metadata: { program: "global-health-immersion", payment_type: choice, selected_email: email },
    amount_total: choice === "full" ? 249_900 : 124_950, currency: "usd",
    customer_details: { email }, customer: "cus_test", url: status === "open" ? "https://checkout.stripe.com/c/pay/test" : null,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  } as unknown as Stripe.Checkout.Session;
}

describe("Immersion Stripe payment state", () => {
  it("moves from initial to balance to paid using completed Stripe sessions", () => {
    const deposit = session("cs_deposit", "deposit");
    const balance = { ...session("cs_balance", "balance"), metadata: { program: "global-health-immersion", payment_type: "balance", selected_email: email, deposit_session_id: "cs_deposit" } };
    expect(summarizeImmersionSessions([], email).stage).toBe("initial");
    expect(summarizeImmersionSessions([deposit], email)).toMatchObject({ stage: "balance", depositSessionId: "cs_deposit", customerId: "cus_test" });
    expect(summarizeImmersionSessions([deposit, balance], email).stage).toBe("paid");
    expect(summarizeImmersionSessions([session("cs_full", "full")], email).stage).toBe("paid");
  });

  it("does not unlock payment from a forged, unpaid, or unrelated session", () => {
    const wrongEmail = { ...session("cs_wrong", "deposit"), metadata: { program: "global-health-immersion", payment_type: "deposit", selected_email: "other@example.com" } };
    const wrongAmount = { ...session("cs_wrong_amount", "deposit"), amount_total: 100 };
    expect(summarizeImmersionSessions([wrongEmail, wrongAmount], email).stage).toBe("initial");
    expect(summarizeImmersionSessions([session("cs_pending", "deposit", "complete", "unpaid")], email).stage).toBe("pending");
    expect(summarizeImmersionSessions([session("cs_orphan", "balance")], email).stage).toBe("unavailable");
    expect(summarizeImmersionSessions([session("cs_deposit", "deposit"), session("cs_unlinked", "balance")], email).stage).toBe("unavailable");
  });

  it("reuses an open checkout and prevents another payment choice", () => {
    expect(summarizeImmersionSessions([session("cs_open", "deposit", "open", "unpaid")], email).openSession)
      .toEqual({ choice: "deposit", url: "https://checkout.stripe.com/c/pay/test" });
  });

  it("keeps live and sandbox payment histories separate", () => {
    const sandboxDeposit = session("cs_test_deposit", "deposit");
    const liveDeposit = { ...session("cs_live_deposit", "deposit"), livemode: true };
    expect(summarizeImmersionSessions([sandboxDeposit], email, "live").stage).toBe("initial");
    expect(summarizeImmersionSessions([liveDeposit], email, "test").stage).toBe("initial");
    expect(summarizeImmersionSessions([liveDeposit], email, "live").stage).toBe("balance");
  });
});
