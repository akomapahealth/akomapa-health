import { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import NewsGrid from "@/components/news/NewsGrid";
import { news } from "@/data/news";

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Stay informed with the latest news, events, and updates from Akomapa Health Foundation.",
};

export default function NewsPage() {
  const featuredNews = news.filter(item => item.featured);
  const regularNews = news.filter(item => !item.featured);
  
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <PageHeader
            title="News & Updates"
            description="Stay informed with the latest news, events, and updates from Akomapa Health Foundation."
          />
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          {featuredNews.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8">Featured News</h2>
              <NewsGrid news={featuredNews} featured={true} />
            </div>
          )}
          
          <div>
            <h2 className="text-2xl font-bold mb-8">Latest Updates</h2>
            <NewsGrid news={regularNews} />
          </div>
        </div>
      </section>
    </>
  );
}