"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BentoMetricsGroup, type BentoMetricItem } from "@/components/ui/feature-section-with-bento-grid";
import { Target } from "lucide-react";

type Metric = {
  id: number;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

const currentMetrics: Metric[] = [
  {
    id: 1,
    value: 1000,
    label: "Patients Served",
    suffix: "+"
  },
  {
    id: 2,
    value: 3,
    label: "Network Clinics"
  },
  {
    id: 3,
    value: 100,
    label: "Student Leaders Trained",
    suffix: "+"
  },
  {
    id: 4,
    value: 2,
    label: "Countries Connected"
  },
  {
    id: 5,
    value: 2,
    label: "Institutional Partners"
  }
];

const futureMetrics: Metric[] = [
  {
    id: 6,
    value: 150000,
    label: "Patients Served",
    suffix: "+"
  },
  {
    id: 7,
    value: 30,
    label: "Connected Clinics",
    suffix: "+"
  },
  {
    id: 8,
    value: 3000,
    label: "Student Leaders Trained",
    suffix: "+"
  },
  {
    id: 9,
    value: 10,
    label: "Countries Collaborating",
    suffix: "+"
  },
  {
    id: 10,
    value: 30,
    label: "Institutional Partners",
    suffix: "+"
  }
];

function useAnimatedCounters(metrics: Metric[], isInView: boolean, duration = 2000) {
  const [counts, setCounts] = useState(metrics.map(() => 0));

  useEffect(() => {
    if (!isInView) return;

    const start = performance.now();
    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(metrics.map(metric => Math.round(metric.value * eased)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, metrics, duration]);

  return counts;
}

export default function ImpactMetrics() {
  const currentRef = useRef<HTMLDivElement | null>(null);
  const futureRef = useRef<HTMLDivElement | null>(null);

  const currentInView = useInView(currentRef, {
    once: true,
    margin: "-20% 0px -20% 0px"
  });
  const futureInView = useInView(futureRef, {
    once: true,
    margin: "-20% 0px -20% 0px"
  });

  const currentCounts = useAnimatedCounters(currentMetrics, currentInView, 2000);
  const futureCounts = useAnimatedCounters(futureMetrics, futureInView, 2200);

  const formatMetricValue = (metric: Metric, count: number) =>
    `${metric.prefix || ""}${count.toLocaleString()}${metric.suffix || ""}`;

  const buildMetricItems = (metrics: Metric[], counts: number[]): BentoMetricItem[] =>
    metrics.slice(1).map((metric, index) => ({
      value: formatMetricValue(metric, counts[index + 1]),
      label: metric.label,
      eyebrow: String(index + 2).padStart(2, "0")
    }));

  return (
    <section className="py-16 md:py-24 bg-[#FCFAEF] dark:bg-[#1C1F1E] text-[#1C1F1E] dark:text-[#FCFAEF] relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-[#F5C94D] font-bold text-lg mb-2">
            OUR IMPACT
          </h2>
          <h3 className="mb-6 font-heading text-3xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] md:text-4xl">
            Measured in people, partnerships, and momentum
          </h3>
          <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            Since our launch in October 2025, we&apos;re building a student-powered, community-rooted health movement.
          </p>
        </motion.div>

        <div ref={currentRef} className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={currentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <BentoMetricsGroup
              badge="Today"
              title="What our first chapter already makes possible"
              description="These numbers reflect the operational base we are building from across care delivery, student leadership, and institutional collaboration."
              tone="teal"
              leadValue={formatMetricValue(currentMetrics[0], currentCounts[0])}
              leadLabel={currentMetrics[0].label}
              supportingCopy="Every milestone here represents capacity that can be replicated, studied, and expanded with community partners."
              items={buildMetricItems(currentMetrics, currentCounts)}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-14"
        >
          <div className="rounded-[28px] border border-[#0097b2]/15 bg-gradient-to-r from-[#0097b2]/[0.06] via-white/80 to-[#F5C94D]/[0.08] px-6 py-8 text-center shadow-sm backdrop-blur md:px-8 md:py-10 dark:border-[#2F3332] dark:from-[#2F3332] dark:via-[#1C1F1E] dark:to-[#2F3332]">
            <div className="inline-flex items-center justify-center rounded-full bg-[#0097b2]/10 px-4 py-2 text-sm font-medium text-[#0097b2] dark:bg-[#66C4DC]/10 dark:text-[#66C4DC]">
              <Target className="mr-2 h-4 w-4" aria-hidden="true" />
              Our Next Two Years
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
              By 2028, we aim to scale this impact across borders and disciplines, translating early momentum into a much larger network of care, training, and research.
            </p>
          </div>
        </motion.div>

        <div ref={futureRef} className="mt-12 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={futureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <BentoMetricsGroup
              badge="By 2028"
              title="Where this model is designed to go next"
              description="Our next chapter is about taking a proven local model and extending it through more clinics, more countries, and more institutional partnerships."
              tone="gold"
              leadValue={formatMetricValue(futureMetrics[0], futureCounts[0])}
              leadLabel={futureMetrics[0].label}
              supportingCopy="The goal is not just growth in numbers, but stronger systems, deeper training pipelines, and broader community access."
              items={buildMetricItems(futureMetrics, futureCounts)}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
