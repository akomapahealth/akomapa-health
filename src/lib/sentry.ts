/**
 * Thin wrappers around @sentry/nextjs so component code never imports it directly.
 * Sentry is initialized in instrumentation-client.ts (browser) and
 * sentry.{server,edge}.config.ts (server) — see those files for tracesSampleRate.
 */

import * as Sentry from "@sentry/nextjs";

export const captureException = (
  error: unknown,
  context?: Record<string, unknown>
): string => Sentry.captureException(error, context ? { extra: context } : undefined);

export const captureMessage = Sentry.captureMessage;
export const setUser = Sentry.setUser;
export const addBreadcrumb = Sentry.addBreadcrumb;
