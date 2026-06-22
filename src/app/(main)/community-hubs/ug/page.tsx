import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";

export const metadata: Metadata = {
  title: "Akomapa UG Community Health Hub",
  description:
    "Learn about the Akomapa UG Community Health Hub at the University of Ghana — locally led prevention, screening, referral, and health learning.",
};

const highlights = [
  {
    title: "University Partnership",
    description:
      "Collaborating with the University of Ghana to strengthen community health outcomes and develop ethical health leaders.",
  },
  {
    title: "Community Health",
    description:
      "Tackling non-communicable diseases through integrated prevention, screening, and referral services in local communities.",
  },
  {
    title: "Student Development",
    description:
      "Equipping students with leadership skills and practical experience in community-centered healthcare.",
  },
] as const;

export default function UGHubPage() {
  return (
    <RebrandPageShell
      eyebrow="Community Health Hub"
      title="Akomapa UG Hub"
      description="The Akomapa UG Community Health Hub at the University of Ghana partners with students, faculty, and communities to deliver care and develop the next generation of ethical health leaders."
      highlights={highlights}
    />
  );
}
