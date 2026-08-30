# Vercel rollback and staging exercise

Owner and approver: `@nanaagyei`

Vercel is the sole owner of deployable artifacts and promotion. GitHub Actions verifies deployments but does not deploy or hold a Vercel deployment token.

## Roll back

1. Identify the most recent known-good deployment by commit SHA, previous smoke result, and observation record. Do not choose by timestamp alone.
2. In the correct Vercel project/environment, use Vercel's redeploy or rollback/promote control for that immutable deployment.
3. Confirm the production or staging alias now resolves to the selected deployment and that its environment variables have the intended scope.
4. Run the deployed-security verifier against the resulting public Vercel URL, then complete the manual health check.
5. Record the triggering incident, old and restored deployment IDs/SHAs, operator, timestamps, verification evidence, and follow-up fix.

## Required staging exercise before PR 3

Use `dev`/staging, never production, for the exercise:

1. Record the current healthy staging deployment and select an earlier known-good staging deployment.
2. Redeploy or promote that earlier deployment using the same Vercel mechanism intended for a real rollback.
3. Run `Preview Security Smoke` and the manual health check against the restored deployment.
4. Return staging to the current `dev` commit and repeat the checks.
5. Complete the evidence record below and commit it before legacy CI retirement.

### Exercise evidence

- Date/time (UTC): pending
- Operator: `@nanaagyei`
- Starting `dev` SHA/deployment: pending
- Prior known-good SHA/deployment: pending
- Rollback mechanism used: pending
- Rollback smoke run: pending
- Restored-current smoke run: pending
- Findings/follow-up issue: pending

Pending fields are deliberate: they must be replaced by actual Vercel evidence, not simulated locally.
