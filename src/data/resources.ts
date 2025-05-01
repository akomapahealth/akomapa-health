import { Resource } from "@/lib/types";

export const resources: Resource[] = [
  {
    id: "resource-1",
    title: "Maternal Health Guidelines for Community Health Workers",
    description: "Comprehensive guidelines for community health workers on providing maternal healthcare support.",
    category: "education",
    type: "PDF",
    image: "/images/resources/maternal-health.jpg",
    url: "/documents/sample-resources/maternal-health-guidelines.pdf",
    downloadUrl: "/documents/sample-resources/maternal-health-guidelines.pdf",
    programs: ["community-clinics", "health-education"],
    date: "2023-03-15"
  },
  {
    id: "resource-2",
    title: "Preventive Healthcare Practices Toolkit",
    description: "Educational materials for teaching preventive healthcare practices in community settings.",
    category: "education",
    type: "Toolkit",
    image: "/images/resources/preventive-care.jpg",
    url: "/resources/preventive-healthcare-toolkit",
    downloadUrl: "/documents/sample-resources/preventive-healthcare-toolkit.zip",
    programs: ["health-education"],
    date: "2023-05-20"
  },
  {
    id: "resource-3",
    title: "Impact of Community Clinics on Rural Health Outcomes",
    description: "Research study examining the effectiveness of community clinics in improving rural health metrics.",
    category: "research",
    type: "Article",
    image: "/images/resources/research-paper.jpg",
    url: "https://example.com/research/community-clinics-impact",
    programs: ["community-clinics", "research"],
    date: "2023-01-10"
  },
  {
    id: "resource-4",
    title: "Basic Life Support Training Video",
    description: "Video training on basic life support techniques for healthcare workers in resource-limited settings.",
    category: "education",
    type: "Video",
    image: "/images/resources/life-support.jpg",
    url: "https://www.youtube.com/watch?v=example",
    programs: ["medical-training"],
    date: "2022-11-05"
  },
  {
    id: "resource-5",
    title: "Chronic Disease Management Handbook",
    description: "Guide for healthcare providers on managing chronic diseases in community settings.",
    category: "guide",
    type: "PDF",
    image: "/images/resources/chronic-disease.jpg",
    url: "/documents/sample-resources/chronic-disease-handbook.pdf",
    downloadUrl: "/documents/sample-resources/chronic-disease-handbook.pdf",
    programs: ["community-clinics", "medical-training"],
    date: "2023-02-28"
  },
  {
    id: "resource-6",
    title: "Innovations in Rural Healthcare Delivery",
    description: "Case studies of innovative approaches to healthcare delivery in rural and underserved areas.",
    category: "research",
    type: "Article",
    image: "/images/resources/innovation.jpg",
    url: "/resources/innovations-rural-healthcare",
    programs: ["research", "community-clinics"],
    date: "2022-12-15"
  },
  {
    id: "resource-7",
    title: "Community Health Education Curriculum",
    description: "Structured curriculum for training community members on essential health topics.",
    category: "education",
    type: "Toolkit",
    image: "/images/resources/curriculum.jpg",
    url: "/documents/sample-resources/health-education-curriculum.pdf",
    downloadUrl: "/documents/sample-resources/health-education-curriculum.pdf",
    programs: ["health-education"],
    date: "2023-04-10"
  },
  {
    id: "resource-8",
    title: "Health Facility Management Guidelines",
    description: "Best practices for managing healthcare facilities in resource-constrained environments.",
    category: "guide",
    type: "PDF",
    image: "/images/resources/facility-management.jpg",
    url: "/documents/sample-resources/facility-management.pdf",
    downloadUrl: "/documents/sample-resources/facility-management.pdf",
    programs: ["community-clinics", "medical-training"],
    date: "2022-10-18"
  },
  {
    id: "resource-9",
    title: "Maternal and Child Health Infographic Series",
    description: "Visual educational materials on key maternal and child health topics for community education.",
    category: "education",
    type: "Infographic",
    image: "/images/resources/infographics.jpg",
    url: "/resources/maternal-child-infographics",
    downloadUrl: "/documents/sample-resources/maternal-child-infographics.zip",
    programs: ["health-education", "community-clinics"],
    date: "2023-06-05"
  }
];