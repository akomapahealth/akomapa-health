import { NextRequest } from "next/server";
import Stripe from "stripe";
import { noStoreJson, readSecureJson } from "@/lib/http/public-api-security";
import { findInvitee, getImmersionConfig, IMMERSION_COOKIE, IMMERSION_PATH, verifyInviteToken } from "@/lib/payments/immersion";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const config = getImmersionConfig();
  if (!config) return noStoreJson({ error: "Checkout is unavailable" }, 503);
  const parsed = await readSecureJson(request, 512);
  if (!parsed.ok) return parsed.response;
  const choice = typeof parsed.body === "object" && parsed.body !== null && "choice" in parsed.body ? parsed.body.choice : null;
  if (choice !== "deposit" && choice !== "full") return noStoreJson({ error: "Choose a payment option" }, 400);
  const email = verifyInviteToken(request.cookies.get(IMMERSION_COOKIE)?.value, "session", config.secret);
  const person = email && findInvitee(config.roster, email);
  if (!person) return noStoreJson({ error: "Please verify your email again" }, 401);
  try {
    const stripe = new Stripe(config.stripeKey);
    const customer = await stripe.customers.create({
      name: person.name,
      email: person.email,
      metadata: { program: "global-health-immersion" },
    });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: choice === "deposit" ? config.depositPrice : config.fullPrice, quantity: 1 }],
      customer: customer.id,
      metadata: { program: "global-health-immersion", payment_type: choice, selected_email: person.email },
      success_url: new URL(`${IMMERSION_PATH}?payment=success`, request.nextUrl.origin).toString(),
      cancel_url: new URL(`${IMMERSION_PATH}?payment=cancelled`, request.nextUrl.origin).toString(),
      expires_at: Math.floor(Date.now() / 1000) + 31 * 60,
    });
    if (!session.url || !session.url.startsWith("https://checkout.stripe.com/")) throw new Error("Missing checkout URL");
    return noStoreJson({ url: session.url }, 200);
  } catch {
    console.error("Immersion checkout creation failed");
    return noStoreJson({ error: "Checkout is unavailable. Please try again later." }, 503);
  }
}
