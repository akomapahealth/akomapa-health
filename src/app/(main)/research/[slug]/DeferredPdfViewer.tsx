"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const PdfViewer = dynamic(() => import("./PdfViewer"), {
  ssr: false,
  loading: () => (
    <div
      className="flex min-h-80 items-center justify-center border border-[#1C1F1E]/12 bg-white dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]"
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
        <div className="flex min-h-80 flex-col items-start justify-center border border-[#1C1F1E]/12 border-l-2 border-l-[#eeba2b] bg-white px-6 py-12 dark:border-[#FCFAEF]/15 dark:border-l-[#eeba2b] dark:bg-[#1C1F1E] sm:px-8">
          <h3 className="font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
            Read the full paper
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-base">
            The interactive viewer loads only when you need it, keeping the
            paper summary fast and immediately readable.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-[#0097b2] px-5 py-2.5 text-sm font-semibold text-[#FCFAEF] transition-colors hover:bg-[#eeba2b] hover:text-[#1C1F1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2"
            onClick={() => setShouldLoad(true)}
          >
            Load PDF viewer
          </button>
        </div>
      )}
    </section>
  );
}
