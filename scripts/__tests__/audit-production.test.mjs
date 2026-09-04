import assert from "node:assert/strict";
import test from "node:test";
import { auditProduction } from "../audit-production.mjs";

const clean = { status: 0, stdout: JSON.stringify({ metadata: { vulnerabilities: { high: 0, critical: 0, total: 0 } } }) };
const unavailable = { status: 1, stdout: JSON.stringify({ error: { code: "E503", summary: "Service Unavailable" } }) };

async function auditSequence(results, fallback = async () => 1) {
  let calls = 0;
  const delays = [];
  const status = await auditProduction({
    run: () => results[calls++], wait: async (delay) => { delays.push(delay); }, log: () => {}, fallback,
  });
  return { status, calls, delays };
}

test("accepts a completed clean audit immediately", async () => {
  assert.deepEqual(await auditSequence([clean]), { status: 0, calls: 1, delays: [] });
});

test("retries an unavailable registry and accepts a subsequent verified audit", async () => {
  assert.deepEqual(await auditSequence([unavailable, clean]), { status: 0, calls: 2, delays: [10000] });
});

test("fails closed after three service errors", async () => {
  assert.deepEqual(await auditSequence([unavailable, unavailable, unavailable]), { status: 1, calls: 3, delays: [10000, 20000] });
});

test("accepts a verified offline fallback only after all npm attempts fail", async () => {
  let calls = 0;
  const result = await auditSequence([unavailable, unavailable, unavailable], async () => { calls++; return 0; });
  assert.equal(result.status, 0);
  assert.equal(result.calls, 3);
  assert.equal(calls, 1);
});

test("never invokes the fallback to override npm vulnerability findings", async () => {
  const findings = { status: 1, stdout: JSON.stringify({ metadata: { vulnerabilities: { high: 1, critical: 0, total: 1 } } }) };
  const result = await auditSequence([findings], async () => { assert.fail("must not override findings"); });
  assert.equal(result.status, 1);
});

test("does not treat malformed or missing reports as successful audits", async () => {
  assert.equal((await auditSequence([{ status: 0, stdout: "{}" }, { status: null, stdout: "" }, { status: 0, stdout: "invalid" }])).status, 1);
});

test("never retries vulnerability findings, even if the subprocess reports success", async () => {
  for (const severity of ["high", "critical"]) {
    for (const status of [0, 1]) {
      const report = { metadata: { vulnerabilities: { high: 0, critical: 0, total: 1, [severity]: 1 } } };
      assert.deepEqual(await auditSequence([{ status, stdout: JSON.stringify(report) }]), { status: 1, calls: 1, delays: [] });
    }
  }
});

test("preserves a nonzero npm exit even when reported counts are clean", async () => {
  assert.deepEqual(await auditSequence([{ ...clean, status: 1 }]), { status: 1, calls: 1, delays: [] });
});
