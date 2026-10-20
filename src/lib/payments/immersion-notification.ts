import type Stripe from "stripe";
import { getResendConfig } from "@/lib/intake/server/config";
import { IMMERSION_BALANCE_DUE_LABEL } from "@/lib/payments/immersion-terms";

const RESEND_EMAILS_URL = "https://api.resend.com/emails";

export async function sendImmersionPaymentNotification({
  eventId,
  session,
  paymentType,
}: {
  eventId: string;
  session: Stripe.Checkout.Session;
  paymentType: "deposit" | "full";
}) {
  const { apiKey, from, to } = getResendConfig();
  const name = session.customer_details?.name || "Not provided";
  const email = session.customer_details?.email || "Not provided";
  const amount = ((session.amount_total ?? 0) / 100).toFixed(2);
  const text = [
    "Immersion Program payment completed in Stripe sandbox.",
    `Payment type: ${paymentType}`,
    `Amount: USD ${amount}`,
    `Payer name: ${name}`,
    `Payer email: ${email}`,
    `Selected applicant email: ${session.metadata?.selected_email || "Not provided"}`,
    `Checkout Session: ${session.id}`,
    `Stripe event: ${eventId}`,
    paymentType === "deposit"
      ? `Remaining program balance: USD 1,249.50 due ${IMMERSION_BALANCE_DUE_LABEL}. Arrange manual follow-up.`
      : "Program fee paid in full.",
    "Verify the payment in Stripe before taking action. Payment does not confirm program acceptance.",
  ].join("\n");

  const response = await fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `immersion-payment/${eventId}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Immersion ${paymentType} payment · ${session.id}`,
      text,
    }),
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Resend rejected payment notification: ${response.status}`);
  }
}
