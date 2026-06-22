import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";

export const metadata: Metadata = {
  title: "Akomapa NHP Yale Community Health Hub",
  description:
    "Learn about the Akomapa NHP Yale Community Health Hub — a global partnership for prevention, screening, referral, and health learning.",
};

const highlights = [
  {
    title: "Global Partnership",
    description:
      "A collaboration with Yale's New Haven Program bridging global health education with community-centered care.",
  },
  {
    title: "Community Health",
    description:
      "Delivering NCD prevention, screening, and health education through equitable, community-driven approaches.",
  },
  {
    title: "Student Development",
    description:
      "Creating opportunities for students to develop ethical leadership skills through cross-cultural health partnerships.",
  },
] as const;

export default function NHPYaleHubPage() {
  return (
    <RebrandPageShell
      eyebrow="Community Health Hub"
      title="Akomapa NHP Yale Hub"
      description="The Akomapa NHP Yale Community Health Hub connects students and faculty across institutions to address health inequities through ethical, community-centered practice and global collaboration."
      highlights={highlights}
    />
  );
}
