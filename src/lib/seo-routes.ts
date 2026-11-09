import type { MetadataRoute } from "next";

/**
 * A curated share image for a route. Omit it and the route gets a generated
 * branded card instead; no route silently inherits another page's image.
 */
export type SeoRouteImage = {
  /** Committed public/ path, ImageKit path, or absolute URL. */
  src: string;
  alt: string;
  /** Intrinsic size for local or remote files. Omit for ImageKit paths. */
  width?: number;
  height?: number;
};

export type SeoRoute = {
  path: string;
  title: string;
  description: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
  image?: SeoRouteImage;
};

export const canonicalSeoRoutes = [
  {
    path: "/",
    title: "Building Ethical Global Health Leaders",
    description:
      "Akomapa develops ethical, community-centered leaders through healthcare service, leadership training, research, and equitable partnerships.",
    changeFrequency: "weekly",
    priority: 1,
    image: {
      src: "/images/og-homepage.jpg",
      alt:
        "Akomapa homepage: community clinic care with the headline Advancing Noncommunicable Disease Prevention & Care and Explore Our Academy and Partner With Us",
      width: 1200,
      height: 630,
    },
  },
  {
    path: "/about",
    title: "About Akomapa",
    description:
      "Learn about Akomapa's mission to develop ethical global health leaders who partner with communities to address the NCD epidemic.",
    changeFrequency: "monthly",
    priority: 0.8,
    image: {
      src: "/highlights/Akomapa-69.jpg",
      alt:
        "Akomapa student volunteers and a clinician in a white coat standing together on a community street",
    },
  },
  {
    path: "/about/team",
    title: "Our Team",
    description:
      "Meet the student leaders, faculty mentors, and advisors driving Akomapa's mission forward through service, research, and partnership.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/philosophy",
    title: "Our Philosophy",
    description:
      "Discover Akomapa's core principles: ethical leadership, community partnership, reciprocal learning, and sustainable impact.",
    changeFrequency: "monthly",
    priority: 0.8,
    image: {
      src: "/highlights/Akomapa-73.jpg",
      alt:
        "Akomapa student leaders in yellow shirts smiling together outside a community clinic",
    },
  },
  {
    path: "/academy",
    title: "Akomapa Academy",
    description:
      "Train to become an ethical global health leader through Akomapa's comprehensive curriculum, expert faculty, and hands-on experience.",
    changeFrequency: "monthly",
    priority: 0.9,
    image: {
      src: "/highlights/Akomapa-68.jpg",
      alt:
        "Akomapa Academy scholars collaborating in a learning session",
    },
  },
  {
    path: "/community-hubs",
    title: "Community Health Hubs",
    description:
      "Student-powered platforms addressing the NCD epidemic while developing future ethical health leaders through supervised community care.",
    changeFrequency: "monthly",
    priority: 0.9,
    image: {
      src: "/highlights/Akomapa-62.jpg",
      alt:
        "An Akomapa volunteer in a yellow shirt examining a seated patient at a community health hub",
    },
  },
  {
    path: "/community-hubs/ucc",
    title: "UCC Community Health Hub",
    description:
      "Akomapa's flagship hub at the University of Cape Coast serves communities in Ghana's Central Region through student-powered NCD care.",
    changeFrequency: "monthly",
    priority: 0.8,
    image: {
      src: "/highlights/ucc.jpg",
      alt:
        "The University of Cape Coast campus building that hosts the Akomapa UCC Community Health Hub",
    },
  },
  {
    path: "/community-hubs/ug",
    title: "UG Community Health Hub",
    description:
      "Akomapa's University of Ghana Community Health Hub is open and accepting General Training Programme applications from students across all UG campuses.",
    changeFrequency: "monthly",
    priority: 0.8,
    image: {
      src: "/highlights/ug.jpg",
      alt:
        "The University of Ghana Balme Library and lawns, home of the Akomapa UG Community Health Hub",
    },
  },
  {
    path: "/community-hubs/nhp",
    title: "NHP Yale Community Health Hub",
    description:
      "Akomapa's transnational hub in New Haven, CT brings NCD screening and education to trusted barbershops, salons, and neighborhood spaces.",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/ncd-impact",
    title: "NCD Impact",
    description:
      "How Akomapa addresses the silent epidemic of non-communicable diseases through prevention, screening, education, referrals, and care.",
    changeFrequency: "monthly",
    priority: 0.8,
    image: {
      src: "/highlights/Akomapa-40.jpg",
      alt:
        "A woman in a blue headscarf wearing trial eyeglasses at an Akomapa community eye screening",
    },
  },
  {
    path: "/impact",
    title: "Our Impact",
    description:
      "Explore measurable outcomes in community health, leadership development, research, partnerships, and health-system strengthening.",
    changeFrequency: "monthly",
    priority: 0.8,
    image: {
      src: "/highlights/Akomapa-20.jpg",
      alt:
        "Akomapa student volunteers taking blood pressure readings at a roadside market screening table",
    },
  },
  {
    path: "/partnerships",
    title: "Partnerships",
    description:
      "Build equitable collaborations with Akomapa across universities, communities, governments, health systems, and global organizations.",
    changeFrequency: "monthly",
    priority: 0.8,
    image: {
      src: "/highlights/Akomapa-10.jpg",
      alt:
        "Akomapa volunteers in blue and yellow shirts working alongside partners at a community outreach",
    },
  },
  {
    path: "/partnerships/corporate-sponsorship",
    title: "Corporate Sponsorship",
    description:
      "Explore corporate sponsorship opportunities supporting Akomapa community health hubs, training grants, clinic care, pharmacy access, and sustainable programs.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/research",
    title: "Research & Innovation",
    description:
      "Explore student-led research, implementation science, and innovative solutions that strengthen community health systems and NCD care.",
    changeFrequency: "monthly",
    priority: 0.8,
    image: {
      src: "/highlights/Akomapa-61.jpg",
      alt:
        "An Akomapa student volunteer measuring a seated community member's blood pressure",
    },
  },
  {
    path: "/blog",
    title: "Thought Leadership",
    description:
      "Read student essays, faculty reflections, and community voices on ethical global health, leadership, partnership, and community-centered care.",
    changeFrequency: "weekly",
    priority: 0.8,
    image: {
      src: "/highlights/Akomapa-47.jpg",
      alt:
        "A smiling Akomapa student volunteer in a blue shirt and sunglasses outside a community clinic",
    },
  },
  {
    path: "/get-involved",
    title: "Get Involved",
    description:
      "Join Akomapa as a student leader, academy scholar, faculty mentor, researcher, partner, or supporter advancing ethical health leadership.",
    changeFrequency: "monthly",
    priority: 0.9,
    image: {
      src: "/highlights/Akomapa-62.jpg",
      alt:
        "An Akomapa volunteer in a yellow shirt examining a seated patient at a community health hub",
    },
  },
  {
    path: "/donate",
    title: "Donate",
    description:
      "Support ethical global health leadership development and community health programs delivering prevention, screening, education, and care.",
    changeFrequency: "monthly",
    priority: 0.9,
    image: {
      src: "/highlights/Akomapa-73.jpg",
      alt:
        "Akomapa student leaders in yellow shirts smiling together outside a community clinic",
    },
  },
  {
    path: "/contact",
    title: "Contact Us",
    description:
      "Get in touch with Akomapa Health Foundation about programs, partnerships, research, giving, media, or ways to join the movement.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs",
    title: "Programs",
    description:
      "Explore Akomapa programs connecting community health hubs, leadership training, immersion, youth advocacy, research, and sustainable care.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs/akomapa-ghltp",
    title: "Global Health Leadership Training",
    description:
      "Learn about Akomapa's certificate-bearing global health leadership training for ethical, community-centered emerging professionals.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/global-health-immersion-program",
    title: "Global Health Immersion Program",
    description:
      "Explore Akomapa's two-week Global Health Immersion Program in Accra and Cape Coast, Ghana, January 2–15, 2027, with community health and ethical leadership.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/global-health-immersion-program/payment-terms",
    title: "Immersion Program Payment and Refund Terms",
    description:
      "Deposit, balance, and refund terms for Akomapa's January 2027 Global Health Immersion Program, including payment deadlines and the refund request cutoff.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/programs/akomapa-young-advocates",
    title: "Akomapa Young Advocates",
    description:
      "Empower high school students with NCD prevention, mental wellness, mentorship, and leadership through Akomapa Young Advocates.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs/akomapa-network",
    title: "Akomapa Network",
    description:
      "Connect student-powered clinics and partners through Akomapa's global network for mentorship, research, and community health learning.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/programs/akomapa-foods",
    title: "Akomapa Foods & Stores",
    description:
      "Learn how Akomapa Foods and Stores link food security, economic empowerment, nutrition, and sustainable community health funding.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/news",
    title: "Akomapa News",
    description:
      "Read Akomapa news, awards, partnerships, program launches, and milestones shaping ethical leadership and student-powered care.",
    changeFrequency: "weekly",
    priority: 0.7,
    image: {
      src: "/highlights/Akomapa-2.jpg",
      alt:
        "Akomapa student volunteers in blue shirts screening a community member at a clinic table",
    },
  },
  {
    path: "/resources",
    title: "Healthcare Resources",
    description:
      "Access Akomapa educational resources, research publications, program tools, and materials supporting community health learning.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/roadmap",
    title: "Akomapa Roadmap",
    description:
      "Follow Akomapa's roadmap for launching, learning, scaling, and sustaining student-powered community health and leadership programs.",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "Review Akomapa Health Foundation's privacy practices for website visitors, applicants, donors, partners, and community members.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    path: "/cookie-policy",
    title: "Cookie Policy",
    description:
      "See which cookies and browser storage Akomapa Health uses, why we use them, and how to accept, reject, or change optional analytics.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Read Akomapa Health Foundation's website terms covering acceptable use, content, donations, third-party services, and limitations.",
    changeFrequency: "yearly",
    priority: 0.4,
  },
] as const satisfies readonly SeoRoute[];

export const noindexRoutes = [
  {
    path: "/sentry-example-page",
    title: "Sentry Diagnostics",
    description:
      "A private diagnostics page for validating Akomapa Health Foundation error monitoring and frontend reporting behavior, excluded from search.",
  },
] as const;

export const canonicalSeoRouteMap = new Map<string, SeoRoute>(
  canonicalSeoRoutes.map((route) => [route.path, route]),
);
