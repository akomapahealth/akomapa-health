"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/terms-hero.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6"
            >
              Terms of Service
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8"
            >
              Please read these terms carefully before using our services.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-6 md:p-8 space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Acceptance of Terms
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  By accessing and using Akomapa&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Volunteer Responsibilities
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  As a volunteer, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#2F3332] dark:text-[#E6E7E7]">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain confidentiality of patient information</li>
                  <li>Follow professional and ethical guidelines</li>
                  <li>Attend scheduled sessions as committed</li>
                  <li>Report any concerns or incidents promptly</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Code of Conduct
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  All volunteers must adhere to our code of conduct, which includes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#2F3332] dark:text-[#E6E7E7]">
                  <li>Professional behavior and appearance</li>
                  <li>Respect for patients and team members</li>
                  <li>Maintenance of patient confidentiality</li>
                  <li>Compliance with health and safety guidelines</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Intellectual Property
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  All content, materials, and resources provided by Akomapa are protected by intellectual property rights. Volunteers may not reproduce, distribute, or use these materials without explicit permission.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Limitation of Liability
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  Akomapa is not liable for any direct, indirect, incidental, or consequential damages arising from your participation in our programs or use of our services.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Termination
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  We reserve the right to terminate or suspend volunteer participation for violations of these terms or for any other reason at our sole discretion.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Changes to Terms
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  We may modify these terms at any time. Continued use of our services after such modifications constitutes acceptance of the updated terms.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Contact Information
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  For questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:akomapahealth@gmail.com" className="text-[#0097b2] hover:text-[#eeba2b]">
                    akomapahealth@gmail.com
                  </a>
                </p>
              </div>

              <div className="pt-6 border-t border-[#E6E7E7] dark:border-[#4F5554]">
                <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
