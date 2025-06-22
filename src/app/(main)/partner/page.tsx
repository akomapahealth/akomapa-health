"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Handshake, Heart, Users, Globe, Mail, DollarSign, Calendar, Building } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/Image";

const partnershipTypes = [
  {
    id: 1,
    title: "Monetary Sponsorship",
    description: "Support our healthcare initiatives through financial contributions that directly fund our programs and operations.",
    icon: DollarSign,
    color: "bg-[#007A73]",
    features: [
      "Direct funding for community clinics",
      "Student training and development",
      "Medical equipment and supplies",
      "Program expansion and scaling",
      "Research and evaluation initiatives"
    ],
    cta: {
      text: "Make a Donation",
      link: "/donate",
      variant: "primary"
    }
  },
  {
    id: 2,
    title: "Host Outreach Programs",
    description: "Partner with us to host healthcare outreach programs in your community or facility.",
    icon: Building,
    color: "bg-[#C37B1E]",
    features: [
      "Community health screenings",
      "Health education workshops",
      "Student-led clinical services",
      "Professional development programs",
      "Local healthcare capacity building"
    ],
    cta: {
      text: "Host a Program",
      link: "/contact?type=outreach",
      variant: "secondary"
    }
  },
  {
    id: 3,
    title: "Strategic Partnerships",
    description: "Collaborate with us on long-term healthcare initiatives and capacity-building projects.",
    icon: Handshake,
    color: "bg-[#2F3332]",
    features: [
      "Joint program development",
      "Resource sharing and expertise",
      "Research collaborations",
      "Policy advocacy initiatives",
      "Sustainable healthcare models"
    ],
    cta: {
      text: "Discuss Partnership",
      link: "/contact?type=partnership",
      variant: "outline"
    }
  }
];

const benefits = [
  {
    icon: Heart,
    title: "Community Impact",
    description: "Make a direct impact on healthcare access and outcomes in underserved communities."
  },
  {
    icon: Users,
    title: "Student Development",
    description: "Support the next generation of healthcare professionals through hands-on training."
  },
  {
    icon: Globe,
    title: "Sustainable Solutions",
    description: "Contribute to long-term, sustainable healthcare solutions that benefit entire communities."
  },
  {
    icon: Calendar,
    title: "Flexible Engagement",
    description: "Choose from various partnership models that fit your organization's goals and capacity."
  }
];

const testimonials = [
  {
    name: "Dr. Sarah Mensah",
    role: "Medical Director",
    organization: "Ghana Health Service",
    content: "Our partnership with Akomapa Health has transformed healthcare delivery in our community. The student-led approach brings fresh perspectives and sustainable solutions.",
    image: "/images/team/placeholder-1.jpg"
  },
  {
    name: "Kwame Asante",
    role: "Community Leader",
    organization: "Local Development Council",
    content: "The outreach programs have made healthcare accessible to families who previously had to travel hours for basic services. It's a game-changer for our community.",
    image: "/images/team/placeholder-2.jpg"
  }
];

export default function PartnerPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/hero-image.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6"
            >
              Partner With Us
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8"
            >
              Join us in creating sustainable healthcare solutions and empowering communities through innovative partnerships.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg px-8 py-3">
                <Link href="/contact" className="flex items-center">
                  Start a Partnership <ArrowRight size={20} className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF] dark:border-[#63B0AC] dark:text-[#63B0AC] dark:hover:bg-[#63B0AC] text-lg px-8 py-3">
                <Link href="/donate" className="flex items-center">
                  Make a Donation <Heart size={20} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
              PARTNERSHIP OPPORTUNITIES
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
              Choose Your Partnership Path
            </h3>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
              We offer multiple ways to partner with us, from financial support to hands-on collaboration. 
              Find the option that best aligns with your organization's goals and capacity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`${type.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <type.icon size={32} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {type.title}
                </h3>
                
                <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">
                  {type.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#007A73] dark:text-[#63B0AC] mr-2 mt-1">•</span>
                      <span className="text-[#2F3332] dark:text-[#E6E7E7] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    type.cta.variant === 'primary' 
                      ? 'bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF]' 
                      : type.cta.variant === 'secondary'
                      ? 'bg-[#C37B1E] hover:bg-[#007A73] text-[#FCFAEF]'
                      : 'border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF] dark:border-[#63B0AC] dark:text-[#63B0AC] dark:hover:bg-[#63B0AC]'
                  }`}
                >
                  <Link href={type.cta.link} className="flex items-center justify-center">
                    {type.cta.text} <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
              WHY PARTNER WITH US
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
              Impact That Matters
            </h3>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
              Your partnership creates lasting change in healthcare access and community wellbeing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#007A73]/10 dark:bg-[#63B0AC]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon size={32} className="text-[#007A73] dark:text-[#63B0AC]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {benefit.title}
                </h3>
                <p className="text-[#2F3332] dark:text-[#E6E7E7]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[#C37B1E] dark:text-[#F3C677] font-bold text-lg mb-2">
              PARTNER TESTIMONIALS
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
              Success Stories
            </h3>
            <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">
              Hear from our partners about the impact of our collaborations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#2F3332] rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-[#007A73]/10 dark:bg-[#63B0AC]/10 rounded-full flex items-center justify-center mr-4">
                    <Users size={24} className="text-[#007A73] dark:text-[#63B0AC]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-[#007A73] dark:text-[#63B0AC]">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-[#2F3332] dark:text-[#E6E7E7]">
                      {testimonial.organization}
                    </p>
                  </div>
                </div>
                <p className="text-[#2F3332] dark:text-[#E6E7E7] italic">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7] mb-8 max-w-2xl mx-auto">
                Let's discuss how we can work together to improve healthcare access and create lasting impact in communities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] text-lg px-8 py-3">
                  <Link href="/contact" className="flex items-center">
                    <Mail size={20} className="mr-2" />
                    Contact Us
                  </Link>
                </Button>
                <Button variant="outline" className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF] dark:border-[#63B0AC] dark:text-[#63B0AC] dark:hover:bg-[#63B0AC] text-lg px-8 py-3">
                  <Link href="/donate" className="flex items-center">
                    <Heart size={20} className="mr-2" />
                    Donate Now
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
