import type { IntakeFormType, IntakeRecord } from "@/lib/intake/contracts";
import { createFilloutSubmission } from "@/lib/intake/server/fillout";
import { providerErrorCategory } from "@/lib/intake/server/errors";
import { sendIntakeNotification } from "@/lib/intake/server/resend";

export async function deliverIntakeRecord<T extends IntakeFormType>(
  record: IntakeRecord<T>,
) {
  const filloutSubmissionId = await createFilloutSubmission(record);

  try {
    await sendIntakeNotification(record, filloutSubmissionId);
  } catch (error) {
    console.error("Intake notification failed", {
      requestId: record.requestId,
      formType: record.formType,
      category: providerErrorCategory(error),
    });
  }

  return { filloutSubmissionId };
}
