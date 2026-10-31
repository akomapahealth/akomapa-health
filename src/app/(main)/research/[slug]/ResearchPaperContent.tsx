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
import { getDoiUrl, type ResearchPaper } from "@/data/research-papers";
import DeferredPdfViewer from "./DeferredPdfViewer";

export default function ResearchPaperContent({
  paper,
}: {
  paper: ResearchPaper;
}) {
  const downloadName = `${paper.slug}.pdf`;
  const doiUrl = paper.doi ? getDoiUrl(paper.doi) : null;
  const publisherUrl = paper.publisherUrl ?? doiUrl;

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
          {paper.journal ?? "Research Paper"}
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
              dateTime: paper.publishedAt,
            },
            ...(paper.doi && doiUrl
              ? [
                  {
                    label: "DOI",
                    value: (
                      <a
                        href={doiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center underline decoration-[#F5C94D]/60 underline-offset-4 transition-colors hover:decoration-[#F5C94D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C94D]"
                      >
                        DOI: {paper.doi}
                      </a>
                    ),
                  },
                ]
              : []),
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

          {paper.citation ? (
            <figure
              data-testid="research-citation"
              className="mt-8 border-l-2 border-[#eeba2b] pl-5 sm:pl-6"
            >
              <figcaption className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0F4C5C] dark:text-[#66C4DC]">
                Cite this paper
              </figcaption>
              <p className="mt-2 font-body text-sm leading-relaxed text-[#2F3332] dark:text-[#E6E7E7]/90 sm:text-base">
                {paper.citation}
                {doiUrl ? <span className="break-all"> {doiUrl}</span> : null}
              </p>
            </figure>
          ) : null}

          <PublicationDocumentActions
            className="mt-8 border-t border-[#1C1F1E]/10 pt-6 dark:border-[#FCFAEF]/15"
            aria-label="Research paper actions"
            actions={[
              {
                href: "#pdf-viewer",
                label: "View PDF",
                variant: "primary",
              },
              ...(publisherUrl
                ? [
                    {
                      href: publisherUrl,
                      label: `Read on ${paper.publisherName ?? paper.journal ?? "publisher site"}`,
                      external: true,
                    },
                  ]
                : []),
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

        <div className="mx-auto mt-10 w-full max-w-5xl">
          <DeferredPdfViewer pdfUrl={paper.pdfUrl} />
        </div>
      </EditorialBand>
    </article>
  );
}
