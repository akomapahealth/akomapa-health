import { Program } from "@/lib/types";

export const programs: Program[] = [
  {
    id: "1",
    title: "Community Clinics",
    slug: "community-clinics",
    description: "Establishing healthcare facilities in underserved areas to provide essential medical services.",
    fullDescription: "Our Community Clinics program focuses on establishing sustainable healthcare facilities in areas with limited access to medical services. These clinics serve as primary care centers, providing essential health services including preventive care, maternal and child health, treatment for common illnesses, and management of chronic conditions.",
    approach: "We work closely with local communities and authorities to identify areas of greatest need and establish clinics that address specific local health challenges. Each clinic is staffed by trained healthcare professionals, many of whom come from the communities they serve. We ensure sustainable operations through a combination of community involvement, government partnerships, and strategic resource management.",
    category: "Healthcare Access",
    image: "/images/programs/community-clinics.jpg",
    established: "2012",
    locations: ["Ghana", "Kenya", "Ethiopia"],
    peopleServed: "50,000+ annually",
    keyPoints: [
      "Primary healthcare services for underserved communities",
      "Maternal and child health services",
      "Chronic disease management",
      "Health screenings and preventive care",
      "Referral networks for specialized care"
    ],
    impacts: [
      "Established 75 community clinics across three countries",
      "Reduced average travel time to healthcare facilities by 70%",
      "Decreased maternal mortality by 45% in served communities",
      "Improved management of chronic conditions for 12,000+ patients",
      "Created sustainable healthcare jobs for local professionals"
    ]
  },
  {
    id: "2",
    title: "Health Education",
    slug: "health-education",
    description: "Empowering communities with knowledge about preventive healthcare and disease management.",
    fullDescription: "Our Health Education program aims to improve health literacy and empower communities to take charge of their wellbeing. Through various educational formats and channels, we provide accurate, accessible information on preventive healthcare, nutrition, hygiene, disease management, and maternal and child health.",
    approach: "We develop culturally appropriate educational materials and programs delivered through community workshops, school-based programs, media campaigns, and digital platforms. Our approach emphasizes interactive learning, practical demonstrations, and peer education to ensure information is not just received but applied in daily life.",
    category: "Education",
    image: "/images/programs/health-education.jpg",
    established: "2011",
    locations: ["Ghana", "Kenya", "Nigeria", "Uganda"],
    peopleServed: "200,000+ annually",
    keyPoints: [
      "Community health workshops and training",
      "School-based health education",
      "Digital learning platforms and mobile health information",
      "Training of community health educators",
      "Development of culturally appropriate health materials"
    ],
    impacts: [
      "Trained 3,500+ community health educators",
      "Implemented health education programs in 420 schools",
      "Reached 200,000+ individuals through direct education programs",
      "Achieved 65% improvement in health knowledge among program participants",
      "Documented 40% increase in preventive health practices in target communities"
    ]
  },
  {
    id: "3",
    title: "Medical Training",
    slug: "medical-training",
    description: "Building healthcare capacity through professional development and training programs.",
    fullDescription: "Our Medical Training program addresses the critical shortage of healthcare professionals in underserved regions. We provide comprehensive training and continuing education for doctors, nurses, community health workers, and other healthcare staff to enhance their skills and knowledge in delivering quality healthcare services.",
    approach: "Through partnerships with medical institutions, we offer specialized training programs tailored to local healthcare needs. Our training combines classroom learning, practical skills development, mentorship, and ongoing professional support. We focus on building both clinical competencies and leadership skills to create sustainable healthcare capacity.",
    category: "Professional Development",
    image: "/images/programs/medical-training.jpg",
    established: "2014",
    locations: ["Ghana", "Tanzania", "Rwanda"],
    peopleServed: "1,200+ healthcare professionals trained",
    keyPoints: [
      "Clinical skills training for healthcare professionals",
      "Community health worker certification programs",
      "Specialized training in maternal and child health",
      "Leadership and healthcare management education",
      "Continuing medical education and professional development"
    ],
    impacts: [
      "Trained 1,200+ healthcare professionals across multiple disciplines",
      "Established 8 training centers in partnership with local medical institutions",
      "Improved quality of care metrics by 35% in facilities with trained staff",
      "Reduced medical errors by 40% through targeted clinical training",
      "Created sustainable training programs now integrated into national systems"
    ]
  },
  {
    id: "4",
    title: "Research Initiatives",
    slug: "research",
    description: "Advancing healthcare knowledge through innovative research focused on improving health outcomes.",
    fullDescription: "Our Research Initiatives program drives evidence-based improvements in healthcare through rigorous, contextually relevant research. We investigate key health challenges, evaluate intervention effectiveness, and develop innovative approaches to healthcare delivery that are appropriate for resource-limited settings.",
    approach: "We conduct research in collaboration with academic institutions, healthcare facilities, and communities. Our studies range from clinical trials to implementation science, health systems research, and community-based participatory research. We prioritize translating research findings into practical applications that can improve healthcare policies and practices.",
    category: "Research",
    image: "/images/programs/research-initiatives.jpg",
    established: "2015",
    locations: ["Pan-African", "Global collaborations"],
    peopleServed: "Indirect impact on millions through improved healthcare approaches",
    keyPoints: [
      "Health systems and implementation research",
      "Clinical studies on prevalent health conditions",
      "Evaluation of healthcare interventions",
      "Development of innovative medical technologies",
      "Knowledge dissemination and policy advocacy"
    ],
    impacts: [
      "Published 45+ peer-reviewed research papers",
      "Developed 12 practical healthcare delivery models now in use",
      "Influenced national healthcare policies in 4 countries",
      "Secured $8M+ in research grants for critical health studies",
      "Established research partnerships with 15 global institutions"
    ]
  }
];