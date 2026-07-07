# Vercel Firewall Mitigation For RSC Server Action Probes

## Goal

Reduce abusive malformed React Server Components and Server Action traffic before it reaches the Next.js runtime. This project currently has no intentional Server Actions, so production can start with a stricter Server Action mitigation than an app that depends on Server Actions for user workflows.

## Preflight

1. Confirm the deployed commit contains the patched lockfile:

   ```bash
   source /Users/nanaagyei/.nvm/nvm.sh && nvm use 22
   npm run security:verify-rsc-patch
   ```

2. Confirm no intentional Server Actions exist in this repo:

   ```bash
   rg -n "['\"]use server['\"]|formAction|Next-Action|server action|Server Action" src
   ```

3. Open the Vercel project firewall dashboard:

   ```text
   https://vercel.com/{team}/{project}/firewall
   ```

4. Review Firewall traffic and Monitoring for recent `POST` requests with Server Action markers before enabling a blocking action.

## Preferred Custom Rule

Use this when the dashboard/API exposes the `server_action` condition.

Name:

```text
Deny unexpected Server Action POSTs
```

Conditions:

- `environment` equals `production`
- `method` equals `POST`
- `server_action` exists

Initial action:

- If there is any uncertainty about legitimate traffic, set the action to `log` for one observation window.
- If no legitimate Server Action traffic exists, set the action to `deny`.

REST API payload:

```json
{
  "action": "rules.insert",
  "value": {
    "name": "Deny unexpected Server Action POSTs",
    "description": "Block unexpected Server Action invocation attempts. This app does not intentionally expose Server Actions.",
    "active": true,
    "conditionGroup": [
      {
        "conditions": [
          { "type": "environment", "op": "eq", "value": "production" },
          { "type": "method", "op": "eq", "value": "POST" },
          { "type": "server_action", "op": "ex" }
        ]
      }
    ],
    "action": {
      "mitigate": { "action": "deny" }
    }
  }
}
```

Apply with:

```bash
curl -X PATCH "https://api.vercel.com/v1/security/firewall/config?projectId=$VERCEL_PROJECT_ID&teamId=$VERCEL_TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d @server-action-rule.json
```

Do not commit `server-action-rule.json` if it includes real project IDs or tokens.

## Rate-Limit Alternative

Use this when the team wants a lower-risk first step before a deny rule.

Conditions:

- `environment` equals `production`
- `method` equals `POST`
- `server_action` exists

Action:

- Rate limit by `ip`
- Fixed window: 60 seconds
- Limit: 5 requests
- Exceeded action: `deny`

REST API payload:

```json
{
  "action": "rules.insert",
  "value": {
    "name": "Rate limit unexpected Server Action POSTs",
    "description": "Throttle unexpected Server Action markers before the request reaches Next.js.",
    "active": true,
    "conditionGroup": [
      {
        "conditions": [
          { "type": "environment", "op": "eq", "value": "production" },
          { "type": "method", "op": "eq", "value": "POST" },
          { "type": "server_action", "op": "ex" }
        ]
      }
    ],
    "action": {
      "mitigate": {
        "action": "rate_limit",
        "rateLimit": {
          "algo": "fixed_window",
          "window": 60,
          "limit": 5,
          "keys": ["ip"],
          "action": "deny"
        }
      }
    }
  }
}
```

## Header-Based Fallback

Use this if the dashboard/API does not expose `server_action` matching. This is less semantic than the preferred rule but still targets Server Action traffic.

Conditions:

- `environment` equals `production`
- `method` equals `POST`
- header `Next-Action` exists

Action:

- Start with `log` if unsure, then move to `deny`.

Condition replacement:

```json
[
  { "type": "environment", "op": "eq", "value": "production" },
  { "type": "method", "op": "eq", "value": "POST" },
  { "type": "header", "key": "Next-Action", "op": "ex" }
]
```

## Path-Based Fallback For The Observed Probe

Use this only if neither Server Action nor header matching is available, or while testing dashboard support.

Conditions:

- `environment` equals `production`
- `method` equals `POST`
- `path` equals `/index`

Recommended action:

- Rate limit by `ip` first, then deny if logs show only abusive traffic.

This fallback is intentionally narrower than a global `POST` rule so normal form/API traffic is not affected.

## Post-Change Verification

1. Publish the firewall change in Vercel.
2. Confirm the rule appears in the production firewall config.
3. Visit the home page and core public pages.
4. Submit legitimate forms that use API routes, including contact/newsletter/donation paths if credentials are available.
5. Confirm Firewall logs show the new rule matching only expected abusive traffic.
6. Confirm Sentry does not receive raw request bodies, `$ACTION_*` fields, client IP headers, cookies, user email, or user IP address.
7. Record the final rule/action decision in `docs/security/react-server-action-incident-2026-06-16.md` and issue #126.

## References

- Vercel Firewall overview: https://vercel.com/docs/vercel-firewall
- Vercel WAF custom rules: https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules
- Vercel WAF rate limiting: https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting
