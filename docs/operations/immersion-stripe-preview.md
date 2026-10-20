# Immersion Stripe preview runbook

This is a sandbox payment test for the Global Health Immersion Program. The
payment section and webhook operate in Vercel preview deployments (or local
development) only. Production remains disabled. Stripe is the payment system
of record; an email alert is only a prompt for staff follow-up.

## Provisioned sandbox resources (October 19, 2026)

The connected sandbox account is **Akomapa Health Foundation Inc sandbox**
(`acct_1USSpJCGfDUBJPt0`). These are one-time USD payments, with no automatic
charge for the remaining deposit balance:

| Choice | Price ID | Payment Link ID | Public checkout URL |
| --- | --- | --- | --- |
| $1,249.50 deposit | `price_1USTQsCGfDUBJPt0kCpqL0bB` | `plink_1USTRBCGfDUBJPt0PrfT0kPS` | https://buy.stripe.com/test_aFadR8gXn4513M908hgEg00 |
| $2,499.00 full fee | `price_1USTQwCGfDUBJPt0bA9jS4p7` | `plink_1USTRHCGfDUBJPt0uLPk8FLk` | https://buy.stripe.com/test_7sY00i5eF0SP5Uh4oxgEg01 |

The sandbox webhook endpoint is `we_1USTlFCGfDUBJPt0wsG5NWVj`. It currently
targets
`https://akomapa-staging-frigowpcf-akomapa-healths-projects.vercel.app/api/stripe/immersion-webhook`.
This is a deployment-specific URL: update the destination in Stripe when
switching the test to another preview deployment. Keep its `whsec_` signing
secret in Vercel Preview settings only.

Both checkout choices completed successfully in the sandbox and produced
`checkout.session.completed` events. The deposit Session is
`cs_test_a1OpwagJ20TzcG02a1IK7FvJpeF9hJNzylv99d5Ruk7hwr3kg2ZVsxZrDT`;
the full-fee Session is
`cs_test_a1Wp5VnmFLHHA708xkL0bGzdk3U5MS0Vv0HMyNiGVkcQ1LerC9O4EQT3wH`.
The intake mailbox received both staff alerts. The deployed webhook rejected
an invalid Stripe signature with HTTP 400. Unit tests cover event replay with
the same Resend idempotency key, delayed-payment success, and notification
failure. Stripe created online receipt URLs for both test charges; it does not
automatically email test-mode receipts.

## Stripe account and sandbox

1. Use the official Stripe plugin and OAuth connection to the organization's
   sandbox account. Confirm the `stripe_implementation_planner` tool and run it
   with Akomapa's one-time Immersion payment context before creating resources.
   If this tool remains unavailable after reconnecting in a fresh Codex session,
   use the Stripe documentation skills fallback.
2. Rotate the sandbox secret key shared during setup. Do not paste its replacement
   into Git, issue comments, screenshots, shell commands, or logs. Store the
   replacement and webhook signing secret as sensitive preview deployment
   values. The public publishable key is not needed by this hosted-link flow.
3. In the Stripe sandbox, create a one-time USD product/price for **Immersion
   Program deposit** at **$1,249.50** and another for **Immersion Program full
   fee** at **$2,499.00**. Do not configure recurring billing or automatic
   future charges. The deposit leaves **$1,249.50** for manual follow-up.
4. Create one Payment Link for each price, quantity one. Collect the payer's
   email and require their individual full name. Give each link a clear
   description and metadata such as `program=global-health-immersion-2027` and
   `payment_type=deposit` or `full`. Use the same values in PaymentIntent
   metadata if the link editor offers it. Configure an Akomapa confirmation
   message that says payment does not confirm program acceptance. Keep tax and
   promotion-code settings off unless Finance explicitly approves them.
5. Record each link's `plink_` ID and `https://buy.stripe.com/test_...` URL.
   Do not substitute live links into the preview configuration. The page
   rejects non-sandbox checkout URLs.

## Preview deployment settings

Set these on the **Preview** environment only:

| Setting | Value |
| --- | --- |
| `NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED` | `true` |
| `NEXT_PUBLIC_IMMERSION_STRIPE_DEPOSIT_URL` | Sandbox deposit Payment Link URL |
| `NEXT_PUBLIC_IMMERSION_STRIPE_FULL_URL` | Sandbox full-fee Payment Link URL |
| `STRIPE_IMMERSION_DEPOSIT_LINK_ID` | Sandbox deposit `plink_` ID |
| `STRIPE_IMMERSION_FULL_LINK_ID` | Sandbox full-fee `plink_` ID |
| `STRIPE_SECRET_KEY` | Rotated sandbox key, sensitive/server-only |
| `STRIPE_IMMERSION_WEBHOOK_SECRET` | Preview webhook `whsec_` secret, sensitive/server-only |
| `RESEND_API_KEY` | Existing staff notification key, sensitive/server-only |
| `FORM_NOTIFICATION_FROM` | Existing verified sender |
| `FORM_NOTIFICATION_TO` | Existing private intake mailbox |

Never set the enable flag for Production. The code also checks
`VERCEL_ENV=preview` (or local `NODE_ENV=development`) before displaying the
section or accepting webhook events. Missing, malformed, or live Payment Link
URLs hide the entire section.

## Webhook and staff alert

After the preview deployment exists, create a **snapshot** webhook destination
for `https://<preview-host>/api/stripe/immersion-webhook`. Subscribe to
`checkout.session.completed` and `checkout.session.async_payment_succeeded`.
Store its signing secret in the preview deployment setting above. Each preview
host needs its own destination and signing secret if testing more than one.
The route verifies Stripe's signature over the raw request body, requires a
paid session, and matches its Payment Link ID, USD currency, and exact amount.
It then sends a staff email through Resend with payer name, email, amount,
payment choice, Checkout Session ID, and event ID. The Resend request uses the
event ID as its idempotency key. Resend retains idempotency keys for 24 hours;
staff should reconcile by Stripe Session ID if a later retry duplicates an
alert. A failed notification returns an error so Stripe retries it. No payer
details or credentials are written to application logs.

## Receipts and handoff

In Stripe's sandbox Dashboard, set the business display name to **Akomapa
Health Foundation**, choose brand colors, add the support email, and enable
**Successful payments** under Business → Customer emails. Under Business →
Branding, use `public/images/akomapa-logo-dark.png` as the wide **Logo** for
Checkout and Payment Links. [Stripe's branding matrix](https://docs.stripe.com/get-started/account/branding)
shows that emailed receipts use the square **Icon** instead of that Logo;
upload `public/apple-touch-icon.png` (180 × 180 pixels) in the Email receipts
branding settings and check its preview. The product and link descriptions
should clearly say **Immersion Program deposit** or **full fee**.
Stripe collects the email at Checkout and uses it for the receipt; require the
name for a more formal payer record. This is a **payment receipt**, not a
charitable-donation tax acknowledgment. Stripe does not email receipts for
test-mode charges, so inspect the preview in the Dashboard and perform an
end-to-end email check only after an approved live launch.

For each deposit alert, staff verify the payment in Stripe, match the payer to
their application manually, and contact them about the remaining $1,249.50
using a separately reviewed balance payment method. Do not mark a participant
accepted solely because a payment succeeded. Before live launch, Operations
and Finance must approve the balance due date, refund terms, and public legal
copy; create separate live resources and secrets, update the privacy/terms
pages, and review the preview test results before enabling production.

## Acceptance check

Use synthetic payer details and Stripe test payment methods. On a preview
deployment, confirm the section is hidden before configuration, then verify
the checkbox gates both choices, both links open a new tab, both amounts are
correct in Checkout, and neither test checkout appears on production. Complete
one payment for each link; verify the Stripe payment and one staff alert with
the matching Session ID. Replay an event to inspect idempotency, send an
invalid signature to confirm rejection, and inspect Stripe webhook delivery
logs for successful responses. Test a delayed-payment method if enabled in
the sandbox. Check keyboard navigation, a narrow mobile viewport, and dark
mode. Disable the flag and redeploy to roll back the preview section.
