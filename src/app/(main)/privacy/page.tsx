"use client";

import { motion } from "framer-motion";
import Image from "@/components/common/Image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/privacy-hero.jpg"
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
              Privacy Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8"
            >
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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
                  Information We Collect
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#2F3332] dark:text-[#E6E7E7]">
                  <li>Name and contact information</li>
                  <li>Academic information</li>
                  <li>Volunteer application details</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  How We Use Your Information
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#2F3332] dark:text-[#E6E7E7]">
                  <li>Process volunteer applications</li>
                  <li>Communicate with you about our programs</li>
                  <li>Improve our services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Information Sharing
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  We do not sell or rent your personal information. We may share your information with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#2F3332] dark:text-[#E6E7E7]">
                  <li>Our team members and volunteers</li>
                  <li>Service providers who assist our operations</li>
                  <li>Legal authorities when required by law</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Data Security
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Your Rights
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#2F3332] dark:text-[#E6E7E7]">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of communications</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Contact Us
                </h2>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:akomapahealth@gmail.com" className="text-[#007A73] hover:text-[#C37B1E]">
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
