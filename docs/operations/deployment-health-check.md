# Deployment health-check runbook

Owner: `@nanaagyei`  
Applies to: Vercel preview, staging (`dev`), and production (`main`) deployments

## Automated check

`Preview Security Smoke` runs from successful non-production Vercel deployment-status events and requires no deployment credentials. It accepts only a root HTTPS URL on an exact `*.vercel.app` subdomain.

Automated deployment-status runs accept only the GitHub environment named
`Preview – akomapa-staging`. This prevents the production `akomapa-health`
project from creating a duplicate preview-security check. Manual dispatches
remain available for an explicitly supplied Vercel URL.

The Vercel project must leave the Preview environment anonymously reachable.
In **Project → Settings → Deployment Protection**, turn off Vercel
Authentication for Preview deployments. Do not add a Vercel automation-bypass
secret to GitHub without first revisiting ADR 003 and receiving explicit
approval for the new credential path.

For an authorized public preview, run the same verifier locally with Node 22:

```sh
nvm use 22
npm run security:verify-deployment -- https://DEPLOYMENT.vercel.app/
```

The verifier checks representative pages, critical navigation, security headers, enforced and report-only CSP behavior, client bundles, public source maps, API method/origin/content-type/body-size handling, bounded validation, rate limiting, and safe errors. It uses invalid newsletter payloads and does not create a subscriber.

If the verifier reports that the deployment is protected by Vercel
Authentication, confirm the protection setting above, then redeploy or rerun
the workflow against the current Preview URL. A `302` response whose location
is Vercel's `/sso-api` is the protection layer, not an application response.

## Manual confirmation

After the automated check passes:

1. Open `/`, `/programs`, `/global-health-immersion-program`, and `/contact` in a private browser session.
2. Confirm the primary navigation and one internal link work without console errors that block user actions.
3. On the immersion page, confirm the Fillout frame loads. Record any report-only CSP violations and distinguish application traffic from browser-extension traffic.
4. Confirm Vercel lists the expected source commit and branch for the deployment.
5. Record the deployment URL, commit SHA, verifier run URL, operator, UTC time, and result in the Issue #194 observation table.

Do not treat a healthy page response as proof that a failed build or wrong commit is safe to promote.
