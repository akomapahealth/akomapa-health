# Production dependency audit

Run `npm run security:audit:prod` on Node 22. CI blocks high and critical
production vulnerabilities. The legacy E2E workflow additionally passes
`--audit-level=low`, retaining its stricter threshold.

## npm service failures

The primary scanner remains `npm audit --omit=dev`. A completed report with
blocking findings fails immediately; it is never overridden by another scanner.
Timeouts, malformed responses, and unavailable reports receive three bounded
attempts. Increasing retries alone did not resolve the persistent npm bulk API
timeouts observed on 2026-09-04.

When those attempts cannot produce a report, the script runs OSV-Scanner 2.5.1
locally:

1. npm generates a CycloneDX inventory from the lockfile, omitting development
   dependencies. This includes locked production dependencies rather than only
   the optional packages installed on the current operating system.
2. The scanner release is downloaded from Google's official GitHub repository
   and checked against a reviewed SHA-256 digest before execution.
3. `--offline --download-offline-databases` obtains the npm advisory database in
   a new temporary cache. No package inventory is sent to OSV's query API, and a
   previous run's stale database cannot satisfy a failed download.
4. All packages and findings are requested, with an explicit empty configuration
   so there are no ignored vulnerabilities. The result must account for every
   production package/version in the inventory.
5. GitHub severity labels and OSV's computed CVSS scores enforce the selected
   threshold. Missing severity and malicious-package findings block the audit.

A scanner failure, checksum mismatch, missing package, unavailable database, or
invalid report still fails CI. OSV is an independent advisory source, not an
identical npm report; logs explicitly identify which source completed the audit.
Both sources must not be treated as interchangeable cached results.

Temporary binaries, databases, inventory, and reports are removed after the run.
The fallback needs roughly 300 MB of temporary disk space and outbound access
to GitHub release assets and OSV's public database downloads.

## Verification and maintenance

`node --test scripts/__tests__/audit-production*.test.mjs` covers thresholds,
missing inventory, unknown severity, checksum rejection, and the rule that npm
findings cannot be overridden. A real local scan on 2026-09-04 covered 253 unique
production packages with no findings; a lodash 4.17.20 control produced five
findings, including high-severity advisories.

To update the scanner, review the official release and update `VERSION` and all
platform digests in `scripts/audit-production-offline.mjs`. Verify clean and
known-vulnerable inventories before merging.

References: [OSV offline mode](https://google.github.io/osv-scanner/usage/offline-mode/),
[OSV-Scanner 2.5.1](https://github.com/google/osv-scanner/releases/tag/v2.5.1),
[npm SBOM options](https://docs.npmjs.com/cli/v11/commands/npm-sbom/).
