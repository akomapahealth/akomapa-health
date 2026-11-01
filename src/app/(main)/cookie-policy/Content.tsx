import { FadeIn } from "@/components/animations";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import { consentChoiceButtonClassName } from "@/components/consent/styles";
import CookieInventoryTable from "@/components/legal/CookieInventoryTable";
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
import { cookieInventory, thirdPartyServices } from "@/config/cookies";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const LAST_UPDATED = "November 1, 2026";

const contents: readonly LegalContentsItem[] = [
  { href: "#summary", label: "The short version" },
  { href: "#what-are-cookies", label: "What cookies and similar technologies are" },
  { href: "#consent", label: "How we ask for your consent" },
  { href: "#necessary", label: "Necessary storage" },
  { href: "#analytics", label: "Optional analytics cookies" },
  { href: "#third-parties", label: "Third-party services" },
  { href: "#manage", label: "Managing your choices" },
  { href: "#changes", label: "Changes to this Cookie Policy" },
  { href: "#contact", label: "Contact us" },
];

const necessaryItems = cookieInventory.filter(
  (item) => item.category === "necessary",
);
const analyticsItems = cookieInventory.filter(
  (item) => item.category === "analytics",
);

export default function Content() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="cookie-policy-title"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <FadeIn>
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Legal
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="cookie-policy-title"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            Cookie Policy
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            What our website stores on your device, why, and how to change
            your choice at any time.
          </EditorialLead>
          <p className="mt-8 border-t border-[#FCFAEF]/20 pt-5 font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#F5C94D]/90">
            Last updated: {LAST_UPDATED}
          </p>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="01"
        aria-labelledby="cookie-policy-title"
        containerClassName="py-12 md:py-16 lg:py-20"
      >
        <FadeIn amount="some">
          <PublicationArticleMeasure className="max-w-3xl">
            <LegalProseArticle labelledBy="cookie-policy-title">
              <LegalContentsNav items={contents} />

              <LegalSection id="summary" ruleVariant="teal" title="The short version">
                <ul className={list}>
                  <li>
                    We use <strong>necessary storage</strong> to remember your
                    theme, announcement, and cookie choices, keep unfinished
                    form drafts on your device, and keep the site secure and
                    working.
                  </li>
                  <li>
                    <strong>Google Analytics</strong> is optional. It only
                    loads, and only sets cookies, if you choose{" "}
                    <strong>Accept optional cookies</strong>.
                  </li>
                  <li>
                    We do not use advertising, retargeting, or social media
                    tracking cookies.
                  </li>
                  <li>
                    You can change or withdraw your choice at any time from{" "}
                    <strong>Cookie settings</strong> in the footer or on this
                    page.
                  </li>
                </ul>
              </LegalSection>

              <LegalSection
                id="what-are-cookies"
                ruleVariant="amber"
                title="What cookies and similar technologies are"
              >
                <p className={body}>
                  Cookies are small text files a website asks your browser to
                  keep. Similar technologies, such as{" "}
                  <strong>local storage</strong> and{" "}
                  <strong>session storage</strong>, let a site save small
                  pieces of information on your device too. Session storage is
                  cleared when you close the tab; local storage stays until it
                  expires or you clear your site data. This policy covers all
                  of them, and we call them &quot;cookies&quot; for short.
                </p>
              </LegalSection>

              <LegalSection
                id="consent"
                ruleVariant="teal"
                title="How we ask for your consent"
              >
                <p className={body}>
                  On your first visit we show a cookie banner with two equally
                  clear choices: <strong>Accept optional cookies</strong> and{" "}
                  <strong>Reject optional cookies</strong>. Until you choose,
                  and whenever you reject, no optional cookies are set and
                  Google Analytics is not loaded at all.
                </p>
                <p className={body}>
                  Your choice is saved on this device for up to 12 months. We
                  ask again sooner only if we add new optional cookies or
                  materially change how we use them. Because the choice is
                  stored in your browser, a different browser or device will
                  ask you separately.
                </p>
              </LegalSection>

              <LegalSection id="necessary" ruleVariant="amber" title="Necessary storage">
                <p className={body}>
                  These are needed for features you ask for, or to keep the
                  site secure and reliable, so they do not require consent and
                  cannot be switched off in Cookie settings. You can still
                  remove them by clearing your browser&apos;s site data.
                </p>
                <CookieInventoryTable
                  items={necessaryItems}
                  caption="Necessary cookies and browser storage"
                />
              </LegalSection>

              <LegalSection
                id="analytics"
                ruleVariant="teal"
                title="Optional analytics cookies"
              >
                <p className={body}>
                  With your permission, we use{" "}
                  <strong>Google Analytics 4</strong>, provided by Google LLC,
                  to understand which pages are visited, how people arrive,
                  and which links and calls to action are used. This helps us
                  improve the site for students, volunteers, partners, and
                  communities.
                </p>
                <CookieInventoryTable
                  items={analyticsItems}
                  caption="Optional analytics cookies"
                />
                <h3 className={h3}>How we limit analytics</h3>
                <ul className={list}>
                  <li>
                    We use Google&apos;s &quot;basic&quot; consent approach:
                    the Google Analytics script is not requested until you
                    accept, so no page views or events are sent before then.
                  </li>
                  <li>
                    Advertising features, ad personalization, and ad data
                    sharing signals are always set to &quot;denied.&quot;
                  </li>
                  <li>
                    Events never include form answers, donor details, payment
                    details, or Immersion responses. Our{" "}
                    <Link href="/privacy#analytics" className={link}>
                      Privacy Policy
                    </Link>{" "}
                    describes exactly which events we collect.
                  </li>
                  <li>
                    If you withdraw consent, we stop Google Analytics
                    immediately and delete the <code>_ga</code> cookies it set
                    on our domain.
                  </li>
                </ul>
                <p className={body}>
                  Google processes this data under its own terms. Learn more in{" "}
                  <a
                    href="https://policies.google.com/technologies/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link}
                  >
                    how Google uses cookies
                  </a>{" "}
                  and the{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link}
                  >
                    Google Privacy Policy
                  </a>
                  .
                </p>
              </LegalSection>

              <LegalSection
                id="third-parties"
                ruleVariant="amber"
                title="Third-party services"
              >
                <p className={body}>
                  Some features are provided by other organizations. When you
                  use them, the provider may set its own cookies or receive
                  device information under its own policy. Akomapa cannot read
                  or control those cookies.
                </p>
                <ul className="space-y-3">
                  {thirdPartyServices.map((service) => (
                    <li
                      key={service.name}
                      className="border-l-2 border-[#0097b2]/40 pl-4 dark:border-[#66C4DC]/40"
                    >
                      <p className="font-subheading text-base font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                        {service.name}{" "}
                        <span className="font-body text-sm font-normal text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
                          · {service.where}
                        </span>
                      </p>
                      <p className={cn(body, "mt-1 text-base sm:text-base")}>
                        {service.detail}{" "}
                        <a
                          href={service.privacyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={link}
                        >
                          {service.name} privacy information
                        </a>
                      </p>
                    </li>
                  ))}
                </ul>
              </LegalSection>

              <LegalSection id="manage" ruleVariant="teal" title="Managing your choices">
                <div className="rounded-lg border border-[#0F4C5C]/15 bg-white p-5 sm:p-6 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]">
                  <p className={body}>
                    Change or withdraw your choice at any time. Withdrawing
                    stops optional cookies from then on; it does not affect
                    data collected before you changed your mind.
                  </p>
                  <CookieSettingsButton
                    className={cn(consentChoiceButtonClassName, "mt-5 sm:w-auto")}
                  >
                    Open cookie settings
                  </CookieSettingsButton>
                </div>
                <p className={body}>
                  You can also block or delete cookies in your browser
                  settings, or install Google&apos;s{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link}
                  >
                    Google Analytics opt-out browser add-on
                  </a>
                  . Blocking necessary storage may stop some features, such as
                  saved themes or form drafts, from working.
                </p>
              </LegalSection>

              <LegalSection
                id="changes"
                ruleVariant="amber"
                title="Changes to this Cookie Policy"
              >
                <p className={body}>
                  We update this policy when the cookies we use change. If we
                  add optional cookies or change their purpose, we will ask for
                  your consent again before using them.
                </p>
              </LegalSection>

              <LegalSection id="contact" ruleVariant="teal" title="Contact us">
                <p className={body}>
                  Questions about cookies or privacy? Email{" "}
                  <a href={CONTACT.email.href} className={link}>
                    {CONTACT.email.display}
                  </a>
                  , read our{" "}
                  <Link href="/privacy" className={link}>
                    Privacy Policy
                  </Link>
                  , or visit our{" "}
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
