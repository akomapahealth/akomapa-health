import type { IntakeFormType, IntakeRecord } from "@/lib/intake/contracts";
import { getFilloutConfig } from "@/lib/intake/server/config";
import { IntakeProviderError } from "@/lib/intake/server/errors";

const FILLOUT_API_ORIGIN = "https://api.fillout.com";
const FILLOUT_TIMEOUT_MS = 10_000;

function toFlatRecord(record: IntakeRecord): Record<string, unknown> {
  return {
    requestId: record.requestId,
    submittedAt: record.submittedAt,
    schemaVersion: record.schemaVersion,
    sourcePath: record.sourcePath,
    formType: record.formType,
    ...record.data,
  };
}

function mapFilloutStatus(status: number) {
  if (status === 401 || status === 403) return "unauthorized" as const;
  if (status === 429) return "rate_limited" as const;
  if (status >= 400 && status < 500) return "invalid_contract" as const;
  return "upstream_rejected" as const;
}

export async function createFilloutSubmission<T extends IntakeFormType>(
  record: IntakeRecord<T>,
): Promise<string> {
  const { apiKey, form } = getFilloutConfig(record.formType);
  const values = toFlatRecord(record);
  const questions = Object.entries(values).map(([key, value]) => {
    const id = form.fields[key];
    if (!id) {
      throw new IntakeProviderError(
        "invalid_contract",
        `Fillout field mapping is missing ${key}`,
      );
    }
    return { id, value };
  });

  const url = new URL(
    `/v1/api/forms/${encodeURIComponent(form.formId)}/submissions`,
    FILLOUT_API_ORIGIN,
  );

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        submissions: [
          {
            questions,
            submissionTime: record.submittedAt,
            lastUpdatedAt: record.submittedAt,
          },
        ],
      }),
      redirect: "error",
      signal: AbortSignal.timeout(FILLOUT_TIMEOUT_MS),
    });
  } catch (error) {
    const category =
      error instanceof DOMException && error.name === "TimeoutError"
        ? "timeout"
        : "upstream_rejected";
    throw new IntakeProviderError(category, "Fillout request failed", {
      cause: error,
    });
  }

  if (!response.ok) {
    throw new IntakeProviderError(
      mapFilloutStatus(response.status),
      "Fillout rejected the intake submission",
    );
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch (error) {
    throw new IntakeProviderError(
      "invalid_contract",
      "Fillout returned an invalid response",
      { cause: error },
    );
  }

  const submissionId =
    typeof result === "object" &&
    result !== null &&
    "submissions" in result &&
    Array.isArray(result.submissions) &&
    typeof result.submissions[0]?.submissionId === "string"
      ? result.submissions[0].submissionId
      : null;

  if (!submissionId) {
    throw new IntakeProviderError(
      "invalid_contract",
      "Fillout response did not include a submission ID",
    );
  }

  return submissionId;
}
