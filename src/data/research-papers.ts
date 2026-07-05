export type ResearchPaper = {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  date: string;
  pdfUrl: string;
  image: string;
  slug: string;
};

export const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    title:
      "Exploring Health Professional Student-Led Interventions To Address Gaps In Common Non-Communicable Disease (NCD) Screening, Management, And Self-Care Education In Ghana.",
    authors: "B. A. Fleischer",
    abstract:
      "This research presents the Akomapa model of student-powered community clinics, examining their effectiveness in delivering primary care and chronic disease management in underserved communities across Ghana. We analyze clinical outcomes, patient satisfaction, and the educational impact on student healthcare leaders.",
    date: "January 2025",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-28.jpg",
    slug: "student-led-interventions",
  },
];

export function getResearchPaperBySlug(slug: string) {
  return researchPapers.find((paper) => paper.slug === slug);
}
