import { NextRequest, NextResponse } from "next/server";

type RateLimiterOptions = {
  maxEntries: number;
  maxRequests: number;
  windowMs: number;
};

type RateLimitEntry = { count: number; resetAt: number };

export function noStoreJson(
  body: Record<string, unknown>,
  status: number,
  headers?: HeadersInit,
) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

export async function readSecureJson(
  request: NextRequest,
  maxBodyBytes: number,
): Promise<
  | { ok: true; body: unknown }
  | { ok: false; response: NextResponse<Record<string, unknown>> }
> {
  const contentType = (request.headers.get("content-type") ?? "")
    .split(";", 1)[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return {
      ok: false,
      response: noStoreJson({ error: "Unsupported content type" }, 415),
    };
  }

  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) {
    return {
      ok: false,
      response: noStoreJson({ error: "Request origin is not allowed" }, 403),
    };
  }

  const contentLengthHeader = request.headers.get("content-length");
  if (contentLengthHeader) {
    const contentLength = Number(contentLengthHeader);
    if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
      return {
        ok: false,
        response: noStoreJson({ error: "Request body is too large" }, 413),
      };
    }
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return {
      ok: false,
      response: noStoreJson({ error: "Invalid request body" }, 400),
    };
  }

  if (new TextEncoder().encode(rawBody).byteLength > maxBodyBytes) {
    return {
      ok: false,
      response: noStoreJson({ error: "Request body is too large" }, 413),
    };
  }

  try {
    return { ok: true, body: JSON.parse(rawBody) };
  } catch {
    return {
      ok: false,
      response: noStoreJson({ error: "Invalid request body" }, 400),
    };
  }
}

export function getRequestClientAddress(request: NextRequest) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export function createInMemoryRateLimiter({
  maxEntries,
  maxRequests,
  windowMs,
}: RateLimiterOptions) {
  const entries = new Map<string, RateLimitEntry>();

  return {
    isLimited(clientKey: string, now = Date.now()) {
      const current = entries.get(clientKey);
      if (!current || current.resetAt <= now) {
        for (const [key, entry] of entries) {
          if (entry.resetAt <= now) entries.delete(key);
        }
        while (entries.size >= maxEntries) {
          const oldestKey = entries.keys().next().value;
          if (typeof oldestKey !== "string") break;
          entries.delete(oldestKey);
        }
        entries.set(clientKey, { count: 1, resetAt: now + windowMs });
        return false;
      }

      current.count += 1;
      return current.count > maxRequests;
    },
    reset() {
      entries.clear();
    },
  };
}
