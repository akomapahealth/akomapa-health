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
        className="border-b border-[#0097b2]/25 bg-[#F7F4E8] dark:border-[#66C4DC]/25 dark:bg-[#121514]"
      >
        <div className="site-container mx-auto max-w-7xl px-4 py-5 md:py-6">
          <p className="mb-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0F4C5C] dark:text-[#66C4DC]">
            Navigate the principles
          </p>
          <ol className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
            {philosophySections.map((section, index) => (
              <li key={section.id} className="shrink-0">
                <Link
                  href={`#${section.id}`}
                  className="group inline-flex min-h-12 items-center gap-3 border border-[#B8B5A8] bg-white px-3 py-2 text-sm font-semibold text-[#2F3332] transition-colors hover:border-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4C5C] focus-visible:ring-offset-2 dark:border-[#3E555A] dark:bg-[#1C1F1E] dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:bg-[#0F4C5C] dark:focus-visible:ring-[#F5C94D]"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-7 min-w-7 items-center justify-center bg-[#F5C94D] px-1 font-subheading text-[0.65rem] font-bold tracking-[0.12em] text-[#1C1F1E]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
