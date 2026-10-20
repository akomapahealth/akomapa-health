import { NextRequest } from "next/server";
import Stripe from "stripe";
import { noStoreJson, readSecureJson } from "@/lib/http/public-api-security";
import { findInvitee, getImmersionConfig, IMMERSION_COOKIE, IMMERSION_PATH, verifyInviteToken } from "@/lib/payments/immersion";
import { inviteeFingerprint, loadImmersionPaymentState } from "@/lib/payments/immersion-state";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const config = getImmersionConfig();
  if (!config) return noStoreJson({ error: "Checkout is unavailable" }, 503);
  const parsed = await readSecureJson(request, 512);
  if (!parsed.ok) return parsed.response;
  const choice = typeof parsed.body === "object" && parsed.body !== null && "choice" in parsed.body ? parsed.body.choice : null;
  if (choice !== "deposit" && choice !== "full" && choice !== "balance") return noStoreJson({ error: "Choose a payment option" }, 400);
  const email = verifyInviteToken(request.cookies.get(IMMERSION_COOKIE)?.value, "session", config.secret);
  const person = email && findInvitee(config.roster, email);
  if (!person) return noStoreJson({ error: "Please verify your email again" }, 401);
  try {
    const stripe = new Stripe(config.stripeKey);
    const state = await loadImmersionPaymentState(stripe, person.email);
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
    const fingerprint = inviteeFingerprint(person.email, config.secret);
    const customerId = state.customerId || (await stripe.customers.create({
      name: person.name,
      email: person.email,
      metadata: { program: "global-health-immersion" },
    }, { idempotencyKey: `immersion-customer-${fingerprint}` })).id;
    if (choice === "balance" && !state.depositSessionId) throw new Error("Missing paid deposit");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: choice === "deposit" ? config.depositPrice : choice === "full" ? config.fullPrice : config.balancePrice, quantity: 1 }],
      customer: customerId,
      metadata: { program: "global-health-immersion", payment_type: choice, selected_email: person.email,
        ...(choice === "balance" ? { deposit_session_id: state.depositSessionId } : {}) },
      success_url: new URL(`${IMMERSION_PATH}?payment=success`, request.nextUrl.origin).toString(),
      cancel_url: new URL(`${IMMERSION_PATH}?payment=cancelled`, request.nextUrl.origin).toString(),
    }, { idempotencyKey: `immersion-checkout-${fingerprint}-${state.stage}-${state.attemptNumber}` });
    if (!session.url || !session.url.startsWith("https://checkout.stripe.com/")) throw new Error("Missing checkout URL");
    return noStoreJson({ url: session.url }, 200);
  } catch {
    console.error("Immersion checkout creation failed");
    return noStoreJson({ error: "Checkout is unavailable. Please try again later." }, 503);
  }
}
