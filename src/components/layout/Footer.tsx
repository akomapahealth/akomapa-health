import Link from "next/link";
import { Mail } from "lucide-react";
import Newsletter from "@/components/shared/NewsLetter";
import { BRAND } from "@/config/brand";
import BrandLogo from "@/components/shared/BrandLogo";
import { CONTACT } from "@/config/contact";

const footerLinkClass =
  "inline-flex min-h-7 items-center text-[#2F3332]/75 transition-colors hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:text-[#FCFAEF]/85 dark:hover:text-[#F5C94D] dark:focus-visible:ring-[#F5C94D] dark:focus-visible:ring-offset-[#121514]";

const footerSocialLinkClass =
  "inline-flex h-10 w-10 items-center justify-center border border-[#2F3332]/15 text-[#2F3332] transition-colors hover:border-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:border-[#FCFAEF]/20 dark:text-[#FCFAEF] dark:hover:border-[#F5C94D] dark:hover:bg-[#F5C94D] dark:hover:text-[#121514] dark:focus-visible:ring-[#F5C94D] dark:focus-visible:ring-offset-[#121514]";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-site-footer
      className="relative overflow-hidden border-t border-[#0097b2]/20 bg-[#FCFAEF] text-[#1C1F1E] dark:border-[#66C4DC]/20 dark:bg-[#121514] dark:text-[#FCFAEF]"
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-1 w-24 bg-[#eeba2b] md:w-40"
      />

      <div className="site-container mx-auto px-4 py-14 md:py-16 lg:py-20">
        <div
          data-footer-grid
          className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(15rem,1.1fr)] lg:gap-x-10"
        >
          {/* Logo and mission */}
          <div
            data-footer-brand
            className="border-b border-[#2F3332]/15 pb-9 md:border-b-0 md:pb-0 dark:border-[#FCFAEF]/20"
          >
            <BrandLogo width={220} height={60} />
            <p className="mt-6 max-w-sm font-body text-lg leading-relaxed text-[#2F3332]/85 dark:text-[#FCFAEF]">
              {BRAND.footerMission}
            </p>
            <p className="mt-5 max-w-sm font-body text-sm leading-relaxed text-[#2F3332]/65 dark:text-[#E6E7E7]/80">
              {BRAND.legalNotice}
            </p>
            <div
              aria-label="Follow Akomapa Health"
              className="mt-7 flex flex-wrap gap-2"
            >
              <a
                href="https://www.facebook.com/people/Akomapa-health/100070235658941/"
                target="_blank"
                rel="noreferrer"
                className={footerSocialLinkClass}
                aria-label="Facebook"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@akomapahealth"
                target="_blank"
                rel="noreferrer"
                className={footerSocialLinkClass}
                aria-label="TikTok"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.89 2.89 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/akomapahealth/"
                target="_blank"
                rel="noreferrer"
                className={footerSocialLinkClass}
                aria-label="Instagram"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/akomapahealth/posts/?feedView=all"
                target="_blank"
                rel="noreferrer"
                className={footerSocialLinkClass}
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-t border-[#2F3332]/15 pt-5 md:border-t-0 md:pt-0 dark:border-[#FCFAEF]/20">
            <p
              aria-hidden="true"
              className="mb-4 font-subheading text-xs font-bold tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]"
            >
              01
            </p>
            <h3 className="mb-5 font-heading text-lg font-bold tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-2 font-body text-sm leading-relaxed md:text-base">
              <li>
                <Link href="/philosophy" className={footerLinkClass}>
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/academy" className={footerLinkClass}>
                  Academy
                </Link>
              </li>
              <li>
                <Link href="/ncd-impact" className={footerLinkClass}>
                  NCD Impact
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className={footerLinkClass}>
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/impact" className={footerLinkClass}>
                  Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Initiatives */}
          <div className="border-t border-[#2F3332]/15 pt-5 md:border-t-0 md:pt-0 dark:border-[#FCFAEF]/20">
            <p
              aria-hidden="true"
              className="mb-4 font-subheading text-xs font-bold tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]"
            >
              02
            </p>
            <h3 className="mb-5 font-heading text-lg font-bold tracking-tight">
              Our Initiatives
            </h3>
            <ul className="space-y-2 font-body text-sm leading-relaxed md:text-base">
              <li>
                <Link href="/community-hubs" className={footerLinkClass}>
                  Community Health Hubs
                </Link>
              </li>
              <li>
                <Link href="/academy" className={footerLinkClass}>
                  Academy
                </Link>
              </li>
              <li>
                <Link href="/research" className={footerLinkClass}>
                  Research &amp; Innovation
                </Link>
              </li>
              <li>
                <Link href="/blog" className={footerLinkClass}>
                  Thought Leadership
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className={footerLinkClass}>
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="border-t border-[#2F3332]/15 pt-5 md:border-t-0 md:pt-0 dark:border-[#FCFAEF]/20">
            <p
              aria-hidden="true"
              className="mb-4 font-subheading text-xs font-bold tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]"
            >
              03
            </p>
            <h3 className="mb-5 font-heading text-lg font-bold tracking-tight">
              Contact Us
            </h3>
            <div className="space-y-6 font-body text-[#2F3332]/75 dark:text-[#FCFAEF]/85">
              <Link href="/contact" className={footerLinkClass}>
                Send us a message
              </Link>
              {CONTACT.offices.map((office) => (
                <div key={office.id}>
                  <h4 className="mb-1 font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                    {office.label}
                  </h4>
                  <address className="not-italic text-sm leading-relaxed">
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <a href={office.phone.href} className={footerLinkClass}>
                      {office.phone.display}
                    </a>
                  </address>
                </div>
              ))}
              <div className="flex items-start border-t border-[#2F3332]/15 pt-5 dark:border-[#FCFAEF]/20">
                <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-[#F5C94D]" />
                <a
                  href={CONTACT.email.href}
                  className={`min-w-0 break-all ${footerLinkClass}`}
                >
                  {CONTACT.email.display}
                </a>
              </div>
            </div>
          </div>
        </div>

        <Newsletter />

        <div
          data-footer-legal
          className="mt-10 flex flex-col gap-4 border-t border-[#2F3332]/15 pt-6 dark:border-[#FCFAEF]/20 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-body text-sm text-[#2F3332]/70 dark:text-[#E6E7E7]">
            &copy; {currentYear} Akomapa Health. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className={`font-body text-sm ${footerLinkClass}`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className={`font-body text-sm ${footerLinkClass}`}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
