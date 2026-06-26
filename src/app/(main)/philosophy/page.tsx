import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PhilosophyHero from "@/components/philosophy/PhilosophyHero";
import PhilosophySection from "@/components/philosophy/PhilosophySection";
import PhilosophyVision from "@/components/philosophy/PhilosophyVision";
import { philosophySections } from "@/data/philosophy";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Explore Akomapa's philosophy of ethical global health leadership, community partnership, reciprocal learning, and sustainable impact.",
};

export default function PhilosophyPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <PhilosophyHero />

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-full xl:block">
          <div className="container sticky top-24 mx-auto h-0 px-4">
            <nav
              aria-label="On this page"
              className="pointer-events-auto ml-auto hidden w-56 translate-x-4 rounded-xl border border-[#0097b2]/15 bg-[#FCFAEF]/92 p-4 shadow-[0_18px_45px_rgba(15,76,92,0.12)] backdrop-blur-md dark:border-[#FCFAEF]/10 dark:bg-[#121514]/84 xl:block"
            >
              <p className="font-subheading text-xs font-bold uppercase tracking-[0.16em] text-[#0097b2] dark:text-[#66C4DC]">
                On this page
              </p>
              <ol className="mt-4 space-y-2">
                {philosophySections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      className="block rounded-md px-2 py-1.5 text-sm leading-snug text-[#2F3332]/76 transition-colors hover:bg-[#0097b2]/10 hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:text-[#FCFAEF]/74 dark:hover:bg-[#66C4DC]/12 dark:hover:text-[#66C4DC]"
                    >
                      {section.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        {philosophySections.map((section, index) => (
          <PhilosophySection
            key={section.id}
            section={section}
            index={index}
          />
        ))}
      </div>

      <PhilosophyVision />
    </div>
  );
}
