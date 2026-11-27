import { describe, expect, it } from "vitest";
import type Stripe from "stripe";
import { immersionPaymentResetSuffix, summarizeImmersionSessions } from "../immersion-state";

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
      .toMatchObject({ id: "cs_open", choice: "deposit", url: "https://checkout.stripe.com/c/pay/test", amount: 124_950 });
  });

  it("recognizes a $2,000 scholarship full payment only with the matching server metadata", () => {
    const paid = session("cs_scholarship", "full");
    paid.amount_total = 200_000;
    expect(summarizeImmersionSessions([paid], email).stage).toBe("initial");
    paid.metadata = { ...paid.metadata, scholarship_cents: "49900" };
    expect(summarizeImmersionSessions([paid], email).stage).toBe("paid");
  });

  it("tracks Valerie's new deposit and balance without accepting another amount", () => {
    const deposit = session("cs_valerie_deposit", "deposit");
    deposit.amount_total = 111_950;
    deposit.metadata = { ...deposit.metadata, fee_total_cents: "223900" };
    const balance = session("cs_valerie_balance", "balance");
    balance.amount_total = 111_950;
    balance.metadata = { ...balance.metadata, fee_total_cents: "223900", deposit_amount_cents: "111950", deposit_session_id: deposit.id };
    expect(summarizeImmersionSessions([deposit], email)).toMatchObject({ stage: "balance", depositAmount: 111_950, depositTotalCents: 223_900 });
    expect(summarizeImmersionSessions([deposit, balance], email).stage).toBe("paid");
    expect(summarizeImmersionSessions([deposit, { ...balance, amount_total: 114_950 }], email).stage).toBe("balance");
  });

  it("keeps live and sandbox payment histories separate", () => {
    const sandboxDeposit = session("cs_test_deposit", "deposit");
    const liveDeposit = { ...session("cs_live_deposit", "deposit"), livemode: true };
    expect(summarizeImmersionSessions([sandboxDeposit], email, "live").stage).toBe("initial");
    expect(summarizeImmersionSessions([liveDeposit], email, "test").stage).toBe("initial");
    expect(summarizeImmersionSessions([liveDeposit], email, "live").stage).toBe("balance");
  });

  it("removes only explicitly refunded payment credit and counts new payments normally", () => {
    const old = session("cs_test_refunded", "deposit");
    const refunded = [old.id];
    expect(summarizeImmersionSessions([old], email)).toMatchObject({ stage: "balance", depositAmount: 124_950 });
    expect(summarizeImmersionSessions([old], email, "test", refunded)).toMatchObject({ stage: "initial", customerId: "cus_test" });
    const deposit = { ...session("cs_test_newdeposit", "deposit"), amount_total: 111_950,
      metadata: { ...old.metadata, fee_total_cents: "223900" } };
    const balance = { ...session("cs_test_newbalance", "balance"), amount_total: 111_950,
      metadata: { ...deposit.metadata, payment_type: "balance", deposit_session_id: deposit.id, deposit_amount_cents: "111950" } };
    // Put the old deposit first: Stripe ordering must not restore its credit.
    expect(summarizeImmersionSessions([old, deposit], email, "test", refunded)).toMatchObject({
      stage: "balance", depositSessionId: deposit.id, depositAmount: 111_950, depositTotalCents: 223_900,
    });
    expect(summarizeImmersionSessions([old, deposit, balance], email, "test", refunded).stage).toBe("paid");
    const full = { ...session("cs_test_newfull", "full"), amount_total: 223_900,
      metadata: { ...old.metadata, payment_type: "full", fee_total_cents: "223900" } };
    expect(summarizeImmersionSessions([old, full], email, "test", refunded).stage).toBe("paid");
    expect(summarizeImmersionSessions([full], email, "test", [full.id]).stage).toBe("initial");
    expect(old.payment_status).toBe("paid");
  });

  it("does not let a refund exclusion bypass open or pending checkouts", () => {
    const pending = session("cs_test_pending", "deposit", "complete", "unpaid");
    expect(summarizeImmersionSessions([pending], email, "test", [pending.id]).stage).toBe("pending");
    const open = session("cs_test_open", "deposit", "open", "unpaid");
    expect(summarizeImmersionSessions([open], email, "test", [open.id]).openSession?.id).toBe(open.id);
  });

  it("changes the checkout namespace only when the set of refunded Sessions changes", () => {
    expect(immersionPaymentResetSuffix()).toBe("");
    expect(immersionPaymentResetSuffix([])).toBe("");
    const suffix = immersionPaymentResetSuffix(["cs_test_one", "cs_test_two"]);
    expect(suffix).toMatch(/^-reset-[a-f0-9]{16}$/);
    expect(immersionPaymentResetSuffix(["cs_test_two", "cs_test_one", "cs_test_one"])).toBe(suffix);
    expect(immersionPaymentResetSuffix(["cs_test_one"])).not.toBe(suffix);
  });
});
