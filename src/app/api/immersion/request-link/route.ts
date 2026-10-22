import { createHash } from "node:crypto";
import { NextRequest } from "next/server";
import { createInMemoryRateLimiter, getRequestClientAddress, noStoreJson, readSecureJson } from "@/lib/http/public-api-security";
import { getResendConfig } from "@/lib/intake/server/config";
import { findInvitee, getImmersionConfig, signInviteToken } from "@/lib/payments/immersion";

export const runtime = "nodejs";
const perIp = createInMemoryRateLimiter({ maxEntries: 5000, maxRequests: 10, windowMs: 60 * 60 * 1000 });
const perEmail = createInMemoryRateLimiter({ maxEntries: 5000, maxRequests: 3, windowMs: 60 * 60 * 1000 });
const genericMessage = "If this address is on the selected cohort list, a verification link is on its way. Please check your inbox. If it does not arrive and you think there is a mistake, contact Akomapa. We would love to welcome you to a future cohort.";

export async function POST(request: NextRequest) {
  const config = getImmersionConfig();
  if (!config) return noStoreJson({ error: "Payment verification is unavailable" }, 503);
  const parsed = await readSecureJson(request, 1024);
  if (!parsed.ok) return parsed.response;
  const email = typeof parsed.body === "object" && parsed.body !== null && "email" in parsed.body && typeof parsed.body.email === "string"
    ? parsed.body.email.trim().toLowerCase() : "";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return noStoreJson({ error: "Enter a valid email address" }, 400);
  }
  if (perIp.isLimited(getRequestClientAddress(request))) return noStoreJson({ error: "Please try again later" }, 429);
  const emailKey = createHash("sha256").update(email).digest("hex");
  if (perEmail.isLimited(emailKey)) return noStoreJson({ message: genericMessage }, 200);
  const person = findInvitee(config.roster, email);
  if (person) {
    const token = signInviteToken(email, "email", config.secret, 15 * 60);
    const url = new URL("/api/immersion/verify", config.baseUrl || request.nextUrl.origin);
    url.searchParams.set("token", token);
    try {
      const { apiKey, from } = getResendConfig();
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [person.email],
          subject: "Verify your Akomapa Immersion payment access",
          text: `Hello ${person.name.split(/\s+/)[0]},\n\nUse this link within 15 minutes to verify your email and view your Immersion Program payment options:\n${url.toString()}\n\nIf you did not request this link, you can ignore this message. A payment alone does not confirm a place in the cohort.\n\nAkomapa Health Foundation`,
        }),
        redirect: "error",
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) throw new Error("Verification email rejected");
    } catch {
      console.error("Immersion verification email failed");
      return noStoreJson({ error: "We could not send the verification email. Please try again later." }, 503);
    }
  }
  return noStoreJson({ message: genericMessage }, 200);
}
