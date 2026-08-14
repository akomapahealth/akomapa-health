# ADR 001: Website Intake Delivery

- Status: Accepted
- Date: 2026-08-14
- Decision owners: Akomapa Health Foundation engineering and operations
- Related issue: [#192](https://github.com/akomapahealth/akomapa-health/issues/192)

## Context

The website currently sends contact and donation follow-up submissions through
Web3Forms, sends immersion interest to MailerLite, and contains an unused
Airtable volunteer endpoint. These integrations have different contracts,
failure modes, and storage locations. Web3Forms also documents its public API
as a client-side integration and requires a paid plan plus an allowlisted IP for
server-side requests, which does not fit the current serverless deployment.

The replacement must provide:

- native, accessible forms that match the website in light and dark themes;
- one structured system of record for website intake;
- server-only provider credentials and runtime validation;
- reliable staff notification without making email the system of record;
- purpose-specific forms without collecting health, payment, or identity data;
- recoverable in-browser drafts without sending abandoned submissions; and
- an incremental path for future forms without adding a new application
  database.

## Options Considered

| Option | Strengths | Constraints | Decision |
| --- | --- | --- | --- |
| Fillout | Free REST API, 1,000 responses per month, structured Results tables, CSV export, hidden fields, and a documented submission API | Free plan lacks custom CSS, administrator access to partial submissions, automatic retention, and advanced completion analytics | Selected as the system of record behind native forms |
| Tally | Generous free response limits, signed webhooks, retries, and a simple hosted form workflow | Partial submissions and custom styling require Pro; an embed still gives a less consistent native experience | Viable fallback if Fillout reliability or limits become unacceptable |
| Formbricks | Open source and self-hostable with strong survey analytics | Adds hosting, upgrades, backups, monitoring, and incident-response work; optimized for surveys rather than operational intake | Rejected for the current operational capacity |
| Web3Forms | Small integration surface and familiar existing flow | Current server-side use is outside its recommended free integration model; email delivery is not a structured intake system of record | Replace |

## Decision

Use native React forms and same-origin Next.js route handlers. The server will
validate a versioned form contract, add trusted metadata, and create a Fillout
submission through the fixed `https://api.fillout.com/v1/api` origin. After
Fillout accepts the record, the server will send a staff notification through
Resend.

The processing order is intentional:

1. Reject invalid, oversized, cross-origin, rate-limited, or honeypot requests.
2. Generate a random request ID and submission timestamp on the server.
3. Store the validated record in the purpose-specific Fillout form.
4. Send a redacted operational notification through Resend.
5. Return a safe response with `Cache-Control: no-store`.

Fillout Results is the authoritative record. Email is only an alert. If Fillout
fails, no email is sent and the visitor receives a retryable error. If Fillout
succeeds but Resend fails, the visitor receives success because the record is
safe; the server logs only the request ID, form type, and error category for
operations follow-up.

Fillout self-notification workflows remain disabled. Fillout describes records
created through its API as imported submissions, but its notification
documentation does not guarantee that imports trigger form workflows. Using one
documented Resend path also prevents duplicate notifications.

## Security and Privacy Boundaries

- `FILLOUT_API_KEY`, `RESEND_API_KEY`, form mappings, sender, and recipient are
  server-only deployment settings and must never use a `NEXT_PUBLIC_` prefix.
- Provider URLs are constants. Request data cannot select an outbound host,
  preventing an intake field from becoming an SSRF primitive.
- Every request is runtime-validated with strict length and enum limits.
- Logs must not include names, email addresses, phone numbers, messages, request
  bodies, credentials, or raw provider responses.
- Browser drafts contain only non-sensitive form fields, are schema-validated
  when restored, expire after 30 days, and are never transmitted until the user
  submits the form. Consent and honeypot values are not persisted.
- The forms do not accept files, protected health information, government IDs,
  payment details, or urgent medical requests.
- General inquiries are retained for 12 months after meaningful activity.
  Program, partnership, get-involved, and donation follow-up records are
  retained for 24 months. Valid deletion requests take precedence.

## Consequences

### Benefits

- Visitors receive a consistent native interface without Fillout branding or a
  third-party script running in the application origin.
- A shared contract, delivery adapter, and error model replace three unrelated
  provider paths.
- A stored record survives a notification outage.
- New forms can reuse the same controls, route guard, draft envelope, delivery
  adapter, and operational checks.

### Costs and limitations

- Fillout form and question IDs must be configured and verified for every
  environment before submissions can succeed.
- The free plan does not provide administrator-visible partial submissions or
  advanced completion and drop-off analytics. Local drafts are intentionally
  private to the visitor and are not an analytics substitute.
- Retention requires a reviewed operational process because automatic deletion
  is not available on the selected plan.
- In-memory application rate limiting is instance-local. Production edge rate
  limiting remains a deployment responsibility.
- Fillout and Resend are external processors whose availability and account
  access must be monitored.

## Rollback and Exit Strategy

Provider access is isolated behind the intake delivery adapter. If Fillout is
unavailable for a prolonged period, disable submission CTAs with an explicit
service message or replace the adapter with Tally or another reviewed provider.
Do not silently fall back to email-only delivery because that would remove the
structured system of record.

Before leaving Fillout, export each Results table as CSV, verify row counts and
request IDs, import into the replacement, switch server configuration, complete
a marked staging submission, and retain the old workspace read-only until the
migration is reconciled. No provider rollback may reintroduce client-visible
secret keys.

## References

- [Fillout pricing and plan limits](https://www.fillout.com/pricing)
- [Fillout partial submissions](https://www.fillout.com/help/partial-submissions)
- [Fillout Create Submission API](https://www.fillout.com/help/api-reference/create-submissions)
- [Fillout API overview](https://www.fillout.com/help/fillout-rest-api)
- [Tally pricing](https://tally.so/pricing)
- [Tally webhooks](https://tally.so/help/webhooks)
- [Web3Forms troubleshooting](https://docs.web3forms.com/getting-started/troubleshooting)
- [Web3Forms API reference](https://docs.web3forms.com/getting-started/api-reference)
