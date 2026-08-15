import { programInterestSchema } from "@/lib/intake/contracts";
import { createIntakePostHandler } from "@/lib/intake/server/handler";

export const POST = createIntakePostHandler({
  formType: "program_interest",
  schema: programInterestSchema,
  defaultSourcePath: "/programs",
});
