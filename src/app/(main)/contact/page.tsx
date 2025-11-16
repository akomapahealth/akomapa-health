"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import { motion } from "framer-motion";

export default function ContactPage() {
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
              Get in touch with us.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              Have questions or want to learn more about our healthcare programs? We&apos;d love to hear from you regarding partnerships, volunteering, or general inquiries.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Send us a message
                </h2>
                <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                  Please fill out the form with your information and we&apos;ll get back to you as soon as possible. Whether you have questions about our programs, want to volunteer, or discuss potential partnerships, we&apos;re here to help.
                </p>
              </div>
              
              <ContactForm />
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  Our Information
                </h2>
              </div>
              
              <div className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-lg border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 p-6 sm:p-8 mb-6 sm:mb-8">
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#1C1F1E] dark:text-[#FCFAEF]">
                      Ghana Office
                    </h3>
                    <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                      43 Yam Street<br />
                      Tema Community 23, Adjei Kojo<br />
                      Accra, Ghana<br />
                      <a href="tel:+233502966072" className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors">
                        +233 (0)50 296 6072
                      </a>
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                    <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#1C1F1E] dark:text-[#FCFAEF]">
                      USA Office
                    </h3>
                    <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                      University Towers, Apt 5N<br />
                      100 York Street, New Haven, CT 06511<br />
                      United States<br />
                      <a href="tel:+12034106306" className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors">
                        +1 (203) 410-6306
                      </a>
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                    <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#1C1F1E] dark:text-[#FCFAEF]">
                      Contact Details
                    </h3>
                    <div className="space-y-2 text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                      <p>
                        <span className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Email: </span>
                        <a href="mailto:akomapahealth@gmail.com" className="text-[#0097b2] dark:text-[#66C4DC] hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors">
                          akomapahealth@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-[#E6E7E7]/40 dark:border-[#4F5554]/40">
                    <h3 className="font-semibold text-lg sm:text-xl mb-3 text-[#1C1F1E] dark:text-[#FCFAEF]">
                      Office Hours
                    </h3>
                    <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 7:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96 shadow-lg border border-[#E6E7E7]/20 dark:border-[#4F5554]/20">
                <LocationMap />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}