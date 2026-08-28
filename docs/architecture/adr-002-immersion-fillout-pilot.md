# ADR 002: Embedded Fillout Pilot for Immersion Intake

- Status: Accepted for a limited pilot
- Date: 2026-08-27
- Decision owners: Akomapa Health Foundation Operations and Engineering
- Related issues: [#193](https://github.com/akomapahealth/akomapa-health/issues/193), [#192](https://github.com/akomapahealth/akomapa-health/issues/192)
- Amends: [ADR 001](./adr-001-website-intake-delivery.md) for the Global Health Immersion Program only

## Context

ADR 001 selected native Akomapa forms backed by server-side Fillout delivery.
Issue #193 needs a bounded production pilot of Fillout's embedded form and
same-browser draft behavior without exposing provider details to page
components or changing the other intake workflows.

The pilot has two public intents, `register_interest` and
`request_brochure`, but one approved question set and one structured results
table. It must not collect clinical information, application data, travel
details, payment information, files, or government identifiers.

## Decision

Create one provider-neutral Akomapa `immersion` form definition with an
explicit intent discriminator. A dedicated staging Fillout form and a
dedicated production Fillout form will implement that definition. The existing
API-backed `program_interest` form remains unchanged.

The Akomapa registry owns titles, descriptions, approved fields, validation
expectations, consent and safety copy, source identifiers, feature status, and
fallback behavior. Page components pass only the Akomapa form key and intent.
The Fillout adapter owns the public form identifier, provider import,
allow-listed parameters, load and completion callbacks, and normalized failure
categories.

The approved respondent fields are:

- full name, required, 2 to 120 characters;
- email address, required and valid, up to 254 characters;
- phone number, optional, up to 40 characters;
- school or organization, optional, up to 160 characters;
- message, optional, up to 2,000 characters; and
- consent, required.

Only `formType`, `intent`, `schemaVersion`, `sourcePath`, and `programId` are
passed as hidden context. Parent-page query parameters are not inherited.

Production embedding is disabled by default. When the embed is disabled,
misconfigured, offline, blocked, or unavailable, the Akomapa dialog retains a
hosted-form link or the public contact route. Disabling the provider never
removes the CTA.

## Privacy and Security Boundaries

- Fillout alone owns answer persistence for this pilot. Akomapa does not copy
  Immersion answers or draft metadata into local storage, cookies, URLs,
  analytics, logs, or Sentry.
- Respondents can resume only in the same non-private browser and device.
  Administrator access to abandoned partial submissions requires a paid
  Fillout plan and is not promised by this pilot.
- Only a public form identifier and verified hosted URL are client-visible.
  API keys, field mappings, notification credentials, administrative tokens,
  and recovery material remain server-only or provider-managed.
- The application does not register a provider `postMessage` listener. The
  reviewed React package callback is normalized without retaining its payload.
- The parent site's frame policy permits only the exact verified Fillout form
  origin. Wildcard Fillout origins are not allowed.
- Analytics records operational state only: form key, intent, and a bounded
  error category.

## Ownership, Retention, and Operations

Akomapa Operations is the accountable data owner. Engineering is the technical
custodian. Completed pilot submissions are retained for 24 months after the
last meaningful activity unless a valid deletion request or legal obligation
requires earlier action.

The Fillout workspace must have at least two recoverable administrators with
multi-factor authentication. Passwords, recovery codes, and API tokens are not
recorded in the repository. The operational procedure is documented in
[the Immersion pilot runbook](../operations/immersion-fillout-pilot.md).

## Alternatives Considered

- Continue the ADR 001 native form for Immersion. This remains the default for
  other workflows but cannot validate Fillout's embedded draft behavior.
- Use two provider forms, one per intent. This duplicates configuration and
  complicates export without an approved difference in questions or routing.
- Persist an Akomapa draft. This would duplicate personal information and make
  the pilot responsible for storage that Fillout already provides.
- Use a raw provider popup. This would transfer modal behavior, branding, and
  failure handling away from Akomapa's accessible component boundary.

## Rollback and Exit Strategy

Set the public pilot flag to false. The launchers remain available and route to
the verified hosted form or public contact page. No code removal is required.

Before replacing Fillout, export both environments, reconcile row counts and
the stable context columns, import the records into the reviewed replacement,
switch the adapter configuration, complete a marked staging submission, and
retain the former workspace read-only until reconciliation is complete.

Broader form migration remains blocked until Operations and Engineering review
completion quality, failures, accessibility, data quality, workload, and plan
limits under Issue #192.

## References

- [Fillout React embeds](https://www.fillout.com/help/embed-forms-react)
- [Fillout partial submissions](https://www.fillout.com/help/partial-submissions)
- [Fillout URL parameters](https://www.fillout.com/help/url-parameters)
- [Fillout pricing](https://www.fillout.com/pricing)
