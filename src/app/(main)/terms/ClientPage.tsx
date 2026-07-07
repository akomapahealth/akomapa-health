"use client";

import { FadeIn } from "@/components/animations";
import { HeroEntranceH1, HeroEntranceP } from "@/components/motion/HeroEntrance";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

const LAST_UPDATED = "May 9, 2026";

const body =
  "text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed";
const h2 =
  "text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]";
const list =
  `${body} list-disc list-outside space-y-2 pl-6 sm:pl-7 [&_strong]:text-[#1C1F1E] dark:[&_strong]:text-[#FCFAEF]`;

function SectionRule({ variant }: { variant: "teal" | "amber" }) {
  const bg = variant === "teal" ? "bg-[#0097b2]" : "bg-[#eeba2b]";
  return (
    <div className="flex items-center gap-2 mb-4" aria-hidden>
      <div className={`h-1 w-8 ${bg} rounded-full`} />
      <div className={`h-1 w-1 ${bg} rounded-full`} />
    </div>
  );
}

export default function TermsPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <section
        className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden"
        aria-labelledby="terms-of-service-title"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl pt-4 sm:pt-8">
            <HeroEntranceH1
              id="terms-of-service-title"
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Terms of Service
            </HeroEntranceH1>
            <HeroEntranceP
              delay={0.1}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              These terms govern your use of our website, digital services,
              donations, and applications to participate in Akomapa programs.
            </HeroEntranceP>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <FadeIn
              amount="some"
              className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10"
            >
              <article
                className="max-w-prose mx-auto space-y-8 sm:space-y-10"
                aria-labelledby="terms-of-service-title"
              >
                <div className="space-y-4 sm:space-y-6" id="acceptance">
                  <SectionRule variant="teal" />
                  <h2 className={h2}>Agreement to these terms</h2>
                  <p className={body}>
                    By accessing{" "}
                    <strong>www.akomapahealth.org</strong> or related sites we
                    operate, donating, submitting forms, or applying to volunteer
                    or participate in our programs, you agree to these Terms of
                    Service and our{" "}
                    <Link
                      href="/privacy"
                      className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors font-medium underline-offset-2 hover:underline"
                    >
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
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="acceptable-use"
                >
                  <SectionRule variant="amber" />
                  <h2 className={h2}>Acceptable use</h2>
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
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="informational-disclaimer"
                >
                  <SectionRule variant="teal" />
                  <h2 className={h2}>Informational content—not medical advice</h2>
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
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="healthcare-limitations"
                >
                  <SectionRule variant="amber" />
                  <h2 className={h2}>Healthcare information and relationships</h2>
                  <p className={body}>
                    Browsing our website or signing up for newsletters{" "}
                    <strong>does not create</strong> a clinician–patient or other
                    treatment relationship with Akomapa Health Foundation.
                    Volunteers and staff who participate in programs must follow
                    partner policies, professional ethics, and privacy rules such
                    as HIPAA where they apply.
                  </p>
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="research"
                >
                  <SectionRule variant="teal" />
                  <h2 className={h2}>Research and innovation content</h2>
                  <p className={body}>
                    We may describe pilots, partnerships, or learning agendas on
                    our site. Those descriptions are illustrative and may change as
                    work evolves. Unless we provide a separate informed consent or
                    enrollment process, website content{" "}
                    <strong>does not constitute an offer</strong> to enroll you in a
                    research study or clinical trial.
                  </p>
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="applications"
                >
                  <SectionRule variant="amber" />
                  <h2 className={h2}>Applications and eligibility</h2>
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
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="donations"
                >
                  <SectionRule variant="teal" />
                  <h2 className={h2}>Donations and payments</h2>
                  <p className={body}>
                    Donations and certain partnership payments are processed
                    through a certified payment processor. You authorize charges you
                    initiate and agree to provide accurate billing information.
                    Recurring donations continue until canceled according to the
                    flow presented at checkout or by contacting us.
                  </p>
                  <p className={body}>
                    If you believe a charge is incorrect, reach out to{" "}
                    <a
                      href="mailto:akomapahealth@gmail.com"
                      className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors font-medium underline-offset-2 hover:underline"
                    >
                      akomapahealth@gmail.com
                    </a>{" "}
                    promptly. Refunds, if any, are handled case by case and may
                    depend on processor policies and banking timelines.
                  </p>
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="volunteer-conduct"
                >
                  <SectionRule variant="amber" />
                  <h2 className={h2}>Volunteer responsibilities</h2>
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
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="code-of-conduct"
                >
                  <SectionRule variant="teal" />
                  <h2 className={h2}>Code of conduct</h2>
                  <p className={body}>
                    Participants are expected to behave professionally and respect
                    everyone&apos;s dignity—especially patients and community
                    members. Harassment, discrimination, or disruptive conduct may
                    result in removal from programs or sites.
                  </p>
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="intellectual-property"
                >
                  <SectionRule variant="amber" />
                  <h2 className={h2}>Intellectual property</h2>
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
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="liability"
                >
                  <SectionRule variant="teal" />
                  <h2 className={h2}>Limitation of liability</h2>
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
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="termination"
                >
                  <SectionRule variant="amber" />
                  <h2 className={h2}>Suspension and termination</h2>
                  <p className={body}>
                    We may suspend or terminate access to our website, applications,
                    or programs when we reasonably believe there is a violation of
                    these Terms, risk to participants, or legal obligation.
                  </p>
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40"
                  id="changes"
                >
                  <SectionRule variant="teal" />
                  <h2 className={h2}>Changes to these Terms</h2>
                  <p className={body}>
                    We may update these Terms as our services grow. We will post
                    revisions on this page and update the &quot;Last updated&quot;
                    date. Continued use after changes become effective constitutes
                    acceptance unless applicable law requires additional steps.
                  </p>
                </div>

                <div
                  className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7] dark:border-[#4F5554]"
                  id="contact"
                >
                  <SectionRule variant="amber" />
                  <h2 className={h2}>Contact</h2>
                  <p className={body}>
                    Questions about these Terms? Email{" "}
                    <a
                      href="mailto:akomapahealth@gmail.com"
                      className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors font-medium underline-offset-2 hover:underline"
                    >
                      akomapahealth@gmail.com
                    </a>{" "}
                    or visit our{" "}
                    <Link
                      href="/contact"
                      className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors font-medium underline-offset-2 hover:underline"
                    >
                      contact page
                    </Link>
                    .
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E6E7E7] dark:border-[#4F5554]">
                  <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                    Last updated: {LAST_UPDATED}
                  </p>
                </div>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
