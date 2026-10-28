import type { ImmersionPaymentChoice } from "./immersion-state";

export const IMMERSION_TERMS_VERSION = "2026-10-27-pilot-4";
export const IMMERSION_TERMS_PATH = "/global-health-immersion-program/payment-terms";

export const IMMERSION_BALANCE_DUE_LABEL =
  "November 30, 2026 at 11:59 p.m. Eastern Time";

export const IMMERSION_REFUND_REQUEST_CUTOFF_LABEL =
  "November 29, 2026 at 11:59 p.m. Eastern Time";

export const IMMERSION_GRACE_END_LABEL =
  "December 3, 2026 at 11:59 p.m. Eastern Time";

// Eastern Time is EST (UTC-5) on these dates. A checkout started just before
// closing may remain open for Stripe's minimum 30-minute Session lifetime.
const INITIAL_CLOSE_AT = Date.parse("2026-11-30T04:59:59Z");
const BALANCE_CLOSE_AT = Date.parse("2026-12-04T04:59:59Z");

export function immersionCheckoutWindow(choice: ImmersionPaymentChoice, now = Date.now()) {
  const closeAt = choice === "balance" ? BALANCE_CLOSE_AT : INITIAL_CLOSE_AT;
  return { open: now <= closeAt, closeAt };
}
