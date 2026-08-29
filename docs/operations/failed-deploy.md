# Failed-deployment runbook

Owner: `@nanaagyei`  
Deployment owner: Vercel Git integration only

1. Freeze promotion. Do not add an Actions deployment, copy a Vercel token into GitHub, or manually replace the production domain.
2. In Vercel, capture the failed deployment URL, branch, commit SHA, build log, start/end time, and environment. Avoid copying secret values from logs.
3. Classify the failure:
   - application build or test failure;
   - missing/mis-scoped Vercel variable;
   - Vercel/platform incident;
   - preview security-smoke failure;
   - wrong branch/environment mapping.
4. Compare the source commit with the most recent healthy deployment. If the failure affects production availability or security, follow the rollback runbook immediately.
5. Correct the source or environment scope in the owning system. Public configuration belongs in repository configuration; secrets stay separated by Vercel environment.
6. Create a fresh Vercel deployment from the corrected commit and rerun `Preview Security Smoke` plus the manual health check.
7. Record the resolution in the incident or pull request. Never mark a failed deployment as ignored without an owner, rationale, and follow-up issue.

If Vercel itself is degraded, consult its status page, preserve the known-good production deployment, and avoid configuration churn until the incident is resolved.
