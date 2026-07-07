import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsOnlyItems, getNewsItemById } from "@/data/unified-news";
import { NewsDetailContent } from "@/components/news/NewsDetailContent";
import {
  buildArticleJsonLd,
  buildArticleMetadata,
  buildNotFoundMetadata,
  serializeJsonLd,
} from "@/lib/seo";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getNewsOnlyItems()
    .filter((item) => !item.isExternalCta)
    .map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsItemById(id);
  if (!item) return buildNotFoundMetadata("News Not Found");

  return buildArticleMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/news/${item.id}`,
    image: item.image,
    publishedTime: item.date,
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = getNewsItemById(id);
  if (!item) notFound();

  const relatedItems = getNewsOnlyItems()
    .filter((i) => i.id !== id)
    .slice(0, 3);
  const jsonLd = buildArticleJsonLd({
    title: item.title,
    description: item.excerpt,
    path: `/news/${item.id}`,
    image: item.image,
    publishedTime: item.date,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />
      <NewsDetailContent item={item} relatedItems={relatedItems} />
    </>
  );
}
