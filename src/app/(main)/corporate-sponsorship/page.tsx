"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  Heart, 
  Globe, 
  Star, 
  Shield, 
  Users, 
  Mail, 
  CheckCircle, 
  Gift,
  DollarSign,
  Leaf,
  Pill,
  ShoppingBag,
  Award,
  ArrowRight
} from "lucide-react";
import Image from "@/components/common/Image";
import Breadcrumb from "@/components/layout/Breadcrumb";

// Sponsorship options
const sponsorshipOptions = [
  {
    id: "clinic",
    title: "Sponsor a Clinic",
    description: "Fund an entire day, semester or year of care at one of our community sites in Abeadze Dominase or Abura. Your gift provides screenings, medication counseling, transportation, and essential follow-up services.",
    icon: Building,
    color: "#0097b2",
    recognition: [
      "Logo featured on that day's clinic banners and photo recap",
      "Social media spotlight and public thank-you",
      "Optional co-branded materials and staff visit invitations"
    ]
  },
  {
    id: "supplies",
    title: "Sponsor Medical Supplies & Medications",
    description: "Help us stock our clinics with blood pressure cuffs, glucometers, test strips, counseling materials, and essential drugs. Your in-kind or financial gift keeps our shelves stocked and our patients safe.",
    icon: Pill,
    color: "#eeba2b",
    recognition: [
      "Your name featured on packaging and supply reports",
      "Akomapa impact report tailored to your donation"
    ]
  },
  {
    id: "cash",
    title: "Make a Cash Contribution",
    description: "Support where the need is greatest. Flexible funds help us cover staff stipends, training costs, emergency referrals, and operations.",
    icon: DollarSign,
    color: "#0097b2",
    recognition: [
      "Tiered visibility based on giving level",
      "Logo placement on our website, annual report, and media decks",
      "Shoutouts during key events and quarterly reports"
    ]
  },
  {
    id: "pharmacy",
    title: "Sponsor the Akomapa Pharmacy",
    description: "Be a founding sponsor of our low-cost community pharmacy—a long-term solution for medication access and clinic sustainability. You'll be helping us build a future where care pays for itself.",
    icon: ShoppingBag,
    color: "#eeba2b",
    recognition: [
      "Prominent naming opportunity inside the pharmacy",
      "Featured placement in press releases and social campaigns",
      "\"Founding Partner\" recognition on permanent signage"
    ]
  },
  {
    id: "farms",
    title: "Support Akomapa Farms & Food Stores",
    description: "Partner with us to address food insecurity and fund healthcare through an innovative model that grows and sells affordable produce. Help us launch a community farm, supply tools, or underwrite the first food store.",
    icon: Leaf,
    color: "#0097b2",
    recognition: [
      "Naming opportunity for food stand or market display",
      "Recognition in nutrition outreach and wellness campaigns"
    ]
  }
];

// Recognition benefits
const recognitionBenefits = [
  {
    icon: Globe,
    title: "Logo inclusion on our website's sponsor wall",
    color: "#0097b2"
  },
  {
    icon: Star,
    title: "Feature in our quarterly 'Heartbeat' Impact Report",
    color: "#eeba2b"
  },
  {
    icon: Users,
    title: "Invites to site visits and virtual updates",
    color: "#0097b2"
  },
  {
    icon: Gift,
    title: "Customized content and visuals to showcase your support",
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
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/highlights/Akomapa-73.jpg"
            alt="corporate partnership"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-[#0097b2] dark:text-[#FCFAEF] mb-6"
            >
              Corporate Sponsorship
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-8"
            >
              Partner with Purpose. Build Health. Leave a Legacy.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 text-left"
            >
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-4">
                At Akomapa, we believe in bold partnerships that change lives.
              </p>
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-4">
                Our mission—to deliver compassionate, community-rooted care to underserved Ghanaians—is too urgent, too vast, and too vital to do alone. That&apos;s why we&apos;re inviting visionary companies, foundations, and institutions to stand with us as Corporate Sponsors.
              </p>
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                When you sponsor Akomapa, you&apos;re not just funding a clinic. You&apos;re fueling access, equity, and the future of healthcare in Africa.
              </p>
            </motion.div>
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
              className="text-center mb-20"
            >
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#eeba2b]/20 to-[#0097b2]/20 rounded-full mb-6">
                <span className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-lg">
                  🌟 WAYS TO SPONSOR AKOMAPA
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-8 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Transform Lives Through <br />
                <span className="bg-gradient-to-r from-[#eeba2b] to-[#0097b2] bg-clip-text text-transparent">
                  Strategic Partnership
                </span>
              </h3>
              <p className="text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] max-w-4xl mx-auto leading-relaxed">
                We welcome both financial and in-kind contributions. Here are some of the many ways your organization can make a meaningful impact:
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {sponsorshipOptions.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-white dark:bg-[#2F3332] rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20 overflow-hidden">
                    {/* Gradient Border Effect */}
                    <div 
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ 
                        background: `linear-gradient(135deg, ${option.color}15, transparent, ${option.color}15)`,
                        padding: '2px'
                      }}
                    />
                    
                    {/* Content Container */}
                    <div className="relative z-10">
                      {/* Header Section */}
                      <div className="flex items-start mb-8">
                        <div className="relative">
                          <div 
                            className="w-16 h-16 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 shadow-lg"
                            style={{ 
                              background: `linear-gradient(135deg, ${option.color}20, ${option.color}10)`,
                              border: `2px solid ${option.color}30`
                            }}
                          >
                            <option.icon className="h-8 w-8" style={{ color: option.color }} />
                          </div>
                          {/* Floating Badge */}
                          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                               style={{ backgroundColor: option.color }}>
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-3 leading-tight">
                            {option.title}
                          </h3>
                          <p className="text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed text-base md:text-lg">
                            {option.description}
                          </p>
                        </div>
                      </div>

                      {/* Recognition Section - Enhanced */}
                      <div className="bg-gradient-to-br from-[#FCFAEF] to-[#F8F6F0] dark:from-[#1C1F1E] dark:to-[#252828] rounded-2xl p-6 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                          <Star className="w-full h-full" style={{ color: option.color }} />
                        </div>
                        
                        <div className="relative z-10">
                          <div className="flex items-center mb-4">
                            <Award className="h-5 w-5 mr-2" style={{ color: option.color }} />
                            <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF] text-lg">
                              Recognition Benefits
                            </h4>
                          </div>
                          
                          <div className="space-y-3">
                            {option.recognition.map((item, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start group/item"
                              >
                                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 transition-all duration-300"
                                     style={{ backgroundColor: `${option.color}20` }}>
                                  <CheckCircle className="h-4 w-4 transition-all duration-300" 
                                              style={{ color: option.color }} />
                                </div>
                                <span className="text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed group-hover/item:text-[#1C1F1E] dark:group-hover/item:text-[#FCFAEF] transition-colors duration-300">
                                  {item}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call-to-Action Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <div className="bg-gradient-to-r from-[#0097b2] to-[#eeba2b] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white rounded-full"></div>
                  <div className="absolute top-1/2 right-1/4 w-8 h-8 border-2 border-white rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to Make an Impact?
                  </h3>
                  <p className="text-lg md:text-xl opacity-90 mb-6 max-w-2xl mx-auto">
                    Join us in creating sustainable healthcare solutions that transform communities across Ghana.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="mailto:akomapahealth@gmail.com">
                    <Button 
                      size="lg"
                      className="bg-white text-[#0097b2] hover:bg-[#FCFAEF] shadow-lg px-8 py-4 text-lg font-semibold"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Start Your Partnership
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                    </a>
                    
                    {/* <Button 
                      variant="outline" 
                      size="lg"
                      className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0097b2] px-8 py-4 text-lg font-semibold"
                    >
                      <Globe className="h-5 w-5 mr-2" />
                      Learn More
                    </Button> */}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recognition Benefits - Enhanced */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FCFAEF]/50 to-[#F8F6F0] dark:from-[#2F3332] dark:via-[#1C1F1E]/50 dark:to-[#252828]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-[#eeba2b]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-[#0097b2]/10 rounded-full blur-lg"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#eeba2b]/20 to-[#0097b2]/20 rounded-full mb-6">
                <Award className="h-5 w-5 mr-2 text-[#eeba2b]" />
                <span className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-lg">
                  YOUR RECOGNITION MATTERS
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-8 text-[#1C1F1E] dark:text-[#FCFAEF]">
                We Believe in <br />
                <span className="bg-gradient-to-r from-[#eeba2b] to-[#0097b2] bg-clip-text text-transparent">
                  Celebrating Our Partners
                </span>
              </h3>
              <p className="text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] max-w-3xl mx-auto">
                All corporate sponsors receive comprehensive recognition and partnership benefits
              </p>
            </motion.div>

            {/* Benefits Grid - Enhanced Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {recognitionBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 border border-[#E6E7E7]/20 dark:border-[#4F5554]/20">
                    <div className="flex items-start space-x-6">
                      <div className="relative">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110"
                          style={{ 
                            background: `linear-gradient(135deg, ${benefit.color}20, ${benefit.color}10)`,
                            border: `2px solid ${benefit.color}30`
                          }}
                        >
                          <benefit.icon className="h-7 w-7 transition-all duration-500" style={{ color: benefit.color }} />
                        </div>
                        {/* Pulse Effect */}
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                          style={{ 
                            background: `radial-gradient(circle, ${benefit.color}40, transparent 70%)`
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2 group-hover:text-[#0097b2] dark:group-hover:text-[#66C4DC] transition-colors duration-300">
                          {benefit.title}
                        </h4>
                        <div className="w-12 h-1 rounded-full mb-3 transition-all duration-500"
                             style={{ backgroundColor: `${benefit.color}40` }} />
                      </div>
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
              <div className="bg-gradient-to-r from-[#0097b2]/10 via-[#0097b2]/5 to-[#eeba2b]/10 dark:from-[#0097b2]/20 dark:via-[#0097b2]/10 dark:to-[#eeba2b]/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-4 left-4 w-12 h-12 border-2 border-[#0097b2] rounded-full"></div>
                    <div className="absolute top-8 right-8 w-8 h-8 border-2 border-[#eeba2b] rounded-full"></div>
                    <div className="absolute bottom-4 left-1/3 w-16 h-16 border-2 border-[#0097b2] rounded-full"></div>
                    <div className="absolute bottom-8 right-1/4 w-6 h-6 border-2 border-[#eeba2b] rounded-full"></div>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#eeba2b] to-[#0097b2] rounded-2xl mb-6">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                    Exclusive Major Sponsor Benefits
                  </h4>
                  <p className="text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] font-medium max-w-3xl mx-auto leading-relaxed">
                    Major sponsors may receive <span className="text-[#eeba2b] dark:text-[#F5C94D] font-bold">naming rights</span> to clinic days, pharmacy spaces, or leadership training events, creating lasting legacy partnerships.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action & Contact */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-[#0097b2] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#eeba2b] rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block px-6 py-2 bg-gradient-to-r from-[#eeba2b]/20 to-[#0097b2]/20 rounded-full mb-6">
                <span className="text-[#eeba2b] dark:text-[#F5C94D] font-bold text-lg">
                  🌍 LET&apos;S BUILD A HEALTHIER FUTURE—TOGETHER
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-8 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Your Company&apos;s <br />
                <span className="bg-gradient-to-r from-[#eeba2b] to-[#0097b2] bg-clip-text text-transparent">
                  Generosity Can Change Lives
                </span>
              </h3>
              <p className="text-lg md:text-xl text-[#2F3332] dark:text-[#E6E7E7] max-w-4xl mx-auto leading-relaxed">
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
              <div className="bg-white dark:bg-[#2F3332] rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <Mail className="w-full h-full text-[#0097b2]" />
                </div>
                <div className="absolute bottom-0 left-0 w-24 h-24 opacity-5">
                  <Globe className="w-full h-full text-[#eeba2b]" />
                </div>

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#0097b2] to-[#eeba2b] rounded-2xl mb-8">
                    <Mail className="h-10 w-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                    Ready to Partner with Akomapa?
                  </h3>
                  
                  <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] mb-8 max-w-2xl mx-auto">
                    Let&apos;s start a conversation about how your organization can create lasting impact through strategic partnership.
                  </p>

                  {/* Contact Information */}
                  <div className="bg-gradient-to-r from-[#FCFAEF] to-[#F8F6F0] dark:from-[#1C1F1E] dark:to-[#252828] rounded-2xl p-6 md:p-8 mb-8">
                    <h4 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6">
                      📧 Get in Touch
                    </h4>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                      <div className="text-center">
                        <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-2">
                          To discuss corporate sponsorship opportunities:
                        </p>
                        <a 
                          href="mailto:akomapahealth@gmail.com" 
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#0097b2] to-[#eeba2b] text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold"
                        >
                          <Mail className="h-5 w-5 mr-2" />
                          akomapahealth@gmail.com
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Partnership Benefits Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-[#0097b2]/10 dark:bg-[#0097b2]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-6 w-6 text-[#0097b2] dark:text-[#66C4DC]" />
                      </div>
                      <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Quick Response</h5>
                      <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">We&apos;ll respond within 24 hours</p>
                    </div>
                    
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-[#eeba2b]/10 dark:bg-[#eeba2b]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-[#eeba2b] dark:text-[#F5C94D]" />
                      </div>
                      <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Custom Solutions</h5>
                      <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Tailored partnership packages</p>
                    </div>
                    
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-[#0097b2]/10 dark:bg-[#0097b2]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Shield className="h-6 w-6 text-[#0097b2] dark:text-[#66C4DC]" />
                      </div>
                      <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Secure Processing</h5>
                      <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">All donations via Stripe</p>
                    </div>
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
              className="text-center mt-12"
            >
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] mb-6 font-medium">
                Partner with Akomapa today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:akomapahealth@gmail.com">
                  <Button size="lg" className="bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF] px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <Globe className="h-5 w-5 mr-2" />
                    Become a Sponsor
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </a>
                <a href="/partner">
                  <Button variant="outline" size="lg" className="border-2 border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2]/10 px-8 py-4 text-lg font-semibold">
                    <Heart className="h-5 w-5 mr-2" />
                    Individual Donations
                    <ArrowRight className="h-5 w-5 ml-2" />
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