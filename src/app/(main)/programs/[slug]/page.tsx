import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Users } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { programs } from "@/data/programs";

interface ProgramPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const program = programs.find((p) => p.slug === params.slug);
  
  if (!program) {
    return {
      title: "Program Not Found",
    };
  }
  
  return {
    title: program.title,
    description: program.description,
  };
}

export async function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export default function ProgramPage({ params }: ProgramPageProps) {
  const program = programs.find((p) => p.slug === params.slug);
  
  if (!program) {
    notFound();
  }
  
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Link href="/programs" className="inline-flex items-center text-[#007A73] dark:text-[#63B0AC] hover:text-[#C37B1E] dark:hover:text-[#F3C677] mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to All Programs
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden mb-8">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="mb-8">
              <div className="text-sm font-medium text-[#007A73] dark:text-[#63B0AC] mb-2">
                {program.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">{program.title}</h1>
              <p className="text-lg text-[#2F3332] dark:text-[#E6E7E7]">{program.description}</p>
            </div>
            
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-[#1C1F1E] dark:prose-headings:text-[#FCFAEF] prose-p:text-[#2F3332] dark:prose-p:text-[#E6E7E7]">
              <h2>About This Program</h2>
              <p>{program.fullDescription}</p>
              
              <h2>Our Approach</h2>
              <p>{program.approach}</p>
              
              <h2>Impact & Outcomes</h2>
              <ul>
                {program.impacts.map((impact, index) => (
                  <li key={index}>{impact}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-[#FCFAEF] dark:bg-[#2F3332] rounded-xl p-6 sticky top-24 border border-[#E6E7E7] dark:border-[#4F5554]">
              <h3 className="text-xl font-bold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">Program Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Locations</div>
                    <div className="text-[#2F3332] dark:text-[#E6E7E7]">{program.locations.join(", ")}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">Established</div>
                    <div className="text-[#2F3332] dark:text-[#E6E7E7]">{program.established}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-[#007A73] dark:text-[#63B0AC] mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">People Served</div>
                    <div className="text-[#2F3332] dark:text-[#E6E7E7]">{program.peopleServed}</div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-[#007A73] hover:bg-[#C37B1E] text-[#FCFAEF] mb-3">
                <Link href="/contact?program=true">Get Involved</Link>
              </Button>
              
              <Button variant="outline" className="w-full border-[#007A73] text-[#007A73] hover:bg-[#007A73]/10 dark:border-[#63B0AC] dark:text-[#63B0AC] dark:hover:bg-[#63B0AC]/10">
                <Link href={`/resources?program=${program.slug}`}>Related Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}