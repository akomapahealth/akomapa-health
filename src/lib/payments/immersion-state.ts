import "server-only";
import { createHmac } from "node:crypto";
import type Stripe from "stripe";
import { IMMERSION_DEPOSIT_CENTS, IMMERSION_FULL_CENTS, IMMERSION_VALERIE_DEPOSIT_CENTS, IMMERSION_VALERIE_FULL_CENTS, type ImmersionMode } from "./immersion";

const LEGACY_DEPOSIT_CENTS = 124_950;
const LEGACY_FULL_CENTS = 249_900;
const LEGACY_SCHOLARSHIP_FULL_CENTS = 200_000;

export type ImmersionPaymentChoice = "deposit" | "full" | "balance";
export type ImmersionPaymentStage = "initial" | "balance" | "paid" | "pending" | "unavailable" | "closed";

type SessionSummary = Pick<Stripe.Checkout.Session,
  "id" | "status" | "payment_status" | "metadata" | "amount_total" | "currency" |
  "mode" | "payment_link" | "customer_details" | "expires_at" | "url" | "customer" | "livemode">;

export type ImmersionPaymentState = {
  stage: ImmersionPaymentStage;
  customerId?: string;
  depositSessionId?: string;
  depositAmount?: number;
  depositTotalCents?: number;
  openSession?: { id: string; choice: ImmersionPaymentChoice; url: string; amount: number; termsVersion?: string };
  attemptNumber: number;
};

export function inviteeFingerprint(email: string, secret: string) {
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

function validChoice(session: SessionSummary, email: string, mode: ImmersionMode): ImmersionPaymentChoice | null {
  const choice = session.metadata?.payment_type;
  if (choice !== "deposit" && choice !== "full" && choice !== "balance") return null;
  const total = Number(session.metadata?.fee_total_cents);
  const newTotal = total === IMMERSION_FULL_CENTS || total === IMMERSION_VALERIE_FULL_CENTS;
  const depositAmount = Number(session.metadata?.deposit_amount_cents);
  const amount = newTotal
    ? choice === "full" ? total : choice === "deposit" ? total / 2 : total - depositAmount
    : choice === "full" ? session.metadata?.scholarship_cents === "49900" ? LEGACY_SCHOLARSHIP_FULL_CENTS : LEGACY_FULL_CENTS
      : LEGACY_DEPOSIT_CENTS;
  if (newTotal && choice === "balance" &&
    depositAmount !== LEGACY_DEPOSIT_CENTS && depositAmount !== IMMERSION_DEPOSIT_CENTS &&
    depositAmount !== IMMERSION_VALERIE_DEPOSIT_CENTS) return null;
  if (!newTotal && session.metadata?.fee_total_cents) return null;
  if (session.livemode !== (mode === "live") || session.mode !== "payment" || session.payment_link ||
    session.metadata?.program !== "global-health-immersion" ||
    session.metadata.selected_email?.toLowerCase() !== email.toLowerCase() ||
    session.currency !== "usd" || session.amount_total !== amount) return null;
  if (session.status === "complete" &&
    session.customer_details?.email?.toLowerCase() !== email.toLowerCase()) return null;
  return choice;
}

export function summarizeImmersionSessions(sessions: SessionSummary[], email: string, mode: ImmersionMode = "test"): ImmersionPaymentState {
  const relevant = sessions.flatMap((session) => {
    const choice = validChoice(session, email, mode);
    return choice ? [{ session, choice }] : [];
  });
  const paid = relevant.filter(({ session }) => session.status === "complete" && session.payment_status === "paid");
  const full = paid.find(({ choice }) => choice === "full");
  const deposit = paid.find(({ choice }) => choice === "deposit");
  const balance = paid.find(({ choice, session }) => choice === "balance" && deposit &&
    session.metadata?.deposit_session_id === deposit.session.id && session.customer === deposit.session.customer &&
    (!session.metadata?.fee_total_cents || session.metadata?.deposit_amount_cents === String(deposit.session.amount_total)));
  if (full || (deposit && balance)) return { stage: "paid", attemptNumber: 0 };
  if (paid.some(({ choice }) => choice === "balance") && !balance) return { stage: "unavailable", attemptNumber: 0 };

  const stage = deposit ? "balance" : "initial";
  const stageChoices: ImmersionPaymentChoice[] = stage === "balance" ? ["balance"] : ["deposit", "full"];
  const attempts = relevant.filter(({ choice }) => stageChoices.includes(choice));
  if (attempts.some(({ session }) => session.status === "complete" && session.payment_status === "unpaid")) {
    return { stage: "pending", attemptNumber: 0 };
  }
  const active = attempts.find(({ session }) => session.status === "open" &&
    Boolean(session.url) && (session.expires_at ?? 0) > Date.now() / 1000);
  const customer = deposit?.session.customer || active?.session.customer ||
    relevant.find(({ session }) => session.customer)?.session.customer;
  return {
    stage,
    customerId: typeof customer === "string" ? customer : undefined,
    depositSessionId: deposit?.session.id,
    depositAmount: deposit?.session.amount_total ?? undefined,
    depositTotalCents: deposit?.session.metadata?.fee_total_cents ? Number(deposit.session.metadata.fee_total_cents) : undefined,
    openSession: active?.session.url ? { id: active.session.id, choice: active.choice, url: active.session.url,
      amount: active.session.amount_total ?? 0, termsVersion: active.session.metadata?.terms_version } : undefined,
    attemptNumber: attempts.filter(({ session }) => session.status === "expired" ||
      (session.status === "open" && (session.expires_at ?? 0) <= Date.now() / 1000)).length,
  };
}

export async function loadImmersionPaymentState(stripe: Stripe, email: string, mode: ImmersionMode = "test"): Promise<ImmersionPaymentState> {
  const customers = await stripe.customers.list({ email, limit: 100 });
  if (customers.has_more) throw new Error("Too many matching customers");
  const matching = customers.data.filter((customer) =>
    !customer.deleted && customer.metadata?.program === "global-health-immersion");
  if (matching.length > 10) throw new Error("Too many Immersion customers");
  const lists = await Promise.all(matching.map((customer) =>
    stripe.checkout.sessions.list({ customer: customer.id, limit: 100 })));
  if (lists.some((list) => list.has_more)) throw new Error("Too many Immersion Checkout Sessions");
  const state = summarizeImmersionSessions(lists.flatMap((list) => list.data), email, mode);
  return { ...state, customerId: state.customerId || matching[0]?.id };
}
