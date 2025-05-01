import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import { programs } from "@/data/programs";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Programs",
  description: "Explore the healthcare programs and initiatives of Akomapa Health Foundation designed to improve health outcomes and access to care.",
};

export default function ProgramsPage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="bg-[#FCFAEF] dark:bg-[#1C1F1E] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Our Healthcare Programs"
            description="Discover our initiatives designed to improve healthcare access, education, and outcomes for communities worldwide."
          />
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16">
            {programs.map((program, index) => (
              <div 
                key={program.slug}
                className={`flex flex-col ${
                  index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                } gap-8 md:gap-12 items-center`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="text-sm font-medium text-[#007A73] dark:text-[#63B0AC] mb-2">
                    {program.category}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">{program.title}</h2>
                  <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-6">{program.description}</p>
                  <ul className="space-y-2 mb-6">
                    {program.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#007A73] dark:text-[#63B0AC] mr-2">•</span>
                        <span className="text-[#2F3332] dark:text-[#E6E7E7]">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF]">
                    <Link href={`/programs/${program.slug}`} className="flex items-center">
                      Learn More <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="bg-[#FCFAEF] dark:bg-[#1C1F1E] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1C1F1E] dark:text-[#FCFAEF]">Want to Support Our Programs?</h2>
          <p className="text-[#2F3332] dark:text-[#E6E7E7] mb-8 max-w-2xl mx-auto">
            We're always looking for partners, volunteers, and supporters to help us expand our healthcare initiatives.
          </p>
          <Button className="bg-[#C37B1E] hover:bg-[#007A73] text-[#FCFAEF]">
            <Link href="/contact">Get Involved</Link>
          </Button>
        </div>
      </section>
    </>
  );
}