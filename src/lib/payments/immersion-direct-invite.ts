import { createHmac, timingSafeEqual } from "node:crypto";

const DIRECT_INVITE_CONTEXT = "akomapa-immersion-direct-invite-v1\0";
// The direct link remains usable for a deposit payer returning during the
// approved balance grace period. Checkout itself enforces the payment windows.
export const IMMERSION_DIRECT_INVITE_EXPIRES_AT = Date.parse("2026-12-04T04:59:59Z");

type Invitee = { email: string; expiresAt?: string };

export function createDirectInviteToken(email: string, secret: string) {
  return createHmac("sha256", secret)
    .update(DIRECT_INVITE_CONTEXT)
    .update(email.trim().toLowerCase())
    .digest("base64url");
}

export function findDirectInvitee<T extends Invitee>(
  roster: T[], token: string | undefined, secret: string | undefined, now = Date.now(),
): T | null {
  if (!secret || secret.length < 32 || !token || !/^[A-Za-z0-9_-]{43}$/.test(token) ||
    now > IMMERSION_DIRECT_INVITE_EXPIRES_AT) return null;
  const supplied = Buffer.from(token, "base64url");
  if (supplied.length !== 32) return null;
  let selected: T | null = null;
  for (const person of roster) {
    const expected = Buffer.from(createDirectInviteToken(person.email, secret), "base64url");
    if (timingSafeEqual(supplied, expected) && (!person.expiresAt || Date.parse(person.expiresAt) > now)) {
      selected = person;
    }
  }
  return selected;
}
