import Link from "next/link";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Printer,
} from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import type { ResearchPaper } from "@/data/research-papers";
import DeferredPdfViewer from "./DeferredPdfViewer";

export default function ResearchPaperContent({
  paper,
}: {
  paper: ResearchPaper;
}) {
  const downloadName = `${paper.slug}.pdf`;

  return (
    <article>
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <header className="relative overflow-hidden bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] py-16 md:py-24">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FCFAEF]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#FCFAEF]/10 blur-3xl" />

        <div className="site-container relative z-10 mx-auto px-4 sm:px-6">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 motion-reduce:animate-none">
            <Link
              href="/research"
              className="mb-6 inline-flex items-center text-[#FCFAEF]/80 transition-colors hover:text-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C94D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Research
            </Link>

            <div className="max-w-4xl">
              <div className="mb-4 flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F5C94D]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F5C94D]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FCFAEF]/40" />
              </div>
              <h1 className="mb-4 text-2xl font-semibold leading-tight text-[#FCFAEF] sm:text-3xl md:text-4xl">
                {paper.title}
              </h1>
              <p className="mb-2 text-base font-medium text-[#F5C94D] sm:text-lg">
                {paper.authors}
              </p>
              <p className="text-sm text-[#FCFAEF]/70">
                Published: <time>{paper.date}</time>
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-[#FCFAEF] py-8 dark:bg-[#1C1F1E] md:py-12">
        <div className="site-container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-[#2F3332] sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl">
                  Abstract
                </h2>
              </div>
              <p className="mt-5 text-base leading-relaxed text-[#2F3332] dark:text-[#E6E7E7] sm:text-lg">
                {paper.abstract}
              </p>

              <div
                className="mt-7 flex flex-col gap-3 border-t border-[#E6E7E7] pt-6 dark:border-[#4F5554] sm:flex-row sm:flex-wrap"
                aria-label="Research paper actions"
              >
                <Button asChild className="w-full sm:w-auto">
                  <a href="#pdf-viewer">
                    <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                    View PDF
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={paper.pdfUrl} download={downloadName}>
                    <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                    Download PDF
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a
                    href={paper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
                    Print PDF
                  </a>
                </Button>
              </div>
            </div>

            <DeferredPdfViewer pdfUrl={paper.pdfUrl} />
          </div>
        </div>
      </section>
    </article>
  );
}
