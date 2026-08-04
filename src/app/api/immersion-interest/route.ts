import { NextRequest, NextResponse } from "next/server";
import {
  immersionInterestSchema,
  IMMERSION_SIGNUP_SOURCE,
  normalizeImmersionInterestAs,
  type ImmersionInterestOutcome,
} from "@/lib/immersion-interest";
import {
  getMailerLiteClient,
  getSubscriberByEmail,
  isSuppressedSubscriberStatus,
  normalizeMailerLiteError,
  upsertSubscriber,
} from "@/lib/mailerlite";

const MAX_BODY_BYTES = 8_192;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 1_000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitEntries = new Map<string, RateLimitEntry>();

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function isRateLimited(clientKey: string) {
  const now = Date.now();
  const current = rateLimitEntries.get(clientKey);

  if (!current || current.resetAt <= now) {
    for (const [key, entry] of rateLimitEntries) {
      if (entry.resetAt <= now) {
        rateLimitEntries.delete(key);
      }
    }

    while (rateLimitEntries.size >= RATE_LIMIT_MAX_ENTRIES) {
      const oldestKey = rateLimitEntries.keys().next().value;
      if (typeof oldestKey !== "string") {
        break;
      }
      rateLimitEntries.delete(oldestKey);
    }

    rateLimitEntries.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function successResponse(outcome: ImmersionInterestOutcome) {
  return jsonResponse({ success: true, outcome }, 200);
}

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("application/json")) {
    return jsonResponse({ error: "Unsupported content type" }, 415);
  }

  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) {
    return jsonResponse({ error: "Request origin is not allowed" }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: "Request body is too large" }, 413);
  }

  const ipKey = `ip:${getClientIp(request)}`;
  if (isRateLimited(ipKey)) {
    return jsonResponse(
      { error: "Too many requests. Please try again later." },
      429,
      { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1_000) },
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonResponse({ error: "Request body is too large" }, 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ error: "Invalid request body" }, 400);
  }

  const parsed = immersionInterestSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid immersion alert details" }, 400);
  }

  if (parsed.data.company) {
    return successResponse("pending_confirmation");
  }

  const emailKey = `email:${parsed.data.email}`;
  if (isRateLimited(emailKey)) {
    return jsonResponse(
      { error: "Too many requests. Please try again later." },
      429,
      { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1_000) },
    );
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_IMMERSION_GROUP_ID;
  if (!apiKey || !groupId) {
    console.error("Immersion alert service misconfigured");
    return jsonResponse(
      { error: "Immersion alert service is currently unavailable" },
      503,
    );
  }

  const mailerlite = await getMailerLiteClient(apiKey);
  if (!mailerlite) {
    return jsonResponse(
      { error: "Immersion alert service is currently unavailable" },
      503,
    );
  }

  const fields: Record<string, string> = {
    name: parsed.data.firstName,
    signup_source: IMMERSION_SIGNUP_SOURCE,
  };
  const interestAs = normalizeImmersionInterestAs(parsed.data.interestAs);
  if (interestAs) {
    fields.immersion_interest_as = interestAs;
  }

  try {
    const existing = await getSubscriberByEmail(mailerlite, parsed.data.email);

    if (existing && isSuppressedSubscriberStatus(existing.status)) {
      console.error("Immersion alert signup suppressed", {
        outcome: "suppressed",
        status: existing.status,
      });
      return successResponse("suppressed");
    }

    if (existing?.status === "active") {
      await upsertSubscriber(mailerlite, {
        email: parsed.data.email,
        fields,
        groups: [groupId],
      });
      return successResponse("already_registered");
    }

    await upsertSubscriber(mailerlite, {
      email: parsed.data.email,
      fields,
      groups: [groupId],
      status: "unconfirmed",
    });
    return successResponse("pending_confirmation");
  } catch (error) {
    const normalized = normalizeMailerLiteError(error);

    if (normalized.kind === "rate_limited") {
      return jsonResponse(
        { error: "Too many requests. Please try again later." },
        429,
        { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1_000) },
      );
    }

    if (normalized.kind === "validation") {
      return jsonResponse({ error: "Invalid immersion alert details" }, 400);
    }

    if (normalized.kind === "unauthorized") {
      console.error("Immersion alert provider unauthorized");
      return jsonResponse(
        { error: "Immersion alert service is currently unavailable" },
        503,
      );
    }

    if (normalized.kind === "network") {
      console.error("Immersion alert provider network failure");
      return jsonResponse(
        { error: "Unable to save immersion alert right now" },
        502,
      );
    }

    console.error("Immersion alert provider unexpected failure", {
      status: normalized.status,
    });
    return jsonResponse(
      { error: "Unable to save immersion alert right now" },
      502,
    );
  }
}
