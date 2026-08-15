export type IntakeProviderErrorCategory =
  | "misconfigured"
  | "timeout"
  | "unauthorized"
  | "rate_limited"
  | "upstream_rejected"
  | "invalid_contract"
  | "notification_failed";

export class IntakeProviderError extends Error {
  constructor(
    public readonly category: IntakeProviderErrorCategory,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "IntakeProviderError";
  }
}

export function providerErrorCategory(error: unknown) {
  return error instanceof IntakeProviderError
    ? error.category
    : "upstream_rejected";
}
