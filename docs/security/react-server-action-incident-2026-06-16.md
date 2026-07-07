# React Server Action Probe - 2026-06-16

## Summary

On 2026-06-16 at approximately 09:55 UTC, Sentry captured a crafted unauthenticated `POST /index` request targeting the React Server Components and Server Action decoder. The request produced two Sentry issues:

- `7545898293`: React Server Manifest module ID not found
- `7546089626`: request body could not be parsed as FormData

The supplied issue data indicates that React/Next.js rejected the forged payload during decoding. There is no evidence in the supplied Sentry events that attacker code executed.

## Version Evidence

Affected deployment:

- Release: `840c44ac989d011a615ba5e6faa388c37a228833`
- Observed vulnerable Next.js version: `15.5.7`
- Observed vulnerable React version: `19.1.0`

Remediated lockfile state:

- `next@15.5.19`
- `react@19.2.7`
- `react-dom@19.2.7`

Verification command:

```bash
source /Users/nanaagyei/.nvm/nvm.sh && nvm use 22
npm run security:verify-rsc-patch
```

Expected output:

```text
React Server Components security patch verification
- next@15.5.19 (>=15.5.10 <15.6.0) ok
- react@19.2.7 (>=19.2.1) ok
- react-dom@19.2.7 (>=19.2.1) ok

RSC patch verification passed.
```

## Remediation Completed In Code

- PR #124 was merged and upgraded the dependency graph past the patched React Server Components floor.
- `package.json` now declares the patched React package range explicitly.
- `scripts/verify-rsc-patch.mjs` fails CI/local checks if the lockfile drops below the required patched versions.
- Sentry event scrubbing redacts request bodies, form data, `$ACTION_*` keys, Server Action metadata, client IP headers, request IP env fields, cookies, user email, and user IP address.
- `docs/security/vercel-rsc-firewall.md` defines the production firewall/rate-limit mitigation path.

## Production Review Checklist

Review Vercel runtime logs, function logs, firewall/security events, Sentry events, and any connected log drain around the event window:

- Primary window: 2026-06-16 09:45 UTC through 2026-06-16 10:10 UTC
- Wider window if any anomaly appears: 2026-06-16 08:55 UTC through 2026-06-16 10:55 UTC
- Request path and method: unauthenticated `POST /index`
- Sentry issue IDs: `7545898293`, `7546089626`
- Affected release: `840c44ac989d011a615ba5e6faa388c37a228833`

Record findings:

- [ ] Unexpected child processes or shell commands: none found / findings attached
- [ ] Unusual outbound network requests: none found / findings attached
- [ ] Filesystem reads outside normal application behavior: none found / findings attached
- [ ] Unexpected environment-variable access: none found / findings attached
- [ ] Error bursts or repeated exploit attempts around the same window: none found / findings attached
- [ ] Sentry event payloads verified scrubbed after this remediation: yes / findings attached
- [ ] Vercel Firewall/rate-limit mitigation enabled or documented unavailable: yes / unavailable reason attached

## Secret Rotation Decision

Rotate production secrets only if the production review finds compromise indicators.

Decision record:

- Decision: pending production log review
- If not rotated, reason to record: no child process, shell command, unusual outbound network, abnormal filesystem read, environment-variable access, or related error-burst indicators were found.
- If rotated, record: secret names, rotation timestamp, owner, deploy SHA, and validation result.

## Production Deployment Evidence

Record after deployment:

- Deployment URL:
- Deployment SHA:
- Deployment completed at:
- Confirmed production `next` version:
- Confirmed production `react` version:
- Confirmed production `react-dom` version:
- Smoke test result:
- Sentry post-deploy status:

## References

- React advisory: https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components
- Next.js advisory: https://nextjs.org/blog/CVE-2025-66478
- Vercel Firewall: https://vercel.com/docs/vercel-firewall
