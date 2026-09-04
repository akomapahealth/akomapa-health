# Security Policy

## Supported versions

Akomapa Health supports the code currently deployed from `main`. Security
fixes are developed through `dev`, validated in a Vercel staging deployment,
and promoted to `main` after the required checks pass. Older deployments and
unmaintained branches do not receive security fixes.

## Report a vulnerability privately

Do not disclose a suspected vulnerability in a public issue, discussion, pull
request, or social-media post. Use GitHub's private vulnerability reporting
form instead:

<https://github.com/akomapahealth/akomapa-health/security/advisories/new>

Include the affected URL or component, reproduction steps, expected impact,
and any known prerequisites. Do not include real patient, donor, applicant, or
volunteer information in the report. Use synthetic data for demonstrations.

Maintainers will acknowledge a report within two business days, establish a
private remediation channel, and coordinate disclosure after a fix is
available. A reachable critical production issue is triaged immediately; a
reachable high production issue is triaged within two business days.

## Handling expectations

- Never commit or paste credentials, cookies, access tokens, private form
  submissions, or environment dumps.
- Revoke and rotate a confirmed leaked credential before attempting history
  cleanup.
- Preserve relevant logs without retaining request bodies or personal data.
- Record any temporary vulnerability exception using the repository policy in
  `docs/security/vulnerability-exceptions.md`.
