export const SENTRY_DSN =
  "https://0642fc20ef5cf0282a9b63cfd47ed24e@o4510806105915392.ingest.us.sentry.io/4510806113189888";

export const SENTRY_APPLICATION_KEY = "akomapa-web";

export const SENTRY_REDACTED_VALUE = "[Filtered]";

export const SENTRY_REPLAY_PRIVACY_OPTIONS = {
  maskAllText: true,
  maskAllInputs: true,
  blockAllMedia: true,
};

type Env = Record<string, string | undefined>;

type SentryStackFrame = {
  filename?: string;
  in_app?: boolean;
  module?: string;
};

type SentryExceptionValue = {
  type?: string;
  value?: string;
  stacktrace?: {
    frames?: SentryStackFrame[];
  };
};

export type SentryEvent = {
  message?: string;
  exception?: {
    values?: SentryExceptionValue[];
  };
  request?: {
    headers?: Record<string, unknown>;
    cookies?: unknown;
    data?: unknown;
    env?: Record<string, unknown>;
    [key: string]: unknown;
  };
  user?: Record<string, unknown>;
  extra?: Record<string, unknown>;
  contexts?: Record<string, unknown>;
  breadcrumbs?: Array<{
    data?: Record<string, unknown>;
    [key: string]: unknown;
  }>;
  tags?: Record<string, string | number | boolean | null | undefined>;
  fingerprint?: string[];
  [key: string]: unknown;
};

export type SentryEventHint = {
  originalException?: unknown;
  syntheticException?: unknown;
  [key: string]: unknown;
};

const SENSITIVE_HEADER_NAMES = new Set([
  "authorization",
  "cookie",
  "forwarded",
  "proxy-authorization",
  "set-cookie",
  "stripe-signature",
  "webhook-signature",
  "x-airtable-api-key",
  "x-api-key",
  "x-forwarded-for",
  "x-real-ip",
]);

const SENSITIVE_KEY_PATTERN =
  /(?:^|_|\b)(access[_-]?key|api[_-]?key|authorization|client[_-]?secret|cookie|csrf|donor[_-]?email|donor[_-]?name|email|form[_-]?data|html|ip|message|name|password|phone|secret|server[_-]?action|signature|stripe|token)(?:$|_|\b)/i;

const BODY_KEY_PATTERN =
  /^(body|data|form|formData|payload|requestBody|serverAction|serverActionPayload)$/i;

const IP_ENV_KEYS = new Set([
  "REMOTE_ADDR",
  "HTTP_X_FORWARDED_FOR",
  "HTTP_X_REAL_IP",
  "X_FORWARDED_FOR",
  "X_REAL_IP",
]);

export function resolveSentryEnvironment(env: Env = process.env): string {
  const explicitEnvironment =
    env.SENTRY_ENVIRONMENT || env.NEXT_PUBLIC_SENTRY_ENVIRONMENT;

  if (explicitEnvironment) {
    return explicitEnvironment;
  }

  if (env.VERCEL_ENV === "production") {
    return "production";
  }

  if (env.VERCEL_ENV === "preview") {
    return "preview";
  }

  if (env.NODE_ENV === "production") {
    return "production";
  }

  return "development";
}

export function resolveSentryRelease(env: Env = process.env): string | undefined {
  return (
    env.SENTRY_RELEASE ||
    env.NEXT_PUBLIC_SENTRY_RELEASE ||
    env.VERCEL_GIT_COMMIT_SHA ||
    env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA
  );
}

export function isSentryServerEnabled(env: Env = process.env): boolean {
  if (env.SENTRY_ENABLED === "false") {
    return false;
  }

  if (env.SENTRY_ENABLED === "true") {
    return true;
  }

  return isDeployedRuntime(env);
}

export function isSentryClientEnabled(env: Env = process.env): boolean {
  if (env.NEXT_PUBLIC_SENTRY_ENABLED === "false") {
    return false;
  }

  if (env.NEXT_PUBLIC_SENTRY_ENABLED === "true") {
    return true;
  }

  return isDeployedRuntime(env);
}

export function getSentryDsn(env: Env = process.env): string {
  return env.NEXT_PUBLIC_SENTRY_DSN || SENTRY_DSN;
}

export function getSentryBaseOptions(env: Env = process.env) {
  const release = resolveSentryRelease(env);

  return {
    dsn: getSentryDsn(env),
    environment: resolveSentryEnvironment(env),
    release,
    tracesSampleRate: env.NODE_ENV === "production" ? 0.1 : 1,
    enableLogs: true,
    sendDefaultPii: false,
    beforeSend: createBeforeSend(env),
  };
}

export function getSentryPublicEnv(env: Env = process.env): Record<string, string> {
  const publicEnv: Record<string, string> = {
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: resolveSentryEnvironment(env),
  };
  const release = resolveSentryRelease(env);

  if (release) {
    publicEnv.NEXT_PUBLIC_SENTRY_RELEASE = release;
  }

  return publicEnv;
}

export function shouldWrapSentryBuild(env: Env = process.env): boolean {
  if (env.SENTRY_BUILD_PLUGIN === "false") {
    return false;
  }

  if (env.SENTRY_BUILD_PLUGIN === "true") {
    return true;
  }

  return isDeployedRuntime(env);
}

export function shouldUploadSentrySourceMaps(env: Env = process.env): boolean {
  return Boolean(env.CI && env.SENTRY_AUTH_TOKEN);
}

export function createBeforeSend(env: Env = process.env) {
  const environment = resolveSentryEnvironment(env);

  return (event: SentryEvent, hint?: SentryEventHint): SentryEvent | null => {
    if (shouldDropKnownNoise(event, environment)) {
      return null;
    }

    const sanitizedEvent = scrubSentryEvent(event);
    return addHydrationContext(sanitizedEvent, hint);
  };
}

export function scrubSentryEvent(event: SentryEvent): SentryEvent {
  const scrubbedEvent: SentryEvent = {
    ...event,
    user: sanitizeUser(event.user),
    request: sanitizeRequest(event.request),
    extra: sanitizeRecord(event.extra),
    contexts: sanitizeRecord(event.contexts),
    breadcrumbs: event.breadcrumbs?.map((breadcrumb) => ({
      ...breadcrumb,
      data: sanitizeRecord(breadcrumb.data),
    })),
  };

  return scrubbedEvent;
}

export function shouldDropKnownNoise(
  event: SentryEvent,
  environment = "development"
): boolean {
  const message = getEventMessage(event);
  const frames = getEventFrames(event);

  if (isInstagramNativeBridgeError(message, frames)) {
    return true;
  }

  if (
    message.includes("Object Not Found Matching Id") &&
    !hasApplicationFrame(frames)
  ) {
    return true;
  }

  if (environment !== "development") {
    return false;
  }

  return (
    isSentryVendorChunkCollision(message, frames) ||
    isWebpackUndefinedCallCollision(message) ||
    isFastRefreshGenericEvent(message, frames)
  );
}

export function addHydrationContext(
  event: SentryEvent,
  hint?: SentryEventHint
): SentryEvent {
  if (!isHydrationError(event, hint)) {
    return event;
  }

  return {
    ...event,
    tags: {
      ...event.tags,
      "error.category": "hydration",
      "hydration.filtered": false,
    },
    contexts: {
      ...event.contexts,
      hydration: {
        observable: true,
        filtered: false,
        reason: "Hydration errors remain visible for regression monitoring.",
      },
    },
    fingerprint: ["react-hydration-error"],
  };
}

function isDeployedRuntime(env: Env): boolean {
  return (
    env.VERCEL_ENV === "production" ||
    env.VERCEL_ENV === "preview" ||
    env.NODE_ENV === "production"
  );
}

function sanitizeUser(user: SentryEvent["user"]): SentryEvent["user"] | undefined {
  if (!user) {
    return undefined;
  }

  const sanitizedUser = { ...user };
  delete sanitizedUser.email;
  delete sanitizedUser.ip_address;
  delete sanitizedUser.username;

  return Object.keys(sanitizedUser).length > 0 ? sanitizedUser : undefined;
}

function sanitizeRequest(
  request: SentryEvent["request"]
): SentryEvent["request"] | undefined {
  if (!request) {
    return undefined;
  }

  return {
    ...sanitizeObject(request),
    headers: sanitizeHeaders(request.headers),
    cookies: request.cookies === undefined ? undefined : SENTRY_REDACTED_VALUE,
    data: request.data === undefined ? undefined : SENTRY_REDACTED_VALUE,
    env: sanitizeRequestEnv(request.env),
  };
}

function sanitizeHeaders(
  headers: Record<string, unknown> | undefined
): Record<string, unknown> | undefined {
  if (!headers) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key,
      SENSITIVE_HEADER_NAMES.has(key.toLowerCase()) ? SENTRY_REDACTED_VALUE : value,
    ])
  );
}

function sanitizeRequestEnv(
  env: Record<string, unknown> | undefined
): Record<string, unknown> | undefined {
  if (!env) {
    return undefined;
  }

  return Object.fromEntries(
    Object.entries(env).map(([key, value]) => [
      key,
      IP_ENV_KEYS.has(key) ? SENTRY_REDACTED_VALUE : value,
    ])
  );
}

function sanitizeRecord<T extends Record<string, unknown> | undefined>(
  value: T
): T {
  if (!value) {
    return value;
  }

  return sanitizeObject(value) as T;
}

function sanitizeObject(value: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      sanitizeValue(key, nestedValue),
    ])
  );
}

function sanitizeValue(key: string, value: unknown): unknown {
  if (isSensitiveKey(key) || BODY_KEY_PATTERN.test(key)) {
    return SENTRY_REDACTED_VALUE;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(key, item));
  }

  if (isPlainRecord(value)) {
    return sanitizeObject(value);
  }

  return value;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function isSensitiveKey(key: string): boolean {
  const normalizedKey = key.replace(/([a-z])([A-Z])/g, "$1_$2");
  return SENSITIVE_KEY_PATTERN.test(normalizedKey);
}

function getEventMessage(event: SentryEvent): string {
  const exceptionMessages =
    event.exception?.values
      ?.flatMap((exception) => [exception.type, exception.value])
      .filter(Boolean)
      .join(" ") || "";

  return [event.message, exceptionMessages].filter(Boolean).join(" ");
}

function getEventFrames(event: SentryEvent): SentryStackFrame[] {
  return (
    event.exception?.values?.flatMap(
      (exception) => exception.stacktrace?.frames || []
    ) || []
  );
}

function hasApplicationFrame(frames: SentryStackFrame[]): boolean {
  return frames.some((frame) => frame.in_app === true);
}

function isInstagramNativeBridgeError(
  message: string,
  frames: SentryStackFrame[]
): boolean {
  return (
    message.includes("app://navigation_performance_logger_android") ||
    frames.some((frame) =>
      frame.filename?.includes("app://navigation_performance_logger_android")
    )
  );
}

function isSentryVendorChunkCollision(
  message: string,
  frames: SentryStackFrame[]
): boolean {
  return (
    message.includes(".next/vendor-chunks/@sentry.js") ||
    frames.some((frame) => frame.filename?.includes("vendor-chunks/@sentry"))
  );
}

function isWebpackUndefinedCallCollision(message: string): boolean {
  return (
    message.includes("undefined.call") ||
    message.includes("Cannot read properties of undefined (reading 'call')")
  );
}

function isFastRefreshGenericEvent(
  message: string,
  frames: SentryStackFrame[]
): boolean {
  const normalizedMessage = message.trim().toLowerCase();
  const hasFastRefreshFrame = frames.some((frame) => {
    const filename = frame.filename?.toLowerCase() || "";
    return (
      filename.includes("react-refresh") ||
      filename.includes("fast-refresh") ||
      filename.includes("_next/static/chunks/webpack")
    );
  });

  return normalizedMessage === "event" && hasFastRefreshFrame;
}

function isHydrationError(event: SentryEvent, hint?: SentryEventHint): boolean {
  const message = getEventMessage(event);
  const originalException =
    hint?.originalException instanceof Error ? hint.originalException.message : "";

  return /hydration|server-rendered html|did not match/i.test(
    `${message} ${originalException}`
  );
}
