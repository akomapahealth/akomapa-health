import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Partner with Akomapa to advance community-driven care, ethical health leadership, research, and sustainable global health solutions.",
};

const highlights = [
  {
    title: "Community Partners",
    description:
      "We build with local leaders and organizations so every initiative reflects community priorities and strengthens local capacity.",
  },
  {
    title: "Academic Partners",
    description:
      "Universities collaborate on leadership development, research, mentorship, and responsible experiential learning.",
  },
  {
    title: "Strategic Supporters",
    description:
      "Funders and mission-aligned organizations help scale sustainable programs while preserving local ownership and accountability.",
  },
] as const;

export default function PartnershipsPage() {
  return (
    <RebrandPageShell
      eyebrow="Work With Us"
      title="Equitable Partnerships"
      description="Akomapa brings communities, universities, health professionals, researchers, and supporters together around shared goals and mutual accountability."
      highlights={highlights}
    />
  );
}
