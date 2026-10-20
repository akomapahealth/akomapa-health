import Stripe from "stripe";
import {
  IMMERSION_DEPOSIT_CENTS,
  IMMERSION_FULL_CENTS,
  findInvitee,
  getImmersionConfig,
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

  const config = getImmersionConfig();
  const webhookSecret = process.env.STRIPE_IMMERSION_WEBHOOK_SECRET;
  if (!config || !webhookSecret) {
    return new Response(null, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response(null, { status: 400 });

  let event: Stripe.Event;
  try {
    event = new Stripe(config.stripeKey).webhooks.constructEvent(
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

  const paymentType = session.metadata?.payment_type;
  const selectedEmail = session.metadata?.selected_email;
  if (session.payment_link || session.metadata?.program !== "global-health-immersion" ||
    (paymentType !== "deposit" && paymentType !== "full" && paymentType !== "balance") || !selectedEmail ||
    !findInvitee(config.roster, selectedEmail) ||
    session.customer_details?.email?.toLowerCase() !== selectedEmail.toLowerCase()) {
    return Response.json({ received: true });
  }

  const expectedAmount = paymentType === "full" ? IMMERSION_FULL_CENTS : IMMERSION_DEPOSIT_CENTS;
  if (session.currency !== "usd" || session.amount_total !== expectedAmount) {
    console.error("Immersion Stripe amount mismatch", { eventId: event.id });
    return new Response(null, { status: 500 });
  }

  if (paymentType === "balance") {
    const depositId = session.metadata?.deposit_session_id;
    if (!depositId?.startsWith("cs_") || !session.customer) return new Response(null, { status: 500 });
    try {
      const deposit = await new Stripe(config.stripeKey).checkout.sessions.retrieve(depositId);
      if (deposit.status !== "complete" || deposit.payment_status !== "paid" ||
        deposit.metadata?.payment_type !== "deposit" ||
        deposit.metadata?.program !== "global-health-immersion" ||
        deposit.metadata.selected_email?.toLowerCase() !== selectedEmail.toLowerCase() ||
        deposit.amount_total !== IMMERSION_DEPOSIT_CENTS || deposit.currency !== "usd" ||
        deposit.customer !== session.customer) return new Response(null, { status: 500 });
    } catch {
      console.error("Immersion deposit verification failed", { eventId: event.id });
      return new Response(null, { status: 503 });
    }
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
