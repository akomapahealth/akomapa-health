import { createIntakePostHandler } from "@/lib/intake/server/handler";
import { generalInquirySchema } from "@/lib/intake/contracts";

export const runtime = "nodejs";

export const POST = createIntakePostHandler({
  formType: "general_inquiry",
  schema: generalInquirySchema,
  defaultSourcePath: "/contact",
});
