"use client";

import { motion } from "framer-motion";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";

export default function TermsPage() {
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
              Terms of Service
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              Please read these terms carefully before using our services or participating in our programs.
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
                  Acceptance of Terms
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  By accessing and using Akomapa Health Foundation&apos;s website, services, and programs, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Use of Services
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed ml-4">
                  <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                  <li>To impersonate or attempt to impersonate Akomapa, an Akomapa employee, another user, or any other person or entity</li>
                  <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                </ul>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Volunteer Responsibilities
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  As a volunteer with Akomapa Health Foundation, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed ml-4">
                  <li>Provide accurate and complete information in all applications and communications</li>
                  <li>Maintain strict confidentiality of all patient information and medical records</li>
                  <li>Follow all professional, ethical, and clinical guidelines established by Akomapa and our partner institutions</li>
                  <li>Attend scheduled sessions and training as committed, providing advance notice when unable to attend</li>
                  <li>Report any concerns, incidents, or violations of policies promptly to appropriate supervisors</li>
                  <li>Conduct yourself in a professional manner that reflects positively on Akomapa and our mission</li>
                </ul>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Code of Conduct
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  All volunteers, staff, and participants must adhere to our code of conduct, which includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed ml-4">
                  <li>Professional behavior and appearance at all times during clinic sessions and program activities</li>
                  <li>Respect for patients, community members, team members, and all stakeholders</li>
                  <li>Maintenance of patient confidentiality in accordance with HIPAA and applicable privacy laws</li>
                  <li>Compliance with all health and safety guidelines, including infection control protocols</li>
                  <li>Cultural humility and sensitivity in all interactions with diverse communities</li>
                  <li>Commitment to ethical practice and evidence-based care</li>
                </ul>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Intellectual Property
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  All content, materials, training resources, logos, and intellectual property provided by Akomapa Health Foundation are protected by copyright, trademark, and other intellectual property laws. Volunteers and participants may not reproduce, distribute, modify, or use these materials without explicit written permission from Akomapa Health Foundation.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Limitation of Liability
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  Akomapa Health Foundation is not liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your participation in our programs, use of our services, or reliance on information provided through our website or services. This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Termination
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  We reserve the right to terminate or suspend volunteer participation, access to services, or use of our website immediately, without prior notice or liability, for any reason, including but not limited to violations of these Terms, code of conduct, or for any other reason at our sole discretion.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#0097b2] rounded-full" />
                  <div className="h-1 w-1 bg-[#0097b2] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Changes to Terms
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  We may modify these Terms of Service at any time. We will notify users of any material changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of our services after such modifications constitutes acceptance of the updated terms.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6 pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-8 bg-[#eeba2b] rounded-full" />
                  <div className="h-1 w-1 bg-[#eeba2b] rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Contact Information
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                  For questions about these Terms of Service, please contact us at{" "}
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
