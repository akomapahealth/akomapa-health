import assert from "node:assert/strict";
import test from "node:test";

import {
  assertApprovedCspHeaders,
  assertRateLimitStatusSequence,
  assertSourceMapNotPublic,
  hasCspDirectiveValue,
  isVercelAuthenticationRedirect,
  parseVercelDeploymentUrl,
} from "../verify-deployed-security.mjs";

test("accepts an exact HTTPS Vercel deployment root", () => {
  const url = parseVercelDeploymentUrl("https://akomapa-health-git-dev-team.vercel.app/");
  assert.equal(url.origin, "https://akomapa-health-git-dev-team.vercel.app");
});

for (const [label, url] of [
  ["non-HTTPS URL", "http://akomapa-health.vercel.app/"],
  ["lookalike domain", "https://akomapa-health.vercel.app.attacker.example/"],
  ["parent domain", "https://vercel.app/"],
  ["credentials", "https://user:password@akomapa-health.vercel.app/"],
  ["port", "https://akomapa-health.vercel.app:8443/"],
  ["path", "https://akomapa-health.vercel.app/preview"],
  ["query", "https://akomapa-health.vercel.app/?token=secret"],
]) {
  test(`rejects ${label}`, () => {
    assert.throws(() => parseVercelDeploymentUrl(url));
  });
}

test("matches CSP directive values as exact tokens", () => {
  const policy = [
    "default-src 'self'",
    "frame-src 'self' https://embed.fillout.com",
  ].join("; ");

  assert.equal(hasCspDirectiveValue(policy, "default-src", "'self'"), true);
  assert.equal(
    hasCspDirectiveValue(policy, "frame-src", "https://embed.fillout.com"),
    true,
  );
  assert.equal(
    hasCspDirectiveValue(
      "frame-src https://embed.fillout.com.attacker.example",
      "frame-src",
      "https://embed.fillout.com",
    ),
    false,
  );
  assert.equal(
    hasCspDirectiveValue(
      "report-uri https://attacker.example/?target=https://embed.fillout.com",
      "frame-src",
      "https://embed.fillout.com",
    ),
    false,
  );
});

test("accepts the CSP emitted by the deployed application", () => {
  const enforced = "base-uri 'self'; object-src 'none'; frame-ancestors 'none';";
  const reportOnly = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-src 'self' https://embed.fillout.com https://www.youtube.com",
  ].join("; ");

  assert.doesNotThrow(() => assertApprovedCspHeaders(enforced, reportOnly));
  assert.throws(
    () =>
      assertApprovedCspHeaders(
        enforced,
        reportOnly.replace(
          "https://embed.fillout.com",
          "https://forms.fillout.com",
        ),
      ),
    /Fillout frame origin/,
  );
});

test("recognizes only the exact Vercel Authentication redirect", () => {
  const deploymentUrl = new URL("https://akomapa-health-preview.vercel.app/");

  assert.equal(
    isVercelAuthenticationRedirect(
      "https://vercel.com/sso-api?url=https%3A%2F%2Fakomapa-health-preview.vercel.app%2F",
      deploymentUrl,
    ),
    true,
  );
  assert.equal(
    isVercelAuthenticationRedirect(
      "https://vercel.com.attacker.example/sso-api",
      deploymentUrl,
    ),
    false,
  );
  assert.equal(
    isVercelAuthenticationRedirect(
      "https://vercel.com/sso-api.attacker",
      deploymentUrl,
    ),
    false,
  );
});

test("accepts absent or access-denied source maps and rejects readable maps", () => {
  const mapUrl = new URL(
    "https://akomapa-health-preview.vercel.app/_next/static/chunks/app.js.map",
  );

  for (const status of [403, 404, 410]) {
    assert.doesNotThrow(() => assertSourceMapNotPublic({ status }, mapUrl));
  }
  for (const status of [200, 206]) {
    assert.throws(
      () => assertSourceMapNotPublic({ status }, mapUrl),
      /Unexpected public source map response/,
    );
  }
});

test("accepts fresh and pre-limited rate-limit sequences", () => {
  assert.doesNotThrow(() => assertRateLimitStatusSequence([429]));
  assert.doesNotThrow(() =>
    assertRateLimitStatusSequence([400, 400, 400, 400, 400, 429]),
  );
  assert.throws(() => assertRateLimitStatusSequence([400, 400]));
  assert.throws(() => assertRateLimitStatusSequence([500, 429]));
  assert.throws(() => assertRateLimitStatusSequence([429, 400]));
});
