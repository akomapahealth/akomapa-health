#!/usr/bin/env node

const API_BASE = "https://api.fillout.com/v1/api";
const PAGE_SIZE = 150;
const APPLY_CONFIRMATION = "DELETE-EXPIRED";
const formTypes = [
  "general_inquiry",
  "program_interest",
  "partnership_request",
  "get_involved",
  "donation_follow_up",
];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function monthsBefore(now, months) {
  const value = new Date(now);
  value.setUTCMonth(value.getUTCMonth() - months);
  return value;
}

function parseConfig(raw) {
  let value;
  try {
    value = JSON.parse(raw);
  } catch {
    throw new Error("FILLOUT_FORM_CONFIG must be valid JSON.");
  }

  for (const formType of formTypes) {
    if (
      !value?.[formType]?.formId ||
      typeof value[formType].formId !== "string"
    ) {
      throw new Error(`FILLOUT_FORM_CONFIG is missing ${formType}.formId.`);
    }
  }
  return value;
}

function parseArgs(argv) {
  const apply = argv.includes("--apply");
  const confirmation = argv
    .find((arg) => arg.startsWith("--confirm="))
    ?.slice(10);
  if (apply && confirmation !== APPLY_CONFIRMATION) {
    throw new Error(
      `Deletion requires --apply --confirm=${APPLY_CONFIRMATION}. Review the dry run first.`,
    );
  }
  return { apply };
}

function headers(apiKey) {
  return { Authorization: `Bearer ${apiKey}`, Accept: "application/json" };
}

async function listExpired(apiKey, formId, cutoff) {
  const found = [];
  for (let offset = 0; ; offset += PAGE_SIZE) {
    const url = new URL(
      `${API_BASE}/forms/${encodeURIComponent(formId)}/submissions`,
    );
    url.searchParams.set("limit", String(PAGE_SIZE));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("beforeDate", cutoff.toISOString());
    url.searchParams.set("sort", "asc");
    const response = await fetch(url, {
      headers: headers(apiKey),
      redirect: "error",
    });
    if (!response.ok) {
      throw new Error(
        `Fillout list request failed with HTTP ${response.status}.`,
      );
    }
    const payload = await response.json();
    if (!Array.isArray(payload?.responses)) {
      throw new Error("Fillout returned an invalid submissions response.");
    }
    for (const item of payload.responses) {
      if (
        typeof item?.submissionId !== "string" ||
        typeof item?.submissionTime !== "string"
      ) {
        throw new Error("Fillout returned malformed submission metadata.");
      }
      const lastActivity = new Date(item.lastUpdatedAt ?? item.submissionTime);
      if (!Number.isNaN(lastActivity.valueOf()) && lastActivity < cutoff) {
        found.push({
          submissionId: item.submissionId,
          submissionTime: item.submissionTime,
          lastUpdatedAt: item.lastUpdatedAt ?? item.submissionTime,
        });
      }
    }
    if (payload.responses.length < PAGE_SIZE) break;
  }
  return found;
}
async function deleteSubmission(apiKey, formId, submissionId) {
  const url = `${API_BASE}/forms/${encodeURIComponent(formId)}/submissions/${encodeURIComponent(submissionId)}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: headers(apiKey),
    redirect: "error",
  });
  if (!response.ok) {
    throw new Error(
      `Fillout delete failed for submission ${submissionId} with HTTP ${response.status}.`,
    );
  }
}

export async function run({
  argv = process.argv.slice(2),
  env = process.env,
  now = new Date(),
} = {}) {
  const { apply } = parseArgs(argv);
  if (!env.FILLOUT_API_KEY) throw new Error("FILLOUT_API_KEY is required.");
  if (!env.FILLOUT_FORM_CONFIG)
    throw new Error("FILLOUT_FORM_CONFIG is required.");
  const config = parseConfig(env.FILLOUT_FORM_CONFIG);
  let total = 0;
  for (const formType of formTypes) {
    const retentionMonths = formType === "general_inquiry" ? 12 : 24;
    const cutoff = monthsBefore(now, retentionMonths);
    const expired = await listExpired(
      env.FILLOUT_API_KEY,
      config[formType].formId,
      cutoff,
    );
    total += expired.length;
    console.log(
      JSON.stringify({
        mode: apply ? "apply" : "dry-run",
        formType,
        retentionMonths,
        cutoff: cutoff.toISOString(),
        count: expired.length,
        submissions: expired,
      }),
    );
    if (apply) {
      for (const submission of expired) {
        await deleteSubmission(
          env.FILLOUT_API_KEY,
          config[formType].formId,
          submission.submissionId,
        );
        await new Promise((resolve) => setTimeout(resolve, 220));
      }
    }
  }
  console.log(
    JSON.stringify({
      mode: apply ? "apply" : "dry-run",
      total,
      complete: true,
    }),
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run().catch((error) =>
    fail(error instanceof Error ? error.message : "Retention utility failed."),
  );
}
