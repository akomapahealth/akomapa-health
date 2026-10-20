import Stripe from "stripe";
import {
  IMMERSION_DEPOSIT_CENTS,
  IMMERSION_FULL_CENTS,
} from "@/lib/payments/immersion";
import { sendImmersionPaymentNotification } from "@/lib/payments/immersion-notification";

export const runtime = "nodejs";

const paymentEvents = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export async function POST(request: Request) {
  if (
    process.env.VERCEL_ENV !== "preview" &&
    process.env.NODE_ENV !== "development"
  ) {
    return new Response(null, { status: 404 });
  }

  const apiKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_IMMERSION_WEBHOOK_SECRET;
  const depositLinkId = process.env.STRIPE_IMMERSION_DEPOSIT_LINK_ID;
  const fullLinkId = process.env.STRIPE_IMMERSION_FULL_LINK_ID;
  if (!apiKey || !webhookSecret || !depositLinkId || !fullLinkId) {
    return new Response(null, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response(null, { status: 400 });

  let event: Stripe.Event;
  try {
    event = new Stripe(apiKey).webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret,
    );
  } catch {
    return new Response(null, { status: 400 });
  }

  if (!paymentEvents.has(event.type)) {
    return Response.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (
    event.livemode ||
    session.livemode ||
    session.mode !== "payment" ||
    session.payment_status !== "paid"
  ) {
    return Response.json({ received: true });
  }

  const linkId =
    typeof session.payment_link === "string"
      ? session.payment_link
      : session.payment_link?.id;
  const paymentType =
    linkId === depositLinkId
      ? "deposit"
      : linkId === fullLinkId
        ? "full"
        : null;
  if (!paymentType) return Response.json({ received: true });

  const expectedAmount =
    paymentType === "deposit" ? IMMERSION_DEPOSIT_CENTS : IMMERSION_FULL_CENTS;
  if (session.currency !== "usd" || session.amount_total !== expectedAmount) {
    console.error("Immersion Stripe amount mismatch", { eventId: event.id });
    return new Response(null, { status: 500 });
  }

  try {
    await sendImmersionPaymentNotification({
      eventId: event.id,
      session,
      paymentType,
    });
  } catch {
    console.error("Immersion Stripe notification failed", { eventId: event.id });
    return new Response(null, { status: 503 });
  }

  return Response.json({ received: true });
}
