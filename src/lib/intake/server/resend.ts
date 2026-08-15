import type { IntakeRecord } from "@/lib/intake/contracts";
import { getResendConfig } from "@/lib/intake/server/config";
import { IntakeProviderError } from "@/lib/intake/server/errors";

const RESEND_EMAILS_URL = new URL("https://api.resend.com/emails");
const RESEND_TIMEOUT_MS = 10_000;

const subjects = {
  general_inquiry: "New general website inquiry",
  program_interest: "New program interest request",
  partnership_request: "New partnership request",
  get_involved: "New get involved request",
  donation_follow_up: "New donation follow-up request",
} as const;

function notificationText(record: IntakeRecord, filloutSubmissionId: string) {
  const lines = [
    `Form type: ${record.formType}`,
    `Request ID: ${record.requestId}`,
    `Submitted at: ${record.submittedAt}`,
    `Source path: ${record.sourcePath}`,
    `Fillout submission ID: ${filloutSubmissionId}`,
    "",
  ];

  for (const [key, value] of Object.entries(record.data)) {
    lines.push(`${key}: ${String(value)}`);
  }

  if (record.formType === "donation_follow_up") {
    lines.push(
      "",
      "This request does not verify or confirm that a payment was completed.",
    );
  }

  return lines.join("\n");
}

export async function sendIntakeNotification(
  record: IntakeRecord,
  filloutSubmissionId: string,
) {
  const { apiKey, from, to } = getResendConfig();

  let response: Response;
  try {
    response = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: record.data.email,
        subject: subjects[record.formType],
        text: notificationText(record, filloutSubmissionId),
      }),
      redirect: "error",
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    });
  } catch (error) {
    throw new IntakeProviderError(
      error instanceof DOMException && error.name === "TimeoutError"
        ? "timeout"
        : "notification_failed",
      "Resend notification request failed",
      { cause: error },
    );
  }

  if (!response.ok) {
    throw new IntakeProviderError(
      "notification_failed",
      "Resend rejected the notification",
    );
  }
}
