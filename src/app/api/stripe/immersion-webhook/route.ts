import Stripe from "stripe";
import {
  IMMERSION_DEPOSIT_CENTS,
  IMMERSION_FULL_CENTS,
  getImmersionWebhookConfig,
} from "@/lib/payments/immersion";
import { sendImmersionPaymentNotification } from "@/lib/payments/immersion-notification";

export const runtime = "nodejs";

const paymentEvents = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export async function POST(request: Request) {
  // Existing Sessions may settle after staff switch off new checkouts.
  const config = getImmersionWebhookConfig();
  const webhookSecret = config?.webhookSecret;
  if (!config || !webhookSecret) {
    return new Response(null, { status: 404 });
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
    event.livemode !== (config.mode === "live") ||
    session.livemode !== (config.mode === "live") ||
    session.mode !== "payment" ||
    session.payment_status !== "paid"
  ) {
    return Response.json({ received: true });
  }

  const paymentType = session.metadata?.payment_type;
  const selectedEmail = session.metadata?.selected_email;
  if (session.payment_link || session.metadata?.program !== "global-health-immersion" ||
    (paymentType !== "deposit" && paymentType !== "full" && paymentType !== "balance") || !selectedEmail ||
    (config.mode === "live" && (!session.metadata?.terms_version || !session.metadata?.terms_accepted_at)) ||
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
        deposit.livemode !== (config.mode === "live") ||
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
