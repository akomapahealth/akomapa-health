import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const textExtensions = new Set([
  "",
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);

describe("donation payment content safety", () => {
  it("keeps forbidden placeholder payment details out of tracked source", () => {
    const forbiddenValues = [
      ["+233", "54", "111", "1111"].join(" "),
      ["054", "111", "1111"].join(" "),
      ["123", "456", "7890"].join(""),
      ["https://paypal.me/", "akomapahealth"].join(""),
      ["024", "929", "2898"].join(""),
    ];
    const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
      cwd: process.cwd(),
      encoding: "utf8",
    })
      .split("\0")
      .filter(Boolean)
      .filter((file) => textExtensions.has(extname(file)))
      .filter((file) => file !== "package-lock.json")
      .filter((file) => existsSync(resolve(process.cwd(), file)));

    const violations = trackedFiles.flatMap((file) => {
      const contents = readFileSync(resolve(process.cwd(), file), "utf8");
      return forbiddenValues
        .filter((value) => contents.includes(value))
        .map((value) => `${file}: ${value}`);
    });

    expect(violations).toEqual([]);
  });
});
