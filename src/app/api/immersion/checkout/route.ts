import { NextRequest } from "next/server";
import Stripe from "stripe";
import { noStoreJson, readSecureJson } from "@/lib/http/public-api-security";
import { findInvitee, getImmersionConfig, IMMERSION_COOKIE, IMMERSION_PATH, verifyInviteToken } from "@/lib/payments/immersion";
import { inviteeFingerprint, loadImmersionPaymentState } from "@/lib/payments/immersion-state";
import { IMMERSION_TERMS_VERSION, immersionCheckoutWindow } from "@/lib/payments/immersion-terms";

export const runtime = "nodejs";

const PAYMENT_DESCRIPTIONS = {
  deposit: "Akomapa January 2027 Immersion Program — 50% deposit",
  full: "Akomapa January 2027 Immersion Program — full fee",
  balance: "Akomapa January 2027 Immersion Program — remaining balance",
} as const;

export async function POST(request: NextRequest) {
  const config = getImmersionConfig();
  if (!config) return noStoreJson({ error: "Checkout is unavailable" }, 503);
  const parsed = await readSecureJson(request, 512);
  if (!parsed.ok) return parsed.response;
  const choice = typeof parsed.body === "object" && parsed.body !== null && "choice" in parsed.body ? parsed.body.choice : null;
  if (choice !== "deposit" && choice !== "full" && choice !== "balance") return noStoreJson({ error: "Choose a payment option" }, 400);
  const acceptedTerms = typeof parsed.body === "object" && parsed.body !== null &&
    "acceptedTerms" in parsed.body && parsed.body.acceptedTerms === true &&
    "termsVersion" in parsed.body && parsed.body.termsVersion === IMMERSION_TERMS_VERSION;
  if (!acceptedTerms) return noStoreJson({ error: "Please read and accept the Immersion payment terms" }, 400);
  const email = verifyInviteToken(request.cookies.get(IMMERSION_COOKIE)?.value, "session", config.secret);
  const person = email && findInvitee(config.roster, email);
  if (!person) return noStoreJson({ error: "Please verify your email again" }, 401);
  const window = immersionCheckoutWindow(choice);
  if (config.mode === "live" && !window.open) {
    return noStoreJson({ error: "Online payment for this option has closed. Please contact Akomapa for help." }, 409);
  }
  try {
    const stripe = new Stripe(config.stripeKey);
    const state = await loadImmersionPaymentState(stripe, person.email, config.mode);
    if (state.stage !== "initial" && state.stage !== "balance") {
      return noStoreJson({ error: state.stage === "paid" ? "Your program fee is already paid in full." : "We cannot open another checkout right now. Please contact Akomapa if you need help." }, 409);
    }
    if ((state.stage === "balance") !== (choice === "balance")) {
      return noStoreJson({ error: "Please refresh the page to see your current payment option." }, 409);
    }
    if (state.openSession) {
      if (state.openSession.choice !== choice) return noStoreJson({ error: "A checkout is already open. Please finish it or try again after it expires." }, 409);
      return noStoreJson({ url: state.openSession.url }, 200);
    }
    const priceId = choice === "deposit" ? config.depositPrice : choice === "full" ? config.fullPrice : config.balancePrice;
    if (config.mode === "live") {
      const price = await stripe.prices.retrieve(priceId);
      const amount = choice === "full" ? 249_900 : 124_950;
      if (!price.active || price.currency !== "usd" || price.unit_amount !== amount || price.type !== "one_time" || price.livemode !== true) {
        throw new Error("Live Stripe Price does not match the program fee");
      }
    }
    const fingerprint = inviteeFingerprint(person.email, config.secret);
    const customerId = state.customerId || (await stripe.customers.create({
      name: person.name,
      email: person.email,
      metadata: { program: "global-health-immersion" },
    }, { idempotencyKey: `immersion-customer-${fingerprint}` })).id;
    if (choice === "balance" && !state.depositSessionId) throw new Error("Missing paid deposit");
    const now = Date.now();
    const liveExpiresAt = Math.floor(Math.max(now + 31 * 60 * 1000,
      Math.min(window.closeAt, now + (23 * 60 + 55) * 60 * 1000)) / 1000);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      payment_intent_data: { description: PAYMENT_DESCRIPTIONS[choice] },
      customer: customerId,
      metadata: { program: "global-health-immersion", payment_type: choice, selected_email: person.email,
        terms_version: IMMERSION_TERMS_VERSION, terms_accepted_at: new Date().toISOString(),
        ...(choice === "balance" ? { deposit_session_id: state.depositSessionId } : {}) },
      success_url: new URL(`${IMMERSION_PATH}?payment=success`, config.baseUrl || request.nextUrl.origin).toString(),
      cancel_url: new URL(`${IMMERSION_PATH}?payment=cancelled`, config.baseUrl || request.nextUrl.origin).toString(),
      ...(config.mode === "live" ? { expires_at: liveExpiresAt } : {}),
    }, { idempotencyKey: `immersion-checkout-${config.mode}-${IMMERSION_TERMS_VERSION}-${fingerprint}-${state.stage}-${choice}-${state.attemptNumber}` });
    if (!session.url || !session.url.startsWith("https://checkout.stripe.com/")) throw new Error("Missing checkout URL");
    return noStoreJson({ url: session.url }, 200);
  } catch {
    console.error("Immersion checkout creation failed");
    return noStoreJson({ error: "Checkout is unavailable. Please try again later." }, 503);
  }
}
