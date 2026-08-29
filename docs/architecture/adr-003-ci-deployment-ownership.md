# ADR 003: CI and Deployment Ownership

- Status: Accepted for staged implementation
- Date: 2026-08-29
- Decision owner: Akomapa Health Foundation Engineering
- Related issue: [#194](https://github.com/akomapahealth/akomapa-health/issues/194)

## Context

The repository has one monolithic GitHub Actions workflow. It installs every
Playwright browser before running fast checks and grants pull-request write
permission to the entire job. Vercel's GitHub App is installed and already
creates preview and production deployment records, while GitHub Actions does
not own a deployable production artifact.

Replacing the existing workflow and deployment path in one change would remove
the known recovery path before the replacement has operational evidence.

## Decision

GitHub Actions owns source validation, dependency review, code scanning, SBOM
generation, and verification of resulting deployments. Vercel Git integration
remains the only deployment owner.

- `main` is the production branch.
- `dev` is the staging and integration branch.
- Pull requests receive Vercel previews and GitHub validation checks.
- Actions jobs do not receive Vercel deployment credentials or production
  secrets.
- Preview deployments exercised by Actions are anonymously reachable. Preview
  builds must therefore contain no sensitive data or production-only access.
  Enabling Vercel Authentication later requires revisiting this decision and
  introducing a separately approved automation-bypass design.
- The existing workflow remains active while the replacement runs in parallel.

The replacement workflow may become required and the legacy workflow may be
retired only after at least 14 days and 20 non-cancelled representative runs,
including pull-request, `dev`, and `main` events. The observation record must
show no unexplained failures, missing statuses, secret exposure, unbounded
artifact growth, or unresolved flaky tests.

## Security and permissions

Workflows default to read-only repository access. Write permission is granted
only to the pull-request summary job, and deployment verification receives no
secrets. External actions are pinned to reviewed full commit SHAs and are
updated through Dependabot review.

Dependency review blocks newly introduced high or critical runtime
vulnerabilities and AGPL/SSPL licenses. Exceptions must be explicit, owned,
approved, and expiring.

## Consequences

- CI temporarily performs duplicate work during the observation window.
- Vercel remains the authoritative source for deployment state and rollback.
- GitHub artifact attestations are not generated because Actions does not
  produce the artifact deployed by Vercel.
- A CycloneDX SBOM is retained as short-lived supply-chain evidence for
  protected-branch builds.
- Ruleset activation and legacy retirement are separate changes that require
  evidence from real runs.

## Rollback

Before retirement, disable the replacement workflow and continue using the
legacy workflow. After retirement, restore the last reviewed legacy workflow
from version control and remove the replacement check names from the ruleset
before rerunning CI. Deployment rollback remains a Vercel operation and is
defined in the CI/CD operations runbook.
