import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { CONTACT } from "@/config/contact";

export default function Content() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="contact-hero-heading"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <FadeIn>
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Contact
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="contact-hero-heading"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            Get in touch with us.
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            Have questions or want to learn more about our healthcare programs?
            We&apos;d love to hear from you regarding partnerships,
            volunteering, or general inquiries.
          </EditorialLead>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="01"
        aria-labelledby="contact-form-heading"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <EditorialEyebrow>Write to Us</EditorialEyebrow>
            <EditorialHeading id="contact-form-heading" className="mt-4">
              Send us a message
            </EditorialHeading>
            <EditorialLead className="mt-4">
              Please fill out the form with your information and we&apos;ll get
              back to you as soon as possible. Whether you have questions about
              our programs, want to volunteer, or discuss potential partnerships,
              we&apos;re here to help.
            </EditorialLead>
            <div className="mt-8">
              <ContactForm />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <EditorialEyebrow tone="gold">Visit or Call</EditorialEyebrow>
            <EditorialHeading id="contact-info-heading" className="mt-4">
              Our Information
            </EditorialHeading>

            <div className="mt-8 space-y-8 border-t-2 border-[#eeba2b] bg-white px-5 py-6 dark:bg-[#1C1F1E] sm:px-7 sm:py-8">
              {CONTACT.offices.map((office, index) => (
                <div
                  key={office.id}
                  className={
                    index === 0
                      ? undefined
                      : "border-t border-[#1C1F1E]/10 pt-6 dark:border-[#FCFAEF]/15"
                  }
                >
                  <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-xl">
                    {office.label}
                  </h3>
                  <address className="mt-3 not-italic text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a
                      href={office.phone.href}
                      className="mt-2 inline-flex min-h-11 items-center text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                    >
                      {office.phone.display}
                    </a>
                  </address>
                </div>
              ))}

              <div className="border-t border-[#1C1F1E]/10 pt-6 dark:border-[#FCFAEF]/15">
                <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-xl">
                  Contact Details
                </h3>
                <p className="mt-3 text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
                  <span className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
                    Email:{" "}
                  </span>
                  <a
                    href={CONTACT.email.href}
                    className="break-all text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                  >
                    {CONTACT.email.display}
                  </a>
                </p>
              </div>

              <div className="border-t border-[#1C1F1E]/10 pt-6 dark:border-[#FCFAEF]/15">
                <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-xl">
                  Office Hours
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
                  Monday - Friday: 8:00 AM - 5:00 PM
                  <br />
                  Saturday: 7:00 AM - 1:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>

            <div className="mt-6 h-64 overflow-hidden rounded-md border border-[#1C1F1E]/10 dark:border-[#FCFAEF]/15 sm:h-80 md:h-96">
              <LocationMap />
            </div>
          </FadeIn>
        </div>
      </EditorialBand>
    </div>
  );
}
