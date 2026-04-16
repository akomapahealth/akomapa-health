import Breadcrumb from "@/components/layout/Breadcrumb";
import CampaignProgress from "@/components/donate/CampaignProgress";
import CorporateCTA from "@/components/donate/CorporateCTA";
import DonateHero from "@/components/donate/DonateHero";
import DonationForm from "@/components/donate/DonationForm";
import ImpactMessaging from "@/components/donate/ImpactMessaging";
import TransparencySection from "@/components/donate/TransparencySection";

export default function DonatePage() {
  return (
    <>
      <div className="container mx-auto">
        <Breadcrumb />
      </div>
      <div className="flex flex-col gap-y-section-mobile md:gap-y-section-tablet lg:gap-y-section-desktop">
        <DonateHero />
        <CampaignProgress />
        <ImpactMessaging />
        <DonationForm />
        <TransparencySection />
        <CorporateCTA />
      </div>
    </>
  );
}
