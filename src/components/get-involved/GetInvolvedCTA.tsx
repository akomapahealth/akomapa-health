import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { CONTACT } from "@/config/contact";

export default function GetInvolvedCTA() {
  return (
    <EditorialBand
      tone="teal"
      aria-labelledby="get-involved-cta-heading"
      className="border-t border-[#FCFAEF]/15 bg-[#0F4C5C]"
    >
      <FadeIn className="mx-auto max-w-3xl text-center">
        <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
          Still deciding?
        </EditorialEyebrow>
        <EditorialHeading
          id="get-involved-cta-heading"
          className="mt-4 text-[#FCFAEF]"
        >
          Have questions? Reach out.
        </EditorialHeading>
        <EditorialLead className="mx-auto mt-6 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
          Not sure which pathway fits you best? We&apos;re happy to help you
          find the right way to get involved with Akomapa.
        </EditorialLead>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <EditorialButton href="/contact" variant="amber">
            Contact Us
          </EditorialButton>
          <EditorialButton
            href={CONTACT.email.href}
            variant="outline-light"
            external
          >
            Email Us
          </EditorialButton>
        </div>

        <p className="mt-6 text-sm text-[#FCFAEF]/75">
          Or email us directly at{" "}
          <a
            href={CONTACT.email.href}
            className="font-semibold text-[#F5C94D] underline-offset-4 transition-colors hover:text-[#FCFAEF] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C]"
          >
            {CONTACT.email.display}
          </a>
        </p>
      </FadeIn>
    </EditorialBand>
  );
}
