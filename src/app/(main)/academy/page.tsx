import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AcademyHero from "@/components/academy/AcademyHero";
import WhyEthicalLeadership from "@/components/academy/WhyEthicalLeadership";
import CurriculumSection from "@/components/academy/CurriculumSection";
import FacultyGrid from "@/components/academy/FacultyGrid";
import CertificationSection from "@/components/academy/CertificationSection";
import AcademyTestimonials from "@/components/academy/AcademyTestimonials";
import ApplySection from "@/components/academy/ApplySection";

export const metadata: Metadata = {
  title: "Akomapa Academy",
  description:
    "Explore Akomapa Academy's approach to ethical global health leadership education, mentorship, and applied community learning.",
};

export default function AcademyPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      <AcademyHero />
      <WhyEthicalLeadership />
      <CurriculumSection />
      <FacultyGrid />
      <CertificationSection />
      <AcademyTestimonials />
      <ApplySection />
    </div>
  );
}
