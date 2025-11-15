"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { Button } from "@/components/ui/button";
import Image from "@/components/common/Image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Printer, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
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
  cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
  standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
};

interface ResearchPaper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  date: string;
  pdfUrl: string;
  image: string;
  slug: string;
}

const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    title: "Student-Powered Community Clinics: A Model for Sustainable Healthcare Delivery in Underserved Communities",
    authors: "B. A. Fleischer, E. B. Berkoh, B. Amoh, et al.",
    abstract: "This research presents the Akomapa model of student-powered community clinics, examining their effectiveness in delivering primary care and chronic disease management in underserved communities across Ghana. We analyze clinical outcomes, patient satisfaction, and the educational impact on student healthcare leaders.",
    date: "2024",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-28.jpg",
    slug: "student-powered-community-clinics"
  },
  {
    id: "2",
    title: "Impact of Interprofessional Education on Community Health Outcomes: A Longitudinal Study",
    authors: "E. B. Berkoh, D. K. Ofosu, H. Shaban, et al.",
    abstract: "Longitudinal analysis of how interprofessional student teams trained through the Akomapa Leadership Program deliver coordinated care that improves health outcomes in rural and peri-urban settings. This study tracks patient outcomes, student learning gains, and community engagement metrics over a 24-month period.",
    date: "2024",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-40.jpg",
    slug: "interprofessional-education-impact"
  },
  {
    id: "3",
    title: "Non-Communicable Disease Screening and Management in Low-Resource Settings: Evidence from Community-Based Clinics",
    authors: "A. Badu, W. Obeng, S. Dankwa, et al.",
    abstract: "This paper examines the effectiveness of free community-based screening programs for hypertension, diabetes, and other non-communicable diseases in Ghana. We present data on early detection rates, treatment adherence, and the role of community partnerships in sustaining these initiatives.",
    date: "2023",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-61.jpg",
    slug: "ncd-screening-management"
  },
  {
    id: "4",
    title: "Global Health Leadership Training: Preparing the Next Generation of Ethical Practitioners",
    authors: "N. A. Ocran, C. A. Buckman, D. A. Tuoyire, et al.",
    abstract: "Evaluation of the Akomapa Global Health Leadership Training Program, assessing how intensive leadership curricula combined with hands-on clinical rotations prepare students to address health inequities with cultural humility, evidence-based practice, and systems thinking.",
    date: "2023",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-66.jpg",
    slug: "global-health-leadership-training"
  }
];

export default function ResearchPaperPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.3);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [paper, setPaper] = useState<ResearchPaper | undefined>();

  useEffect(() => {
    const foundPaper = researchPapers.find(p => p.slug === slug);
    setPaper(foundPaper);
    if (!foundPaper) {
      router.push('/research');
    }
  }, [slug, router]);

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
    if (!paper) return;
    const link = document.createElement('a');
    link.href = paper.pdfUrl;
    link.download = `${paper.slug}.pdf`;
    link.click();
  };

  const printPDF = () => {
    if (!paper) return;
    window.open(paper.pdfUrl, '_blank');
  };

  if (!paper) {
    return null;
  }

  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-[#0097b2] to-[#0F4C5C] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCFAEF]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FCFAEF]/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/research"
              className="inline-flex items-center text-[#FCFAEF]/80 hover:text-[#FCFAEF] mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Research
            </Link>
            
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F5C94D]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F5C94D]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FCFAEF]/40" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-[#FCFAEF] leading-tight">
                {paper.title}
              </h1>
              <p className="text-base sm:text-lg text-[#F5C94D] mb-2 font-medium">
                {paper.authors}
              </p>
              <p className="text-sm text-[#FCFAEF]/60">
                Published: {paper.date}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PDF Viewer Section */}
      <section className="py-8 md:py-12 bg-[#FCFAEF] dark:bg-[#1C1F1E]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* PDF Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-[#2F3332] rounded-t-2xl shadow-xl p-4 sm:p-6 border-b border-[#E6E7E7] dark:border-[#4F5554]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={goToPrevPage}
                    disabled={pageNumber <= 1}
                    variant="outline"
                    size="sm"
                    className="border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <span className="text-[#2F3332] dark:text-[#FCFAEF] font-medium px-2 sm:px-4 text-sm sm:text-base">
                    Page {pageNumber} of {numPages}
                  </span>
                  
                  <Button
                    onClick={goToNextPage}
                    disabled={pageNumber >= numPages}
                    variant="outline"
                    size="sm"
                    className="border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF]"
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
                    className="border-[#eeba2b] text-[#eeba2b] hover:bg-[#eeba2b] hover:text-[#FCFAEF]"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  
                  <span className="text-[#2F3332] dark:text-[#FCFAEF] font-medium px-2 text-sm sm:text-base">
                    {Math.round(scale * 100)}%
                  </span>
                  
                  <Button
                    onClick={zoomIn}
                    variant="outline"
                    size="sm"
                    className="border-[#eeba2b] text-[#eeba2b] hover:bg-[#eeba2b] hover:text-[#FCFAEF]"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>

                  <Button
                    onClick={rotate}
                    variant="outline"
                    size="sm"
                    className="border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF]"
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    onClick={downloadPDF}
                    className="bg-[#0097b2] text-[#FCFAEF] hover:bg-[#0097b2]/80"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  
                  <Button
                    onClick={printPDF}
                    variant="outline"
                    size="sm"
                    className="border-[#0097b2] text-[#0097b2] hover:bg-[#0097b2] hover:text-[#FCFAEF]"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Print</span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* PDF Viewer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-[#2F3332] rounded-b-2xl shadow-xl overflow-hidden"
            >
              {error && (
                <Alert variant="destructive" className="m-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLoading && (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0097b2] mx-auto mb-4"></div>
                    <p className="text-[#2F3332] dark:text-[#FCFAEF]">Loading PDF...</p>
                  </div>
                </div>
              )}

              <div className="flex justify-center p-4 overflow-auto" style={{ maxHeight: '90vh' }}>
                <Document
                  file={paper.pdfUrl}
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

            {/* Abstract Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-white dark:bg-[#2F3332] rounded-2xl shadow-lg p-6 sm:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-[#1C1F1E] dark:text-[#FCFAEF]">
                Abstract
              </h3>
              <p className="text-base sm:text-lg text-[#2F3332] dark:text-[#E6E7E7] leading-relaxed">
                {paper.abstract}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

