import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const CLIENT_DIRS = [
  path.resolve(__dirname, "../../components"),
  path.resolve(__dirname, "../../app/(main)"),
];

const FORBIDDEN_TOKENS = [
  "STRIPE_SECRET_KEY",
  "WEB3FORMS_API_KEY",
  "MAILERLITE_API_KEY",
  "AIRTABLE_API_KEY",
];

function walk(dir: string, files: string[] = []): string[] {
  let entries: string[] = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (/\.(ts|tsx)$/.test(entry) && !entry.includes("__tests__")) {
      files.push(full);
    }
  }
  return files;
}

describe("client bundle hygiene", () => {
  it("never references server-only secret env vars from client component or page files", () => {
    const offenders: Array<{ file: string; token: string }> = [];

    for (const dir of CLIENT_DIRS) {
      for (const file of walk(dir)) {
        const contents = readFileSync(file, "utf8");
        // API route handlers under src/app/api/ are server-only and excluded by
        // dir scope. Inside (main) and components we should never see these.
        for (const token of FORBIDDEN_TOKENS) {
          if (contents.includes(token)) {
            offenders.push({ file, token });
          }
        }
      }
    }

    expect(
      offenders,
      `Found server-only env tokens referenced from client code:\n${offenders
        .map((o) => `  ${o.token} in ${o.file}`)
        .join("\n")}`
    ).toEqual([]);
  });
});
