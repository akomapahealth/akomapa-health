"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/Image";
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut,
  RotateCw,
  FileText
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Import required CSS for annotations and text layer
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// PDF options for better rendering
const options = {
  cMapUrl: 'https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/',
  standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/',
};

export default function ResearchPage() {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.3);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError("");
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    setIsLoading(false);
  }, []);

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 4.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.4));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/documents/research.pdf';
    link.download = 'akomapa-research.pdf';
    link.click();
  };

  const printPDF = () => {
    window.open('/documents/research.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FCFAEF] dark:bg-[#1C1F1E]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/research-hero.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] mb-6"
            >
              Research Publications
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-[#2F3332] dark:text-[#E6E7E7] mb-8"
            >
              Explore our latest research findings and contributions to healthcare innovation in Ghana.
            </motion.p>
          </div>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* PDF Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#2F3332] rounded-t-2xl shadow-xl p-4 border-b border-[#E6E7E7] dark:border-[#4F5554]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    variant="outline"
                    size="sm"
                    className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <span className="text-[#2F3332] dark:text-[#FCFAEF] font-medium px-4">
                    Page {pageNumber} of {numPages}
                  </span>
                  
                  <Button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    variant="outline"
                    size="sm"
                    className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={zoomOut}
                    variant="outline"
                    size="sm"
                    className="border-[#C37B1E] text-[#C37B1E] hover:bg-[#C37B1E] hover:text-[#FCFAEF]"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  
                  <span className="text-[#2F3332] dark:text-[#FCFAEF] font-medium px-2">
                    {Math.round(scale * 100)}%
                  </span>
                  
                  <Button
                    onClick={zoomIn}
                    variant="outline"
                    size="sm"
                    className="border-[#C37B1E] text-[#C37B1E] hover:bg-[#C37B1E] hover:text-[#FCFAEF]"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>

                  <Button
                    onClick={rotate}
                    variant="outline"
                    size="sm"
                    className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF]"
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={downloadPDF}
                    className="bg-[#007A73] text-[#FCFAEF] hover:bg-[#C37B1E]"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  
                  <Button
                    onClick={printPDF}
                    variant="outline"
                    size="sm"
                    className="border-[#007A73] text-[#007A73] hover:bg-[#007A73] hover:text-[#FCFAEF]"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* PDF Viewer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#2F3332] rounded-b-2xl shadow-xl overflow-hidden"
            >
              {error && (
                <Alert variant="destructive" className="m-6">
                  <FileText className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007A73] mx-auto mb-4"></div>
                    <p className="text-[#2F3332] dark:text-[#FCFAEF]">Loading PDF...</p>
                  </div>
                </div>
              )}

              <div className="flex justify-center p-4 overflow-auto" style={{ maxHeight: '90vh' }}>
                <Document
                  file="/documents/research.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  options={options}
                  className="border border-[#E6E7E7] dark:border-[#4F5554] shadow-lg"
                >
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    rotate={rotation}
                    renderAnnotationLayer={true}
                    renderTextLayer={true}
                    className="shadow-lg"
                  />
                </Document>
              </div>
            </motion.div>

            {/* Additional Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center text-[#2F3332] dark:text-[#E6E7E7]"
            >
              <p className="mb-4">
                This research document presents our findings on student-powered healthcare initiatives and their impact on community health outcomes in Ghana.
              </p>
              <p className="text-sm">
                For questions about our research, please contact us at{" "}
                <a href="mailto:akomapahealth@gmail.com" className="text-[#007A73] hover:text-[#C37B1E]">
                  akomapahealth@gmail.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
