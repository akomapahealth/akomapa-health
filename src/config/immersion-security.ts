import { FILLOUT_EMBED_ORIGIN } from "../lib/intake/immersion-registry";

export const IMMERSION_ROUTE = "/global-health-immersion-program" as const;

export const IMMERSION_SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: `frame-src 'self' ${FILLOUT_EMBED_ORIGIN};`,
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
] as const;
