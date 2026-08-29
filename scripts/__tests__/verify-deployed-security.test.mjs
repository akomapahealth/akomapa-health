import assert from "node:assert/strict";
import test from "node:test";

import {
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
    "frame-src 'self' https://forms.fillout.com",
  ].join("; ");

  assert.equal(hasCspDirectiveValue(policy, "default-src", "'self'"), true);
  assert.equal(
    hasCspDirectiveValue(policy, "frame-src", "https://forms.fillout.com"),
    true,
  );
  assert.equal(
    hasCspDirectiveValue(
      "frame-src https://forms.fillout.com.attacker.example",
      "frame-src",
      "https://forms.fillout.com",
    ),
    false,
  );
  assert.equal(
    hasCspDirectiveValue(
      "report-uri https://attacker.example/?target=https://forms.fillout.com",
      "frame-src",
      "https://forms.fillout.com",
    ),
    false,
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
