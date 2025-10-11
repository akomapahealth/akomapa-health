"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Heart, Users, Globe, Building, Mail, DollarSign, CheckCircle, Star, Gift, Shield, Target, CreditCard, Smartphone } from "lucide-react";
import { SiPaypal } from "react-icons/si";
import { SiVenmo } from "react-icons/si";
import { SiCashapp } from "react-icons/si";
import Image from "@/components/common/Image";
import Breadcrumb from "@/components/layout/Breadcrumb";

// Donation method options
const donationMethods = [
  {
    id: "paypal",
    name: "PayPal",
    icon: SiPaypal,
    description: "Send money securely through PayPal",
    color: "#0070BA"
  },
  {
    id: "venmo",
    name: "Venmo",
    icon: SiVenmo,
    description: "Send money through Venmo",
    color: "#008CFF"
  },
  {
    id: "cashapp",
    name: "Cash App",
    icon: SiCashapp,
    description: "Send money through Cash App",
    color: "#00D632"
  },
  {
    id: "mobile",
    name: "Mobile Money",
    icon: Smartphone,
    description: "Pay using any mobile money service in Ghana",
    color: "#007A73"
  },
  {
    id: "bank",
    name: "Bank Transfer",
    icon: CreditCard,
    description: "Direct bank transfer to our account",
    color: "#C37B1E"
  }
];

// Partner benefits
const partnerBenefits = [
  {
    icon: Heart,
    title: "Quarterly 'Heartbeat' Updates",
    description: "Clinic impact and stories from the field"
  },
  {
    icon: Star,
    title: "Early Event Invitations",
    description: "Akomapa events and webinars"
  },
  {
    icon: Gift,
    title: "Behind-the-Scenes Access",
    description: "Research, photos, and clinic milestones"
  },
  {
    icon: Shield,
    title: "Part of Something Bold",
    description: "Deep sense of knowing you're part of something lasting"
  }
];

// Impact areas
const impactAreas = [
  {
    icon: Target,
    title: "Reach patients with high blood pressure and diabetes before it's too late",
    color: "#007A73"
  },
  {
    icon: Users,
    title: "Train the next generation of ethical, community-minded health professionals",
    color: "#C37B1E"
  },
  {
    icon: Building,
    title: "Power our upcoming pharmacy and food security programs",
    color: "#007A73"
  },
  {
    icon: Globe,
    title: "Build a replicable model of healthcare in Ghana and beyond",
    color: "#C37B1E"
  }
];

export default function DonatePage() {
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"partner" | "one-time">("partner");

  const toggleMethod = (methodId: string) => {
    setExpandedMethod(expandedMethod === methodId ? null : methodId);
  };

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
            alt="group of people"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-[#007A73] dark:text-[#FCFAEF] mb-6"
            >
              Support Our Mission
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-8"
            >
              Every cedi, every dollar, every act of generosity saves a life.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 text-left"
            >
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-4">
                At Akomapa, we believe that healing is a shared calling—and transformation begins with bold hearts who dare to act.
              </p>
              <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                We are building something rare: a student-powered, community-rooted, and ethically led model of care for people who&apos;ve long been left behind. We are not waiting for change—we are becoming it. One patient. One clinic day. One act of compassion at a time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Options - Enhanced Layout */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Tab Navigation with Visual Hierarchy */}
            <div className="mb-16">
              {/* Featured Partner Program - More Prominent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative mb-8"
              >
                <button
                  onClick={() => setActiveSection("partner")}
                  className={`w-full p-6 md:p-8 rounded-2xl text-center transition-all duration-500 relative overflow-hidden ${
                    activeSection === "partner"
                      ? "bg-gradient-to-br from-[#C37B1E] via-[#D4851F] to-[#C37B1E] text-[#FCFAEF] shadow-2xl transform scale-105"
                      : "bg-white dark:bg-[#2F3332] text-[#2F3332] dark:text-[#E6E7E7] hover:bg-[#C37B1E]/10 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full opacity-50"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <div className={`p-3 rounded-full ${activeSection === "partner" ? "bg-white/20" : "bg-[#C37B1E]/10"}`}>
                        <Heart className={`h-8 w-8 ${activeSection === "partner" ? "text-white" : "text-[#C37B1E]"}`} />
                      </div>
                      <span className="text-2xl md:text-3xl font-bold">The Akomapa Partners Program</span>
                    </div>
                    <p className="text-lg md:text-xl opacity-90 mb-2">💛 Our Featured Partnership Opportunity</p>
                    <p className="text-base md:text-lg opacity-80">Join a community of monthly donors changing lives in Ghana</p>
                    
                    {activeSection === "partner" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 inline-block px-6 py-2 bg-white/20 rounded-full text-sm font-medium"
                      >
                        ✨ Currently Active
                      </motion.div>
                    )}
                  </div>
                </button>
              </motion.div>

              {/* Secondary Option - More Subtle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setActiveSection("one-time")}
                  className={`w-full p-4 md:p-6 rounded-xl text-center transition-all duration-300 ${
                    activeSection === "one-time"
                      ? "bg-[#007A73] text-[#FCFAEF] shadow-lg"
                      : "bg-white/60 dark:bg-[#2F3332]/60 text-[#2F3332] dark:text-[#E6E7E7] hover:bg-[#007A73]/10 border border-[#E6E7E7] dark:border-[#4F5554]"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Gift className="h-6 w-6" />
                    <span className="text-lg font-semibold">Alternative: Make a One-Time or Monthly Gift</span>
                  </div>
                  <p className="text-sm mt-1 opacity-80">Flexible giving options for your convenience</p>
                </button>
              </motion.div>

              {/* Corporate Sponsorship Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mt-6"
              >
                <a href="/corporate-sponsorship">
                  <button className="w-full p-4 rounded-xl text-center transition-all duration-300 bg-gradient-to-r from-[#007A73]/10 to-[#C37B1E]/10 dark:from-[#007A73]/20 dark:to-[#C37B1E]/20 text-[#1C1F1E] dark:text-[#FCFAEF] hover:from-[#007A73]/20 hover:to-[#C37B1E]/20 border border-[#007A73]/30 dark:border-[#007A73]/50">
                    <div className="flex items-center justify-center space-x-3">
                      <Building className="h-6 w-6 text-[#007A73]" />
                      <span className="text-lg font-semibold">Corporate Sponsorship Opportunities</span>
                      <span className="text-sm bg-[#C37B1E] text-white px-2 py-1 rounded-full">NEW</span>
                    </div>
                    <p className="text-sm mt-1 opacity-80">Comprehensive partnership opportunities for businesses and organizations</p>
                  </button>
                </a>
              </motion.div>
            </div>

            {/* Partner Program Section */}
            {activeSection === "partner" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* Partner Program Description with Slideshow */}
                <div className="bg-white dark:bg-[#2F3332] rounded-2xl p-6 md:p-8 shadow-lg border-2 border-[#C37B1E]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-8">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                        The Akomapa Partners Program
                      </h2>
                      <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] mb-6 leading-relaxed">
                        But we cannot do it alone. The Akomapa Partners Program is a growing community of monthly donors who believe in our mission and walk with us—month by month, life by life. Whether you give $20, $50, $100, or more, your partnership sustains free care, medication, NHIS enrollment, and student training in some of Ghana&apos;s most underserved communities.
                      </p>
                      
                      {/* Key Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-[#C37B1E]/10 dark:bg-[#C37B1E]/20 rounded-lg p-4 text-center">
                          <div className="text-2xl md:text-3xl font-bold text-[#C37B1E] dark:text-[#F3C677]">50+</div>
                          <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Patients Served Monthly</div>
                        </div>
                        <div className="bg-[#007A73]/10 dark:bg-[#007A73]/20 rounded-lg p-4 text-center">
                          <div className="text-2xl md:text-3xl font-bold text-[#007A73] dark:text-[#63B0AC]">$20</div>
                          <div className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">Monthly Impact Starts</div>
                        </div>
                      </div>
                    </div>

                    {/* Image Slideshow */}
                    <div className="order-1 lg:order-2">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#C37B1E]/40 via-transparent to-transparent z-10"></div>
                        
                        {/* Slideshow Container */}
                        <div className="relative w-full h-full">
                          {/* Image 1 */}
                          <motion.div
                            key="slide1"
                            initial={{ opacity: 1 }}
                            animate={{ 
                              opacity: [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                              scale: [1, 1.05, 1.05, 1, 1, 1, 1, 1, 1, 1]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/gallery/gallery-pic-4.JPG"
                              alt="Healthcare professionals providing compassionate care"
                              fill
                              className="object-cover"
                            />
                          </motion.div>

                          {/* Image 2 */}
                          <motion.div
                            key="slide2"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                              scale: [1, 1, 1, 1.05, 1.05, 1, 1, 1, 1, 1]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/highlights/Akomapa-66.jpg"
                              alt="Students leading clinical care in community settings"
                              fill
                              className="object-cover"
                            />
                          </motion.div>

                          {/* Image 3 */}
                          <motion.div
                            key="slide3"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
                              scale: [1, 1, 1, 1, 1, 1.05, 1.05, 1, 1, 1]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/gallery/gallery-pic-24.JPG"
                              alt="Global health leadership training in action"
                              fill
                              className="object-cover"
                            />
                          </motion.div>

                          {/* Image 4 */}
                          <motion.div
                            key="slide4"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                              scale: [1, 1, 1, 1, 1, 1, 1, 1.05, 1.05, 1]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/highlights/Akomapa-30.jpg"
                              alt="Community partnership and collaboration"
                              fill
                              className="object-cover"
                            />
                          </motion.div>

                          {/* Image 5 */}
                          <motion.div
                            key="slide5"
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                              scale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1.05]
                            }}
                            transition={{ 
                              duration: 20,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="absolute inset-0"
                          >
                            <Image
                              src="/highlights/Akomapa-23.jpg"
                              alt="Expert supervision ensuring quality care"
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        </div>

                        {/* Slideshow Indicators */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <motion.div
                              key={dot}
                              className="w-2 h-2 rounded-full bg-white/60"
                              animate={{
                                backgroundColor: [
                                  "rgba(255,255,255,0.6)",
                                  "rgba(255,255,255,0.6)",
                                  dot === 1 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  dot === 2 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  dot === 3 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  dot === 4 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  dot === 5 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                                  "rgba(255,255,255,0.6)"
                                ]
                              }}
                              transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>

                        {/* Partner Program Badge */}
                        <div className="absolute top-4 right-4 bg-[#C37B1E] text-white px-3 py-1 rounded-full text-sm font-medium z-20">
                          Partners Program
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Impact Areas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {impactAreas.map((impact, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 rounded-lg bg-[#FCFAEF]/50 dark:bg-[#1C1F1E]/50"
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${impact.color}20` }}
                        >
                          <impact.icon className="h-6 w-6" style={{ color: impact.color }} />
                        </div>
                        <p className="text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                          {impact.title}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Partner Benefits */}
                  <div className="bg-[#FCFAEF] dark:bg-[#1C1F1E] rounded-xl p-6">
                    <h3 className="text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4 text-center">
                      🤝 As a Partner, you&apos;ll receive:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {partnerBenefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-8 h-8 bg-[#C37B1E]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <benefit.icon className="h-4 w-4 text-[#C37B1E]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-1">
                              {benefit.title}
                            </h4>
                            <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                              {benefit.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Donation Methods for Partners */}
                <div className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6 text-center">
                    Choose Your Donation Method
                  </h3>
                  
                  <div className="space-y-4">
                    {donationMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="border border-[#E6E7E7] dark:border-[#4F5554] rounded-xl overflow-hidden"
                      >
                        {/* Method Header */}
                        <button
                          onClick={() => toggleMethod(method.id)}
                          className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-[#FCFAEF]/50 dark:hover:bg-[#1C1F1E]/50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${method.color}20` }}
                            >
                              <method.icon 
                                className="h-6 w-6" 
                                style={{ color: method.color }}
                              />
                            </div>
                            <div className="text-left">
                              <h4 className="text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                                {method.name}
                              </h4>
                              <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                                {method.description}
                              </p>
                            </div>
                          </div>
                          {expandedMethod === method.id ? (
                            <ChevronUp className="h-5 w-5 text-[#2F3332] dark:text-[#E6E7E7]" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-[#2F3332] dark:text-[#E6E7E7]" />
                          )}
                        </button>

                        {/* Collapsible Content */}
                        {expandedMethod === method.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-[#E6E7E7] dark:border-[#4F5554] bg-[#FCFAEF]/30 dark:bg-[#1C1F1E]/30"
                          >
                            <div className="p-4 md:p-6">
                              {method.id === "paypal" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">PayPal Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Email:</strong> akomapahealth@gmail.com</p>
                                      <p><strong>Account Name:</strong> Akomapa Health Foundation</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        Send your monthly partnership to our PayPal account. Please include your name and &quot;Partner&quot; in the payment note.
                                      </p>
                                    </div>
                                  </div>
                                  <Button 
                                    className="w-full bg-[#0070BA] hover:bg-[#005EA6] text-white"
                                    onClick={() => window.open('https://paypal.me/akomapahealth', '_blank')}
                                  >
                                    <SiPaypal className="h-5 w-5 mr-2" />
                                    Donate via PayPal
                                  </Button>
                                </div>
                              )}

                              {method.id === "venmo" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Venmo Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Username:</strong> @akomapahealth</p>
                                      <p><strong>Account Name:</strong> Akomapa Health Foundation</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        Send your monthly partnership through Venmo. Please include your name and &quot;Partner&quot; in the payment note.
                                      </p>
                                    </div>
                                  </div>
                                  <Button 
                                    className="w-full bg-[#008CFF] hover:bg-[#0070CC] text-white"
                                    onClick={() => window.open('https://venmo.com/akomapahealth', '_blank')}
                                  >
                                    <SiVenmo className="h-5 w-5 mr-2" />
                                    Donate via Venmo
                                  </Button>
                                </div>
                              )}

                              {method.id === "cashapp" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Cash App Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Cashtag:</strong> $akomapahealth</p>
                                      <p><strong>Account Name:</strong> Akomapa Health Foundation</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        Send your monthly partnership through Cash App. Please include your name and &quot;Partner&quot; in the payment note.
                                      </p>
                                    </div>
                                  </div>
                                  <Button 
                                    className="w-full bg-[#00D632] hover:bg-[#00B329] text-white"
                                    onClick={() => window.open('https://cash.app/$akomapahealth', '_blank')}
                                  >
                                    <SiCashapp className="h-5 w-5 mr-2" />
                                    Donate via Cash App
                                  </Button>
                                </div>
                              )}

                              {method.id === "mobile" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Mobile Money Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Name:</strong> Akomapa Health Foundation</p>
                                      <p><strong>Phone Number:</strong> +233 54 111 1111</p>
                                      <p><strong>Network:</strong> All networks accepted (MTN, Vodafone, AirtelTigo)</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        Send your monthly partnership via any mobile money service. Please include your name and &quot;Partner&quot; as the reference.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="bg-[#007A73]/10 dark:bg-[#007A73]/20 rounded-lg p-4">
                                    <h6 className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">After sending payment:</h6>
                                    <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                                      Please email us at{" "}
                                      <a href="mailto:akomapahealth@gmail.com" className="text-[#007A73] hover:text-[#C37B1E]">
                                        akomapahealth@gmail.com
                                      </a>{" "}
                                      with your payment confirmation and name for our records.
                                    </p>
                                  </div>
                                </div>
                              )}

                              {method.id === "bank" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Bank Transfer Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Bank Name:</strong> Ghana Commercial Bank</p>
                                      <p><strong>Account Name:</strong> Akomapa Health Foundation</p>
                                      <p><strong>Account Number:</strong> 1234567890</p>
                                      <p><strong>Branch:</strong> Cape Coast Main Branch</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        For international transfers, please contact us for SWIFT code and additional details.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="bg-[#C37B1E]/10 dark:bg-[#C37B1E]/20 rounded-lg p-4">
                                    <h6 className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">After sending payment:</h6>
                                    <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                                      Please email us at{" "}
                                      <a href="mailto:akomapahealth@gmail.com" className="text-[#C37B1E] hover:text-[#007A73]">
                                        akomapahealth@gmail.com
                                      </a>{" "}
                                      with your transfer confirmation and name for our records.
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* One-Time Gift Section */}
            {activeSection === "one-time" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-12"
              >
                {/* One-Time Gift Description */}
                <div className="bg-white dark:bg-[#2F3332] rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-4">
                      Make a One-Time or Monthly Gift
                    </h2>
                    <p className="text-base md:text-lg text-[#2F3332] dark:text-[#E6E7E7] max-w-3xl mx-auto leading-relaxed">
                      Want to give at your own pace? Use our secure donation methods to give any amount, once or monthly. Every contribution, large or small, fuels medications, labs, and care at our clinic sites.
                    </p>
                  </div>

                  {/* Benefits List - Enhanced Responsive Design */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <div className="text-center p-4 bg-[#007A73]/5 dark:bg-[#007A73]/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-[#007A73] dark:text-[#63B0AC] mx-auto mb-3" />
                      <h4 className="text-sm md:text-base font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Choose any amount</h4>
                    </div>
                    <div className="text-center p-4 bg-[#007A73]/5 dark:bg-[#007A73]/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-[#007A73] dark:text-[#63B0AC] mx-auto mb-3" />
                      <h4 className="text-sm md:text-base font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Set your own frequency</h4>
                    </div>
                    <div className="text-center p-4 bg-[#007A73]/5 dark:bg-[#007A73]/10 rounded-lg">
                      <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-[#007A73] dark:text-[#63B0AC] mx-auto mb-3" />
                      <h4 className="text-sm md:text-base font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">100% supports care</h4>
                    </div>
                  </div>
                </div>

                {/* Donation Methods for One-Time Gifts */}
                <div className="bg-white dark:bg-[#2F3332] rounded-2xl shadow-xl p-4 md:p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6 text-center">
                    Choose Your Donation Method
                  </h3>
                  
                  <div className="space-y-4">
                    {donationMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="border border-[#E6E7E7] dark:border-[#4F5554] rounded-xl overflow-hidden"
                      >
                        {/* Method Header */}
                        <button
                          onClick={() => toggleMethod(method.id)}
                          className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-[#FCFAEF]/50 dark:hover:bg-[#1C1F1E]/50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: `${method.color}20` }}
                            >
                              <method.icon 
                                className="h-6 w-6" 
                                style={{ color: method.color }}
                              />
                            </div>
                            <div className="text-left">
                              <h4 className="text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                                {method.name}
                              </h4>
                              <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                                {method.description}
                              </p>
                            </div>
                          </div>
                          {expandedMethod === method.id ? (
                            <ChevronUp className="h-5 w-5 text-[#2F3332] dark:text-[#E6E7E7]" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-[#2F3332] dark:text-[#E6E7E7]" />
                          )}
                        </button>

                        {/* Collapsible Content */}
                        {expandedMethod === method.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-[#E6E7E7] dark:border-[#4F5554] bg-[#FCFAEF]/30 dark:bg-[#1C1F1E]/30"
                          >
                            <div className="p-4 md:p-6">
                              {method.id === "paypal" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">PayPal Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Email:</strong> akomapahealth@gmail.com</p>
                                      <p><strong>Account Name:</strong> Akomapa Health Foundation</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        Send your donation to our PayPal account. Please include your name in the payment note.
                                      </p>
                                    </div>
                                  </div>
                                  <Button 
                                    className="w-full bg-[#0070BA] hover:bg-[#005EA6] text-white"
                                    onClick={() => window.open('https://paypal.me/akomapahealth', '_blank')}
                                  >
                                    <SiPaypal className="h-5 w-5 mr-2" />
                                    Donate via PayPal
                                  </Button>
                                </div>
                              )}

                              {method.id === "venmo" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Venmo Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Username:</strong> @akomapahealth</p>
                                      <p><strong>Account Name:</strong> Akomapa Health Foundation</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        Send your donation through Venmo. Please include your name in the payment note.
                                      </p>
                                    </div>
                                  </div>
                                  <Button 
                                    className="w-full bg-[#008CFF] hover:bg-[#0070CC] text-white"
                                    onClick={() => window.open('https://venmo.com/akomapahealth', '_blank')}
                                  >
                                    <SiVenmo className="h-5 w-5 mr-2" />
                                    Donate via Venmo
                                  </Button>
                                </div>
                              )}

                              {method.id === "cashapp" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Cash App Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Cashtag:</strong> $akomapahealth</p>
                                      <p><strong>Account Name:</strong> Akomapa Health Foundation</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        Send your donation through Cash App. Please include your name in the payment note.
                                      </p>
                                    </div>
                                  </div>
                                  <Button 
                                    className="w-full bg-[#00D632] hover:bg-[#00B329] text-white"
                                    onClick={() => window.open('https://cash.app/$akomapahealth', '_blank')}
                                  >
                                    <SiCashapp className="h-5 w-5 mr-2" />
                                    Donate via Cash App
                                  </Button>
                                </div>
                              )}

                              {method.id === "mobile" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Mobile Money Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Name:</strong> Akomapa Health Foundation</p>
                                      <p><strong>Phone Number:</strong> +233 54 111 1111</p>
                                      <p><strong>Network:</strong> All networks accepted (MTN, Vodafone, AirtelTigo)</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        Send your donation via any mobile money service. Please include your name as the reference.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="bg-[#007A73]/10 dark:bg-[#007A73]/20 rounded-lg p-4">
                                    <h6 className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">After sending payment:</h6>
                                    <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                                      Please email us at{" "}
                                      <a href="mailto:akomapahealth@gmail.com" className="text-[#007A73] hover:text-[#C37B1E]">
                                        akomapahealth@gmail.com
                                      </a>{" "}
                                      with your payment confirmation and name for our records.
                                    </p>
                                  </div>
                                </div>
                              )}

                              {method.id === "bank" && (
                                <div className="space-y-4">
                                  <div className="bg-white dark:bg-[#2F3332] rounded-lg p-4 border border-[#E6E7E7] dark:border-[#4F5554]">
                                    <h5 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">Bank Transfer Details:</h5>
                                    <div className="space-y-2 text-sm">
                                      <p><strong>Bank Name:</strong> Ghana Commercial Bank</p>
                                      <p><strong>Account Name:</strong> Akomapa Health Foundation</p>
                                      <p><strong>Account Number:</strong> 1234567890</p>
                                      <p><strong>Branch:</strong> Cape Coast Main Branch</p>
                                      <p className="text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                                        For international transfers, please contact us for SWIFT code and additional details.
                                      </p>
                                    </div>
                                  </div>
                                  <div className="bg-[#C37B1E]/10 dark:bg-[#C37B1E]/20 rounded-lg p-4">
                                    <h6 className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF] mb-2">After sending payment:</h6>
                                    <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                                      Please email us at{" "}
                                      <a href="mailto:akomapahealth@gmail.com" className="text-[#C37B1E] hover:text-[#007A73]">
                                        akomapahealth@gmail.com
                                      </a>{" "}
                                      with your transfer confirmation and name for our records.
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Corporate Sponsorship */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
                CORPORATE PARTNERSHIPS
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Corporate Sponsorship
              </h3>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
                We also welcome corporate partnerships with mission-aligned businesses and organizations seeking to invest in health equity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg"
            >
              <h4 className="text-xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Akomapa gratefully accepts:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-1" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Financial contributions</span>
                  </div>
                  <div className="flex items-start">
                    <Building className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-1" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Donations of medications and medical supplies</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-1" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Equipment or service support for our clinics</span>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-1" />
                    <span className="text-[#2F3332] dark:text-[#E6E7E7]">Collaboration on health education or outreach campaigns</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-[#FCFAEF] dark:bg-[#1C1F1E] rounded-lg">
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-4">
                  Your company&apos;s support can transform lives, and we&apos;re happy to work with you to recognize your contribution, including co-branding opportunities, features in our updates, and involvement in community events. Let&apos;s create impact together.
                </p>
                <div className="text-center">
                  <a href="/corporate-sponsorship">
                    <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF]">
                      <Mail className="h-4 w-4 mr-2" />
                      Check out our Corporate Sponsorship
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
