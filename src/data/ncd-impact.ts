import type { NcdNarrativeMetric } from "@/data/homepage-narrative";
import { silentEpidemicContent } from "@/data/homepage-narrative";
import { healthImpact, leadershipImpact } from "@/data/impact";

// Re-export for component convenience
export { silentEpidemicContent, healthImpact, leadershipImpact };

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const ncdHeroContent = {
  eyebrow: "Community Health",
  heading: "The Silent Epidemic",
  subtitle: "The NCD Crisis",
  description:
    "Non-communicable diseases are the leading cause of death worldwide, yet millions remain undiagnosed, untreated, or disconnected from care.",
  keyStat: {
    id: "annual-ncd-deaths-hero",
    value: 41,
    suffix: "M",
    label: "lives lost to NCDs each year",
  } satisfies NcdNarrativeMetric,
  ctas: [
    { label: "Join the Fight", href: "/get-involved", variant: "amber" as const },
    { label: "Our Community Model", href: "#community-model", variant: "teal" as const },
  ],
  image: {
    src: "/highlights/Akomapa-28.jpg",
    alt: "Akomapa health professionals conducting a community NCD screening event",
  },
} as const;

// ---------------------------------------------------------------------------
// Why NCDs Matter
// ---------------------------------------------------------------------------

export type NCDBarChartItem = {
  label: string;
  percentage: number;
  color: string;
};

export const whyNCDsMatterContent = {
  eyebrow: "The Global Burden",
  heading: "Why NCDs Matter",
  description:
    "Non-communicable diseases account for 74% of all deaths globally. Understanding the scale of this crisis is the first step toward meaningful action.",
  globalStats: silentEpidemicContent.metrics,
  source: silentEpidemicContent.source,
  barChart: {
    title: "Global NCD Deaths by Cause",
    items: [
      { label: "Cardiovascular", percentage: 44, color: "#0097b2" },
      { label: "Cancer", percentage: 23, color: "#0F4C5C" },
      { label: "Chronic Respiratory", percentage: 10, color: "#eeba2b" },
      { label: "Diabetes", percentage: 5, color: "#F5C94D" },
      { label: "Other NCDs", percentage: 18, color: "#66C4DC" },
    ] satisfies NCDBarChartItem[],
  },
} as const;

// ---------------------------------------------------------------------------
// Why Students Matter
// ---------------------------------------------------------------------------

export type StudentReasonItem = {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
};

export const whyStudentsMatterContent = {
  eyebrow: "Student-Led Impact",
  heading: "Why Students Matter",
  description:
    "Students are not simply the leaders of tomorrow — they are partners in creating change today. Their energy, perspective, and commitment make them an essential force in the fight against NCDs.",
  reasons: [
    {
      icon: "GraduationCap",
      title: "Workforce Development",
      description:
        "Students gain hands-on clinical and community health experience, building the skilled workforce needed to address the NCD burden in underserved communities.",
      accentColor: "#0097b2",
    },
    {
      icon: "HeartHandshake",
      title: "Community Connection",
      description:
        "Students build trust with community members through sustained engagement, creating relationships that support long-term health behavior change and follow-up care.",
      accentColor: "#eeba2b",
    },
    {
      icon: "Sprout",
      title: "Sustainable Impact",
      description:
        "By training successive cohorts of student leaders, Akomapa creates a self-renewing pipeline of health professionals committed to community-centered NCD care.",
      accentColor: "#0F4C5C",
    },
  ] satisfies StudentReasonItem[],
  image: {
    src: "/highlights/Akomapa-40.jpg",
    alt: "Akomapa students collaborating during a community health education session",
  },
} as const;

// ---------------------------------------------------------------------------
// Community Model — Care Stages
// ---------------------------------------------------------------------------

export type CareStage = {
  id: string;
  icon: string;
  title: string;
  description: string;
  who: string;
  color: string;
};

export const communityModelContent = {
  eyebrow: "Our Approach",
  heading: "The Akomapa Community Care Model",
  description:
    "Our Community Learning & Care Hubs follow a five-stage model designed to address every dimension of the NCD challenge — from awareness to long-term evidence generation.",
  stages: [
    {
      id: "prevention",
      icon: "ShieldCheck",
      title: "Prevention",
      description:
        "Health education and community awareness campaigns help people understand NCD risk factors and take earlier action.",
      who: "Students, community health workers",
      color: "#0097b2",
    },
    {
      id: "screening",
      icon: "SearchCheck",
      title: "Screening",
      description:
        "Accessible NCD screening at community hubs brings early detection closer to the people who need it most.",
      who: "Students, faculty supervisors",
      color: "#0F4C5C",
    },
    {
      id: "referral",
      icon: "ArrowRightLeft",
      title: "Referral",
      description:
        "Patients identified with elevated risk are connected to healthcare facilities through established referral pathways.",
      who: "Students, partner clinicians",
      color: "#eeba2b",
    },
    {
      id: "longitudinal-care",
      icon: "HeartPulse",
      title: "Longitudinal Care",
      description:
        "Follow-up visits, medication counseling, and ongoing management ensure patients stay connected to care over time.",
      who: "Students, faculty mentors, community members",
      color: "#F5C94D",
    },
    {
      id: "research",
      icon: "Microscope",
      title: "Research",
      description:
        "Data collected across all stages drives evidence generation, quality improvement, and innovation in NCD care delivery.",
      who: "Student scholars, research faculty",
      color: "#66C4DC",
    },
  ] satisfies CareStage[],
} as const;

// ---------------------------------------------------------------------------
// Data Viz — Ghana vs. Global Comparisons
// ---------------------------------------------------------------------------

export type NCDComparison = {
  label: string;
  ghana: number;
  global: number;
  unit: string;
  maxValue: number;
};

export const ncdDataVizContent = {
  eyebrow: "Data & Evidence",
  heading: "NCDs in Ghana and Beyond",
  description:
    "Ghana faces a growing NCD burden that mirrors global trends. Understanding these numbers helps guide where Akomapa's community-based model can have the greatest impact.",
  comparisons: [
    {
      label: "NCD Deaths (% of all deaths)",
      ghana: 43,
      global: 74,
      unit: "%",
      maxValue: 100,
    },
    {
      label: "Hypertension Prevalence",
      ghana: 30,
      global: 26,
      unit: "%",
      maxValue: 100,
    },
    {
      label: "Diabetes Prevalence",
      ghana: 6,
      global: 10,
      unit: "%",
      maxValue: 100,
    },
    {
      label: "NCD Risk: Insufficient Physical Activity",
      ghana: 22,
      global: 28,
      unit: "%",
      maxValue: 100,
    },
  ] satisfies NCDComparison[],
  source: {
    label: "WHO Global Health Observatory, Ghana Health Service",
    href: "https://www.who.int/data/gho/data/themes/noncommunicable-diseases",
  },
} as const;

// ---------------------------------------------------------------------------
// Impact Stats — parsed from impact.ts for animated counters
// ---------------------------------------------------------------------------

export type ParsedImpactMetric = {
  id: string;
  label: string;
  numericValue: number;
  suffix: string;
  icon: string;
};

function parseMetricValue(raw: string): { numericValue: number; suffix: string } {
  const cleaned = raw.replace(/,/g, "");
  const match = cleaned.match(/^(\d+)(.*)$/);
  if (!match) return { numericValue: 0, suffix: "" };
  return { numericValue: parseInt(match[1], 10), suffix: match[2] };
}

export const parsedHealthMetrics: ParsedImpactMetric[] = healthImpact.metrics.map(
  (m) => {
    const { numericValue, suffix } = parseMetricValue(m.currentValue);
    return {
      id: m.id,
      label: m.label,
      numericValue,
      suffix,
      icon: m.icon ?? "Activity",
    };
  },
);

export const parsedLeadershipMetrics: ParsedImpactMetric[] =
  leadershipImpact.metrics.map((m) => {
    const { numericValue, suffix } = parseMetricValue(m.currentValue);
    return {
      id: m.id,
      label: m.label,
      numericValue,
      suffix,
      icon: m.icon ?? "Activity",
    };
  });

// ---------------------------------------------------------------------------
// Future Vision
// ---------------------------------------------------------------------------

export type FutureTarget = {
  label: string;
  futureValue: string;
  futureYear: number;
  icon: string;
};

export const ncdFutureVisionContent = {
  eyebrow: "Looking Ahead",
  heading: "Our 2028 Vision",
  description:
    "Akomapa is building toward an ambitious future — scaling community-based NCD prevention, growing the next generation of ethical health leaders, and generating evidence that strengthens health systems across Ghana and beyond.",
  targets: healthImpact.metrics
    .filter((m) => m.futureValue && m.futureYear)
    .map((m) => ({
      label: m.label,
      futureValue: m.futureValue!,
      futureYear: m.futureYear!,
      icon: m.icon ?? "Target",
    })) satisfies FutureTarget[],
  ctas: [
    { label: "Join the Fight Against NCDs", href: "/get-involved", variant: "amber" as const },
    { label: "Learn About Our Hubs", href: "/clinics", variant: "teal" as const },
  ],
} as const;
