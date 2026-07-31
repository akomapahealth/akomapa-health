import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

export default function ResearchContactCta() {
  return (
    <EditorialBand
      tone="onyx"
      aria-labelledby="research-contact-heading"
      className="border-t border-[#FCFAEF]/10"
    >
      <FadeIn className="max-w-3xl">
        <EditorialHeading
          id="research-contact-heading"
          className="text-[#FCFAEF]"
        >
          Questions About Our Research?
        </EditorialHeading>
        <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
          For inquiries about our research, collaborations, or data access,
          please reach out to our research team.
        </EditorialLead>
        <EditorialButton
          href="mailto:akomapahealth@gmail.com"
          variant="amber"
          className="mt-8"
        >
          akomapahealth@gmail.com
        </EditorialButton>
      </FadeIn>
    </EditorialBand>
  );
}
