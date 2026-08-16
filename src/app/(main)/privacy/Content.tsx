import { FadeIn } from "@/components/animations";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  LegalContentsNav,
  LegalLastUpdated,
  LegalProseArticle,
  LegalSection,
  legalBodyClassName as body,
  legalLinkClassName as link,
  legalListClassName as list,
  legalSubheadingClassName as h3,
  type LegalContentsItem,
} from "@/components/legal/LegalDocumentPrimitives";
import { PublicationArticleMeasure } from "@/components/publication";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { CONTACT } from "@/config/contact";
import Link from "next/link";

const LAST_UPDATED = "August 16, 2026";

const contents: readonly LegalContentsItem[] = [
  { href: "#scope", label: "Who we are and what this policy covers" },
  { href: "#information-we-collect", label: "Information we collect" },
  { href: "#how-we-use-information", label: "How we use information" },
  { href: "#forms", label: "Forms and applications" },
  {
    href: "#cookies-local-storage",
    label: "Cookies, local storage, and similar technologies",
  },
  { href: "#analytics", label: "Analytics and performance" },
  { href: "#sharing", label: "How we share information" },
  { href: "#retention", label: "How long we keep intake records" },
  { href: "#international", label: "International transfers" },
  { href: "#security", label: "Data security" },
  { href: "#rights", label: "Your rights and choices" },
  { href: "#children", label: "Children's privacy" },
  { href: "#changes", label: "Changes to this Privacy Policy" },
  { href: "#contact", label: "Contact us" },
];

export default function Content() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="privacy-policy-title"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <FadeIn>
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Legal
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="privacy-policy-title"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            Privacy Policy
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            Your privacy matters. Here is how we collect, use, and protect
            information across our website, programs, and related digital
            services.
          </EditorialLead>
          <p className="mt-8 border-t border-[#FCFAEF]/20 pt-5 font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#F5C94D]/90">
            Last updated: {LAST_UPDATED}
          </p>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="01"
        aria-labelledby="privacy-policy-title"
        containerClassName="py-12 md:py-16 lg:py-20"
      >
        <FadeIn amount="some">
          <PublicationArticleMeasure className="max-w-3xl">
            <LegalProseArticle labelledBy="privacy-policy-title">
              <LegalContentsNav items={contents} />

              <LegalSection
                id="scope"
                ruleVariant="teal"
                title="Who we are and what this policy covers"
              >
                <p className={body}>
                  Akomapa Health Foundation (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;) runs community health programs, volunteer
                  pathways, education initiatives, and this website. This
                  Privacy Policy describes how we handle personal information
                  when you browse our site, contact us, apply to volunteer,
                  subscribe to updates, or make a donation.
                </p>
                <p className={body}>
                  <strong>Nkwapa and clinical records:</strong> We are
                  developing Nkwapa, an electronic medical records (EMR)
                  platform intended for use in care settings. If you interact
                  with Nkwapa or other clinical systems we operate, additional
                  notices or agreements may apply to health information. This
                  page focuses on general website and program administration
                  data—not patient charts entered in an EMR—unless we tell you
                  otherwise at collection.
                </p>
              </LegalSection>

              <LegalSection
                id="information-we-collect"
                ruleVariant="amber"
                title="Information we collect"
              >
                <p className={body}>
                  Depending on how you engage with us, we may collect:
                </p>
                <ul className={list}>
                  <li>
                    <strong>Identifiers and contact details:</strong> Name,
                    email address, phone number, and similar details you submit
                    on forms or applications.
                  </li>
                  <li>
                    <strong>
                      Volunteer and education-related application information:
                    </strong>{" "}
                    School and level, motivation and expectations, screening or
                    counseling experience where you choose to share it,
                    availability and team preferences, backup volunteer status,
                    and related notes needed to review your application.
                  </li>
                  <li>
                    <strong>Messages and inquiries:</strong> Subject lines,
                    message bodies, and optional partnership context you send
                    through our contact or partnership flows.
                  </li>
                  <li>
                    <strong>Newsletter subscriptions:</strong> Email address and
                    subscription status managed through our email marketing
                    provider.
                  </li>
                  <li>
                    <strong>Donation and payment-related information:</strong>{" "}
                    Givebutter collects the name, email address, billing details,
                    payment details, donation amount, frequency, and other
                    checkout information needed to process contributions, send
                    receipts, prevent fraud, and manage recurring plans. Akomapa
                    does not collect or store raw card numbers or bank-account
                    credentials on its servers.
                  </li>
                  <li>
                    <strong>Technical data:</strong> Information such as IP
                    address, browser type, device characteristics, general
                    location derived from IP, pages viewed, timestamps, and
                    referral URLs. This data may be collected automatically by
                    our hosting infrastructure, content delivery networks, and
                    vendors that deliver forms or email on our behalf.
                  </li>
                </ul>
              </LegalSection>

              <LegalSection
                id="how-we-use-information"
                ruleVariant="teal"
                title="How we use information"
              >
                <p className={body}>We use personal information to:</p>
                <ul className={list}>
                  <li>Respond to questions and partnership inquiries</li>
                  <li>Review and coordinate volunteer applications</li>
                  <li>
                    Operate educational and outreach programs, including
                    scheduling communications where you have opted in
                  </li>
                  <li>
                    Send newsletters or updates when you subscribe (you can
                    unsubscribe using links in those emails)
                  </li>
                  <li>Process donations and partnership payments securely</li>
                  <li>
                    Maintain safe, reliable digital services (security,
                    troubleshooting, fraud prevention)
                  </li>
                  <li>Meet legal, regulatory, or ethical obligations</li>
                  <li>
                    Improve our website and programs in aggregate, including
                    understanding which content is most helpful
                  </li>
                </ul>
              </LegalSection>

              <LegalSection
                id="forms"
                ruleVariant="amber"
                title="Forms and applications"
              >
                <h3 className={h3}>Contact and partnership messages</h3>
                <p className={body}>
                  Our website sends completed contact and purpose-specific
                  intake forms to protected server endpoints. Fillout stores the
                  structured record, and Resend delivers a notification to
                  authorized Akomapa staff. A submission is treated as
                  successful once Fillout safely stores it, even if the staff
                  notification must be retried separately.
                </p>

                <h3 className={h3}>Volunteer applications</h3>
                <p className={body}>
                  Volunteer, student leadership, faculty mentorship, and
                  research-interest requests use the same protected intake
                  system. The active University of Ghana application is hosted
                  separately in Google Forms and is governed by the notice shown
                  with that application. Access is limited to people who need it
                  for operations, compliance, or partner coordination.
                </p>

                <h3 className={h3}>
                  Educational programs and future platforms
                </h3>
                <p className={body}>
                  If you register for trainings, mentorship, or future online
                  learning experiences we offer, we may collect enrollment
                  details, attendance, and communications related to those
                  programs. Completing a program does not confer a professional
                  license or certification unless we explicitly say so in
                  writing for that offering.
                </p>
              </LegalSection>

              <LegalSection
                id="cookies-local-storage"
                ruleVariant="teal"
                title="Cookies, local storage, and similar technologies"
              >
                <p className={body}>
                  We may use cookies or similar technologies where needed for
                  security, preferences, or future analytics features. Today,
                  parts of our site store small amounts of information in your
                  browser&apos;s <strong>local storage</strong>—for example, to
                  remember light or dark theme choices and whether you have
                  dismissed an announcement. Incomplete intake forms may also
                  save a schema-validated draft on your device for up to 30
                  days. Drafts can include ordinary contact and request details,
                  but never the consent choice, anti-spam field, API keys,
                  request IDs, Fillout configuration, attachments, or dedicated
                  medical or payment fields. A draft is removed after successful
                  submission, explicit discard, expiry, or clearing site data.
                </p>
                <p className={body}>
                  If we introduce optional marketing or analytics cookies, we
                  will update this Policy and, where required, provide a way to
                  manage preferences.
                </p>
              </LegalSection>

              <LegalSection
                id="analytics"
                ruleVariant="amber"
                title="Analytics and performance"
              >
                <p className={body}>
                  Like most hosted websites, our infrastructure automatically
                  logs technical activity needed to deliver pages securely and
                  reliably. When configured, we also use Google Analytics to
                  understand non-sensitive page and interaction trends. Donation
                  widget analytics are limited to events such as load success,
                  load failure, or use of the campaign fallback. We do not send
                  donor names, email addresses, payment details, or processor
                  transaction references to general website analytics.
                </p>
              </LegalSection>

              <LegalSection
                id="sharing"
                ruleVariant="teal"
                title="How we share information"
              >
                <p className={body}>
                  We do not sell your personal information. We may share data
                  with:
                </p>
                <ul className={list}>
                  <li>
                    <strong>Service providers</strong> who help us host the
                    site, deliver forms and email, process payments, manage
                    newsletter lists, store volunteer records, or provide
                    similar operational functions.
                  </li>
                  <li>
                    <strong>Fillout and Resend</strong> to store structured
                    website intake records and deliver staff notifications.
                    Provider access is restricted to authorized operators.
                  </li>
                  <li>
                    <strong>Givebutter</strong> to host the donation checkout,
                    process payments, manage recurring plans, prevent fraud, and
                    provide donor receipts and transaction records. Givebutter
                    handles payment information under its own privacy and
                    security terms.
                  </li>
                  <li>
                    <strong>Partner institutions</strong> when coordination is
                    necessary for volunteer placements, education programs, or
                    clinic operations—and only with appropriate safeguards.
                  </li>
                  <li>
                    <strong>Legal and safety recipients</strong> when disclosure
                    is required by law, regulation, legal process, or to protect
                    the rights and safety of patients, volunteers, staff, or the
                    public.
                  </li>
                  <li>
                    <strong>With your direction or consent</strong>, including
                    when you ask us to introduce you to a partner organization.
                  </li>
                </ul>
                <p className={body}>
                  We require vendors to use information only to provide services
                  to us and to apply reasonable security measures.
                </p>
              </LegalSection>

              <LegalSection
                id="retention"
                ruleVariant="amber"
                title="How long we keep intake records"
              >
                <p className={body}>
                  We generally retain general inquiries for 12 months after the
                  most recent meaningful activity. Program interest,
                  partnership, and get-involved records are generally retained
                  for 24 months after the most recent meaningful activity.
                  Legacy donation follow-up records collected before August 16,
                  2026 may remain subject to that same 24-month schedule, but the
                  website no longer collects a separate donation follow-up form.
                  Givebutter donation and transaction records follow the
                  retention requirements applicable to payment, tax, fraud,
                  dispute, and nonprofit accounting records. We may delete a
                  record earlier after a valid request, or keep it longer where
                  law, safeguarding, dispute resolution, or another documented
                  operational need requires it.
                </p>
                <p className={body}>
                  Retention review is performed with a dry-run-first operator
                  process. Proposed deletions are reviewed before permanent
                  removal. Fillout deletion is permanent, so authorized staff
                  should confirm any required export or backup before applying a
                  deletion batch.
                </p>
              </LegalSection>

              <LegalSection
                id="international"
                ruleVariant="amber"
                title="International transfers"
              >
                <p className={body}>
                  Akomapa works across regions. Information may be processed in
                  the United States or other countries where our vendors
                  operate. When data moves across borders, we rely on
                  contractual and organizational safeguards appropriate to the
                  sensitivity of the information involved.
                </p>
              </LegalSection>

              <LegalSection
                id="security"
                ruleVariant="teal"
                title="Data security"
              >
                <p className={body}>
                  We use administrative, technical, and physical safeguards
                  designed to protect personal information, including encryption
                  in transit where appropriate, access controls for staff and
                  systems, and trusted payment processing partners. No online
                  platform can guarantee perfect security; please use unique
                  passwords and contact us immediately if you suspect misuse.
                </p>
              </LegalSection>

              <LegalSection
                id="rights"
                ruleVariant="amber"
                title="Your rights and choices"
              >
                <p className={body}>
                  Depending on where you live, you may have rights to:
                </p>
                <ul className={list}>
                  <li>Access the personal information we maintain about you</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>
                    Request deletion, subject to legal or operational retention
                    needs
                  </li>
                  <li>
                    Opt out of marketing emails via unsubscribe links or by
                    emailing us
                  </li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
                <p className={body}>
                  To exercise these rights, email{" "}
                  <a href={CONTACT.email.href} className={link}>
                    {CONTACT.email.display}
                  </a>
                  . We may need to verify your identity before fulfilling
                  certain requests.
                </p>
              </LegalSection>

              <LegalSection
                id="children"
                ruleVariant="teal"
                title="Children's privacy"
              >
                <p className={body}>
                  Our website and general mailing lists are not directed at
                  children under 13. Youth may participate in some educational
                  programs with schools or guardians; when we collect
                  information from minors in those contexts, we do so consistent
                  with applicable law and program consent practices. If you
                  believe we collected information from a child improperly,
                  please contact us right away.
                </p>
              </LegalSection>

              <LegalSection
                id="changes"
                ruleVariant="amber"
                title="Changes to this Privacy Policy"
              >
                <p className={body}>
                  We may update this Policy as our programs evolve. When we make
                  material changes, we will revise the &quot;Last updated&quot;
                  date below and, where appropriate, provide additional notice
                  on the site or by email.
                </p>
              </LegalSection>

              <LegalSection id="contact" ruleVariant="teal" title="Contact us">
                <p className={body}>
                  Questions about privacy? Email{" "}
                  <a href={CONTACT.email.href} className={link}>
                    {CONTACT.email.display}
                  </a>{" "}
                  or visit our{" "}
                  <Link href="/contact" className={link}>
                    contact page
                  </Link>
                  .
                </p>
              </LegalSection>

              <LegalLastUpdated date={LAST_UPDATED} />
            </LegalProseArticle>
          </PublicationArticleMeasure>
        </FadeIn>
      </EditorialBand>
    </div>
  );
}
