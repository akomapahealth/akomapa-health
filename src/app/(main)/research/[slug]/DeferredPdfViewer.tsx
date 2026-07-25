"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div
      className="flex min-h-80 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-[#2F3332]"
      role="status"
    >
      <div className="text-center">
        <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-[#0097b2]/20 border-b-[#0097b2] motion-reduce:animate-none" />
        <span className="mt-4 block text-sm font-medium text-[#2F3332] dark:text-[#FCFAEF]">
          Preparing PDF viewer…
        </span>
      </div>
    </div>
  ),
});

export default function DeferredPdfViewer({ pdfUrl }: { pdfUrl: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (
      shouldLoad ||
      typeof window.IntersectionObserver !== "function"
    ) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      // Wait until the section reaches the upper half of the viewport. This
      // avoids paying the PDF cost merely because a tall screen can glimpse
      // the placeholder before the visitor has started reading or scrolling.
      { rootMargin: "0px 0px -50% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <section
      ref={sectionRef}
      id="pdf-viewer"
      className="mt-8 scroll-mt-24"
      aria-labelledby="pdf-viewer-heading"
      data-testid="deferred-pdf-viewer"
    >
      <h2 id="pdf-viewer-heading" className="sr-only">
        PDF viewer
      </h2>

      {shouldLoad ? (
        <PdfViewer pdfUrl={pdfUrl} />
      ) : (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-[#E6E7E7] bg-white px-6 py-12 text-center shadow-lg dark:border-[#4F5554] dark:bg-[#2F3332]">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]">
            <FileText className="h-7 w-7" aria-hidden="true" />
          </span>
          <h3 className="mt-5 text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
            Read the full paper
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-base">
            The interactive viewer loads only when you need it, keeping the
            paper summary fast and immediately readable.
          </p>
          <Button className="mt-6" onClick={() => setShouldLoad(true)}>
            Load PDF viewer
          </Button>
        </div>
      )}
    </section>
  );
}
