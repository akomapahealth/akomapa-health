import { FadeIn } from "@/components/animations";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  LegalLastUpdated,
  LegalProseArticle,
  LegalSectionRule,
  legalBodyClassName as body,
  legalHeadingClassName as h2,
  legalLinkClassName as link,
  legalListClassName as list,
  legalSectionClassName as section,
  legalSubheadingClassName as h3,
} from "@/components/legal/LegalDocumentPrimitives";
import { PublicationArticleMeasure } from "@/components/publication";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import Link from "next/link";

const LAST_UPDATED = "May 9, 2026";

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
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="01"
        aria-labelledby="privacy-policy-title"
      >
        <FadeIn amount="some">
          <PublicationArticleMeasure>
            <LegalProseArticle labelledBy="privacy-policy-title">
              <div className="space-y-4 sm:space-y-6" id="scope">
                <LegalSectionRule variant="teal" />
                <h2 className={h2}>Who we are and what this policy covers</h2>
                <p className={body}>
                  Akomapa Health Foundation (&quot;we,&quot; &quot;our,&quot;
                  or &quot;us&quot;) runs community health programs, volunteer
                  pathways, education initiatives, and this website. This Privacy
                  Policy describes how we handle personal information when you
                  browse our site, contact us, apply to volunteer, subscribe to
                  updates, or make a donation.
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
              </div>

              <div className={section} id="information-we-collect">
                <LegalSectionRule variant="amber" />
                <h2 className={h2}>Information we collect</h2>
                <p className={body}>Depending on how you engage with us, we may collect:</p>
                <ul className={list}>
                  <li>
                    <strong>Identifiers and contact details:</strong> Name,
                    email address, phone number, and similar details you submit
                    on forms or applications.
                  </li>
                  <li>
                    <strong>Volunteer and education-related application
                    information:</strong> School and level, motivation and
                    expectations, screening or counseling experience where you
                    choose to share it, availability and team preferences,
                    backup volunteer status, and related notes needed to review
                    your application.
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
                    Billing details needed to process contributions or partner
                    payments. Card numbers and other sensitive payment data are
                    handled by our payment processor—we do not store full card
                    data on our servers.
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
              </div>

              <div className={section} id="how-we-use-information">
                <LegalSectionRule variant="teal" />
                <h2 className={h2}>How we use information</h2>
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
              </div>

              <div className={section} id="forms">
                <LegalSectionRule variant="amber" />
                <h2 className={h2}>Forms and applications</h2>

                <h3 className={`${h3} pt-2`}>
                  Contact and partnership messages
                </h3>
                <p className={body}>
                  When you use our contact flow, your submission is transmitted
                  through a secure form delivery service so our team can reply.
                  We keep message content only as long as needed to respond,
                  maintain records where required, and protect our community.
                </p>

                <h3 className={h3}>
                  Volunteer applications
                </h3>
                <p className={body}>
                  Volunteer applications are stored in a secure database tool
                  our staff uses for recruiting and placement. Access is limited
                  to people who need it for operations, compliance, or partner
                  coordination. Retention follows operational needs and legal
                  requirements; we remove or archive data when it is no longer
                  necessary.
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
              </div>

              <div className={section} id="cookies-local-storage">
                <LegalSectionRule variant="teal" />
                <h2 className={h2}>Cookies, local storage, and similar technologies</h2>
                <p className={body}>
                  We may use cookies or similar technologies where needed for
                  security, preferences, or future analytics features. Today,
                  parts of our site store small amounts of information in your
                  browser&apos;s <strong>local storage</strong>—for example, to
                  remember light or dark theme choices and whether you have
                  dismissed an announcement. These values stay on your device
                  unless you clear site data in your browser settings.
                </p>
                <p className={body}>
                  If we introduce optional marketing or analytics cookies, we
                  will update this Policy and, where required, provide a way to
                  manage preferences.
                </p>
              </div>

              <div className={section} id="analytics">
                <LegalSectionRule variant="amber" />
                <h2 className={h2}>Analytics and performance</h2>
                <p className={body}>
                  Like most hosted websites, our infrastructure automatically
                  logs technical activity needed to deliver pages securely and
                  reliably. We do not currently run dedicated marketing
                  analytics packages on this site; if that changes, we will
                  describe the tools we use, what data they collect, and any
                  choices you have.
                </p>
              </div>

              <div className={section} id="sharing">
                <LegalSectionRule variant="teal" />
                <h2 className={h2}>How we share information</h2>
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
                  We require vendors to use information only to provide
                  services to us and to apply reasonable security measures.
                </p>
              </div>

              <div className={section} id="international">
                <LegalSectionRule variant="amber" />
                <h2 className={h2}>International transfers</h2>
                <p className={body}>
                  Akomapa works across regions. Information may be processed in
                  the United States or other countries where our vendors operate.
                  When data moves across borders, we rely on contractual and
                  organizational safeguards appropriate to the sensitivity of
                  the information involved.
                </p>
              </div>

              <div className={section} id="security">
                <LegalSectionRule variant="teal" />
                <h2 className={h2}>Data security</h2>
                <p className={body}>
                  We use administrative, technical, and physical safeguards
                  designed to protect personal information, including encryption
                  in transit where appropriate, access controls for staff and
                  systems, and trusted payment processing partners. No online
                  platform can guarantee perfect security; please use unique
                  passwords and contact us immediately if you suspect misuse.
                </p>
              </div>

              <div className={section} id="rights">
                <LegalSectionRule variant="amber" />
                <h2 className={h2}>Your rights and choices</h2>
                <p className={body}>Depending on where you live, you may have rights to:</p>
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
                  <li>
                    Withdraw consent where processing is based on consent
                  </li>
                </ul>
                <p className={body}>
                  To exercise these rights, email{" "}
                  <a href="mailto:akomapahealth@gmail.com" className={link}>
                    akomapahealth@gmail.com
                  </a>
                  . We may need to verify your identity before fulfilling certain
                  requests.
                </p>
              </div>

              <div className={section} id="children">
                <LegalSectionRule variant="teal" />
                <h2 className={h2}>Children&apos;s privacy</h2>
                <p className={body}>
                  Our website and general mailing lists are not directed at
                  children under 13. Youth may participate in some educational
                  programs with schools or guardians; when we collect
                  information from minors in those contexts, we do so consistent
                  with applicable law and program consent practices. If you
                  believe we collected information from a child improperly,
                  please contact us right away.
                </p>
              </div>

              <div className={section} id="changes">
                <LegalSectionRule variant="amber" />
                <h2 className={h2}>Changes to this Privacy Policy</h2>
                <p className={body}>
                  We may update this Policy as our programs evolve. When we make
                  material changes, we will revise the &quot;Last updated&quot;
                  date below and, where appropriate, provide additional notice on
                  the site or by email.
                </p>
              </div>

              <div
                className="space-y-4 border-t border-[#E6E7E7] pt-6 sm:space-y-6 dark:border-[#4F5554]"
                id="contact"
              >
                <LegalSectionRule variant="teal" />
                <h2 className={h2}>Contact us</h2>
                <p className={body}>
                  Questions about privacy? Email{" "}
                  <a href="mailto:akomapahealth@gmail.com" className={link}>
                    akomapahealth@gmail.com
                  </a>{" "}
                  or visit our{" "}
                  <Link href="/contact" className={link}>
                    contact page
                  </Link>
                  .
                </p>
              </div>

              <LegalLastUpdated date={LAST_UPDATED} />
            </LegalProseArticle>
          </PublicationArticleMeasure>
        </FadeIn>
      </EditorialBand>
    </div>
  );
}
