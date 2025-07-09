import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users, HeartHandshake, HandCoins } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-[#007A73] to-[#0F4C5C] text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[#F3C677] font-bold text-lg mb-2">
            GET INVOLVED
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#FCFAEF]">
            You Can Help Build the Future of Primary Care in Africa
          </h3>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 mb-8 text-left">
            <h4 className="text-xl font-semibold mb-4 text-[#FCFAEF]">Ways to Join:</h4>
            <ul className="space-y-3">
              {[
                "Partner with us as a university, hospital, or NGO.",
                "Sponsor our clinics or student training programs.",
                "Volunteer your time, skills, or supervision.",
                "Donate to help us scale impact across Ghana."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#F3C677] mr-3 mt-1">•</span>
                  <span className="text-[#FCFAEF]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-[#FCFAEF] text-[#007A73] hover:bg-[#F3C677] hover:text-[#1C1F1E] px-6 py-6 h-auto text-lg"
            >
              <Link href="/join" className="flex items-center">
                <Users size={20} className="mr-2" />
                Volunteer
              </Link>
            </Button>
            
            <Button 
              className="bg-[#C37B1E] text-[#FCFAEF] hover:bg-[#F3C677] hover:text-[#1C1F1E] px-6 py-6 h-auto text-lg"
            >
              <Link href="/donate" className="flex items-center">
                <HandCoins size={20} className="mr-2" />
                Donate
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-[#FCFAEF] text-[#007A73] hover:text-[#F3C677] hover:bg-[#FCFAEF]/10 px-6 py-6 h-auto text-lg"
            >
              <Link href="/partner" className="flex items-center">
                <HeartHandshake size={20} className="mr-2" />
                Partner With Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}