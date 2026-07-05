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
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <PhilosophyHero />

      <nav
        aria-label="On this page"
        className="border-b border-[#0097b2]/10 bg-[#FCFAEF] dark:border-[#FCFAEF]/10 dark:bg-[#121514]"
      >
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <ol className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
            {philosophySections.map((section) => (
              <li key={section.id} className="shrink-0">
                <Link
                  href={`#${section.id}`}
                  className="inline-flex min-h-10 items-center rounded-md border border-[#0097b2]/18 bg-white/72 px-4 py-2 text-sm font-semibold text-[#2F3332]/78 transition-colors hover:border-[#0097b2]/35 hover:bg-[#0097b2]/10 hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] dark:border-[#FCFAEF]/12 dark:bg-[#2F3332]/54 dark:text-[#FCFAEF]/78 dark:hover:border-[#66C4DC]/35 dark:hover:bg-[#66C4DC]/12 dark:hover:text-[#66C4DC]"
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
