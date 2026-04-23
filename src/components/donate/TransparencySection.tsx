import { transparencyAllocations } from "@/data/donation";

export default function TransparencySection() {
  return (
    <section className="bg-[#FCFAEF] py-12 dark:bg-[#1C1F1E] md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[#E6E7E7] bg-white p-6 dark:border-[#4F5554] dark:bg-[#2F3332] md:p-8">
          <p className="mb-2 font-semibold uppercase tracking-wide text-amber">Transparency</p>
          <h2 className="mb-6 text-3xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">Where funds go</h2>

          <div className="mb-6 h-4 w-full overflow-hidden rounded-full bg-[#E6E7E7] dark:bg-[#4F5554]">
            {transparencyAllocations.map((allocation) => (
              <div key={allocation.label} className={`h-full ${allocation.barClass} inline-block`} style={{ width: `${allocation.percentage}%` }} />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {transparencyAllocations.map((allocation) => (
              <div key={allocation.label} className="rounded-xl border border-[#E6E7E7] p-4 dark:border-[#4F5554]">
                <p className={`text-xl font-bold ${allocation.colorClass}`}>{allocation.percentage}%</p>
                <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">{allocation.label}</p>
                <p className="text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80">{allocation.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
