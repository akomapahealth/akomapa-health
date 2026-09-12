import { NextRequest } from "next/server";
import { z } from "zod";
import {
  getMailerLiteClient,
  normalizeMailerLiteError,
  upsertSubscriber,
} from "@/lib/mailerlite";
import {
  getRequestClientAddress,
  noStoreJson,
  readSecureJson,
} from "@/lib/http/public-api-security";
import {
  NEWSLETTER_RATE_LIMIT_WINDOW_MS,
  newsletterRateLimiter,
} from "@/lib/newsletter/security";

const MAX_BODY_BYTES = 2_048;
const newsletterSchema = z
  .object({ email: z.string().trim().email().max(254) })
  .strict();

export async function POST(request: NextRequest) {
  const payload = await readSecureJson(request, MAX_BODY_BYTES);
  if (!payload.ok) return payload.response;

  if (
    newsletterRateLimiter.isLimited(
      `newsletter:${getRequestClientAddress(request)}`,
    )
  ) {
    return noStoreJson(
      { error: "Too many requests. Please try again later." },
      429,
      { "Retry-After": String(NEWSLETTER_RATE_LIMIT_WINDOW_MS / 1_000) },
    );
  }

  const parsed = newsletterSchema.safeParse(payload.body);
  if (!parsed.success) {
    return noStoreJson({ error: "Please enter a valid email address" }, 400);
  }

  try {
    const { email } = parsed.data;

    const mailerlite = await getMailerLiteClient();
    if (!mailerlite) {
      return noStoreJson(
        { error: "Newsletter service is currently unavailable" },
        503,
      );
    }

    await upsertSubscriber(mailerlite, {
      email,
      status: "active",
    });
    return noStoreJson(
      { message: "Successfully subscribed to newsletter" },
      200,
    );
  } catch (error: unknown) {
    const normalized = normalizeMailerLiteError(error);

    if (normalized.kind === "validation") {
      return noStoreJson(
        { error: "This email is already subscribed or invalid" },
        400,
      );
    }

    if (normalized.kind === "rate_limited") {
      return noStoreJson(
        { error: "Too many requests. Please try again later." },
        429,
        { "Retry-After": "60" },
      );
    }

    if (normalized.kind === "unauthorized") {
      return noStoreJson(
        { error: "Newsletter service is currently unavailable" },
        503,
      );
    }

    return noStoreJson(
      { error: "An unexpected error occurred. Please try again later." },
      502,
    );
  }
}
