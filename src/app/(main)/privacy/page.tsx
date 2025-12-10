"use client";

import { motion } from "framer-motion";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-28 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl pt-4 sm:pt-8">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-[#FCFAEF] mb-6 leading-tight"
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-8 sm:space-y-10"
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Introduction
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  Akomapa Health Foundation (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or participate in our programs.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Information We Collect
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed ml-4">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, mailing address</li>
                  <li><strong>Academic Information:</strong> School, level, program of study, academic records (for volunteers)</li>
                  <li><strong>Volunteer Application Details:</strong> Motivation statements, experience, availability, team preferences</li>
                  <li><strong>Communication Preferences:</strong> Newsletter subscriptions, contact preferences</li>
                  <li><strong>Payment Information:</strong> For donations and partnerships (processed securely through third-party payment processors)</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, and pages visited</li>
                </ul>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  How We Use Your Information
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed ml-4">
                  <li>Process and evaluate volunteer applications</li>
                  <li>Communicate with you about our programs, events, and opportunities</li>
                  <li>Send newsletters, updates, and promotional materials (with your consent)</li>
                  <li>Process donations and manage partnership relationships</li>
                  <li>Improve our services, website, and user experience</li>
                  <li>Comply with legal obligations and respond to legal requests</li>
                  <li>Protect the rights, property, or safety of Akomapa, our users, or others</li>
                </ul>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Information Sharing and Disclosure
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  We do not sell or rent your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed ml-4">
                  <li><strong>Service Providers:</strong> Third-party vendors who assist with operations (e.g., email services, payment processing, website hosting)</li>
                  <li><strong>Partner Institutions:</strong> Universities and healthcare organizations we collaborate with for volunteer programs</li>
                  <li><strong>Legal Authorities:</strong> When required by law, court order, or to protect our rights and safety</li>
                  <li><strong>With Your Consent:</strong> In any other situation where you have provided explicit consent</li>
                </ul>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed mt-4">
                  All third parties are required to maintain the confidentiality of your information and are prohibited from using it for any purpose other than providing services to Akomapa.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Data Security
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed ml-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls limiting who can view or use personal information</li>
                  <li>Secure payment processing through certified third-party providers</li>
                </ul>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Your Rights and Choices
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed ml-4">
                  <li><strong>Access:</strong> Request access to your personal information we hold</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal and operational requirements)</li>
                  <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                  <li><strong>Withdraw Consent:</strong> Withdraw consent for processing where consent is the legal basis</li>
                </ul>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed mt-4">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:akomapahealth@gmail.com" className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors font-medium">
                    akomapahealth@gmail.com
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Children&apos;s Privacy
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7] dark:border-[#4F5554]">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Contact Us
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:akomapahealth@gmail.com" className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors font-medium">
                    akomapahealth@gmail.com
                  </a>
                  {" "}or visit our{" "}
                  <Link href="/contact" className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors font-medium">
                    contact page
                  </Link>
                  .
                </p>
              </div>

              <div className="pt-6 border-t border-[#E6E7E7] dark:border-[#4F5554]">
                <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
