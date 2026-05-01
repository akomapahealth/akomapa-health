import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllNewsItems, getNewsItemById } from "@/data/unified-news";
import { NewsDetailContent } from "@/components/news/NewsDetailContent";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllNewsItems()
    .filter((item) => !item.isExternalCta)
    .map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = getNewsItemById(id);
  if (!item) return { title: "Not Found" };

  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
      ...(item.image ? { images: [{ url: item.image }] } : {}),
      ...(item.date ? { publishedTime: item.date } : {}),
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const item = getNewsItemById(id);
  if (!item) notFound();

  const relatedItems = getAllNewsItems()
    .filter((i) => i.id !== id)
    .slice(0, 3);

  return <NewsDetailContent item={item} relatedItems={relatedItems} />;
}
