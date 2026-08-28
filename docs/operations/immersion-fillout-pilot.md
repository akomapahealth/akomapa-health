# Immersion Fillout Pilot Runbook

This runbook governs the dedicated Global Health Immersion Program Fillout
pilot. It does not change the API-backed forms described in ADR 001.

## Responsibilities

- **Data owner:** Akomapa Operations
- **Technical custodian:** Akomapa Engineering
- **Retention:** 24 months after last meaningful activity
- **Notification destination:** the private submission mailbox configured in
  Fillout, never the public website contact address

Operations approves questions, consent copy, notification recipients,
retention exceptions, deletion requests, and launch. Engineering owns the
registry, embed configuration, security policy, monitoring, and rollback.

## Workspace and Recovery

Before enabling either environment:

1. Confirm the workspace is controlled by an organization identity.
2. Confirm at least two current administrators can recover access.
3. Confirm multi-factor authentication for each administrator.
4. Record administrator roles in the organization's private access register.
5. Store recovery codes and credentials only in the approved password manager.
6. Test account recovery without changing or disclosing production secrets.

Never place passwords, recovery codes, API keys, administrative tokens, or
private recipient addresses in this repository, issue comments, screenshots,
analytics, or test fixtures.

## Form Configuration

Create separate forms named clearly for staging and production. Do not reuse or
modify the API-backed `program_interest` form from ADR 001.

Both forms must contain the same published contract:

| Field | Required | Validation |
| --- | --- | --- |
| Full name | Yes | 2 to 120 characters |
| Email address | Yes | Valid email, maximum 254 characters |
| Phone number | No | Maximum 40 characters |
| School or organization | No | Maximum 160 characters |
| Message | No | Maximum 2,000 characters |
| Consent | Yes | Must be accepted |

Use this consent text: "I consent to Akomapa using these details to respond to
this request, as described in the privacy notice." Link the notice to
`https://akomapa.org/privacy`.

Show this safety notice before submission: "Do not submit medical details,
urgent medical requests, payment or financial account data, government IDs,
or files. For an emergency, contact local emergency services."

Register and retain these hidden parameters in Results:

- `formType`
- `intent`
- `schemaVersion`
- `sourcePath`
- `programId`

Do not enable automatic inheritance of parameters from the parent page.

## Environment Configuration

Set these public deployment values separately for preview/staging and
production:

- `NEXT_PUBLIC_IMMERSION_INTAKE_ENABLED`
- `NEXT_PUBLIC_IMMERSION_FILLOUT_FORM_ID`
- `NEXT_PUBLIC_IMMERSION_FILLOUT_FORM_URL`

The ID and hosted URL must refer to the same published form. Keep the
production enable flag false until the launch checklist is approved. These are
public identifiers, not credentials.

## Staging Verification

Use synthetic test data that is clearly marked as a test and contains no real
personal, medical, financial, or identity information.

1. Open both `Register Interest` and `Request Brochure` and verify the recorded
   intent and stable context values.
2. Start a response, close the dialog, reopen it in the same non-private
   browser and device, and verify Fillout offers to resume it.
3. Confirm a private/incognito window does not promise resume behavior.
4. Submit one marked response for each intent.
5. Confirm both records appear in structured Results.
6. Confirm exactly one notification per completed response reaches the private
   submission mailbox.
7. Export CSV and verify `formType`, `intent`, `schemaVersion`, `sourcePath`,
   and `programId` are present and stable.
8. Block the provider frame, simulate offline mode, and confirm the Akomapa
   fallback remains usable.
9. Test keyboard, screen reader, 320px mobile reflow, 200 percent zoom, both
   themes, and reduced motion.
10. Inspect application storage, cookies, page URLs, analytics, console logs,
    network logs, and Sentry for submitted values or personal information.

Ordinary CI must mock or block Fillout and must never complete a real
submission. The live Playwright smoke test is opt-in, staging-only, and must
refuse a production form URL.

## Launch and Monitoring

Operations and Engineering must jointly approve the staging checklist before
setting the production enable flag to true. During the limited pilot, review:

- open, load, normalized failure, fallback, and completion counts;
- notification delivery and duplicate reports;
- accessibility or mobile defects;
- record completeness and intent accuracy;
- support burden and free-plan limits; and
- deletion and retention work due in the next review period.

Operational events must never include answers, names, email addresses, phone
numbers, provider payloads, hosted URLs with respondent data, or credentials.

## Retention, Deletion, and Export

Review records at least quarterly. Delete records whose retention period has
expired unless Operations documents an approved exception. Process valid
privacy requests before the routine schedule. Record completion of deletions in
the private operations register without copying submission contents.

Before bulk deletion or provider exit, export CSV, record the export time and
row count privately, verify stable identifiers, and confirm the destination and
access controls. Reconcile imports before making the old workspace read-only.

## Rollback

1. Set `NEXT_PUBLIC_IMMERSION_INTAKE_ENABLED=false` and redeploy.
2. Confirm both CTAs remain visible and open the hosted/contact fallback.
3. Confirm other intake forms and routes are unaffected.
4. Record the incident category without provider payloads or respondent data.
5. Re-enable only after staging reproduces and resolves the failure.

Rollback does not delete records or remove the public CTA.
