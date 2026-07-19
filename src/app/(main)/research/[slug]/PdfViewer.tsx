"use client";

import { useCallback, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const pdfOptions = {
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

export default function PdfViewer({ pdfUrl }: { pdfUrl: string }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.3);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const onDocumentLoadSuccess = useCallback(
    ({ numPages: loadedPages }: { numPages: number }) => {
      setNumPages(loadedPages);
      setPageNumber((currentPage) => Math.min(currentPage, loadedPages));
      setIsLoading(false);
      setError("");
    },
    [],
  );

  const onDocumentLoadError = useCallback((loadError: Error) => {
    setError(`Failed to load PDF: ${loadError.message}`);
    setIsLoading(false);
  }, []);

  return (
    <div data-testid="pdf-viewer-loaded">
      <div className="rounded-t-2xl border-b border-[#E6E7E7] bg-white p-4 shadow-xl dark:border-[#4F5554] dark:bg-[#2F3332] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setPageNumber((page) => Math.max(page - 1, 1))}
              disabled={pageNumber <= 1}
              variant="outline"
              size="icon"
              aria-label="Previous PDF page"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <span
              className="min-w-24 text-center text-sm font-medium text-[#2F3332] dark:text-[#FCFAEF] sm:text-base"
              aria-live="polite"
            >
              Page {pageNumber} of {numPages || "—"}
            </span>
            <Button
              onClick={() =>
                setPageNumber((page) => Math.min(page + 1, numPages))
              }
              disabled={numPages === 0 || pageNumber >= numPages}
              variant="outline"
              size="icon"
              aria-label="Next PDF page"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setScale((value) => Math.max(value - 0.2, 0.4))}
              disabled={scale <= 0.4}
              variant="outline"
              size="icon"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" aria-hidden="true" />
            </Button>
            <span
              className="min-w-14 text-center text-sm font-medium text-[#2F3332] dark:text-[#FCFAEF] sm:text-base"
              aria-live="polite"
            >
              {Math.round(scale * 100)}%
            </span>
            <Button
              onClick={() => setScale((value) => Math.min(value + 0.2, 4))}
              disabled={scale >= 4}
              variant="outline"
              size="icon"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              onClick={() => setRotation((value) => (value + 90) % 360)}
              variant="outline"
              size="icon"
              aria-label="Rotate PDF clockwise"
            >
              <RotateCw className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-b-2xl bg-white shadow-xl dark:bg-[#2F3332]">
        {error && (
          <Alert variant="destructive" className="m-6" role="alert">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && !error && (
          <div className="flex items-center justify-center py-16" role="status">
            <div className="text-center">
              <span className="mx-auto block h-12 w-12 animate-spin rounded-full border-2 border-[#0097b2]/20 border-b-[#0097b2] motion-reduce:animate-none" />
              <span className="mt-4 block text-[#2F3332] dark:text-[#FCFAEF]">
                Loading PDF…
              </span>
            </div>
          </div>
        )}

        <div className="max-h-[90vh] overflow-auto p-4">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            options={pdfOptions}
            loading={null}
            error={null}
            className="mx-auto w-max border border-[#E6E7E7] shadow-lg dark:border-[#4F5554]"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderAnnotationLayer
              renderTextLayer
              className="shadow-lg"
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
