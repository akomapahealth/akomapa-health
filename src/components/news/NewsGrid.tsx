import NewsCard from "./NewsCard";
import { News } from "@/lib/types";

interface NewsGridProps {
  news: News[];
  featured?: boolean;
}

export default function NewsGrid({ news, featured = false }: NewsGridProps) {
  if (featured) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {news.slice(0, 2).map((item) => (
          <NewsCard key={item.id} news={item} featured={true} />
        ))}
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}