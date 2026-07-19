import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildNotFoundMetadata,
  serializeJsonLd,
} from "@/lib/seo";
import {
  getResearchPaperBySlug,
  researchPapers,
} from "@/data/research-papers";
import ResearchPaperContent from "./ResearchPaperContent";

type ResearchPaperPageProps = {
  params: Promise<{ slug: string }>;
};

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
    description: paper.abstract,
    path: `/research/${paper.slug}`,
    image: paper.image,
    publishedTime: paper.date,
    authors: [paper.authors],
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

  const jsonLd = buildArticleJsonLd({
    title: paper.title,
    description: paper.abstract,
    path: `/research/${paper.slug}`,
    image: paper.image,
    publishedTime: paper.date,
    author: paper.authors,
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
