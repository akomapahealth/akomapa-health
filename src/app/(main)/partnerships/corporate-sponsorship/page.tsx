import type { Metadata } from "next";
import RebrandPageShell from "@/components/shared/RebrandPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata(
  "/partnerships/corporate-sponsorship",
);

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
    title: "Community Engagement",
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
