import { describe, expect, it } from "vitest";

import {
  createBeforeSend,
  isSentryClientEnabled,
  isSentryServerEnabled,
  resolveSentryEnvironment,
  resolveSentryRelease,
  scrubSentryEvent,
  SENTRY_REDACTED_VALUE,
  SENTRY_REPLAY_PRIVACY_OPTIONS,
  shouldDropKnownNoise,
  type SentryEvent,
} from "@/lib/sentry-config";

describe("Sentry configuration", () => {
  it("keeps local development disabled unless explicitly enabled", () => {
    expect(isSentryServerEnabled({ NODE_ENV: "development" })).toBe(false);
    expect(isSentryClientEnabled({ NODE_ENV: "development" })).toBe(false);

    expect(
      isSentryServerEnabled({ NODE_ENV: "development", SENTRY_ENABLED: "true" })
    ).toBe(true);
    expect(
      isSentryClientEnabled({
        NODE_ENV: "development",
        NEXT_PUBLIC_SENTRY_ENABLED: "true",
      })
    ).toBe(true);
  });

  it("resolves distinct preview and production environments", () => {
    expect(
      resolveSentryEnvironment({
        NODE_ENV: "production",
        VERCEL_ENV: "preview",
      })
    ).toBe("preview");

    expect(
      resolveSentryEnvironment({
        NODE_ENV: "production",
        VERCEL_ENV: "production",
      })
    ).toBe("production");
  });

  it("uses explicit release values before Vercel commit fallback", () => {
    expect(
      resolveSentryRelease({
        SENTRY_RELEASE: "manual-release",
        VERCEL_GIT_COMMIT_SHA: "vercel-sha",
      })
    ).toBe("manual-release");

    expect(
      resolveSentryRelease({
        VERCEL_GIT_COMMIT_SHA: "vercel-sha",
      })
    ).toBe("vercel-sha");
  });

  it("keeps Session Replay text and media private by default", () => {
    expect(SENTRY_REPLAY_PRIVACY_OPTIONS).toEqual({
      maskAllText: true,
      maskAllInputs: true,
      blockAllMedia: true,
    });
  });

  it("scrubs user identifiers, sensitive headers, request bodies, and form data", () => {
    const event = scrubSentryEvent({
      user: {
        id: "user-123",
        email: "person@example.com",
        username: "person",
        ip_address: "203.0.113.1",
      },
      request: {
        headers: {
          Authorization: "Bearer token",
          Cookie: "session=value",
          "Content-Type": "application/json",
          "X-Forwarded-For": "203.0.113.1",
        },
        cookies: { session: "value" },
        data: { donorEmail: "person@example.com" },
        env: {
          REMOTE_ADDR: "203.0.113.1",
          REQUEST_METHOD: "POST",
        },
      },
      extra: {
        donorEmail: "person@example.com",
        nested: {
          accessToken: "secret",
          safeCount: 3,
        },
      },
      contexts: {
        serverActionPayload: {
          name: "Person",
        },
      },
      breadcrumbs: [
        {
          category: "fetch",
          data: {
            authorization: "Bearer token",
            statusCode: 500,
          },
        },
      ],
    });

    expect(event.user).toEqual({ id: "user-123" });
    expect(event.request?.headers).toEqual({
      Authorization: SENTRY_REDACTED_VALUE,
      Cookie: SENTRY_REDACTED_VALUE,
      "Content-Type": "application/json",
      "X-Forwarded-For": SENTRY_REDACTED_VALUE,
    });
    expect(event.request?.cookies).toBe(SENTRY_REDACTED_VALUE);
    expect(event.request?.data).toBe(SENTRY_REDACTED_VALUE);
    expect(event.request?.env).toEqual({
      REMOTE_ADDR: SENTRY_REDACTED_VALUE,
      REQUEST_METHOD: "POST",
    });
    expect(event.extra).toEqual({
      donorEmail: SENTRY_REDACTED_VALUE,
      nested: {
        accessToken: SENTRY_REDACTED_VALUE,
        safeCount: 3,
      },
    });
    expect(event.contexts?.serverActionPayload).toBe(SENTRY_REDACTED_VALUE);
    expect(event.breadcrumbs?.[0].data).toEqual({
      authorization: SENTRY_REDACTED_VALUE,
      statusCode: 500,
    });
  });

  it("drops confirmed third-party and native-bridge noise narrowly", () => {
    const beforeSend = createBeforeSend({ NODE_ENV: "production" });

    expect(
      beforeSend({
        exception: {
          values: [
            {
              value: "Instagram bridge failed",
              stacktrace: {
                frames: [
                  {
                    filename: "app://navigation_performance_logger_android",
                  },
                ],
              },
            },
          ],
        },
      })
    ).toBeNull();

    expect(
      beforeSend({
        message: "Object Not Found Matching Id: 42",
      })
    ).toBeNull();
  });

  it("keeps application-framed Object Not Found reports visible", () => {
    expect(
      shouldDropKnownNoise(
        {
          message: "Object Not Found Matching Id: 42",
          exception: {
            values: [
              {
                stacktrace: {
                  frames: [{ filename: "app/page.js", in_app: true }],
                },
              },
            ],
          },
        },
        "production"
      )
    ).toBe(false);
  });

  it("drops only development build-collision signatures in development", () => {
    const event: SentryEvent = {
      exception: {
        values: [
          {
            value: "Cannot find module './vendor-chunks/@sentry.js'",
            stacktrace: {
              frames: [{ filename: ".next/vendor-chunks/@sentry.js" }],
            },
          },
        ],
      },
    };

    expect(shouldDropKnownNoise(event, "development")).toBe(true);
    expect(shouldDropKnownNoise(event, "production")).toBe(false);
  });

  it("keeps hydration errors observable with stable context and fingerprinting", () => {
    const beforeSend = createBeforeSend({ NODE_ENV: "production" });
    const event = beforeSend({
      exception: {
        values: [
          {
            value: "Hydration failed because the server rendered HTML did not match",
            stacktrace: {
              frames: [{ filename: "app/page.js", in_app: true }],
            },
          },
        ],
      },
    });

    expect(event).not.toBeNull();
    expect(event?.tags).toEqual(
      expect.objectContaining({
        "error.category": "hydration",
        "hydration.filtered": false,
      })
    );
    expect(event?.contexts?.hydration).toEqual(
      expect.objectContaining({
        observable: true,
        filtered: false,
      })
    );
    expect(event?.fingerprint).toEqual(["react-hydration-error"]);
  });
});
