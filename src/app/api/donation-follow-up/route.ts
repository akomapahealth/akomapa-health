import { createIntakePostHandler } from "@/lib/intake/server/handler";
import { donationFollowUpIntakeSchema } from "@/lib/intake/contracts";

export const runtime = "nodejs";

export const POST = createIntakePostHandler({
  formType: "donation_follow_up",
  schema: donationFollowUpIntakeSchema,
  defaultSourcePath: "/donate",
});
