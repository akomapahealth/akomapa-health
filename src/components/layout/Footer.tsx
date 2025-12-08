"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useEffect, useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      if (theme === "system") {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      } else {
        setIsDark(theme === "dark");
      }
    };
    checkTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);
    return () => mediaQuery.removeEventListener("change", checkTheme);
  }, [theme]);
  
  return (
    <footer className="bg-[#FCFAEF]/80 dark:bg-[#4F5554]/90 text-floralwhite">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={isDark ? "/images/akomapa-logo-dark.png" : "/images/akomapa-logo.png"}
                alt="Akomapa Health Foundation Logo"
                width={220}
                height={60}
                className="h-12 w-auto object-contain"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            </Link>
            <p className="text-floralwhite/80 mt-4 font-body">
              Improving health outcomes and access to quality healthcare through community-centered solutions.
            </p>
            <p className="text-floralwhite/70 text-sm font-body">
              Registered in the United States and Ghana<br />
              501(c)(3) tax-exempt nonprofit organization in the U.S.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/people/Akomapa-health/100070235658941/" target="_blank" rel="noreferrer" className="text-floralwhite hover:text-amber transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@akomapahealth" target="_blank" rel="noreferrer" className="text-floralwhite hover:text-amber transition-colors" aria-label="TikTok">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.89 2.89 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/akomapahealth/" target="_blank" rel="noreferrer" className="text-floralwhite hover:text-amber transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/akomapahealth/posts/?feedView=all" target="_blank" rel="noreferrer" className="text-floralwhite hover:text-amber transition-colors" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link href="/about" className="text-floralwhite/80 hover:text-amber transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Our Programs
                </Link>
              </li>
              {/* <li>
                <Link href="/resources" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Resources
                </Link>
              </li> */}
              {/* <li>
                <Link href="/news" className="text-floralwhite/80 hover:text-amber transition-colors">
                  News & Updates
                </Link>
              </li> */}
              <li>
                <Link href="/contact" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Partner with Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Our Core Programs</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link href="/programs/akomapa-network" className="text-floralwhite/80 hover:text-amber transition-colors">
                  The Akomapa Network
                </Link>
              </li>
              <li>
                <Link href="/programs/akomapa-ghltp" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Akomapa GHLTP
                </Link>
              </li>
              <li>
                <Link href="/programs/akomapa-ghip" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Akomapa GHIP
                </Link>
              </li>
              <li>
                <Link href="/programs/akomapa-young-advocates" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Akomapa Young Advocates
                </Link>
              </li>
              <li>
                <Link href="/programs/akomapa-foods" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Akomapa Foods
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-6 font-body text-floralwhite/80">
              <div>
                <h4 className="font-semibold text-floralwhite mb-1">USA Office</h4>
                <p className="text-sm leading-relaxed">
                  University Towers, Apt 5N<br />
                  100 York Street, New Haven, CT 06511<br />
                  +1 (203) 410-6306
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-floralwhite mb-1">Ghana Office</h4>
                <p className="text-sm leading-relaxed">
                  43 Yam Street, Tema Community 23, Adjei Kojo, Accra<br />
                  +233 (0)50 296 6072
                </p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-amber flex-shrink-0" />
                <a href="mailto:akomapahealth@gmail.com" className="text-floralwhite/80 hover:text-amber transition-colors">
                  akomapahealth@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-floralwhite/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-floralwhite/70 text-sm font-body">
            &copy; {currentYear} Akomapa Health. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-floralwhite/70 text-sm font-body hover:text-amber transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-floralwhite/70 text-sm font-body hover:text-amber transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}