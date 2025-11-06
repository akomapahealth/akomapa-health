import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { news } from "@/data/news";
import { formatDate } from "@/lib/utils";

export default function FeaturedNews() {
  // Get only featured news or latest 3 news items
  const featuredNews = news.filter(item => item.featured).length > 0 
    ? news.filter(item => item.featured).slice(0, 3) 
    : news.slice(0, 3);
  
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-[#4F5554]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 dark:text-[#FCFAEF]">Latest News</h2>
            <p className="text-lg text-gray-600 dark:text-[#FCFAEF]">
              Stay updated with our recent activities and achievements
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 bg-[#0097b2] hover:bg-[#eeba2b] text-[#FCFAEF]">
            <Link href="/news" className="flex items-center">
              View All News <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredNews.map((item) => (
            <div 
              key={item.id}
              className="bg-[#FCFAEF] dark:bg-[#4F5554] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <time className="text-sm text-gray-500 mb-2 block">{formatDate(item.date)}</time>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{item.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>
                <Link
                  href={`/news/${item.slug}`}
                  className="text-[#0097b2] font-medium hover:text-[#eeba2b] inline-flex items-center"
                >
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}