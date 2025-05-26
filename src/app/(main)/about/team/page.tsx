import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter, Mail } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the dedicated professionals behind Akomapa Health Foundation working to improve healthcare access and outcomes across Africa.",
};

export default function TeamPage() {
  const leadership = teamMembers.slice(0, 4);
  const coreTeam = teamMembers.slice(4, 8);
  const advisoryTeam = teamMembers.slice(8);
  
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="bg-[#C37B1E]/50 dark:bg-[#1C1F1E] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Our Team"
            description="Meet the dedicated professionals working to improve healthcare access and outcomes across Africa."
          />
        </div>
      </section>
      
      <section className="py-16 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-[#2F3332] dark:text-[#FCFAEF]">Founding Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {leadership.map((member) => (
              <div key={member.id} className="bg-white dark:bg-[#2F3332] rounded-xl overflow-hidden shadow-sm border border-[#C1C3C3] dark:border-[#4F5554] hover:shadow-md transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-[#2F3332] dark:text-[#FCFAEF]">{member.name}</h3>
                  <p className="text-[#007A73] dark:text-[#63B0AC] text-sm font-medium mb-4">{member.title}</p>
                  <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.socialLinks?.linkedin && (
                      <Link 
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
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
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
                        aria-label={`Twitter profile of ${member.name}`}
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.email && (
                      <Link 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
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
          
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center mt-16 text-[#2F3332] dark:text-[#FCFAEF]">Akomapa UCC Chapter Leadership Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreTeam.map((member) => (
              <div key={member.id} className="bg-white dark:bg-[#2F3332] rounded-xl overflow-hidden shadow-sm border border-[#C1C3C3] dark:border-[#4F5554] hover:shadow-md transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-[#2F3332] dark:text-[#FCFAEF]">{member.name}</h3>
                  <p className="text-[#007A73] dark:text-[#63B0AC] text-sm font-medium mb-4">{member.title}</p>
                  <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.socialLinks?.linkedin && (
                      <Link 
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
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
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
                        aria-label={`Twitter profile of ${member.name}`}
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.email && (
                      <Link 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
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

          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center mt-16 text-[#2F3332] dark:text-[#FCFAEF]">Advisory Council</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advisoryTeam.map((member) => (
              <div key={member.id} className="bg-white dark:bg-[#2F3332] rounded-xl overflow-hidden shadow-sm border border-[#C1C3C3] dark:border-[#4F5554] hover:shadow-md transition-shadow">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-[#2F3332] dark:text-[#FCFAEF]">{member.name}</h3>
                  <p className="text-[#007A73] dark:text-[#63B0AC] text-sm font-medium mb-4">{member.title}</p>
                  <p className="text-[#2F3332]/80 dark:text-[#FCFAEF]/80 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex space-x-3">
                    {member.socialLinks?.linkedin && (
                      <Link 
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
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
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
                        aria-label={`Twitter profile of ${member.name}`}
                      >
                        <Twitter size={18} />
                      </Link>
                    )}
                    {member.socialLinks?.email && (
                      <Link 
                        href={`mailto:${member.socialLinks.email}`}
                        className="text-[#2F3332]/70 dark:text-[#FCFAEF]/70 hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
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
            We're always looking for talented professionals who are passionate about improving healthcare access and outcomes in underserved communities.
          </p>
          <Link 
            href="/contact" 
            className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] px-6 py-3 rounded-md font-medium inline-block transition-colors"
          >
            Join Us!
          </Link>
        </div>
      </section>
    </>
  );
}