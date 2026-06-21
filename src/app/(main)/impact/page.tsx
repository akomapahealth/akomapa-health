import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "Explore Akomapa's growing impact across community health, ethical leadership development, research, and equitable partnerships.",
};

const highlights = [
  {
    title: "Health Access",
    description:
      "Community-centered initiatives expand access to prevention, screening, health education, and pathways to care.",
  },
  {
    title: "Leaders Developed",
    description:
      "Students and emerging professionals gain practical experience grounded in ethics, reflection, and accountable service.",
  },
  {
    title: "Knowledge Shared",
    description:
      "Research and innovation turn community learning into evidence that can strengthen programs, partnerships, and health systems.",
  },
] as const;

export default function ImpactPage() {
  return (
    <RebrandPageShell
      eyebrow="Measuring Progress"
      title="Our Impact"
      description={BRAND.vision}
      highlights={highlights}
    />
  );
}
