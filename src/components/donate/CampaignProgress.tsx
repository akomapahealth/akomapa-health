import { donationCampaign } from "@/data/donation";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export default function CampaignProgress() {
  if (!donationCampaign.enabled) {
    return null;
  }

  const progress = Math.min(100, Math.round((donationCampaign.raised / donationCampaign.goal) * 100));

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#E6E7E7] bg-white p-6 dark:border-[#4F5554] dark:bg-[#2F3332]">
          <p className="mb-3 text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
            {currency.format(donationCampaign.raised)} raised toward {currency.format(donationCampaign.goal)} goal
          </p>
          <div className="h-3 w-full overflow-hidden rounded-full bg-[#E6E7E7] dark:bg-[#4F5554]">
            <div className="h-full bg-lapis transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-[#2F3332]/80 dark:text-[#E6E7E7]/80">{donationCampaign.label}</p>
        </div>
      </div>
    </section>
  );
}
