import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";

export const metadata: Metadata = {
  title: "Corporate Sponsorship",
  description:
    "Partner with Akomapa through corporate sponsorship to fund community health hubs, leadership training, and sustainable health programs.",
};

const highlights = [
  {
    title: "Hub Sponsorship",
    description:
      "Fund the operations of Community Learning & Care Hubs that deliver prevention, screening, and referral services to underserved communities.",
  },
  {
    title: "Training Grants",
    description:
      "Support the Akomapa Academy and leadership development programs that prepare the next generation of ethical health professionals.",
  },
  {
    title: "Community Outreach",
    description:
      "Enable health education, NCD screening campaigns, and community engagement initiatives across our partner sites.",
  },
] as const;

export default function CorporateSponsorshipPage() {
  return (
    <RebrandPageShell
      eyebrow="Support Our Work"
      title="Corporate Sponsorship"
      description="Join leading organizations in supporting community-driven healthcare, ethical leadership development, and sustainable health programs across Ghana and beyond."
      highlights={highlights}
    />
  );
}
