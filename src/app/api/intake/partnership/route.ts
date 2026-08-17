import { partnershipRequestSchema } from "@/lib/intake/contracts";
import { createIntakePostHandler } from "@/lib/intake/server/handler";

export const POST = createIntakePostHandler({
  formType: "partnership_request",
  schema: partnershipRequestSchema,
  defaultSourcePath: "/partnerships",
});
