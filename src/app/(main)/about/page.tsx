import { Metadata } from "next";
import Image from "@/components/common/Image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeader from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Akomapa Health Foundation&apos;s mission, vision, and our dedicated team working to improve healthcare access globally.",
};

export default function AboutPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="bg-[#FCFAEF] dark:bg-[#1C1F1E] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PageHeader
            title="About Akomapa Health Foundation"
            description="Working to transform healthcare access and outcomes through innovative programs, education, and community partnerships."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-[#2F3332]/80 dark:text-[#FCFAEF]/80 mb-6">
                Akomapa Health Foundation was established in 2025 with a vision to create a world where quality healthcare is accessible to all people, regardless of their location or economic status.
              </p>
              <p className="text-lg text-[#2F3332]/80 dark:text-[#FCFAEF]/80 mb-6">
                Our team of dedicated healthcare professionals, researchers, and community advocates work together to develop and implement programs that address critical healthcare needs in underserved communities.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="/#mission"
                  className="text-[#007A73] dark:text-[#63B0AC] font-medium hover:text-[#007A73] dark:hover:text-[#63B0AC] inline-flex items-center"
                >
                  Our Mission & Vision <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            <div className="relative h-96 md:h-[28rem] rounded-xl overflow-hidden">
              <Image
                src="/ucc-dream-team.JPG"
                alt="Akomapa Health Foundation Team"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 ">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="What We Focus On"
            description="Our work centers around key areas where we can make the most significant impact on healthcare outcomes."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-[#1C1F1E]">Access to Care</h3>
              <p className="text-gray-600">
                Establishing and supporting healthcare facilities in underserved areas to ensure everyone has access to quality healthcare services.
                </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-[#1C1F1E]">Health Education</h3>
              <p className="text-gray-600">
                Providing educational resources and programs to empower communities with knowledge about preventive care and health management.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-[#1C1F1E]">Healthcare Workforce</h3>
              <p className="text-gray-600">
                Training and supporting healthcare professionals to build capacity in communities that face shortages of qualified medical personnel.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Explore More About Us"
            description="Learn about our mission, team, history, and partners working together to improve healthcare."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/about/mission" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2 dark:text-[#1C1F1E]">Our Mission & Vision</h3>
              <p className="text-gray-600 mb-4">Learn about our guiding principles and the future we&apos;re working to create.</p>
              <span className="text-teal-600 font-medium inline-flex items-center">
                Read More <ArrowRight size={16} className="ml-1" />
              </span>
            </Link>
            
            <Link href="/about/team" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2 dark:text-[#1C1F1E]">Leadership Team</h3>
              <p className="text-gray-600 mb-4">Meet the dedicated professionals guiding our organization&apos;s strategy and operations.</p>
              <span className="text-teal-600 font-medium inline-flex items-center">
                Read More <ArrowRight size={16} className="ml-1" />
              </span>
            </Link>
            
            <Link href="/about/history" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2 dark:text-[#1C1F1E]">Our History</h3>
              <p className="text-gray-600 mb-4">Discover how we started and our journey to becoming a leading healthcare foundation.</p>
              <span className="text-teal-600 font-medium inline-flex items-center">
                Read More <ArrowRight size={16} className="ml-1" />
              </span>
            </Link>
            
            <Link href="/about/partners" className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold mb-2 dark:text-[#1C1F1E]">Partners & Affiliations</h3>
              <p className="text-gray-600 mb-4">See the organizations we collaborate with to expand our healthcare impact.</p>
              <span className="text-teal-600 font-medium inline-flex items-center">
                Read More <ArrowRight size={16} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}