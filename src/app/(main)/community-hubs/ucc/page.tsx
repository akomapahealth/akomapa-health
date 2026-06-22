import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";

export const metadata: Metadata = {
  title: "Akomapa UCC Community Health Hub",
  description:
    "Learn about the Akomapa UCC Community Health Hub at the University of Cape Coast — locally led prevention, screening, referral, and health learning.",
};

const highlights = [
  {
    title: "University Partnership",
    description:
      "Working alongside the University of Cape Coast to develop ethical health leaders through community-centered practice.",
  },
  {
    title: "Community Health",
    description:
      "Addressing the NCD epidemic through prevention, screening, education, and referral in partnership with local communities.",
  },
  {
    title: "Student Development",
    description:
      "Providing students with hands-on experience in ethical, community-driven healthcare delivery and leadership.",
  },
] as const;

export default function UCCHubPage() {
  return (
    <RebrandPageShell
      eyebrow="Community Health Hub"
      title="Akomapa UCC Hub"
      description="The Akomapa UCC Community Health Hub at the University of Cape Coast brings together students, faculty, and community partners to improve access to care while developing future health leaders."
      highlights={highlights}
    />
  );
}
