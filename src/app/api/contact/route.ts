import { NextRequest, NextResponse } from "next/server";
import { contactSubmissionSchema } from "@/lib/contact";

const MAX_BODY_BYTES = 8_192;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_ENTRIES = 1_000;
const WEB3FORMS_URL = new URL("https://api.web3forms.com/submit");

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitEntries = new Map<string, RateLimitEntry>();

function jsonResponse(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json(
    { message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...headers,
      },
    },
  );
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

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.startsWith("application/json")) {
    return jsonResponse("Unsupported content type", 415);
  }

  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) {
    return jsonResponse("Request origin is not allowed", 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return jsonResponse("Request body is too large", 413);
  }

  if (isRateLimited(getClientKey(request))) {
    return jsonResponse("Too many requests. Please try again later.", 429, {
      "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1_000),
    });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse("Invalid request body", 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonResponse("Request body is too large", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse("Invalid request body", 400);
  }

  const parsed = contactSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    return jsonResponse("Please check the form fields and try again.", 400);
  }

  if (parsed.data.company) {
    return jsonResponse("Message sent successfully", 200);
  }

  const apiKey = process.env.WEB3FORMS_API_KEY;
  if (!apiKey) {
    console.error("Contact form is unavailable: WEB3FORMS_API_KEY is not configured");
    return jsonResponse(
      "Contact service is temporarily unavailable. Please email us directly.",
      503,
    );
  }

  const fullMessage = parsed.data.partnershipType
    ? `Partnership Type: ${parsed.data.partnershipType}\n\n${parsed.data.message}`
    : parsed.data.message;
  const formData = new FormData();
  formData.append("access_key", apiKey);
  formData.append("to", "akomapahealth@gmail.com");
  formData.append("name", parsed.data.name);
  formData.append("email", parsed.data.email);
  formData.append("phone", parsed.data.phone);
  formData.append(
    "subject",
    `Akomapa Health Foundation - ${parsed.data.subject}`,
  );
  formData.append("message", fullMessage);
  formData.append("from_name", "Akomapa Health Foundation Website");
  formData.append("replyto", parsed.data.email);
  formData.append("botcheck", "");

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error(`Web3Forms contact submission failed: ${response.status}`);
      return jsonResponse(
        "We could not send your message right now. Please email us directly.",
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
      return jsonResponse("Message sent successfully", 200);
    }

    console.error("Web3Forms contact submission returned a non-success result");
    return jsonResponse(
      "We could not send your message right now. Please email us directly.",
      502,
    );
  } catch {
    console.error("Web3Forms contact submission request failed");
    return jsonResponse(
      "We could not send your message right now. Please email us directly.",
      502,
    );
  }
}
