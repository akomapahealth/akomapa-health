import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: "Our Philosophy",
  description:
    "Discover Akomapa's philosophy of ethical leadership, community ownership, and equitable global health partnership.",
};

const highlights = [
  {
    title: "Ethical Leadership",
    description:
      "We prepare emerging health professionals to lead with humility, accountability, and respect for the communities they serve.",
  },
  {
    title: "Community Ownership",
    description:
      "Local priorities and lived experience guide the solutions, relationships, and measures of success that we build together.",
  },
  {
    title: "Equitable Partnership",
    description:
      "We pursue long-term collaboration grounded in shared decision-making, mutual learning, and sustainable impact.",
  },
] as const;

export default function PhilosophyPage() {
  return (
    <RebrandPageShell
      eyebrow="Our Foundation"
      title="Our Philosophy"
      description={BRAND.mission}
      highlights={highlights}
    />
  );
}
