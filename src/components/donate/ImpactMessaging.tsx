import { Globe, Heart, Users } from "lucide-react";
import { impactHighlights } from "@/data/donation";

export default function ImpactMessaging() {
  return (
    <section className="bg-[#FCFAEF] py-12 dark:bg-[#1C1F1E] md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <p className="font-semibold uppercase tracking-wide text-amber">Impact Messaging</p>
          <h2 className="text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl">What your donation enables</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {impactHighlights.map((item) => {
            const Icon = item.icon === "clinic" ? Heart : item.icon === "training" ? Users : Globe;
            return (
              <article key={item.title} className="rounded-2xl border border-[#E6E7E7] bg-white p-6 dark:border-[#4F5554] dark:bg-[#2F3332]">
                <Icon className="mb-4 h-8 w-8 text-lapis" />
                <h3 className="mb-2 text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#2F3332]/85 dark:text-[#E6E7E7]/85">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
