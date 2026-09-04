import assert from "node:assert/strict";
import test from "node:test";
import { assessOfflineReport, verifyScanner, validateInventory } from "../audit-production-offline.mjs";

const component = { name: "example", version: "1.0.0", purl: "pkg:npm/example@1.0.0" };
const inventory = [component];
const pkg = { name: component.name, version: component.version, ecosystem: "npm" };
const report = (vulnerabilities = []) => ({ results: [{ packages: [{ package: pkg, vulnerabilities }] }] });
const vuln = (severity) => ({ id: "GHSA-test", database_specific: { severity } });

test("accepts a complete clean offline report", () => {
  assert.equal(assessOfflineReport(report(), inventory, "high").status, 0);
});

test("preserves high and low audit thresholds", () => {
  assert.equal(assessOfflineReport(report([vuln("MODERATE")]), inventory, "high").status, 0);
  assert.equal(assessOfflineReport(report([vuln("MODERATE")]), inventory, "low").status, 1);
  assert.equal(assessOfflineReport(report([vuln("HIGH")]), inventory, "high").status, 1);
  assert.equal(assessOfflineReport(report([vuln("CRITICAL")]), inventory, "high").status, 1);
});

test("unknown severities and malicious-package findings fail closed", () => {
  assert.equal(assessOfflineReport(report([{ id: "GHSA-unknown" }]), inventory, "critical").status, 1);
  assert.equal(assessOfflineReport(report([{ ...vuln("LOW"), id: "MAL-test" }]), inventory, "high").status, 1);
});

test("uses the scanner's computed CVSS group when a severity label is absent", () => {
  const data = report([{ id: "GHSA-score" }]);
  data.results[0].packages[0].groups = [{ ids: ["GHSA-score"], max_severity: "8.1" }];
  assert.equal(assessOfflineReport(data, inventory, "high").status, 1);
  assert.equal(assessOfflineReport(data, inventory, "critical").status, 0);
  data.results[0].packages[0].groups[0].max_severity = null;
  assert.equal(assessOfflineReport(data, inventory, "high").status, 1);
});

test("rejects missing packages, malformed findings, and invalid thresholds", () => {
  for (const data of [{}, { results: [] }, { results: [{ packages: [] }] }, report(null), report([{}])]) {
    assert.throws(() => assessOfflineReport(data, inventory, "high"));
  }
  assert.throws(() => assessOfflineReport(report(), inventory, "none"));
});

test("rejects empty or non-npm inventories", () => {
  assert.throws(() => validateInventory({ components: [] }));
  assert.throws(() => validateInventory({ bomFormat: "CycloneDX", components: [{ ...component, purl: "pkg:generic/example@1" }] }));
  assert.deepEqual(validateInventory({ bomFormat: "CycloneDX", components: inventory }), inventory);
});

test("rejects a scanner binary that does not match its reviewed checksum", () => {
  assert.throws(() => verifyScanner(Buffer.from("tampered"), "0".repeat(64)), /checksum/);
});
