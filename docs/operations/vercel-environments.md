# Vercel environment controls

Owner: `@nanaagyei`

The Vercel Git integration is the only deployment owner.

| Branch | Purpose | Vercel target |
| --- | --- | --- |
| `main` | production | `akomapa-health` / Production |
| `dev` | staging/integration | `akomapa-staging` / Preview |
| pull-request branches | review | `akomapa-staging` / Preview |

Required controls:

- Keep preview/staging and production variables separate; scope each variable to the minimum environment that needs it.
- Configure the `akomapa-health` project to build `main` only. Configure the
  `akomapa-staging` project to build `dev` and pull-request branches, but not
  `main`. This prevents duplicate deployments and deployment-status events.
- Production changes require review by `@nanaagyei`. Self-review prevention remains off while there is only one owner, preventing permanent lockout.
- Do not store a Vercel deploy token in GitHub or add an Actions deploy workflow.
- Keep Preview deployments anonymous while `Preview Security Smoke` is designed
  to run without credentials. Preview variables must not expose production data
  or production-only capabilities. Revisit ADR 003 before enabling deployment
  protection that would require an automation-bypass secret.
- Confirm the exact active Vercel-created GitHub environment before changing protection. Similarly named generic environments are not assumed active.
- A production rollback uses Vercel's retained deployment, followed by the same deployed-security smoke check.

Environment protection and branch mapping are live settings. Capture screenshots or audit events when they are applied and attach that evidence to Issue #194.
