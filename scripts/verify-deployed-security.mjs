import { pathToFileURL } from "node:url";

const REQUEST_TIMEOUT_MS = 15_000;
const REPRESENTATIVE_ROUTES = [
  "/",
  "/about",
  "/programs",
  "/global-health-immersion-program",
];
const FORBIDDEN_BUNDLE_MARKERS = [
  "FILLOUT_API_KEY",
  "FILLOUT_FORM_CONFIG",
  "RESEND_API_KEY",
  "INTAKE_ADMIN_TOKEN",
  "INTAKE_NOTIFICATION_RECIPIENT",
  "ci-intake-secret-must-not-leak",
  "ci-notification-secret-must-not-leak",
];
const EXPECTED_HEADERS = {
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "strict-transport-security": "max-age=31536000; includeSubDomains",
};

export function parseVercelDeploymentUrl(rawUrl) {
  if (typeof rawUrl !== "string" || rawUrl.trim().length === 0) {
    throw new Error("A Vercel deployment URL is required.");
  }

  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("Deployment URL is not a valid absolute URL.");
  }

  const hostname = url.hostname.toLowerCase();
  if (url.protocol !== "https:") {
    throw new Error("Deployment URL must use HTTPS.");
  }
  if (!hostname.endsWith(".vercel.app") || hostname === "vercel.app") {
    throw new Error("Deployment URL must be an exact subdomain of vercel.app.");
  }
  if (url.username || url.password || url.port) {
    throw new Error("Deployment URL must not contain credentials or a port.");
  }
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error("Deployment URL must point to the deployment root without query or fragment data.");
  }

  url.hostname = hostname;
  return url;
}

export function hasCspDirectiveValue(policy, directive, expectedValue) {
  const normalizedDirective = directive.toLowerCase();
  return policy.split(";").some((rawDirective) => {
    const [name = "", ...values] = rawDirective.trim().split(/\s+/);
    return name.toLowerCase() === normalizedDirective && values.includes(expectedValue);
  });
}

export function isVercelAuthenticationRedirect(rawLocation, requestUrl) {
  if (!rawLocation) return false;

  let redirectUrl;
  try {
    redirectUrl = new URL(rawLocation, requestUrl);
  } catch {
    return false;
  }

  return (
    redirectUrl.protocol === "https:" &&
    redirectUrl.hostname === "vercel.com" &&
    redirectUrl.port === "" &&
    redirectUrl.pathname === "/sso-api"
  );
}

async function request(url, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      redirect: "manual",
      ...init,
      signal: controller.signal,
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (isVercelAuthenticationRedirect(location, url)) {
        throw new Error(
          "Deployment is protected by Vercel Authentication. Preview Security Smoke requires an anonymously reachable preview because it intentionally uses no deployment credentials.",
        );
      }
      throw new Error(`Request returned an unexpected redirect (${response.status}).`);
    }
    const finalUrl = new URL(response.url);
    if (!finalUrl.hostname.endsWith(".vercel.app")) {
      throw new Error(`Request escaped the approved Vercel boundary: ${response.url}`);
    }
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

function assertStatus(response, expected, label) {
  if (response.status !== expected) {
    throw new Error(`${label} returned ${response.status}; expected ${expected}.`);
  }
}

function assertSafeErrorBody(body, label) {
  const forbidden = [
    "apiKey",
    "authorization",
    "provider-secret",
    "stack",
    "subscriber",
  ];
  for (const marker of forbidden) {
    if (body.toLowerCase().includes(marker.toLowerCase())) {
      throw new Error(`${label} exposed forbidden error detail: ${marker}.`);
    }
  }
}

function extractFirstPartyScripts(html, baseUrl) {
  const scripts = new Set();
  for (const match of html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    const url = new URL(match[1], baseUrl);
    if (url.origin === baseUrl.origin) scripts.add(url.href);
  }
  return [...scripts];
}

export async function verifyDeployment(rawUrl) {
  const baseUrl = parseVercelDeploymentUrl(rawUrl);
  let homeHtml = "";

  for (const route of REPRESENTATIVE_ROUTES) {
    const response = await request(new URL(route, baseUrl));
    assertStatus(response, 200, route);
    const body = await response.text();
    if (!body.toLowerCase().includes("akomapa")) {
      throw new Error(`${route} did not contain the expected site identity.`);
    }
    if (route === "/") homeHtml = body;
  }

  if (!/href=["']\/about(?:["'#?])/i.test(homeHtml)) {
    throw new Error("Home page is missing the critical About navigation target.");
  }

  const headerResponse = await request(baseUrl);
  for (const [key, expected] of Object.entries(EXPECTED_HEADERS)) {
    if (headerResponse.headers.get(key) !== expected) {
      throw new Error(`${key} is missing or differs from the approved value.`);
    }
  }
  const enforcedCsp = headerResponse.headers.get("content-security-policy") ?? "";
  const reportOnlyCsp =
    headerResponse.headers.get("content-security-policy-report-only") ?? "";
  for (const [directive, expectedValue] of [
    ["object-src", "'none'"],
    ["base-uri", "'self'"],
    ["frame-ancestors", "'none'"],
  ]) {
    if (!hasCspDirectiveValue(enforcedCsp, directive, expectedValue)) {
      throw new Error(`Enforced CSP is missing ${directive} ${expectedValue}.`);
    }
  }
  if (
    !hasCspDirectiveValue(reportOnlyCsp, "default-src", "'self'") ||
    !hasCspDirectiveValue(
      reportOnlyCsp,
      "frame-src",
      "https://forms.fillout.com",
    )
  ) {
    throw new Error("Report-only CSP is missing the approved broad policy or Fillout frame origin.");
  }

  const scripts = extractFirstPartyScripts(homeHtml, baseUrl);
  if (scripts.length === 0) throw new Error("No first-party client scripts were discovered.");
  for (const scriptUrl of scripts) {
    const scriptResponse = await request(scriptUrl);
    assertStatus(scriptResponse, 200, scriptUrl);
    const contents = await scriptResponse.text();
    for (const marker of FORBIDDEN_BUNDLE_MARKERS) {
      if (contents.includes(marker)) {
        throw new Error(`Client bundle ${scriptUrl} exposed forbidden marker ${marker}.`);
      }
    }
    if (/sourceMappingURL\s*=/.test(contents)) {
      throw new Error(`Client bundle ${scriptUrl} advertises a source map.`);
    }

    const mapUrl = new URL(scriptUrl);
    mapUrl.pathname += ".map";
    const mapResponse = await request(mapUrl, { headers: { Range: "bytes=0-128" } });
    if (mapResponse.status !== 404) {
      throw new Error(`Unexpected public source map response (${mapResponse.status}) for ${mapUrl}.`);
    }
  }

  const apiUrl = new URL("/api/newsletter", baseUrl);
  assertStatus(await request(apiUrl), 405, "newsletter GET");

  const crossOrigin = await request(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://attacker.example" },
    body: "{}",
  });
  assertStatus(crossOrigin, 403, "newsletter cross-origin request");
  assertSafeErrorBody(await crossOrigin.text(), "newsletter cross-origin request");

  const wrongContentType = await request(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain", Origin: baseUrl.origin },
    body: "{}",
  });
  assertStatus(wrongContentType, 415, "newsletter content-type request");

  const oversized = await request(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: baseUrl.origin },
    body: "x".repeat(2_049),
  });
  assertStatus(oversized, 413, "newsletter oversized request");

  const rateResponses = [];
  for (let attempt = 0; attempt < 6; attempt += 1) {
    rateResponses.push(
      await request(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Origin: baseUrl.origin },
        body: "{}",
      }),
    );
  }
  for (const response of rateResponses.slice(0, 5)) {
    assertStatus(response, 400, "newsletter bounded validation request");
    assertSafeErrorBody(await response.text(), "newsletter bounded validation request");
  }
  assertStatus(rateResponses[5], 429, "newsletter rate-limit request");
  if (!rateResponses[5].headers.get("retry-after")) {
    throw new Error("Newsletter rate-limit response is missing Retry-After.");
  }

  console.log(`Deployment security verification passed for ${baseUrl.origin}.`);
}

async function main() {
  const rawUrl = process.argv[2] ?? process.env.DEPLOYMENT_URL;
  await verifyDeployment(rawUrl);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
