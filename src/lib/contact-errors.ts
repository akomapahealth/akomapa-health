const DEFAULT_ERROR_MESSAGE =
  "Something went wrong while sending your message. Please try again.";

const STATUS_MESSAGES: Readonly<Record<number, string>> = {
  400: "Please review the highlighted information and try again.",
  403: "We could not verify this request. Please refresh the page and try again.",
  413: "Your message is too long. Please shorten it and try again.",
  415: "This request could not be processed. Please refresh the page and try again.",
  429: "You have sent several messages recently. Please wait a few minutes before trying again.",
  500: "Something went wrong on our side. Please try again in a few minutes.",
  502: "Our message service is temporarily unavailable. Please try again shortly.",
  503: "Our message service is temporarily unavailable. Please try again shortly.",
};

export function getContactErrorMessage(
  status: number,
  responseMessage?: unknown,
) {
  const statusMessage = STATUS_MESSAGES[status];
  if (statusMessage) {
    return statusMessage;
  }

  if (typeof responseMessage === "string" && responseMessage.trim()) {
    return responseMessage.trim();
  }

  return DEFAULT_ERROR_MESSAGE;
}

export const CONTACT_NETWORK_ERROR_MESSAGE =
  "We could not connect to our message service. Please check your connection and try again.";
