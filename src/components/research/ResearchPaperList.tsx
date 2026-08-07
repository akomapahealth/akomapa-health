import { FadeIn } from "@/components/animations";
import { PublicationEntry } from "@/components/publication";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { researchPapers } from "@/data/research-papers";

export default function ResearchPaperList() {
  return (
    <EditorialBand
      tone="cream"
      marker="01"
      aria-labelledby="research-publications-heading"
    >
      <FadeIn>
        <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
          Our Science
        </EditorialEyebrow>
        <EditorialHeading
          id="research-publications-heading"
          className="mt-4 max-w-3xl"
        >
          Research Publications
        </EditorialHeading>
        <EditorialLead className="mt-5 max-w-3xl">
          Explore our latest research findings and contributions to healthcare
          innovation, student-powered care models, and community health
          outcomes.
        </EditorialLead>
      </FadeIn>

      <div className="mt-12 max-w-5xl">
        {researchPapers.map((paper, index) => (
          <FadeIn key={paper.id} delay={index * 0.05}>
            <PublicationEntry
              href={`/research/${paper.slug}`}
              title={paper.title}
              description={paper.abstract}
              image={paper.image}
              imageAlt={paper.title}
              ctaLabel="Read Paper"
              meta={[
                { label: "Authors", value: paper.authors },
                { label: "Published", value: paper.date },
              ]}
            />
          </FadeIn>
        ))}
      </div>
    </EditorialBand>
  );
}
