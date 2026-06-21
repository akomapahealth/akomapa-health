import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: "Akomapa Academy",
  description:
    "Explore Akomapa Academy's approach to ethical global health leadership education, mentorship, and applied community learning.",
};

const highlights = [
  {
    title: "Leadership Education",
    description:
      "A practical curriculum develops the ethical judgment, systems thinking, and collaborative skills required in global health.",
  },
  {
    title: "Mentorship",
    description:
      "Students and emerging professionals learn alongside experienced practitioners, researchers, and community leaders.",
  },
  {
    title: "Applied Learning",
    description:
      "Education connects directly to community-centered service, research, innovation, and measurable health priorities.",
  },
] as const;

export default function AcademyPage() {
  return (
    <RebrandPageShell
      eyebrow="Leadership Development"
      title="Akomapa Academy"
      description={BRAND.heroSubheadline}
      highlights={highlights}
    />
  );
}
