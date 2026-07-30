import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  PublicationArticleMeasure,
  PublicationBackLink,
  PublicationDocumentActions,
  PublicationMeta,
} from "@/components/publication";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import type { ResearchPaper } from "@/data/research-papers";
import DeferredPdfViewer from "./DeferredPdfViewer";

export default function ResearchPaperContent({
  paper,
}: {
  paper: ResearchPaper;
}) {
  const downloadName = `${paper.slug}.pdf`;

  return (
    <article data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="research-paper-heading"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <PublicationBackLink href="/research" tone="light">
          Back to Research
        </PublicationBackLink>

        <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
          Research Paper
        </EditorialEyebrow>
        <EditorialHeading
          as="h1"
          id="research-paper-heading"
          className="mt-5 max-w-4xl text-[1.85rem] text-[#FCFAEF] sm:text-[2.35rem] md:text-[2.85rem] lg:text-[3.25rem]"
        >
          {paper.title}
        </EditorialHeading>
        <PublicationMeta
          className="mt-5 text-[#FCFAEF]/85 [&_dd]:text-[#FCFAEF]"
          items={[
            { label: "Authors", value: paper.authors },
            {
              label: "Published",
              value: `Published: ${paper.date}`,
            },
          ]}
        />
      </EditorialBand>

      <EditorialBand
        tone="cream"
        aria-labelledby="research-abstract-heading"
        containerClassName="py-12 md:py-16 lg:py-20"
      >
        <PublicationArticleMeasure className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Summary
          </EditorialEyebrow>
          <EditorialHeading
            as="h2"
            id="research-abstract-heading"
            className="mt-3"
          >
            Abstract
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#2F3332] dark:text-[#E6E7E7]">
            {paper.abstract}
          </EditorialLead>

          <PublicationDocumentActions
            className="mt-8 border-t border-[#1C1F1E]/10 pt-6 dark:border-[#FCFAEF]/15"
            aria-label="Research paper actions"
            actions={[
              {
                href: "#pdf-viewer",
                label: "View PDF",
                variant: "primary",
              },
              {
                href: paper.pdfUrl,
                label: "Download PDF",
                download: downloadName,
              },
              {
                href: paper.pdfUrl,
                label: "Print PDF",
                external: true,
              },
            ]}
          />
        </PublicationArticleMeasure>

        <div className="mt-10 max-w-5xl">
          <DeferredPdfViewer pdfUrl={paper.pdfUrl} />
        </div>
      </EditorialBand>
    </article>
  );
}
