import { NextRequest, NextResponse } from "next/server";
import { donationFollowUpSchema } from "@/lib/donation-follow-up";

const MAX_BODY_BYTES = 8_192;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 1_000;
const WEB3FORMS_HOST = "api.web3forms.com";

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

function getClientKey(request: NextRequest) {
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

function getVerifiedWeb3FormsUrl() {
  const configuredUrl = process.env.WEB3FORMS_API_URL;

  if (!configuredUrl) {
    return null;
  }

  try {
    const url = new URL(configuredUrl);
    if (
      url.protocol !== "https:" ||
      url.hostname !== WEB3FORMS_HOST ||
      url.pathname !== "/submit"
    ) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
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

  if (isRateLimited(getClientKey(request))) {
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

  const parsed = donationFollowUpSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse({ error: "Invalid follow-up details" }, 400);
  }

  if (parsed.data.company) {
    return jsonResponse({ success: true }, 200);
  }

  const apiKey = process.env.WEB3FORMS_API_KEY;
  const web3FormsUrl = getVerifiedWeb3FormsUrl();
  if (!apiKey || !web3FormsUrl) {
    return jsonResponse(
      { error: "Donation follow-up service is currently unavailable" },
      503,
    );
  }

  const flowLabel =
    parsed.data.flow === "partner"
      ? "Partners Program (manual monthly transfers)"
      : "One-time gift";
  const message = [
    "A donor shared their details for a personal thank-you after using the manual MTN Mobile Money instructions.",
    "",
    `Name: ${parsed.data.name}`,
    `Email: ${parsed.data.email}`,
    `Giving flow: ${flowLabel}`,
    `Selected giving level (unverified context only): ${parsed.data.selectedGivingLevel}`,
    "Payment method: MTN Mobile Money manual transfer",
    "",
    "Important: This form submission does not verify or confirm that a payment was completed.",
  ].join("\n");

  const formData = new FormData();
  formData.append("access_key", apiKey);
  formData.append("subject", "Donation follow-up request");
  formData.append("message", message);
  formData.append("from_name", "Akomapa Health Foundation Website");
  formData.append("name", parsed.data.name);
  formData.append("email", parsed.data.email);
  formData.append("replyto", parsed.data.email);
  formData.append("botcheck", "");

  try {
    const response = await fetch(web3FormsUrl, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Web3Forms donation follow-up failed: ${response.status}`);
      return jsonResponse(
        { error: "Unable to share your details right now" },
        502,
      );
    }

    const result: unknown = await response.json();
    if (
      typeof result === "object" &&
      result !== null &&
      "success" in result &&
      result.success === true
    ) {
      return jsonResponse({ success: true }, 200);
    }

    console.error("Web3Forms donation follow-up returned a non-success result");
    return jsonResponse(
      { error: "Unable to share your details right now" },
      502,
    );
  } catch {
    console.error("Web3Forms donation follow-up request failed");
    return jsonResponse(
      { error: "Unable to share your details right now" },
      502,
    );
  }
}
