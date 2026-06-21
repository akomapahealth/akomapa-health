type SentryModule = {
  captureException: (error: unknown, context?: unknown) => string;
  captureMessage: (message: string) => string;
  setUser: (user: { id?: string; email?: string; username?: string } | null) => void;
  addBreadcrumb: (breadcrumb: {
    message?: string;
    category?: string;
    level?: "fatal" | "error" | "warning" | "log" | "info" | "debug";
    data?: Record<string, unknown>;
  }) => void;
  captureRequestError?: (...args: unknown[]) => unknown;
  captureRouterTransitionStart?: (...args: unknown[]) => void;
  diagnoseSdkConnectivity?: () => Promise<string>;
  logger?: {
    info: (message: string) => void;
  };
  replayIntegration?: (options: {
    maskAllText: boolean;
    blockAllMedia: boolean;
  }) => unknown;
  init?: (options: Record<string, unknown>) => void;
  startSpan?: <T>(
    options: { name: string; op: string },
    callback: () => Promise<T>
  ) => Promise<T>;
};

const isSentryEnabled =
  process.env.SENTRY_ENABLED === "true" ||
  process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true";

export async function loadSentry(): Promise<SentryModule | null> {
  if (!isSentryEnabled) return null;
  return import("@sentry/nextjs") as Promise<SentryModule>;
}

export const captureException = async (
  error: unknown,
  context?: Record<string, unknown>
): Promise<string | undefined> => {
  const Sentry = await loadSentry();
  return Sentry?.captureException(error, context ? { extra: context } : undefined);
};

export const captureMessage = async (message: string): Promise<string | undefined> => {
  const Sentry = await loadSentry();
  return Sentry?.captureMessage(message);
};

export const setUser = async (
  user: { id?: string; email?: string; username?: string } | null
) => {
  const Sentry = await loadSentry();
  Sentry?.setUser(user);
};

export const addBreadcrumb = async (breadcrumb: {
  message?: string;
  category?: string;
  level?: "fatal" | "error" | "warning" | "log" | "info" | "debug";
  data?: Record<string, unknown>;
}) => {
  const Sentry = await loadSentry();
  Sentry?.addBreadcrumb(breadcrumb);
};
