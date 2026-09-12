# Passive ZAP baseline evaluation

OWASP ZAP evaluation is a one-time, reporting-only validation against an explicitly authorized public staging Vercel URL. It must not target production, third-party providers, or an unapproved hostname.

Before PR 3:

1. Validate the target with `npm run security:verify-deployment -- https://DEPLOYMENT.vercel.app/`.
2. Run the current stable ZAP Baseline Scan in passive mode from a controlled workstation or ephemeral CI experiment. Pin the image digest and record the ZAP version, target, UTC time, and command.
3. Review every alert. Record false positives and accepted findings with an owner, rationale, evidence, and expiry; create remediation issues for the rest.
4. Compare the findings with the focused deployment verifier and CodeQL/dependency/CSP evidence.

Do not add a standing ZAP workflow unless the evaluation demonstrates material coverage beyond the focused verifier. This avoids an unbounded scanner, noisy required check, or accidental scanning of an unauthorized deployment. The evaluation remains pending until an authorized staging deployment exists.
