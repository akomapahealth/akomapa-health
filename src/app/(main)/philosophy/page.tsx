import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PhilosophyHero from "@/components/philosophy/PhilosophyHero";
import PhilosophySection from "@/components/philosophy/PhilosophySection";
import PhilosophyVision from "@/components/philosophy/PhilosophyVision";
import { philosophySections } from "@/data/philosophy";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/philosophy");

export default function PhilosophyPage() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <PhilosophyHero />

      <nav
        aria-label="On this page"
        className="border-b border-[#0097b2]/20 bg-white dark:border-[#FCFAEF]/15 dark:bg-[#121514]"
      >
        <div className="site-container mx-auto max-w-7xl px-4 py-4">
          <ol className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
            {philosophySections.map((section) => (
              <li key={section.id} className="shrink-0">
                <Link
                  href={`#${section.id}`}
                  className="inline-flex min-h-11 items-center rounded-md border border-[#0F4C5C] px-4 py-2 text-sm font-semibold text-[#2F3332] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] focus-visible:ring-offset-2 dark:border-[#66C4DC] dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC] dark:focus-visible:ring-[#F5C94D]"
                >
                  {section.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <div>
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
