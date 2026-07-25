import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { healthImpact, leadershipImpact, mapLocations } from "@/data/impact";

type SnapshotMetric = {
  id: string;
  label: string;
  value: string;
  context: string;
};

function getImpactMetric(categoryId: "health" | "leadership", metricId: string) {
  const category = categoryId === "health" ? healthImpact : leadershipImpact;
  const metric = category.metrics.find((item) => item.id === metricId);

  if (!metric) {
    throw new Error(`Missing homepage impact snapshot metric "${metricId}".`);
  }

  return metric;
}

const screened = getImpactMetric("health", "community-members-screened");
const communities = getImpactMetric("health", "communities-reached");
const referrals = getImpactMetric("health", "referrals-completed");
const leaders = getImpactMetric("leadership", "student-leaders-trained");

const activeHubCount = mapLocations.filter(
  (location) => location.type === "active-hub",
).length;

const snapshotMetrics: SnapshotMetric[] = [
  {
    id: screened.id,
    label: screened.label,
    value: screened.currentValue,
    context: `${screened.futureValue} by ${screened.futureYear}`,
  },
  {
    id: leaders.id,
    label: leaders.label,
    value: leaders.currentValue,
    context: `${leaders.futureValue} by ${leaders.futureYear}`,
  },
  {
    id: communities.id,
    label: communities.label,
    value: communities.currentValue,
    context: `${activeHubCount} active hubs`,
  },
  {
    id: referrals.id,
    label: referrals.label,
    value: referrals.currentValue,
    context: `${referrals.futureValue} by ${referrals.futureYear}`,
  },
];

export default function ImpactSnapshot() {
  return (
    <section
      aria-labelledby="impact-snapshot-heading"
      className="bg-[#FCFAEF] text-[#1C1F1E] dark:bg-[#121514] dark:text-[#FCFAEF]"
    >
      <div className="site-container mx-auto px-4">
        <div className="border-y border-[#D8D6C8] py-8 dark:border-[#2F3332] md:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:items-center">
            <div className="max-w-xl">
              <p className="font-subheading text-sm font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
                Akomapa at a glance
              </p>
              <h2
                id="impact-snapshot-heading"
                className="mt-3 font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl"
              >
                Early numbers from a growing health leadership movement.
              </h2>
              <Link
                href="/impact"
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-bold text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:text-[#66C4DC] dark:hover:text-[#F5C94D] dark:focus-visible:ring-[#F5C94D] dark:focus-visible:ring-offset-[#121514]"
              >
                Explore impact
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <dl className="grid gap-0 overflow-hidden rounded-lg border border-[#D8D6C8] bg-white/70 dark:border-[#2F3332] dark:bg-[#1C1F1E]/72 sm:grid-cols-2 lg:grid-cols-4">
              {snapshotMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="border-b border-[#D8D6C8] p-5 last:border-b-0 dark:border-[#2F3332] sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0 sm:p-6"
                >
                  <dt className="text-sm font-semibold leading-snug text-[#2F3332]/78 dark:text-[#E6E7E7]/82">
                    {metric.label}
                  </dt>
                  <dd className="mt-3">
                    <span className="font-heading text-4xl font-bold tracking-tight text-[#0097b2] dark:text-[#66C4DC] md:text-5xl">
                      {metric.value}
                    </span>
                    <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#2F3332]/58 dark:text-[#E6E7E7]/58">
                      {metric.context}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
