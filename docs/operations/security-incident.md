# Security incident runbook

Owner and incident commander: `@nanaagyei`

## Trigger

Start an incident for a suspected secret exposure, malicious dependency, unauthorized deployment/configuration change, exploitable CodeQL or dependency finding, public source map containing sensitive material, CSP violation indicating injection, or abuse of a public endpoint.

## Respond

1. Record an incident start time and assign severity. Preserve workflow, Vercel, GitHub audit, provider, and application evidence before changing it.
2. Contain the affected path. Disable the vulnerable feature or roll back through Vercel when that reduces harm. Do not destroy logs or rewrite shared history.
3. For a secret, rotate it at the issuing provider first, update only the correct Vercel environment, revoke the old value, and check logs and git history for exposure. Never paste the value into the incident record.
4. For a dependency or code finding, identify reachable versions and deployments, add regression coverage, and ship through the normal PR pipeline. Temporary exceptions must use `.github/security/vulnerability-exceptions.json` and expire within 90 days.
5. Verify containment using the deployed-security verifier and relevant provider/audit logs.
6. Notify affected maintainers and users when required by the data involved and applicable obligations. Coordinate public vulnerability reports through GitHub private vulnerability reporting.
7. Close only after remediation, credential revocation where applicable, monitoring, and a written follow-up with owner and due date.

Every administrator bypass during an incident must record who used it, the exact rule bypassed, why delay was unsafe, the commits affected, and when normal enforcement was restored.
