# Deployment health-check runbook

Owner: `@nanaagyei`  
Applies to: Vercel preview, staging (`dev`), and production (`main`) deployments

## Automated check

`Preview Security Smoke` runs from successful non-production Vercel deployment-status events and requires no deployment credentials. It accepts only a root HTTPS URL on an exact `*.vercel.app` subdomain.

For an authorized public preview, run the same verifier locally with Node 22:

```sh
nvm use 22
npm run security:verify-deployment -- https://DEPLOYMENT.vercel.app/
```

The verifier checks representative pages, critical navigation, security headers, enforced and report-only CSP behavior, client bundles, public source maps, API method/origin/content-type/body-size handling, bounded validation, rate limiting, and safe errors. It uses invalid newsletter payloads and does not create a subscriber.

## Manual confirmation

After the automated check passes:

1. Open `/`, `/programs`, `/global-health-immersion-program`, and `/contact` in a private browser session.
2. Confirm the primary navigation and one internal link work without console errors that block user actions.
3. On the immersion page, confirm the Fillout frame loads. Record any report-only CSP violations and distinguish application traffic from browser-extension traffic.
4. Confirm Vercel lists the expected source commit and branch for the deployment.
5. Record the deployment URL, commit SHA, verifier run URL, operator, UTC time, and result in the Issue #194 observation table.

Do not treat a healthy page response as proof that a failed build or wrong commit is safe to promote.
