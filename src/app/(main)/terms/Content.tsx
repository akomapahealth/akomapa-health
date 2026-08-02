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
  type LegalContentsItem,
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

const contents: readonly LegalContentsItem[] = [
  { href: "#acceptance", label: "Agreement to these terms" },
  { href: "#acceptable-use", label: "Acceptable use" },
  {
    href: "#informational-disclaimer",
    label: "Informational content—not medical advice",
  },
  {
    href: "#healthcare-limitations",
    label: "Healthcare information and relationships",
  },
  { href: "#research", label: "Research and innovation content" },
  { href: "#applications", label: "Applications and eligibility" },
  { href: "#donations", label: "Donations and payments" },
  { href: "#volunteer-conduct", label: "Volunteer responsibilities" },
  { href: "#code-of-conduct", label: "Code of conduct" },
  { href: "#intellectual-property", label: "Intellectual property" },
  { href: "#liability", label: "Limitation of liability" },
  { href: "#termination", label: "Suspension and termination" },
  { href: "#changes", label: "Changes to these Terms" },
  { href: "#contact", label: "Contact" },
];

export default function Content() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="terms-of-service-title"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <FadeIn>
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Legal
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="terms-of-service-title"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            Terms of Service
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            These terms govern your use of our website, digital services,
            donations, and applications to participate in Akomapa programs.
          </EditorialLead>
          <p className="mt-8 border-t border-[#FCFAEF]/20 pt-5 font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#F5C94D]/90">
            Last updated: {LAST_UPDATED}
          </p>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="01"
        aria-labelledby="terms-of-service-title"
        containerClassName="py-12 md:py-16 lg:py-20"
      >
        <FadeIn amount="some">
          <PublicationArticleMeasure className="max-w-3xl">
            <LegalProseArticle labelledBy="terms-of-service-title">
              <LegalContentsNav items={contents} />

              <LegalSection
                id="acceptance"
                ruleVariant="teal"
                title="Agreement to these terms"
              >
                <p className={body}>
                  By accessing{" "}
                  <strong>www.akomapahealth.org</strong> or related sites we
                  operate, donating, submitting forms, or applying to volunteer
                  or participate in our programs, you agree to these Terms of
                  Service and our{" "}
                  <Link href="/privacy" className={link}>
                    Privacy Policy
                  </Link>
                  . If you do not agree, please discontinue use of our digital
                  services.
                </p>
                <p className={body}>
                  <strong>Nkwapa EMR:</strong> Nkwapa is an electronic medical
                  records platform we develop for clinical environments. It may
                  be offered in beta or evolving releases. When you access
                  Nkwapa or other regulated clinical tools, supplemental terms,
                  privacy notices, or institutional agreements may apply in
                  addition to these Terms.
                </p>
              </LegalSection>

              <LegalSection
                id="acceptable-use"
                ruleVariant="amber"
                title="Acceptable use"
              >
                <p className={body}>
                  You may use our digital services only for lawful, respectful
                  purposes. Without limiting other obligations, you agree not to:
                </p>
                <ul className={list}>
                  <li>
                    Violate applicable laws or infringe anyone&apos;s rights
                  </li>
                  <li>
                    Attempt to disrupt, scrape, overload, or probe our systems,
                    APIs, or forms beyond ordinary browsing or legitimate
                    submissions
                  </li>
                  <li>
                    Misrepresent your identity, affiliation, or qualifications
                  </li>
                  <li>
                    Collect personal information about volunteers, patients, or
                    staff without authorization
                  </li>
                  <li>
                    Use Akomapa or Nkwapa names, logos, or messaging in a way
                    that implies endorsement you do not have
                  </li>
                  <li>
                    Interfere with clinics, partner institutions, or community
                    events coordinated through our programs
                  </li>
                </ul>
              </LegalSection>

              <LegalSection
                id="informational-disclaimer"
                ruleVariant="teal"
                title="Informational content—not medical advice"
              >
                <p className={body}>
                  Materials on this website—including articles, stories,
                  research summaries, and program descriptions—are provided for
                  general information and inspiration. They are{" "}
                  <strong>not medical advice, diagnosis, or treatment</strong>.
                  Always seek guidance from a qualified clinician for personal
                  health decisions.
                </p>
                <p className={body}>
                  <strong>Not for emergencies.</strong> If you believe you or
                  someone else is experiencing a medical emergency, contact
                  local emergency services immediately. Do not rely on email,
                  contact forms, or website content for urgent care.
                </p>
              </LegalSection>

              <LegalSection
                id="healthcare-limitations"
                ruleVariant="amber"
                title="Healthcare information and relationships"
              >
                <p className={body}>
                  Browsing our website or signing up for newsletters{" "}
                  <strong>does not create</strong> a clinician–patient or other
                  treatment relationship with Akomapa Health Foundation.
                  Volunteers and staff who participate in programs must follow
                  partner policies, professional ethics, and privacy rules such
                  as HIPAA where they apply.
                </p>
              </LegalSection>

              <LegalSection
                id="research"
                ruleVariant="teal"
                title="Research and innovation content"
              >
                <p className={body}>
                  We may describe pilots, partnerships, or learning agendas on
                  our site. Those descriptions are illustrative and may change as
                  work evolves. Unless we provide a separate informed consent or
                  enrollment process, website content{" "}
                  <strong>does not constitute an offer</strong> to enroll you in a
                  research study or clinical trial.
                </p>
              </LegalSection>

              <LegalSection
                id="applications"
                ruleVariant="amber"
                title="Applications and eligibility"
              >
                <p className={body}>
                  When you apply to volunteer, join leadership programs, or
                  participate in selective offerings, you agree that:
                </p>
                <ul className={list}>
                  <li>
                    Information you submit is accurate to the best of your
                    knowledge
                  </li>
                  <li>
                    Selection is competitive and operational;{" "}
                    <strong>we do not guarantee acceptance</strong>
                  </li>
                  <li>
                    Partner schools, hospitals, or governments may impose
                    additional requirements (immunizations, background checks,
                    credentialing)
                  </li>
                  <li>
                    We may defer or withdraw participation for safety,
                    capacity, conduct, or compliance reasons
                  </li>
                </ul>
              </LegalSection>

              <LegalSection
                id="donations"
                ruleVariant="teal"
                title="Donations and payments"
              >
                <p className={body}>
                  Donations and certain partnership payments are processed
                  through a certified payment processor. You authorize charges you
                  initiate and agree to provide accurate billing information.
                  Recurring donations continue until canceled according to the
                  flow presented at checkout or by contacting us.
                </p>
                <p className={body}>
                  If you believe a charge is incorrect, reach out to{" "}
                  <a href="mailto:akomapahealth@gmail.com" className={link}>
                    akomapahealth@gmail.com
                  </a>{" "}
                  promptly. Refunds, if any, are handled case by case and may
                  depend on processor policies and banking timelines.
                </p>
              </LegalSection>

              <LegalSection
                id="volunteer-conduct"
                ruleVariant="amber"
                title="Volunteer responsibilities"
              >
                <p className={body}>As a volunteer, you agree to:</p>
                <ul className={list}>
                  <li>
                    Provide truthful information in applications and updates
                  </li>
                  <li>
                    Protect confidential patient and operations information
                  </li>
                  <li>
                    Follow ethical, clinical, and safety guidelines from Akomapa
                    and partner institutions
                  </li>
                  <li>
                    Honor commitments or give timely notice when you cannot
                    participate
                  </li>
                  <li>Report concerns or policy violations through proper channels</li>
                </ul>
              </LegalSection>

              <LegalSection
                id="code-of-conduct"
                ruleVariant="teal"
                title="Code of conduct"
              >
                <p className={body}>
                  Participants are expected to behave professionally and respect
                  everyone&apos;s dignity—especially patients and community
                  members. Harassment, discrimination, or disruptive conduct may
                  result in removal from programs or sites.
                </p>
              </LegalSection>

              <LegalSection
                id="intellectual-property"
                ruleVariant="amber"
                title="Intellectual property"
              >
                <p className={body}>
                  The website, trademarks (including Akomapa and Nkwapa
                  branding where applicable), curriculum materials, documentation,
                  graphics, videos, software, and other content we provide are
                  owned by Akomapa Health Foundation or our licensors. We grant
                  you a limited, revocable license to view and download content
                  for personal, non-commercial use consistent with these Terms.
                </p>
                <p className={body}>
                  You may not copy, modify, distribute, publicly perform, or
                  reverse engineer our materials or applications except where law
                  permits or we give written permission.
                </p>
              </LegalSection>

              <LegalSection
                id="liability"
                ruleVariant="teal"
                title="Limitation of liability"
              >
                <p className={body}>
                  To the fullest extent permitted by law, Akomapa Health
                  Foundation and its directors, officers, volunteers, and
                  partners are not liable for indirect, incidental, special,
                  consequential, or punitive damages, or for loss of profits, data,
                  or goodwill arising from your use of the website, donations,
                  applications, or participation in programs—except where
                  liability cannot be excluded under applicable law.
                </p>
                <p className={body}>
                  Our total liability for any claim relating to these Terms or
                  the website is limited to the greater of (a) the amount you
                  paid us in the twelve months before the claim or (b) one
                  hundred U.S. dollars, except where prohibited.
                </p>
              </LegalSection>

              <LegalSection
                id="termination"
                ruleVariant="amber"
                title="Suspension and termination"
              >
                <p className={body}>
                  We may suspend or terminate access to our website, applications,
                  or programs when we reasonably believe there is a violation of
                  these Terms, risk to participants, or legal obligation.
                </p>
              </LegalSection>

              <LegalSection
                id="changes"
                ruleVariant="teal"
                title="Changes to these Terms"
              >
                <p className={body}>
                  We may update these Terms as our services grow. We will post
                  revisions on this page and update the &quot;Last updated&quot;
                  date. Continued use after changes become effective constitutes
                  acceptance unless applicable law requires additional steps.
                </p>
              </LegalSection>

              <LegalSection id="contact" ruleVariant="amber" title="Contact">
                <p className={body}>
                  Questions about these Terms? Email{" "}
                  <a href="mailto:akomapahealth@gmail.com" className={link}>
                    akomapahealth@gmail.com
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
