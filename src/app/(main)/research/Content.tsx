import Breadcrumb from "@/components/layout/Breadcrumb";
import ResearchContactCta from "@/components/research/ResearchContactCta";
import ResearchHero from "@/components/research/ResearchHero";
import ResearchPaperList from "@/components/research/ResearchPaperList";

export default function Content() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>
      <ResearchHero />
      <ResearchPaperList />
      <ResearchContactCta />
    </div>
  );
}
