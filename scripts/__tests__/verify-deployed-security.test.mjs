import assert from "node:assert/strict";
import test from "node:test";

import { parseVercelDeploymentUrl } from "../verify-deployed-security.mjs";

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
