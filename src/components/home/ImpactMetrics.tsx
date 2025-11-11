"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Stethoscope, GraduationCap, Globe2, Landmark, Target } from "lucide-react";

type Metric = {
  id: number;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
};

const currentMetrics: Metric[] = [
  {
    id: 1,
    value: 1000,
    label: "Patients Served",
    suffix: "+",
    icon: <Users className="h-7 w-7 text-[#0097b2]" aria-hidden="true" />
  },
  {
    id: 2,
    value: 3,
    label: "Clinics Across Our Network",
    icon: <Stethoscope className="h-7 w-7 text-[#0097b2]" aria-hidden="true" />
  },
  {
    id: 3,
    value: 100,
    label: "Student Leaders Trained",
    suffix: "+",
    icon: <GraduationCap className="h-7 w-7 text-[#0097b2]" aria-hidden="true" />
  },
  {
    id: 4,
    value: 2,
    label: "Countries Connected",
    icon: <Globe2 className="h-7 w-7 text-[#0097b2]" aria-hidden="true" />
  },
  {
    id: 5,
    value: 2,
    label: "Institutional Partners Engaged",
    icon: <Landmark className="h-7 w-7 text-[#0097b2]" aria-hidden="true" />
  }
];

const futureMetrics: Metric[] = [
  {
    id: 6,
    value: 150000,
    label: "Patients Served",
    suffix: "+",
    icon: <Users className="h-7 w-7 text-[#F5C94D]" aria-hidden="true" />
  },
  {
    id: 7,
    value: 30,
    label: "Clinics Connected",
    suffix: "+",
    icon: <Stethoscope className="h-7 w-7 text-[#F5C94D]" aria-hidden="true" />
  },
  {
    id: 8,
    value: 3000,
    label: "Student Leaders Trained",
    suffix: "+",
    icon: <GraduationCap className="h-7 w-7 text-[#F5C94D]" aria-hidden="true" />
  },
  {
    id: 9,
    value: 10,
    label: "Countries Collaborating",
    suffix: "+",
    icon: <Globe2 className="h-7 w-7 text-[#F5C94D]" aria-hidden="true" />
  },
  {
    id: 10,
    value: 30,
    label: "Institutional Partners",
    suffix: "+",
    icon: <Landmark className="h-7 w-7 text-[#F5C94D]" aria-hidden="true" />
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

  const renderMetrics = (metrics: Metric[], counts: number[], inView: boolean) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 md:gap-8">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white/80 dark:bg-[#1C1F1E]/80 border border-[#E6E7E7] dark:border-[#2F3332] rounded-2xl p-6 md:p-8 shadow-sm backdrop-blur flex flex-col items-start"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-full bg-[#0097b2]/10 dark:bg-[#0097b2]/20 flex items-center justify-center">
              {metric.icon}
            </div>
            <div className="text-3xl md:text-4xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {metric.prefix || ""}
              {counts[index].toLocaleString()}
              {metric.suffix || ""}
            </div>
          </div>
          <p className="text-base md:text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            {metric.label}
          </p>
        </motion.div>
      ))}
    </div>
  );

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
          <p className="text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            Since our launch in October 2025, we&apos;re building a student-powered, community-rooted health movement.
          </p>
        </motion.div>

        <div ref={currentRef} className="space-y-8">
          {renderMetrics(currentMetrics, currentCounts, currentInView)}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 md:mt-24 text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#66C4DC]/10 dark:text-[#66C4DC] text-sm font-medium">
            <Target className="h-4 w-4 mr-2" aria-hidden="true" />
            Our Next Two Years
          </div>
          <p className="mt-4 text-lg text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            By 2028, we aim to scale this impact across borders and disciplines.
          </p>
        </motion.div>

        <div ref={futureRef} className="mt-12 space-y-8">
          {renderMetrics(futureMetrics, futureCounts, futureInView)}
        </div>
      </div>
    </section>
  );
}