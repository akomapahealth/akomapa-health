# Immersion Stripe live launch

The live flow is separate from the tested sandbox Preview. It remains off until all Production values are configured and `IMMERSION_STRIPE_LIVE_ENABLED=true`. The current Stripe MCP connection exposes only the sandbox, so live products, keys, and webhook must be created in Akomapa's live Stripe account or after live account access is granted. Never copy sandbox Prices, customer IDs, keys, or webhook secrets into Production.

## 1. Confirm the account and public offer

1. In Stripe Dashboard, switch to **live mode** and finish Stripe account activation, business details, payout account, support contact, and identity verification. Confirm this is Akomapa Health Foundation Inc's intended live account and that Stripe shows payments and payouts enabled. On October 20, 2026, the live account was connected but charges and payouts were disabled pending an identity-verification requirement; resolve that in Stripe before launch.
2. Use the canonical Production domain `https://www.akomapa.org`. Set `IMMERSION_LIVE_BASE_URL` to that HTTPS origin, with no path or trailing slash. The apex domain redirects to `www`; verification emails and Stripe return URLs should use the canonical domain directly.
3. Review the published [payment terms](/global-health-immersion-program/payment-terms) and the written offer/itinerary sent to each selected participant. The public terms state the total, deposit, balance deadline, inclusions, cancellation cutoff, exceptions, and refund process. The itinerary can carry operational details and specify which entry fees and materials, if any, are covered. Do not promise a place until Akomapa confirms it in writing.
4. Confirm the Production roster has only selected participants and that the team can handle the maximum 12 confirmed places manually. A payment does not automatically reserve a place; staff must stop invites or turn the flow off when capacity is reached.

## 2. Create separate live Stripe Prices

In **live mode**, create one product for the January 2027 Immersion Program with three **one-time USD Prices**:

| Price | Amount | Purpose |
| --- | ---: | --- |
| Deposit | $1,249.50 | First half of the $2,499 program fee; nonrefundable on participant cancellation |
| Full fee | $2,499.00 | Entire program fee in one payment |
| Balance | $1,249.50 | Second half, available only after a paid deposit |

The live product `prod_VThqwJNHEmtdVn` and Prices were created in account `acct_1USSpACQSVxDNx5D` and verified as active, one-time, USD, and in live mode:

| Production variable | Live Price ID |
| --- | --- |
| `STRIPE_IMMERSION_LIVE_DEPOSIT_PRICE_ID` | `price_1USkQdCQSVxDNx5DmgGahW0B` |
| `STRIPE_IMMERSION_LIVE_FULL_PRICE_ID` | `price_1USkQkCQSVxDNx5D7vCLmIS4` |
| `STRIPE_IMMERSION_LIVE_BALANCE_PRICE_ID` | `price_1USkQoCQSVxDNx5Dd0eTz8Gg` |

The server retrieves the selected live Price and verifies that it is active, one-time, USD, in live mode, and has the expected exact amount before creating a Checkout Session. Do not make public Payment Links for this invite-only flow.

### Individual $499 scholarship

For the approved recipient who has **not paid a deposit**, add `"scholarshipCents":49900` to only her object in the server-only `IMMERSION_SELECTED_PARTICIPANTS_JSON` roster. Leave all other roster records unchanged. The verified page then offers only a **$2,000 full payment** and applies the $499 scholarship in Stripe Checkout; everyone else retains the standard choices. Her existing personal direct link remains valid and does not reveal the award to others.

In Stripe **live mode**, create a fixed-amount **USD $499.00 coupon** named for the Immersion scholarship. Set duration to **once** and do not create a public promotion code. Record its coupon ID as `STRIPE_IMMERSION_LIVE_SCHOLARSHIP_COUPON_ID` in Vercel Production. Add **Coupons read** to the existing Immersion restricted key so the server can verify the coupon is valid, USD, live, and exactly $499 before opening Checkout. The coupon ID is optional for all other invitees; if missing or invalid, only the scholarship checkout fails closed. Do not set a one-redemption limit: an expired or canceled Checkout may need to be reopened. Staff should monitor Stripe for the first scholarship payment and confirm its total is $2,000 before marking it paid.

The approved policy keeps the first $1,249.50 nonrefundable on participant cancellation. A written cancellation received by November 29, 2026 at 11:59 p.m. Eastern can therefore refund $750.50 of this $2,000 payment. If Akomapa cancels the program or cannot offer a place, refund the full $2,000. Record the scholarship in the participant's written offer as well as the private roster. Do not send a standard $2,499 payment link to this recipient.

## 3. Create a restricted live key and webhook

1. In live-mode **API keys**, create a **restricted** server key (`rk_live_`) named for the Immersion production service. Give it only the permissions needed by the server: Customers read/write, Checkout Sessions read/write, Prices read, and Coupons read when an individual scholarship is configured. The webhook signature check itself does not require an API call, but balance verification retrieves a Checkout Session. If Stripe reports a missing permission, inspect the request log and grant only that resource permission.
2. Live webhook destination `we_1USkQwCQSVxDNx5Dsu4KZWIJ` is enabled at `https://www.akomapa.org/api/stripe/immersion-webhook` for snapshot `checkout.session.completed` and `checkout.session.async_payment_succeeded` events. Reveal this destination's own live `whsec_` signing secret in Stripe Dashboard and place it in Vercel Production; never record it here. The endpoint verifies the raw Stripe signature and exact program amount and alerts the staff mailbox only for paid Sessions. It ignores sandbox events.
3. Keep this webhook pointed at the stable production domain, not a versioned Vercel deployment URL. In Stripe Workbench, inspect delivery attempts after the first live payment. If an alert fails, Stripe retries; staff must reconcile Stripe payments against received alerts by Checkout Session ID.

## 4. Configure Vercel Production

Add these to the production Vercel project, scoped **Production** only. Mark the roster, token secret, restricted key, webhook secret, and Resend key as **Sensitive**. Set the enable switch last, then redeploy. Never paste secret values into Git, chat, screenshots, or public environment variables.

| Variable | Production value |
| --- | --- |
| `IMMERSION_STRIPE_LIVE_ENABLED` | `true` only at launch; omit or `false` while preparing |
| `IMMERSION_LIVE_BASE_URL` | `https://www.akomapa.org` |
| `IMMERSION_SELECTED_PARTICIPANTS_JSON` | Server-only JSON roster of selected participants; no temporary test entries |
| `IMMERSION_INVITE_TOKEN_SECRET` | New random value of at least 32 characters, different from Preview |
| `IMMERSION_DIRECT_INVITE_SECRET` | Optional separate random value of at least 32 characters for personal direct links; mark Sensitive |
| `STRIPE_IMMERSION_LIVE_RESTRICTED_KEY` | Live restricted `rk_live_` key |
| `STRIPE_IMMERSION_LIVE_DEPOSIT_PRICE_ID` | Live deposit Price ID |
| `STRIPE_IMMERSION_LIVE_FULL_PRICE_ID` | Live full-fee Price ID |
| `STRIPE_IMMERSION_LIVE_BALANCE_PRICE_ID` | Live balance Price ID |
| `STRIPE_IMMERSION_LIVE_SCHOLARSHIP_COUPON_ID` | Optional live $499 coupon ID for the approved roster award |
| `STRIPE_IMMERSION_LIVE_WEBHOOK_SECRET` | Signing secret of the live webhook destination |
| `RESEND_API_KEY` | Working production Resend key |
| `FORM_NOTIFICATION_FROM` | Verified Akomapa sender for verification emails and staff alerts |
| `FORM_NOTIFICATION_TO` | Staff intake mailbox, currently `info@akomapa.org` |

The Preview-only `NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED`, sandbox `STRIPE_SECRET_KEY`, sandbox Prices, and sandbox webhook secret are not used in Production. Production requires every live setting before the payment section appears. Keep Vercel Production deployment access limited; roster and keys are sensitive.

### Personal direct links for selected participants

This optional route lets Akomapa send each selected person a private link that opens the existing verified payment page without the email-entry step. The original email verification flow remains available. A direct link is a **reusable bearer credential**: anyone who gets it can open that person's payment choices until the link expires. Send it only to the matching registered address, never publish it, and do not include it in analytics or support tickets. The URL contains an opaque token, not a name or email address. Checkout still requires acceptance of the payment terms and the server still checks the selected roster and payment state.

1. Generate a new 32-byte secret locally and save it only in `.private/immersion-direct-invite-secret` (for example, `openssl rand -hex 32 > .private/immersion-direct-invite-secret && chmod 600 .private/immersion-direct-invite-secret`). Do not reuse the email verification signing secret.
2. Set that exact value as Sensitive `IMMERSION_DIRECT_INVITE_SECRET` in Vercel Production and redeploy. This variable is optional; if absent, direct links fail closed while the existing flow continues normally.
3. Run `npm run immersion:direct-invites` from the repository root. It reads the ignored `.env.immersion-roster.local` and the private secret file, then writes `.private/immersion-direct-invites.json` with one name, email, and link per selected person. Both private files are ignored by Git. Check that the roster still contains only the intended 14 people before sending.
4. Send each link privately to its matching email address. Do not send the whole file to participants. Opening the link sets the same two-hour verified session as the emailed link and redirects to the Immersion page; the applicant can reopen their personal link later to pay a remaining balance.

Direct links expire at **December 3, 2026 at 11:59 p.m. Eastern Time**, the end of the approved balance grace period. They are not one-time links because the participant may need to return for a balance payment. To revoke all direct links, remove or rotate `IMMERSION_DIRECT_INVITE_SECRET` and redeploy; to remove one person's access through either verification method, remove them from the selected roster and redeploy. Akomapa should retain its private list securely until invitations are complete, then delete the file when it is no longer needed.

## 5. Set up receipts and verify

1. In **live** Stripe **Settings → Business → Customer emails**, turn on **Successful payments** and **Refunds** if Akomapa wants automatic refund receipts.
2. In **Settings → Business → Branding**, review the Checkout logo, brand color `#0097b2`, support contact, and the Email receipts preview. Recheck the dark wordmark and square Akomapa mark in live mode; sandbox branding may not carry over. This is a **program payment receipt**, not a donation tax acknowledgment.
3. Before enabling the switch, test the exact code in Preview with sandbox data. Check email verification, deposit → balance, full-fee, invalid roster address, expired link, amount mismatch, missing configuration, duplicate checkout, signed webhook, staff alert, and mobile/keyboard access. Review the tests and Vercel deployment logs.
4. After enabling Production, verify the payment section and terms link on the actual public domain without submitting a payment. Do not make a synthetic $1,249.50 charge just to test live mode. Treat the first selected participant's real payment as a closely monitored launch: confirm Stripe's Payment and Checkout Session, live webhook delivery, customer receipt, and staff alert. If Akomapa separately authorizes a live verification payment, account for the real charge and any fees before refunding it.
5. Record who checks new payments and confirms places, who handles refund requests, and who reconciles Stripe against the staff mailbox. For the pilot, reminders, exceptions, capacity, and refunds require staff action. Send a written missed-payment notice after November 30. If the balance remains unpaid after the December 3 grace period without a written exception, notify the participant in writing that Akomapa treats this as their cancellation and retains the $1,249.50 deposit; apply the full-refund rule if Akomapa cannot provide a place. Checkout creation closes for new first payments at November 29, 2026 11:59 p.m. Eastern and for balance payments at the end of the December 3 grace period. A Checkout Session opened near a cutoff can remain valid for about 31 minutes afterward due to Stripe's minimum Session lifetime; staff must review any such payment against the written offer.

## Stop or roll back

Set `IMMERSION_STRIPE_LIVE_ENABLED=false` in Vercel Production and redeploy to hide the payment section and stop new checkouts. Existing open Stripe Checkout Sessions can still complete until they expire; if an urgent halt is needed, expire those Sessions in Stripe or close the corresponding Prices and reconcile any late payment. The webhook continues to accept signed live payment events while the payment section is off. Keep its live key, signing secret, and Resend settings in place until all already-created payments and delayed confirmations have been handled.

Official references: [Stripe go-live checklist](https://docs.stripe.com/get-started/checklist/go-live), [restricted keys](https://docs.stripe.com/keys/restricted-api-keys), [webhooks](https://docs.stripe.com/webhooks), [receipts](https://docs.stripe.com/receipts).
