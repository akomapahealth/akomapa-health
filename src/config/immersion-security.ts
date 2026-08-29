import { FILLOUT_EMBED_ORIGIN } from "../lib/intake/immersion-registry";
import { composeSecurityHeaders } from "./security-headers";

export const IMMERSION_ROUTE = "/global-health-immersion-program" as const;

export const IMMERSION_SECURITY_HEADERS = composeSecurityHeaders({
  allowFilloutFrame: true,
});

export { FILLOUT_EMBED_ORIGIN };
