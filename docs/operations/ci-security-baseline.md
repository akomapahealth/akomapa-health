# CI and Security Baseline for Issue 194

Recorded on 2026-08-29 under Node 22.22.1.

## Current delivery path

1. Feature branches open pull requests into `dev`.
2. GitHub Actions runs the legacy lint, typecheck, build, unit, audit, and E2E
   workflow.
3. Vercel Git integration creates preview/staging deployments.
4. A reviewed `dev` pull request is promoted to `main` for production.
5. Vercel owns production deployment and rollback.

No GitHub Actions job deploys the application.

## Repository settings inventory

| Control | Baseline |
| --- | --- |
| Dependency graph | Enabled |
| Dependabot alerts, security updates, grouped updates | Disabled |
| CodeQL | Not configured |
| Secret protection and push protection | Disabled |
| Private vulnerability reporting | Disabled |
| Rulesets | One disabled ruleset targeting all branches |
| Classic branch protection | Not configured |
| Actions default token | Read repository contents and packages |
| Full-SHA enforcement | Disabled |
| Fork workflow approval | First-time contributors |
| GitHub Environments | Vercel preview/production records plus generic Preview/Production |
| Production environment protection | No reviewers or branch restriction |

Installed GitHub Apps include Vercel and Sentry. The active Vercel-generated
environment must be identified from deployment records before protection rules
are changed; similarly named inactive environments must not be assumed to own
production.

## Actions configuration inventory

The legacy workflow reads two client-visible ImageKit values from Actions
secrets. Other repository-level Actions secret names are Stripe-related. No
workflow deploys with those credentials. The replacement pipeline uses
the public ImageKit CDN endpoint for real portrait decoding, deterministic
placeholders for other integrations, and no repository secrets. The ImageKit
endpoint must be set at build time because E2E reuses the verified Next.js build;
setting it only when starting the server cannot change the bundled image URLs.
Removal or migration of existing secrets requires a separate usage check and explicit
confirmation.

## Measured baseline

- Latest 25 workflow runs: 21 successful and 4 cancelled, with no failed runs.
- Typical completed duration: approximately 15 to 19 minutes.
- Latest measured duration: 18 minutes 55 seconds.
- Latest retained Playwright report: 1.14 MB.
- Unit tests: 78 files and 321 tests passing.
- Playwright: 816 passing and 3 intentional opt-in skips in 2.6 minutes locally.
- Full dependency audit: 0 known vulnerabilities.
- Production-only dependency audit: 0 known vulnerabilities.
- RSC patch verifier, lint, typecheck, production build, and client-bundle
  secret verification: passing.

The legacy workflow reports Node 20 action-runtime deprecation warnings for
checkout, Node setup, and artifact upload. Replacement workflows use reviewed
Node 24 action releases.

## Observation record

Do not edit this section optimistically. Add dated evidence from completed
replacement runs.

| Date | Event/ref | Quality | Build | E2E | Security checks | Duration | Artifact size | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pending | Pending | Pending | Pending | Pending | Pending | Pending | Pending | Observation has not started |

The retirement gate requires both 14 elapsed days and 20 non-cancelled runs,
including pull-request, `dev`, and `main` events.
