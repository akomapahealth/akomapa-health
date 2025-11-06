"use client";

import Link from "next/link";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "@/components/common/Image";
import { teamMembers } from "@/data/team";
import { motion } from "framer-motion";

export default function TeamPage() {
  // Organize team members into groups
  const globalExecutiveTeam = teamMembers.slice(0, 9); // IDs 1-9
  const usaTeam = teamMembers.slice(9, 15); // IDs 10-15
  const uccChapterTeam = teamMembers.slice(15, 27); // IDs 16-27
  const advisoryBoard = teamMembers.slice(27); // IDs 28-33
  
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="highlights/Akomapa-69.jpg"
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
              className="text-4xl md:text-5xl font-bold text-[#0097b2] dark:text-[#FCFAEF] mb-6"
            >
              Our Team
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332]/80 dark:text-[#E6E7E7]/80 mb-8"
            >
              Meet the dedicated professionals working to improve healthcare access and outcomes across Africa.
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
      
      <section className="py-16 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          {/* Global Executive Team */}
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#2F3332] dark:text-[#FCFAEF]">
            Akomapa Health Global Executive Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {globalExecutiveTeam.map((member) => (
              <div key={member.id} className="bg-white dark:bg-[#2F3332] rounded-xl overflow-hidden shadow-sm border border-[#C1C3C3] dark:border-[#4F5554] hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1 text-[#2F3332] dark:text-[#FCFAEF] line-clamp-2">{member.name}</h3>
                  <p className="text-[#0097b2] dark:text-[#66C4DC] text-sm font-medium mb-3 line-clamp-2">{member.title}</p>
                  <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.socialLinks?.linkedin && (
                      <Link 
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`LinkedIn profile of ${member.name}`}
                      >
                        <Linkedin size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.twitter && (
                      <Link 
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`Twitter profile of ${member.name}`}
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.email && (
                      <Link 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* USA Team */}
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center mt-16 text-[#2F3332] dark:text-[#FCFAEF]">
            Akomapa Health Foundation USA Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {usaTeam.map((member) => (
              <div key={member.id} className="bg-white dark:bg-[#2F3332] rounded-xl overflow-hidden shadow-sm border border-[#C1C3C3] dark:border-[#4F5554] hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1 text-[#2F3332] dark:text-[#FCFAEF] line-clamp-2">{member.name}</h3>
                  <p className="text-[#0097b2] dark:text-[#66C4DC] text-sm font-medium mb-3 line-clamp-2">{member.title}</p>
                  <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.socialLinks?.linkedin && (
                      <Link 
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`LinkedIn profile of ${member.name}`}
                      >
                        <Linkedin size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.twitter && (
                      <Link 
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`Twitter profile of ${member.name}`}
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.email && (
                      <Link 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* UCC Chapter Leadership Team */}
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center mt-16 text-[#2F3332] dark:text-[#FCFAEF]">
            Akomapa UCC Chapter Leadership Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {uccChapterTeam.map((member) => (
              <div key={member.id} className="bg-white dark:bg-[#2F3332] rounded-xl overflow-hidden shadow-sm border border-[#C1C3C3] dark:border-[#4F5554] hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1 text-[#2F3332] dark:text-[#FCFAEF] line-clamp-2">{member.name}</h3>
                  <p className="text-[#0097b2] dark:text-[#66C4DC] text-sm font-medium mb-3 line-clamp-2">{member.title}</p>
                  <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.socialLinks?.linkedin && (
                      <Link 
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`LinkedIn profile of ${member.name}`}
                      >
                        <Linkedin size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.twitter && (
                      <Link 
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`Twitter profile of ${member.name}`}
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.email && (
                      <Link 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Advisory Board Members */}
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center mt-16 text-[#2F3332] dark:text-[#FCFAEF]">
            Advisory Board Members
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {advisoryBoard.map((member) => (
              <div key={member.id} className="bg-white dark:bg-[#2F3332] rounded-xl overflow-hidden shadow-sm border border-[#C1C3C3] dark:border-[#4F5554] hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    style={{ objectPosition: "center 30%" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-1 text-[#2F3332] dark:text-[#FCFAEF] line-clamp-2">{member.name}</h3>
                  <p className="text-[#0097b2] dark:text-[#66C4DC] text-sm font-medium mb-3 line-clamp-2">{member.title}</p>
                  <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.socialLinks?.linkedin && (
                      <Link 
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`LinkedIn profile of ${member.name}`}
                      >
                        <Linkedin size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.twitter && (
                      <Link 
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`Twitter profile of ${member.name}`}
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.email && (
                      <Link 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#eeba2b] dark:hover:text-[#F5C94D] transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail size={18} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#2F3332] dark:text-[#FCFAEF]">Join Our Team</h2>
          <p className="text-lg text-[#2F3332]/80 dark:text-[#FCFAEF]/80 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented professionals who are passionate about improving healthcare access and outcomes in underserved communities.
          </p>
          <Link 
            href="/contact" 
            className="bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF] px-6 py-3 rounded-md font-medium inline-block transition-colors"
          >
            Join Us!
          </Link>
        </div>
      </section>
    </>
  );
}