import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { News } from "@/lib/types";

interface NewsCardProps {
  news: News;
  featured?: boolean;
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  if (featured) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <Image
              src={news.image}
              alt={news.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {news.category}
              </span>
              {news.featured && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Featured
                </span>
              )}
            </div>
            <time className="text-sm text-gray-500 mb-2">{formatDate(news.date)}</time>
            <h3 className="text-xl font-bold mb-3 flex-grow">{news.title}</h3>
            <p className="text-gray-600 mb-4">{news.excerpt}</p>
            <Link
              href={`/news/${news.slug}`}
              className="text-teal-600 font-medium hover:text-teal-700 inline-flex items-center"
            >
              Read More <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="relative h-48">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {news.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <time className="text-sm text-gray-500 mb-2 block">{formatDate(news.date)}</time>
        <h3 className="text-lg font-bold mb-3">{news.title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{news.excerpt}</p>
        <Link
          href={`/news/${news.slug}`}
          className="text-teal-600 font-medium hover:text-teal-700 inline-flex items-center text-sm"
        >
          Read More <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
}