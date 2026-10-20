import { NextRequest, NextResponse } from "next/server";
import { findInvitee, getImmersionConfig, IMMERSION_COOKIE, IMMERSION_PATH, signInviteToken, verifyInviteToken } from "@/lib/payments/immersion";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const destination = new URL(IMMERSION_PATH, request.nextUrl.origin);
  const config = getImmersionConfig();
  const token = request.nextUrl.searchParams.get("token") || undefined;
  const email = config && verifyInviteToken(token, "email", config.secret);
  const person = email && config && findInvitee(config.roster, email);
  destination.searchParams.set("immersionVerification", person ? "success" : "expired");
  const response = NextResponse.redirect(destination);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  if (person && config) {
    response.cookies.set(IMMERSION_COOKIE, signInviteToken(person.email, "session", config.secret, 2 * 60 * 60), {
      httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax", path: "/api/immersion", maxAge: 2 * 60 * 60,
    });
  }
  return response;
}
