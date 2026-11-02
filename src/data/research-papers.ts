export type ResearchPaper = {
  id: string;
  title: string;
  /** Display string for all authors, as cited. */
  authors: string;
  /** Full abstract shown on the detail page. */
  abstract: string;
  /** Short description for the listing and page metadata. Falls back to `abstract`. */
  summary?: string;
  /** Human-readable publication date (e.g. "September 21, 2026"). */
  date: string;
  /** ISO 8601 date used for metadata and structured data. */
  publishedAt?: string;
  /** Journal or venue name, when peer-reviewed or formally published. */
  journal?: string;
  /** Formal citation string, as printed by the publisher. */
  citation?: string;
  /** Bare DOI (no URL prefix). */
  doi?: string;
  /** Canonical article page at the publisher. */
  publisherUrl?: string;
  /** Display name for the publisher link. Falls back to `journal`. */
  publisherName?: string;
  pdfUrl: string;
  image: string;
  slug: string;
};

export const PLOS_GLOBAL_PUBLIC_HEALTH_DOI = "10.1371/journal.pgph.0005092";

export const researchPapers: ResearchPaper[] = [
  {
    id: "2",
    title:
      "Exploring stakeholder support for student-run free clinics to address gaps in non-communicable disease care in Ghana: An exploratory sequential mixed-methods study",
    authors:
      "Brian Amu Fleischer, Esi Berkoh, Bismark Amoh, Afriyie Badu, Derek Anamaale Tuoyire, Jeremy I. Schwartz",
    summary:
      "A peer-reviewed, open-access mixed-methods study of how health professional students, faculty, Ghana Health Service officials, and community members view student-run free clinics as a model for expanding non-communicable disease care in Ghana.",
    abstract:
      "Non-communicable diseases (NCDs), including hypertension and diabetes, are leading causes of morbidity and mortality in Ghana, where underserved communities face persistent barriers to screening, early management, and self-care education. Student-run free clinics (SRFCs) may help address these gaps, but their feasibility in sub-Saharan Africa remains underexplored. We used an exploratory sequential mixed-methods design to examine stakeholder perspectives on and support for SRFCs as a model for expanding NCD care in Ghana. Qualitative data were collected through six focus group discussions with 48 health professional students, six key informant interviews with university faculty, academic leaders, and Ghana Health Service officials, and two focus group discussions with 12 community members. Quantitative surveys of 316 health professional students assessed willingness to participate in SRFCs and associated factors. Thematic analysis, descriptive statistics, and logistic regression were used, and qualitative and quantitative findings were integrated narratively. Stakeholders across all groups expressed strong support for student-led initiatives addressing gaps in NCD care. Findings highlighted students' familiarity with NCDs and barriers to care; strong acceptance of SRFCs as relevant, feasible, and potentially impactful; and endorsement from institutional and community stakeholders. Participants emphasized community impact, hands-on training, and interprofessional collaboration as potential benefits, while identifying academic demands, resource constraints, and safety concerns as possible barriers. Overall, 86.7% of surveyed students were willing to participate in SRFCs. Greater familiarity with NCDs predicted willingness to participate (odds ratio = 1.41, p = 0.007), while final-year students demonstrated lower willingness than pre-clinical and non-final-year clinical students (p = 0.0096). SRFCs represent a promising and contextually relevant model for complementing existing NCD services in Ghana. Successful implementation will require structured supervision, adequate resources, and sustainable integration with universities, communities, and the national health system.",
    date: "September 21, 2026",
    publishedAt: "2026-09-21",
    journal: "PLOS Global Public Health",
    citation:
      "Fleischer BA, Berkoh E, Amoh B, Badu A, Tuoyire DA, Schwartz JI (2026) Exploring stakeholder support for student-run free clinics to address gaps in non-communicable disease care in Ghana: An exploratory sequential mixed-methods study. PLOS Glob Public Health 6(9): e0005092.",
    doi: PLOS_GLOBAL_PUBLIC_HEALTH_DOI,
    publisherUrl: `https://journals.plos.org/globalpublichealth/article?id=${PLOS_GLOBAL_PUBLIC_HEALTH_DOI}`,
    pdfUrl: "/documents/journal.pgph.0005092.pdf",
    image: "/highlights/Akomapa-66.jpg",
    slug: "stakeholder-support-student-run-free-clinics-ghana",
  },
  {
    id: "1",
    title:
      "Exploring Health Professional Student-Led Interventions To Address Gaps In Common Non-Communicable Disease (NCD) Screening, Management, And Self-Care Education In Ghana.",
    authors: "B. A. Fleischer",
    abstract:
      "This research presents the Akomapa model of student-powered community clinics, examining their effectiveness in delivering primary care and chronic disease management in underserved communities across Ghana. We analyze clinical outcomes, patient satisfaction, and the educational impact on student healthcare leaders.",
    date: "January 2025",
    publishedAt: "2025-01",
    publisherName: "EliScholar",
    publisherUrl: "https://elischolar.library.yale.edu/ymtdl/4313",
    pdfUrl: "/documents/research.pdf",
    image: "/highlights/Akomapa-28.jpg",
    slug: "student-led-interventions",
  },
];

export function getResearchPaperBySlug(slug: string) {
  return researchPapers.find((paper) => paper.slug === slug);
}

export function getResearchPaperSummary(paper: ResearchPaper) {
  return paper.summary ?? paper.abstract;
}

export function getDoiUrl(doi: string) {
  return `https://doi.org/${doi}`;
}
