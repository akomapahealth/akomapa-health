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

  it("scrubs crafted Server Action request metadata before Sentry transport", () => {
    const event = scrubSentryEvent({
      user: {
        id: "anonymous-session",
        email: "attacker@example.test",
        ip_address: "198.51.100.12",
      },
      request: {
        method: "POST",
        url: "https://akomapahealth.org/index",
        headers: {
          "Content-Type": "multipart/form-data",
          "Next-Action": "app/actions#recon",
          "X-Client-IP": "198.51.100.12",
          "X-Cluster-Client-IP": "198.51.100.12",
          "X-Vercel-Forwarded-For": "198.51.100.12",
          "CF-Connecting-IP": "198.51.100.12",
          "True-Client-IP": "198.51.100.12",
        },
        body: {
          "$ACTION_ID_app/actions#recon": "forged-reference",
          "0": "obfuscated payload",
        },
        data: {
          "$ACTION_REF_0": "forged-reference",
          payload: "read /proc/self/environ",
        },
        env: {
          HTTP_CF_CONNECTING_IP: "198.51.100.12",
          HTTP_TRUE_CLIENT_IP: "198.51.100.12",
          HTTP_X_CLIENT_IP: "198.51.100.12",
          HTTP_X_CLUSTER_CLIENT_IP: "198.51.100.12",
          VERCEL_FORWARDED_FOR: "198.51.100.12",
          REQUEST_METHOD: "POST",
        },
      },
      extra: {
        serverAction: "app/actions#recon",
        "$ACTION_REF_1": "nested forged reference",
        nested: {
          actionId: "forged-action-id",
          safeStatus: "decode-failed",
        },
      },
      contexts: {
        rscAction: {
          nextAction: "app/actions#recon",
        },
        requestBody: {
          command: "whoami",
        },
      },
      breadcrumbs: [
        {
          category: "server-action",
          data: {
            "Next-Action": "app/actions#recon",
            statusCode: 400,
          },
        },
      ],
    });

    expect(event.user).toEqual({ id: "anonymous-session" });
    expect(event.request?.headers).toEqual({
      "Content-Type": "multipart/form-data",
      "Next-Action": SENTRY_REDACTED_VALUE,
      "X-Client-IP": SENTRY_REDACTED_VALUE,
      "X-Cluster-Client-IP": SENTRY_REDACTED_VALUE,
      "X-Vercel-Forwarded-For": SENTRY_REDACTED_VALUE,
      "CF-Connecting-IP": SENTRY_REDACTED_VALUE,
      "True-Client-IP": SENTRY_REDACTED_VALUE,
    });
    expect(event.request?.body).toBe(SENTRY_REDACTED_VALUE);
    expect(event.request?.data).toBe(SENTRY_REDACTED_VALUE);
    expect(event.request?.env).toEqual({
      HTTP_CF_CONNECTING_IP: SENTRY_REDACTED_VALUE,
      HTTP_TRUE_CLIENT_IP: SENTRY_REDACTED_VALUE,
      HTTP_X_CLIENT_IP: SENTRY_REDACTED_VALUE,
      HTTP_X_CLUSTER_CLIENT_IP: SENTRY_REDACTED_VALUE,
      VERCEL_FORWARDED_FOR: SENTRY_REDACTED_VALUE,
      REQUEST_METHOD: "POST",
    });
    expect(event.extra).toEqual({
      serverAction: SENTRY_REDACTED_VALUE,
      "$ACTION_REF_1": SENTRY_REDACTED_VALUE,
      nested: {
        actionId: SENTRY_REDACTED_VALUE,
        safeStatus: "decode-failed",
      },
    });
    expect(event.contexts).toEqual({
      rscAction: SENTRY_REDACTED_VALUE,
      requestBody: SENTRY_REDACTED_VALUE,
    });
    expect(event.breadcrumbs?.[0].data).toEqual({
      "Next-Action": SENTRY_REDACTED_VALUE,
      statusCode: 400,
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
