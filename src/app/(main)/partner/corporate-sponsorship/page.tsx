"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";

// Sponsorship options
const sponsorshipOptions = [
  {
    id: "clinic",
    title: "Sponsor a Clinic",
    description: "Fund an entire day, semester, or year of care at one of our community sites in Abeadze Dominase or Abura. Your sponsorship provides comprehensive healthcare services including screenings, medication counseling, transportation assistance, and essential follow-up services that ensure continuity of care.",
    color: "#0097b2",
    recognition: [
      "Company logo featured on clinic day banners and promotional materials",
      "Social media spotlight and public acknowledgment across our platforms",
      "Opportunity for co-branded materials and invitations for staff site visits",
      "Detailed impact report showcasing the difference your sponsorship made"
    ]
  },
  {
    id: "supplies",
    title: "Sponsor Medical Supplies & Medications",
    description: "Help us maintain fully stocked clinics with essential medical equipment and supplies including blood pressure cuffs, glucometers, test strips, patient education materials, and life-saving medications. Your in-kind or financial contribution directly supports patient safety and quality care delivery.",
    color: "#eeba2b",
    recognition: [
      "Recognition on supply packaging and monthly inventory reports",
      "Comprehensive Akomapa impact report highlighting your contribution",
      "Mention in quarterly newsletters and annual reports",
      "Invitation to witness supply distribution during clinic days"
    ]
  },
  {
    id: "cash",
    title: "Make a Cash Contribution",
    description: "Provide flexible financial support where the need is greatest. Your unrestricted funds enable us to cover critical operational costs including staff stipends, professional development training, emergency patient referrals, and essential program operations that ensure sustainable healthcare delivery.",
    color: "#0097b2",
    recognition: [
      "Tiered recognition levels based on contribution amount",
      "Logo placement on our website sponsor page and annual report",
      "Featured acknowledgment during key events and quarterly impact reports",
      "Customized partnership benefits package tailored to your organization"
    ]
  },
  {
    id: "pharmacy",
    title: "Sponsor the Akomapa Pharmacy",
    description: "Become a founding sponsor of our innovative low-cost community pharmacy initiative. This sustainable model addresses medication access barriers while creating long-term clinic financial stability. Your sponsorship helps build a future where quality healthcare becomes self-sustaining.",
    color: "#eeba2b",
    recognition: [
      "Prominent naming rights opportunity within the pharmacy facility",
      "Featured placement in press releases and social media campaigns",
      "Permanent \"Founding Partner\" recognition on facility signage",
      "Exclusive updates on pharmacy impact and community health outcomes"
    ]
  },
  {
    id: "farms",
    title: "Support Akomapa Farms & Food Stores",
    description: "Partner with us to address food insecurity while generating sustainable funding for healthcare services. Our innovative model combines community agriculture with affordable food distribution, creating a holistic approach to health and nutrition that directly benefits underserved communities.",
    color: "#0097b2",
    recognition: [
      "Naming opportunity for food stand, market display, or garden plots",
      "Recognition in nutrition education and wellness campaign materials",
      "Regular updates on farm productivity and community nutrition impact",
      "Opportunity to participate in harvest events and community celebrations"
    ]
  }
];

// Recognition benefits
const recognitionBenefits = [
  {
    title: "Logo Inclusion on Website Sponsor Wall",
    description: "Your company logo displayed prominently on our website's corporate sponsors page, reaching thousands of visitors monthly",
    color: "#0097b2"
  },
  {
    title: "Quarterly Heartbeat Impact Reports",
    description: "Featured coverage in our detailed quarterly impact reports showcasing program outcomes and the difference your partnership makes",
    color: "#eeba2b"
  },
  {
    title: "Exclusive Site Visits and Updates",
    description: "Invitations to visit our clinic sites in person or participate in virtual updates and presentations about program activities",
    color: "#0097b2"
  },
  {
    title: "Customized Marketing Materials",
    description: "Personalized content, visuals, and impact stories that you can use to showcase your partnership and social responsibility initiatives",
    color: "#eeba2b"
  }
];

export default function CorporateSponsorshipPage() {

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
              Partner with Purpose. Build Health. Leave a Legacy.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-2xl text-[#FCFAEF]/80 font-light max-w-3xl"
            >
              At Akomapa, we believe in bold partnerships that change lives. Our mission—to deliver compassionate, community-rooted care to underserved Ghanaians—is too urgent, too vast, and too vital to do alone. That&apos;s why we&apos;re inviting visionary companies, foundations, and institutions to stand with us as Corporate Sponsors.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-[#FCFAEF]/80 font-light max-w-3xl mt-4 sm:mt-6"
            >
              When you sponsor Akomapa, you&apos;re not just funding a clinic. You&apos;re fueling access, equity, and the future of healthcare in Africa.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Sponsorship Options - Enhanced Design */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#0097b2] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#eeba2b] rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-[#0097b2] rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="flex items-center gap-2 justify-center mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
              </div>
              <h2 className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                WAYS TO SPONSOR AKOMAPA
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Transform Lives Through Strategic Partnership
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[#2F3332]/80 dark:text-[#E6E7E7]/80 max-w-4xl mx-auto leading-relaxed">
                We welcome both financial and in-kind contributions. Here are some of the many ways your organization can make a meaningful impact:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {sponsorshipOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-white dark:bg-[#2F3332] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 border-2 border-[#E6E7E7]/40 dark:border-[#4F5554]/40 hover:border-opacity-100 overflow-hidden"
                       style={{ 
                         borderLeftColor: `${option.color}60`,
                         borderLeftWidth: '4px'
                       }}>
                    
                    {/* Content Container */}
                    <div className="relative z-10">
                      {/* Header Section */}
                      <div className="mb-6 sm:mb-8">
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: option.color }}
                          />
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] leading-tight">
                            {option.title}
                          </h3>
                        </div>
                        <p className="text-base sm:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed pl-6">
                          {option.description}
                        </p>
                      </div>

                      {/* Recognition Section */}
                      <div className="bg-gradient-to-br from-[#FCFAEF]/80 to-[#FCFAEF]/40 dark:from-[#1C1F1E]/80 dark:to-[#1C1F1E]/40 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-[#E6E7E7]/60 dark:border-[#4F5554]/60">
                        <div className="mb-4">
                          <h4 className="font-semibold text-base sm:text-lg text-[#1C1F1E] dark:text-[#FCFAEF]">
                            Recognition Benefits
                          </h4>
                          <div 
                            className="w-12 h-0.5 rounded-full mt-2"
                            style={{ backgroundColor: option.color }}
                          />
                        </div>
                        
                        <div className="space-y-3 sm:space-y-4">
                          {option.recognition.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-3 group/item"
                            >
                              <div 
                                className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                                style={{ backgroundColor: option.color }}
                              />
                              <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed group-hover/item:text-[#1C1F1E] dark:group-hover/item:text-[#FCFAEF] transition-colors duration-300">
                                {item}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                      style={{ backgroundColor: option.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call-to-Action Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12 sm:mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-[#0097b2] to-[#eeba2b] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-[#FCFAEF] relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-32 h-32 bg-[#FCFAEF]/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#FCFAEF]/20 rounded-full blur-2xl"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6">
                    Ready to Make an Impact?
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                    Join us in creating sustainable healthcare solutions that transform communities across Ghana.
                  </p>
                  <a href="mailto:akomapahealth@gmail.com">
                    <Button 
                      size="lg"
                      className="group bg-[#FCFAEF] text-[#0097b2] hover:bg-[#F5C94D] hover:text-[#1C1F1E] shadow-lg px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300"
                    >
                      Start Your Partnership
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recognition Benefits Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] relative overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 sm:w-32 sm:h-32 bg-[#eeba2b]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 sm:w-24 sm:h-24 bg-[#0097b2]/10 rounded-full blur-lg"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="flex items-center gap-2 justify-center mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
              </div>
              <h2 className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                YOUR RECOGNITION MATTERS
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Celebrating Our Partners
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[#2F3332]/80 dark:text-[#E6E7E7]/80 max-w-3xl mx-auto leading-relaxed">
                All corporate sponsors receive comprehensive recognition and partnership benefits designed to showcase your commitment to healthcare equity.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {recognitionBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-[#2F3332] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border-2 border-[#E6E7E7]/40 dark:border-[#4F5554]/40 hover:border-opacity-100"
                       style={{ 
                         borderLeftColor: `${benefit.color}60`,
                         borderLeftWidth: '4px'
                       }}>
                    <div className="space-y-4 sm:space-y-5">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: benefit.color }}
                        />
                        <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] group-hover:text-[#0097b2] dark:group-hover:text-[#66C4DC] transition-colors duration-300">
                          {benefit.title}
                        </h4>
                      </div>
                      <div 
                        className="w-12 h-0.5 rounded-full"
                        style={{ backgroundColor: `${benefit.color}60` }}
                      />
                      <p className="text-sm sm:text-base text-[#2F3332]/80 dark:text-[#E6E7E7]/80 leading-relaxed pl-6">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Special Recognition Highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-r from-[#0097b2]/10 via-[#0097b2]/5 to-[#eeba2b]/10 dark:from-[#0097b2]/20 dark:via-[#0097b2]/10 dark:to-[#eeba2b]/20 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 text-center relative overflow-hidden border border-[#0097b2]/20 dark:border-[#0097b2]/30">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 justify-center mb-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#eeba2b]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0097b2]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4 sm:mb-6">
                    Exclusive Major Sponsor Benefits
                  </h4>
                  <p className="text-base sm:text-lg md:text-xl text-[#2F3332]/80 dark:text-[#E6E7E7]/80 max-w-3xl mx-auto leading-relaxed">
                    Major sponsors may receive <span className="text-[#eeba2b] dark:text-[#F5C94D] font-semibold">naming rights</span> to clinic days, pharmacy spaces, or leadership training events, creating lasting legacy partnerships that honor your commitment to healthcare equity.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] text-[#FCFAEF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 -left-32 h-72 w-72 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#F5C94D]/10 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="flex items-center gap-2 justify-center mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F5C94D]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F5C94D]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#C1C3C3]" />
              </div>
              <h2 className="text-[#F5C94D] font-bold text-base sm:text-lg mb-2">
                LET&apos;S BUILD A HEALTHIER FUTURE—TOGETHER
              </h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-[#FCFAEF]">
                Your Company&apos;s Generosity Can Change Lives
              </h3>
              <p className="text-base sm:text-lg md:text-xl text-[#FCFAEF]/85 max-w-4xl mx-auto leading-relaxed">
                Your company&apos;s generosity can change lives, uplift communities, and inspire a new standard of sustainable care in Ghana. Join us in rewriting what is possible.
              </p>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md dark:bg-[#2F3332]/80 rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 relative overflow-hidden border border-white/20">
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#FCFAEF] mb-4 sm:mb-6">
                    Ready to Partner with Akomapa?
                  </h3>
                  
                  <p className="text-base sm:text-lg text-[#FCFAEF]/85 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
                    Let&apos;s start a conversation about how your organization can create lasting impact through strategic partnership.
                  </p>

                  {/* Contact Information */}
                  <div className="bg-white/10 dark:bg-[#1C1F1E]/60 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 border border-white/20">
                    <h4 className="text-lg sm:text-xl font-semibold text-[#FCFAEF] mb-4 sm:mb-6">
                      Get in Touch
                    </h4>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <p className="text-base sm:text-lg text-[#FCFAEF]/85 leading-relaxed">
                        To discuss corporate sponsorship opportunities:
                      </p>
                      <a 
                        href="mailto:akomapahealth@gmail.com" 
                        className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-[#FCFAEF] text-[#0097b2] rounded-xl hover:bg-[#F5C94D] hover:text-[#1C1F1E] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-base sm:text-lg"
                      >
                        akomapahealth@gmail.com
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                      </a>
                    </div>
                  </div>

                  {/* Partnership Benefits Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
                    {[
                      { title: "Quick Response", description: "We'll respond within 24 hours" },
                      { title: "Custom Solutions", description: "Tailored partnership packages" },
                      { title: "Secure Processing", description: "All donations via Stripe" }
                    ].map((benefit, index) => (
                      <div key={index} className="text-center p-4 sm:p-6 bg-white/5 rounded-xl border border-white/10">
                        <h5 className="font-semibold text-base sm:text-lg text-[#FCFAEF] mb-2">{benefit.title}</h5>
                        <p className="text-sm sm:text-base text-[#FCFAEF]/70">{benefit.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Partner with Us CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-8 sm:mt-12"
            >
              <p className="text-base sm:text-lg text-[#FCFAEF]/85 mb-6 sm:mb-8 font-medium">
                Partner with Akomapa today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:akomapahealth@gmail.com">
                  <Button 
                    size="lg" 
                    className="group bg-[#FCFAEF] text-[#0097b2] hover:bg-[#F5C94D] hover:text-[#1C1F1E] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Become a Sponsor
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="/partner">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-2 border-white/40 text-[#FCFAEF] hover:bg-white/10 hover:border-white/60 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300"
                  >
                    Individual Donations
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
} 