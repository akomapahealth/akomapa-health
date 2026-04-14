/**
 * Ensures core.hooksPath is set for Husky 9 (.husky/_).
 * Fixes corrupted values (e.g. "-v/_") after bad invocations. Safe when no .git (e.g. some Docker extracts).
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const EXPECTED = ".husky/_";

function run(cmd) {
  return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
}

function main() {
  try {
    run("git rev-parse --git-dir");
  } catch {
    return;
  }

  if (!existsSync(path.join(process.cwd(), ".husky", "_"))) {
    return;
  }

  let current = "";
  try {
    current = run("git config --get core.hooksPath");
  } catch {
    current = "";
  }

  if (current === EXPECTED) {
    return;
  }

  console.warn(
    `[husky] Repairing core.hooksPath (was ${current ? JSON.stringify(current) : "unset"}) -> ${EXPECTED}`,
  );
  try {
    execSync(`git config core.hooksPath ${EXPECTED}`, { stdio: "inherit" });
  } catch {
    console.warn("[husky] Could not set core.hooksPath; run: npx husky");
  }
}

main();
