import { NextRequest } from "next/server";
import { noStoreJson } from "@/lib/http/public-api-security";
import { findInvitee, getImmersionConfig, IMMERSION_COOKIE, verifyInviteToken } from "@/lib/payments/immersion";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const config = getImmersionConfig();
  if (!config) return noStoreJson({ verified: false }, 200);
  const email = verifyInviteToken(request.cookies.get(IMMERSION_COOKIE)?.value, "session", config.secret);
  const person = email && findInvitee(config.roster, email);
  return noStoreJson(person ? { verified: true, firstName: person.name.split(/\s+/)[0] } : { verified: false }, 200);
}
