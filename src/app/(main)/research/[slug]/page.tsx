import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildNotFoundMetadata,
  serializeJsonLd,
} from "@/lib/seo";
import {
  getDoiUrl,
  getResearchPaperBySlug,
  getResearchPaperSummary,
  researchPapers,
  type ResearchPaper,
} from "@/data/research-papers";
import ResearchPaperContent from "./ResearchPaperContent";

type ResearchPaperPageProps = {
  params: Promise<{ slug: string }>;
};

function splitAuthors(paper: ResearchPaper) {
  return paper.authors
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

export function generateStaticParams() {
  return researchPapers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({
  params,
}: ResearchPaperPageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = getResearchPaperBySlug(slug);

  if (!paper) {
    return buildNotFoundMetadata("Research Paper Not Found");
  }

  return buildArticleMetadata({
    title: paper.title,
    description: getResearchPaperSummary(paper),
    path: `/research/${paper.slug}`,
    image: paper.image,
    publishedTime: paper.publishedAt ?? paper.date,
    authors: splitAuthors(paper),
  });
}

export default async function ResearchPaperPage({
  params,
}: ResearchPaperPageProps) {
  const { slug } = await params;
  const paper = getResearchPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

  const sameAs = [
    ...(paper.doi ? [getDoiUrl(paper.doi)] : []),
    ...(paper.publisherUrl ? [paper.publisherUrl] : []),
  ];

  const jsonLd = buildArticleJsonLd({
    type: paper.journal ? "ScholarlyArticle" : "Article",
    title: paper.title,
    description: getResearchPaperSummary(paper),
    path: `/research/${paper.slug}`,
    image: paper.image,
    publishedTime: paper.publishedAt ?? paper.date,
    authors: splitAuthors(paper),
    sameAs,
    isPartOf: paper.journal,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <ResearchPaperContent paper={paper} />
    </>
  );
}
