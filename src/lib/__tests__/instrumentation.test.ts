import type { Instrumentation } from "next";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sentryMocks = vi.hoisted(() => ({
  captureRequestError: vi.fn(),
  loggerInfo: vi.fn(),
}));

vi.mock("@/lib/sentry", () => ({
  isSentryEnabled: vi.fn(() => true),
  loadSentry: vi.fn(async () => ({
    captureRequestError: sentryMocks.captureRequestError,
    logger: { info: sentryMocks.loggerInfo },
  })),
}));

import { onRequestError } from "@/instrumentation";

type RequestErrorArguments = Parameters<Instrumentation.onRequestError>;

const request: RequestErrorArguments[1] = {
  path: "/donate?_rsc=opaque-request-id",
  method: "GET",
  headers: {},
};

const context: RequestErrorArguments[2] = {
  routerKind: "App Router",
  routePath: "/(main)/donate/page",
  routeType: "render",
  renderSource: "react-server-components-payload",
  revalidateReason: undefined,
};

describe("onRequestError", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    sentryMocks.captureRequestError.mockReset();
    sentryMocks.loggerInfo.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("logs and filters the exact donate router-state version-skew event", async () => {
    const error = Object.assign(
      new Error("The router state header was sent but could not be parsed."),
      { __NEXT_ERROR_CODE: "E10" }
    );

    await onRequestError(error, request, context);

    expect(sentryMocks.captureRequestError).not.toHaveBeenCalled();
    expect(sentryMocks.loggerInfo).toHaveBeenCalledOnce();
    expect(sentryMocks.loggerInfo).toHaveBeenCalledWith(
      "Filtered known Next.js router-state version skew",
      {
        "error.category": "next_router_state_version_skew",
        "next.error_code": "E10",
        "request.route": "/(main)/donate/page",
        "telemetry.filtered": true,
      }
    );
  });

  it("forwards unrelated request errors unchanged", async () => {
    const error = new Error("Application render failed");

    await onRequestError(error, request, context);

    expect(sentryMocks.loggerInfo).not.toHaveBeenCalled();
    expect(sentryMocks.captureRequestError).toHaveBeenCalledOnce();
    expect(sentryMocks.captureRequestError).toHaveBeenCalledWith(
      error,
      request,
      context
    );
  });
});
