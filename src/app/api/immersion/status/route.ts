import { NextRequest } from "next/server";
import Stripe from "stripe";
import { noStoreJson } from "@/lib/http/public-api-security";
import { findInvitee, getImmersionConfig, IMMERSION_COOKIE, verifyInviteToken } from "@/lib/payments/immersion";
import { loadImmersionPaymentState } from "@/lib/payments/immersion-state";
import { immersionCheckoutWindow } from "@/lib/payments/immersion-terms";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const config = getImmersionConfig();
  if (!config) return noStoreJson({ verified: false }, 200);
  const email = verifyInviteToken(request.cookies.get(IMMERSION_COOKIE)?.value, "session", config.secret);
  const person = email && findInvitee(config.roster, email);
  if (!person) return noStoreJson({ verified: false }, 200);
  try {
    const state = await loadImmersionPaymentState(new Stripe(config.stripeKey), person.email, config.mode);
    const stage = config.mode === "live" && (state.stage === "initial" || state.stage === "balance") &&
      !immersionCheckoutWindow(state.stage === "balance" ? "balance" : "deposit").open ? "closed" : state.stage;
    return noStoreJson({ verified: true, firstName: person.name.split(/\s+/)[0], paymentStage: stage }, 200);
  } catch {
    console.error("Immersion payment status lookup failed");
    return noStoreJson({ verified: true, firstName: person.name.split(/\s+/)[0], paymentStage: "unavailable" }, 200);
  }
}
