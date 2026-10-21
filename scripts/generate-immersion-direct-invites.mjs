import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createDirectInviteToken, IMMERSION_DIRECT_INVITE_EXPIRES_AT } from "../src/lib/payments/immersion-direct-invite.ts";

const [rosterArg = ".env.immersion-roster.local", secretArg = ".private/immersion-direct-invite-secret",
  outputArg = ".private/immersion-direct-invites.json"] = process.argv.slice(2);
const roster = JSON.parse(readFileSync(resolve(rosterArg), "utf8"));
const secret = readFileSync(resolve(secretArg), "utf8").trim();
if (!Array.isArray(roster) || roster.length === 0 || secret.length < 32) {
  throw new Error("Expected a nonempty roster and a direct-invite secret of at least 32 characters");
}
const emails = new Set();
const now = Date.now();
const invites = roster.map((person) => {
  if (typeof person.name !== "string" || typeof person.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(person.email) ||
    (person.expiresAt && Date.parse(person.expiresAt) <= now)) {
    throw new Error("Roster contains an invalid or expired participant");
  }
  const email = person.email.trim().toLowerCase();
  if (emails.has(email)) throw new Error("Roster contains duplicate email addresses");
  emails.add(email);
  const url = new URL("https://www.akomapa.org/api/immersion/verify");
  url.searchParams.set("invite", createDirectInviteToken(email, secret));
  return { name: person.name.trim(), email, link: url.toString() };
});
const output = resolve(outputArg);
mkdirSync(dirname(output), { recursive: true, mode: 0o700 });
writeFileSync(output, JSON.stringify({
  generatedAt: new Date(now).toISOString(),
  expiresAt: new Date(IMMERSION_DIRECT_INVITE_EXPIRES_AT).toISOString(),
  note: "Each link grants payment-page access to its named recipient. Send privately; do not forward or publish.",
  invites,
}, null, 2) + "\n", { mode: 0o600, flag: "wx" });
console.log(`Wrote ${invites.length} private Immersion invite links to ${output}`);
