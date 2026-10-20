# Immersion Stripe preview handoff

The Immersion payment flow is a sandbox test. It is enabled only when `VERCEL_ENV=preview` (or local development) and `NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED=true`. Production stays off until Akomapa approves the complete public terms, live Stripe resources, and a separate launch change. The remaining $1,249.50 balance is due **November 30, 2026 at 11:59 p.m. Eastern Time**; a depositor can return to the verified page and pay it through a new Stripe Checkout Session. The charge is initiated by the participant, not scheduled automatically. The executives approved the core refund rule for the Preview copy: the 50% deposit portion is nonrefundable on participant cancellation; a full-fee payer who cancels by **November 29, 2026 at 11:59 p.m. Eastern Time** receives the other $1,249.50 back; and Akomapa refunds all payments if it cancels or cannot offer a place. The extended terms draft and its open decisions remain in a Git-ignored local file for review.

## Selected applicants and verification

The roster is a **server-only** Preview environment value named `IMMERSION_SELECTED_PARTICIPANTS_JSON`. It is a JSON array of `{ "name": "Full Name", "email": "address@example.com" }` objects. A temporary test entry may also include an ISO timestamp such as `"expiresAt": "2026-10-22T00:00:00Z"`; verification and checkout reject that entry after expiration, including on old Preview deployments. The 14 supplied participants are in the ignored local file `.env.immersion-roster.local` (mode 0600), ready to copy as the value. Do not commit or expose it as a `NEXT_PUBLIC_` variable. Protect Vercel project access because anyone who can view its sensitive environment variables can view the roster. To add/remove an invitee, update that variable and redeploy. For permanent removals, disable old deployments or rotate the sandbox key because immutable Preview URLs keep their old roster.

The visitor confirms they applied, enters their registered email, and receives a 15-minute verification link if it matches the roster. The response to a lookup is the same whether or not the email is selected; this avoids revealing cohort membership. The message points people to Contact Us and a future cohort. A successful link sets a signed, HttpOnly, two-hour cookie. The first name and payment choices appear only after the server verifies the cookie and checks that the invitee remains on the roster. Server routes verify the cookie again before creating each Stripe Checkout Session. A public email address alone cannot unlock the buttons. A forwarded verification link could still be used during its lifetime; a durable single-use token store would be needed to prevent that.

The previous deposit and full-fee sandbox Payment Links (`plink_1USTRBCGfDUBJPt0PrfT0kPS`, `plink_1USTRHCGfDUBJPt0uLPk8FLk`) were deactivated on October 20, 2026. Their URLs are no longer accepted, even if someone saved or shared them. The associated **sandbox Prices** are reused by server-created Checkout Sessions. Stripe remains the payment record.

## Preview settings

Set these in the `akomapa-staging` Vercel project for the desired Preview branch (`dev` after merge). Use **Sensitive** for secrets and the roster. Redeploy after changing values.

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED` | `true` |
| `IMMERSION_SELECTED_PARTICIPANTS_JSON` | Entire JSON value from ignored `.env.immersion-roster.local` |
| `IMMERSION_INVITE_TOKEN_SECRET` | New random secret of at least 32 characters, server-only |
| `STRIPE_SECRET_KEY` | Rotated sandbox `sk_test_` key, server-only |
| `STRIPE_IMMERSION_DEPOSIT_PRICE_ID` | `price_1USTQsCGfDUBJPt0kCpqL0bB` |
| `STRIPE_IMMERSION_FULL_PRICE_ID` | `price_1USTQwCGfDUBJPt0bA9jS4p7` |
| `STRIPE_IMMERSION_BALANCE_PRICE_ID` | `price_1UShEGCGfDUBJPt0OzIvLagp` |
| `STRIPE_IMMERSION_WEBHOOK_SECRET` | Signing secret for this Preview webhook destination |
| `RESEND_API_KEY` | Existing email service key |
| `FORM_NOTIFICATION_FROM` | Existing verified sender, used for verification and staff alerts |
| `FORM_NOTIFICATION_TO` | Existing private intake mailbox |

Remove the obsolete `NEXT_PUBLIC_IMMERSION_STRIPE_DEPOSIT_URL`, `NEXT_PUBLIC_IMMERSION_STRIPE_FULL_URL`, `STRIPE_IMMERSION_DEPOSIT_LINK_ID`, and `STRIPE_IMMERSION_FULL_LINK_ID` settings after the new deployment is verified. Do not set the enable flag for Production. The server requires the sandbox key and valid configuration before showing the section.

## Stripe and webhook

The connected account is Akomapa Health Foundation Inc sandbox (`acct_1USSpJCGfDUBJPt0`). Prices are USD $1,249.50 deposit, $2,499 full fee, and $1,249.50 balance. Checkout creates or reuses a Customer with the selected applicant's name and email, then uses that Customer in a hosted Session so the receipt address is locked to the verified email. Once Stripe shows a paid deposit, the verified page offers only the balance button. Once the full fee is paid, it offers no payment button. Each button opens a new tab at `checkout.stripe.com`; no future charge is scheduled. The server rechecks Stripe payment history before creating a Session, reuses an open Session, and uses a deterministic idempotency key to limit concurrent duplicates. Staff should still reconcile unusual duplicate or disputed charges in Stripe.

The sandbox webhook destination is `we_1USTlFCGfDUBJPt0wsG5NWVj`. Check its **current URL in Stripe** before testing; it must point to `https://<current-preview-host>/api/stripe/immersion-webhook`. It subscribes to `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Vercel deployment URLs change after pushes, so update the destination when the Preview host changes. Store that destination's signing secret in Vercel. The webhook verifies Stripe's signature and the paid Session, then checks the program metadata, selected email, USD currency, and exact amount. It sends the intake mailbox the payer details, payment choice, amount, Checkout Session ID, and event ID. Resend's idempotency key uses the Stripe event ID; staff should reconcile by Session ID. A failed alert returns an error for Stripe retry.

In sandbox Settings → Business → Customer emails, **Successful payments** is on. In Settings → Business → Branding, Akomapa's dark wordmark is used for Checkout and the square mark for Email receipts. The owner confirmed the mark appears in the email preview and selected “Prefer logo over icon.” Stripe does not automatically email receipts for test charges. For live mode, recheck branding, support contact, and receipt settings. This is a payment receipt, not a donation tax acknowledgment or paid invoice.

## Acceptance check

1. On a Preview deployment, confirm the email field appears only after the checkbox. No payment button or public Stripe URL should appear before verification. Production must have no payment section.
2. Enter an unlisted synthetic email. Confirm the neutral message and Contact Us link, with no payment access. Enter a selected test address and follow its email link within 15 minutes. Confirm the first-name greeting and both payment choices.
3. Open both choices from desktop, mobile, and keyboard. Check each goes to a new Stripe tab with the correct amount and the verified email. Use test cards only.
4. Complete a sandbox deposit, return to the verified page, and confirm only **Pay remaining $1,249.50** appears. Complete the balance payment and confirm no payment button remains. With another temporary selected test entry, complete the full-fee checkout and confirm it also ends with no payment button. Confirm all Stripe Sessions and intake alerts. Check valid and invalid webhook signatures, delayed success, duplicate events, and notification failure.
5. Confirm both old Payment Links show Stripe's deactivated page. Rotate the exposed test key if it has not already been rotated.

## Before live launch

Akomapa must resolve the remaining policy decisions, approve and publish the complete balance/refund/acceptance language, and add explicit terms acceptance before live Checkout. Then create separate **live** Prices, a live webhook destination/signing secret, live secret key, and live receipt/branding settings. Build a separate production enablement change and run real low-value verification with an approved payment method. Do not reuse sandbox IDs or secrets.
