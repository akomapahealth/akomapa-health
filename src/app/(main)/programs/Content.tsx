import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { CONTACT } from "@/config/contact";

interface Program {
  id: number;
  title: string;
  description: string;
  details: string[];
  href: string;
  image: string;
  alt: string;
  features?: string[];
  ctaLabel: string;
}

const programs: Program[] = [
  {
    id: 1,
    title: "Akomapa Clinics",
    description:
      "We establish interprofessional, expert-supervised clinics built in partnership with local health authorities, traditional leaders, and community members. These student-powered community health hubs deliver free, community-based care focused on the early detection and management of non-communicable diseases (NCDs), serving as both real-world classrooms for students and lifelines for underserved communities.",
    details: [
      "Interprofessional student teams coordinate care across medical, nursing, pharmacy, nutrition, and public health disciplines",
      "Expert supervision ensures every patient encounter meets the highest clinical and ethical standards",
      "Community-rooted model transforms trusted spaces into care hubs accessible to families",
      "Free services focus on NCD screening, counseling, and referrals with cultural sensitivity",
    ],
    href: "/community-hubs",
    image: "/highlights/Akomapa-28.jpg",
    alt: "Akomapa clinic team providing community healthcare",
    features: [
      "Community-Based Care",
      "Student Leadership",
      "Expert Supervision",
      "Local Partnership",
    ],
    ctaLabel: "Explore Akomapa Clinics",
  },
  {
    id: 2,
    title: "The Akomapa Network",
    description:
      "Our global community of practice connects Akomapa chapters with partner student-powered clinics around the world—like SHAWCO, South Side SRFC, and Yale's Neighborhood Health Project—to share best practices, mentorship, and collaborative research. Together, we're turning local innovations into global impact.",
    details: [
      "Connects student-powered clinics across continents to share innovations and learnings",
      "Facilitates mentorship exchanges between experienced and emerging clinic leaders",
      "Enables collaborative research that strengthens evidence for student-powered care",
      "Builds a global movement of health professionals committed to equity and access",
    ],
    href: "/programs/akomapa-network",
    image: "/highlights/Akomapa-40.jpg",
    alt: "Global network of student healthcare leaders",
    features: [
      "Global Community",
      "Knowledge Sharing",
      "Mentorship Exchange",
      "Collaborative Research",
    ],
    ctaLabel: "Discover the Akomapa Network",
  },
  {
    id: 3,
    title: "Global Health Leadership Training Program",
    description:
      "We equip emerging health leaders with the skills, ethics, and cross-cultural experience needed to drive equitable change. Through expert-led courses, interactive seminars, and global mentorship, students learn to merge clinical care with leadership and systems thinking.",
    details: [
      "Intensive leadership curriculum combining classroom learning with hands-on rotations",
      "Expert-led courses on ethics, cultural humility, and systems thinking",
      "Interactive seminars with global health leaders from Yale, UCLA, and University of Cape Coast",
      "Mentorship program connecting students with experienced practitioners worldwide",
    ],
    href: "/programs/akomapa-ghltp",
    image: "/highlights/Akomapa-66.jpg",
    alt: "Students participating in leadership training",
    features: [
      "Leadership Development",
      "Expert Mentorship",
      "Cross-Cultural Training",
      "Systems Thinking",
    ],
    ctaLabel: "Join the Leadership Program",
  },
  {
    id: 4,
    title: "Akomapa Young Advocates",
    description:
      "The Akomapa Young Advocates Program is a youth empowerment and health education initiative that brings community health, mentorship, and leadership development directly to high schools. Led by interprofessional university health professional students trained through Akomapa clinics, the program equips young people with practical knowledge about non-communicable diseases (NCDs) such as hypertension and diabetes, mental wellness, and preventive health so they can become champions of healthy living and positive change in their schools and communities.",
    details: [
      "Interactive health education sessions delivered directly in high schools by trained student mentors",
      "Practical knowledge about non-communicable diseases (NCDs), stress management, and preventive health measures",
      "Ongoing mentorship that nurtures the next generation of ethical, community-minded leaders",
      "Bridges education and action, empowering youth to become health champions in their communities",
    ],
    href: "/programs/akomapa-young-advocates",
    image: "/highlights/Akomapa-40.jpg",
    alt: "Young advocates participating in health education",
    features: [
      "Youth Empowerment",
      "Health Education",
      "Mentorship",
      "Leadership Development",
    ],
    ctaLabel: "Join the Akomapa Young Advocates",
  },
  {
    id: 5,
    title: "Akomapa Foods & Stores",
    description:
      "The Akomapa Foods & Stores Initiative is the sustainability arm of the Akomapa Health model—connecting food security, economic empowerment, and healthcare access into one self-sustaining ecosystem. We believe that health doesn't start in hospitals; it starts in homes, kitchens, and markets. By linking agriculture and nutrition to our student-powered community health hubs, Akomapa creates a cycle where communities not only receive care but also co-own the means to sustain it.",
    details: [
      "Community farms and food stores that make healthy, affordable food accessible to families",
      "Revenue from food sales directly supports clinic operations, creating a self-sustaining model",
      "Addresses food insecurity while promoting nutrition and reducing long-term health complications",
      "Economic empowerment that strengthens local economies and builds community ownership",
    ],
    href: "/programs/akomapa-foods",
    image: "/highlights/Akomapa-19.jpg",
    alt: "Community farm and food store initiative",
    features: [
      "Food Security",
      "Economic Empowerment",
      "Self-Sustaining Model",
      "Community Ownership",
    ],
    ctaLabel: "Discover the Akomapa Foods & Stores",
  },
];

const impactMetrics = [
  {
    value: 1000,
    suffix: "+",
    label: "Students Trained",
    description:
      "Emerging health leaders equipped with skills to transform healthcare systems",
  },
  {
    value: 15,
    suffix: "+",
    label: "Partner Clinics",
    description:
      "Student-powered clinics connected through the Akomapa Network worldwide",
  },
  {
    value: 6,
    label: "Programs & Initiatives",
    description:
      "Comprehensive programs working together to deliver holistic healthcare",
  },
  {
    value: 50,
    suffix: "+",
    label: "Global Mentors",
    description:
      "Expert practitioners guiding the next generation of health leaders",
  },
] as const;

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t lg:border-l lg:border-t-0",
  "border-t sm:border-l lg:border-l",
] as const;

export default function Content() {
  return (
    <>
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="programs-hero-heading"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <FadeIn className="lg:col-span-7 lg:pb-4">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Programs
            </EditorialEyebrow>
            <EditorialHeading
              as="h1"
              id="programs-hero-heading"
              className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
            >
              Students. Communities. Partnerships. One Vision for Health.
            </EditorialHeading>
            <EditorialLead className="mt-7 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
              At Akomapa, we&apos;re reimagining how the next generation of
              health professionals learn, lead, and serve. Through our
              integrated programs, we build student-powered community health
              hubs, leadership pathways, and global partnerships that make care
              more accessible—while preparing students to transform the health
              systems of tomorrow.
            </EditorialLead>
          </FadeIn>

          <FadeIn direction="left" delay={0.15} className="relative lg:col-span-5">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C] lg:aspect-[4/5]">
              <Image
                src="/highlights/Akomapa-47.jpg"
                alt="Akomapa programs and initiatives"
                fill
                priority
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="01"
        id="programs-list"
        aria-labelledby="programs-list-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Our Programs
            </EditorialEyebrow>
            <EditorialHeading id="programs-list-heading" className="mt-4">
              Integrated Pathways for Impact
            </EditorialHeading>
            <EditorialLead className="mt-5">
              Each program is designed to build upon the others, creating a
              comprehensive ecosystem that prepares students, serves
              communities, and transforms healthcare systems.
            </EditorialLead>
          </div>
        </FadeIn>

        <ol className="mt-12 space-y-0 border-t border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20">
          {programs.map((program, index) => (
            <li
              key={program.id}
              className="border-b border-[#1C1F1E]/15 py-12 dark:border-[#FCFAEF]/20 lg:py-16"
            >
              <FadeIn>
                <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
                  <div
                    className={`relative lg:col-span-5 ${
                      index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -top-3 left-0 z-10 h-1 w-16 bg-[#eeba2b]"
                    />
                    <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#1C1F1E]/10 bg-[#E6E7E7] dark:border-[#FCFAEF]/15 dark:bg-[#2F3332]">
                      <Image
                        src={program.image}
                        alt={program.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div
                    className={`lg:col-span-7 ${
                      index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#0097b2]/55 dark:text-[#66C4DC]/65"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-heading text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-3xl">
                      {program.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base">
                      {program.description}
                    </p>

                    {program.features ? (
                      <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                        {program.features.map((feature) => (
                          <li
                            key={feature}
                            className="font-subheading text-xs font-bold uppercase tracking-[0.15em] text-[#0F4C5C] dark:text-[#66C4DC]"
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <ul className="mt-6 max-w-2xl space-y-3 border-t border-[#1C1F1E]/10 pt-5 dark:border-[#FCFAEF]/15">
                      {program.details.slice(0, 2).map((detail) => (
                        <li
                          key={detail}
                          className="text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base"
                        >
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7">
                      <EditorialButton href={program.href} variant="solid">
                        {program.ctaLabel}
                      </EditorialButton>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="02"
        id="programs-impact"
        aria-labelledby="programs-impact-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Our Impact
            </EditorialEyebrow>
            <EditorialHeading
              id="programs-impact-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Building a Movement, One Program at a Time
            </EditorialHeading>
            <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Our programs work together to create lasting change—training
              leaders, connecting communities, and transforming healthcare
              systems worldwide.
            </EditorialLead>
          </div>
        </FadeIn>

        <FadeInStagger className="mt-12">
          <dl className="grid border-y border-[#FCFAEF]/25 sm:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((metric, index) => (
              <FadeInStaggerItem key={metric.label} direction="up">
                <div
                  className={`flex min-h-40 flex-col justify-between px-1 py-7 sm:px-6 ${metricDividerClasses[index]} border-[#FCFAEF]/25`}
                >
                  <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/70">
                    {metric.label}
                  </dt>
                  <dd className="mt-6">
                    <AnimatedMetric
                      value={metric.value}
                      suffix={"suffix" in metric ? metric.suffix : ""}
                      className="font-heading text-4xl font-semibold tracking-tight text-[#FCFAEF] md:text-5xl"
                    />
                    <p className="mt-3 text-sm leading-relaxed text-[#FCFAEF]/80">
                      {metric.description}
                    </p>
                  </dd>
                </div>
              </FadeInStaggerItem>
            ))}
          </dl>
        </FadeInStagger>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="03"
        id="programs-cta"
        aria-labelledby="programs-cta-heading"
        className="border-t border-[#FCFAEF]/15 bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Get Involved
            </EditorialEyebrow>
            <EditorialHeading
              id="programs-cta-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Be Part of the Movement
            </EditorialHeading>
            <EditorialLead className="mx-auto mt-6 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Your support powers every program. Whether through financial
              contributions, in-kind donations, or strategic partnerships—there&apos;s
              a place for you at Akomapa.
            </EditorialLead>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <EditorialButton href="/partnerships" variant="light">
                Partner with Us
              </EditorialButton>
              <EditorialButton
                href={CONTACT.email.href}
                variant="outline-light"
                external
              >
                Contact Us
              </EditorialButton>
            </div>
          </div>
        </FadeIn>
      </EditorialBand>
    </>
  );
}
