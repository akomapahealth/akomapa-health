import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const IMMERSION_DEPOSIT_CENTS = 124_950;
export const IMMERSION_FULL_CENTS = 249_900;
export const IMMERSION_PATH = "/global-health-immersion-program";
export const IMMERSION_COOKIE = "immersion_verified";

const inviteesSchema = z.array(z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  expiresAt: z.string().datetime({ offset: true }).optional(),
})).min(1);
type Invitee = z.infer<typeof inviteesSchema>[number];
type TokenPurpose = "email" | "session";
export type ImmersionMode = "test" | "live";

function configuredMode(allowDisabled = false): ImmersionMode | null {
  if (process.env.VERCEL_ENV === "production") {
    return allowDisabled || process.env.IMMERSION_STRIPE_LIVE_ENABLED === "true" ? "live" : null;
  }
  if (process.env.VERCEL_ENV === "preview" || (!process.env.VERCEL_ENV && process.env.NODE_ENV === "development")) {
    return allowDisabled || process.env.NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED === "true" ? "test" : null;
  }
  return null;
}

export function getImmersionConfig() {
  const mode = configuredMode();
  if (!mode) return null;
  const secret = process.env.IMMERSION_INVITE_TOKEN_SECRET;
  const stripeKey = mode === "live" ? process.env.STRIPE_IMMERSION_LIVE_RESTRICTED_KEY : process.env.STRIPE_SECRET_KEY;
  const depositPrice = mode === "live" ? process.env.STRIPE_IMMERSION_LIVE_DEPOSIT_PRICE_ID : process.env.STRIPE_IMMERSION_DEPOSIT_PRICE_ID;
  const fullPrice = mode === "live" ? process.env.STRIPE_IMMERSION_LIVE_FULL_PRICE_ID : process.env.STRIPE_IMMERSION_FULL_PRICE_ID;
  const balancePrice = mode === "live" ? process.env.STRIPE_IMMERSION_LIVE_BALANCE_PRICE_ID : process.env.STRIPE_IMMERSION_BALANCE_PRICE_ID;
  const webhookSecret = mode === "live" ? process.env.STRIPE_IMMERSION_LIVE_WEBHOOK_SECRET : process.env.STRIPE_IMMERSION_WEBHOOK_SECRET;
  const baseUrl = mode === "live" ? process.env.IMMERSION_LIVE_BASE_URL : undefined;
  // Optional: direct invites never affect the existing email verification flow.
  const directInviteSecret = process.env.IMMERSION_DIRECT_INVITE_SECRET?.trim();
  if (!secret || secret.length < 32 || !stripeKey || !depositPrice || !fullPrice || !balancePrice ||
    (mode === "live" ? !stripeKey?.startsWith("rk_live_") : !stripeKey?.startsWith("sk_test_")) ||
    !depositPrice?.startsWith("price_") || !fullPrice?.startsWith("price_") || !balancePrice?.startsWith("price_") ||
    (mode === "live" && (!webhookSecret?.startsWith("whsec_") || !baseUrl?.startsWith("https://"))) ||
    !process.env.RESEND_API_KEY || !process.env.FORM_NOTIFICATION_FROM ||
    !process.env.FORM_NOTIFICATION_TO) return null;
  let roster: Invitee[];
  try {
    roster = inviteesSchema.parse(JSON.parse(process.env.IMMERSION_SELECTED_PARTICIPANTS_JSON || ""));
  } catch { return null; }
  const emails = roster.map((person) => person.email.toLowerCase());
  if (new Set(emails).size !== emails.length) return null;
  if (baseUrl) {
    try {
      const url = new URL(baseUrl);
      if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) return null;
    } catch { return null; }
  }
  return { mode, secret, stripeKey, depositPrice, fullPrice, balancePrice, webhookSecret, baseUrl,
    directInviteSecret: directInviteSecret && directInviteSecret.length >= 32 ? directInviteSecret : undefined, roster };
}

export function getImmersionWebhookConfig() {
  // Paid Sessions can settle after the payment section is switched off or an
  // invitee is removed, so webhook verification must not depend on either.
  const mode = configuredMode(true);
  if (!mode) return null;
  const stripeKey = mode === "live" ? process.env.STRIPE_IMMERSION_LIVE_RESTRICTED_KEY : process.env.STRIPE_SECRET_KEY;
  const webhookSecret = mode === "live" ? process.env.STRIPE_IMMERSION_LIVE_WEBHOOK_SECRET : process.env.STRIPE_IMMERSION_WEBHOOK_SECRET;
  if (!stripeKey || !webhookSecret || !webhookSecret.startsWith("whsec_") ||
    (mode === "live" ? !stripeKey.startsWith("rk_live_") : !stripeKey.startsWith("sk_test_"))) return null;
  return { mode, stripeKey, webhookSecret };
}

export function findInvitee(roster: Invitee[], email: string) {
  return roster.find((person) => person.email.toLowerCase() === email.trim().toLowerCase() &&
    (!person.expiresAt || Date.parse(person.expiresAt) > Date.now()));
}

export function signInviteToken(email: string, purpose: TokenPurpose, secret: string, ttlSeconds: number) {
  const payload = Buffer.from(JSON.stringify({
    email: email.toLowerCase(), purpose, exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  })).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyInviteToken(token: string | undefined, purpose: TokenPurpose, secret: string) {
  if (!token || token.length > 2048) return null;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;
  const expected = createHmac("sha256", secret).update(payload).digest();
  let actual: Buffer;
  try { actual = Buffer.from(signature, "base64url"); } catch { return null; }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as Record<string, unknown>;
    if (data.purpose !== purpose || typeof data.email !== "string" ||
      typeof data.exp !== "number" || data.exp <= Date.now() / 1000) return null;
    return data.email;
  } catch { return null; }
}
