import { getInvolvedSchema } from "@/lib/intake/contracts";
import { createIntakePostHandler } from "@/lib/intake/server/handler";

export const POST = createIntakePostHandler({
  formType: "get_involved",
  schema: getInvolvedSchema,
  defaultSourcePath: "/get-involved",
});
