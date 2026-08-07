export type MailerLiteSubscriberStatus =
  | "active"
  | "unconfirmed"
  | "unsubscribed"
  | "bounced"
  | "junk";

export type MailerLiteSubscriber = {
  id: string;
  email: string;
  status: MailerLiteSubscriberStatus | (string & {});
  fields?: Record<string, string | null | undefined>;
};

export type UpsertSubscriberParams = {
  email: string;
  fields?: Record<string, string | null | undefined>;
  groups?: string[];
  status?: MailerLiteSubscriberStatus;
};

export type NormalizedMailerLiteError = {
  status: number | null;
  kind: "unauthorized" | "validation" | "rate_limited" | "network" | "unknown";
};

type MailerLiteClient = {
  subscribers: {
    createOrUpdate: (params: UpsertSubscriberParams) => Promise<{
      status: number;
      data: { data: MailerLiteSubscriber };
    }>;
    find: (subscriberIdOrEmail: string) => Promise<{
      status: number;
      data: { data: MailerLiteSubscriber };
    }>;
  };
};

function getErrorStatus(error: unknown): number | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const errorObj = error as {
    status?: number;
    response?: { status?: number };
    code?: string;
  };

  if (typeof errorObj.status === "number") {
    return errorObj.status;
  }

  if (typeof errorObj.response?.status === "number") {
    return errorObj.response.status;
  }

  return null;
}

export function normalizeMailerLiteError(
  error: unknown,
): NormalizedMailerLiteError {
  const status = getErrorStatus(error);

  if (
    error instanceof TypeError ||
    (error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: string }).code === "ECONNABORTED")
  ) {
    return { status: null, kind: "network" };
  }

  if (status === 401) {
    return { status, kind: "unauthorized" };
  }

  if (status === 422) {
    return { status, kind: "validation" };
  }

  if (status === 429) {
    return { status, kind: "rate_limited" };
  }

  if (status === null) {
    return { status: null, kind: "network" };
  }

  return { status, kind: "unknown" };
}

export function isSuppressedSubscriberStatus(
  status: string,
): status is "unsubscribed" | "bounced" | "junk" {
  return (
    status === "unsubscribed" || status === "bounced" || status === "junk"
  );
}

export async function getMailerLiteClient(
  apiKey = process.env.MAILERLITE_API_KEY,
): Promise<MailerLiteClient | null> {
  if (!apiKey) {
    return null;
  }

  const { default: MailerLite } = await import("@mailerlite/mailerlite-nodejs");
  return new MailerLite({ api_key: apiKey }) as unknown as MailerLiteClient;
}

export async function upsertSubscriber(
  client: MailerLiteClient,
  params: UpsertSubscriberParams,
) {
  return client.subscribers.createOrUpdate(params);
}

export async function getSubscriberByEmail(
  client: MailerLiteClient,
  email: string,
): Promise<MailerLiteSubscriber | null> {
  try {
    const response = await client.subscribers.find(email);
    return response.data.data;
  } catch (error) {
    const normalized = normalizeMailerLiteError(error);
    if (normalized.status === 404) {
      return null;
    }
    throw error;
  }
}
