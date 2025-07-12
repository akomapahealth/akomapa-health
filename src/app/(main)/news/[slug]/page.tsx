import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { formatDate } from "@/lib/utils";
import { news } from "@/data/news"; // Make sure this import is present and correct

interface NewsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = news.find((item) => item.slug === params.slug);
  
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }
  
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function NewsArticlePage({ params }: NewsPageProps) {
  const article = news.find((item) => item.slug === params.slug);
  
  if (!article) {
    notFound();
  }
  
  // Define related articles with a fallback to empty array
  const relatedArticles = news
    .filter(item => 
      item.id !== article.id && 
      (item.category === article.category || 
       item.tags?.some(tag => article.tags?.includes(tag)))
    )
    .slice(0, 3);
  
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <article className="py-16">
        <div className="container mx-auto px-4">
          <Link href="/news" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
            <ArrowLeft size={16} className="mr-2" /> Back to News
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {article.category}
              </span>
              <time className="text-sm text-gray-500 ml-4">{formatDate(article.date)}</time>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">{article.title}</h1>
            
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-12">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="prose prose-lg max-w-none">
              {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>
      
      {/* Only show related articles section if there are related articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/news/${relatedArticle.slug}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <time className="text-sm text-gray-500 mb-2 block">
                      {formatDate(relatedArticle.date)}
                    </time>
                    <h3 className="text-lg font-bold mb-2">{relatedArticle.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{relatedArticle.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}