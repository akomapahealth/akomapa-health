import NextImage from "next/image";
import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import Breadcrumb from "@/components/layout/Breadcrumb";
import GhltpTestimonialsCarousel from "@/components/programs/GhltpTestimonialsCarousel";
import ProgramDetailHero from "@/components/programs/ProgramDetailHero";
import ProgramFactSummary from "@/components/programs/ProgramFactSummary";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

const coreThemes = [
  {
    id: "theme-1",
    title: "Community Engagement",
    description: "Partnering authentically with local voices and systems.",
  },
  {
    id: "theme-2",
    title: "Cultural Humility",
    description: "Practicing reflective, inclusive leadership.",
  },
  {
    id: "theme-3",
    title: "Ethical Leadership",
    description: "Navigating complexity with transparency and accountability.",
  },
  {
    id: "theme-4",
    title: "Interprofessional Collaboration",
    description: "Working across disciplines for integrated care.",
  },
  {
    id: "theme-5",
    title: "Health Systems Innovation",
    description: "Designing and scaling creative, context-driven solutions.",
  },
  {
    id: "theme-6",
    title: "Sustainable Systems Building",
    description: "Ensuring impact that outlives projects and individuals.",
  },
] as const;

const programFeatures = [
  {
    id: "feature-1",
    title: "Featured Speaker Series",
    description:
      "Renowned global health leaders from WHO, Yale, UCLA, University of Ghana, and beyond share insights on leadership and equity.",
  },
  {
    id: "feature-2",
    title: "Student-Led Discussions",
    description:
      "Each week, students moderate conversations, lead reflections, and present on local/global case studies.",
  },
  {
    id: "feature-3",
    title: "Interactive Assignments",
    description:
      "Real-world challenges drawn from Akomapa's clinics and global partner sites, encouraging systems thinking and problem-solving.",
  },
  {
    id: "feature-4",
    title: "Capstone Project",
    description:
      "Each participant designs a practical, community-driven intervention plan with mentorship from Akomapa faculty and field partners.",
  },
] as const;

const learningBenefits = [
  {
    id: "benefit-1",
    title: "Mentorship Access",
    description: "Mentorship from Akomapa's global advisory network",
  },
  {
    id: "benefit-2",
    title: "Case-Based Learning",
    description:
      "Case-based learning from active student-powered community health hubs",
  },
  {
    id: "benefit-3",
    title: "Immersion Program",
    description: "Invitations to the Akomapa Global Health Immersion Program",
  },
  {
    id: "benefit-4",
    title: "Networking Sessions",
    description: "Global networking sessions and leadership roundtables",
  },
  {
    id: "benefit-5",
    title: "Leadership Summit",
    description:
      "Priority participation in the annual Akomapa Global Health Leadership Summit",
  },
] as const;

const facultyInstitutions = [
  {
    id: "faculty-1",
    name: "Yale School of Medicine",
    logo: "/images/partners/yale-sm-logo.png",
    width: 280,
    height: 140,
  },
  {
    id: "faculty-2",
    name: "University of Cape Coast",
    logo: "/images/partners/ucc.png",
    width: 280,
    height: 140,
  },
  {
    id: "faculty-3",
    name: "University of Ghana",
    logo: "/images/partners/ug-logo.png",
    width: 280,
    height: 140,
  },
  {
    id: "faculty-4",
    name: "David Geffen School of Medicine at UCLA",
    logo: "/images/partners/ucla.png",
    width: 280,
    height: 140,
  },
  {
    id: "faculty-5",
    name: "Ghana Health Service",
    logo: "/images/partners/ghana-health-service-logo.png",
    width: 280,
    height: 140,
  },
] as const;

const programFacts = [
  { label: "Duration", value: "10–16 weeks (semester-long)" },
  {
    label: "Format",
    value: "Virtual and hybrid delivery (live + asynchronous)",
  },
  {
    label: "Structure",
    value: "Weekly live sessions, peer discussions, and applied projects",
  },
  {
    label: "Certification",
    value:
      "Akomapa Certificate in Global Health Leadership awarded upon completion",
  },
] as const;

const impactGoals = [
  {
    value: 1000,
    suffix: "+",
    description:
      "Train students and young professionals in ethical, community-driven leadership",
  },
  {
    value: 5,
    suffix: "+",
    description:
      "Build a sustainable pipeline of interprofessional global health leaders across countries",
  },
  {
    value: 1,
    suffix: "",
    description:
      "Strengthen links between academic learning and real-world systems change through the Akomapa Network",
  },
] as const;

const metricDividerClasses = [
  "",
  "border-t md:border-l md:border-t-0",
  "border-t md:border-l md:border-t-0",
] as const;

export default function Content() {
  return (
    <>
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <ProgramDetailHero
        eyebrow="Akomapa Global Health Leadership Training Program"
        title="Training the Next Generation of Ethical, Compassionate, and Impact-Driven Health Leaders"
        lead="A semester-long, certificate-bearing course that equips emerging health professionals with the knowledge, empathy, and vision to lead transformative change in global health."
        image="/highlights/Akomapa-40.jpg"
        imageAlt="Global health leadership training program"
        ctas={[
          { href: "/get-involved", label: "Apply Now", variant: "amber" },
          {
            href: "/contact",
            label: "Become a Mentor",
            variant: "outline-light",
          },
        ]}
      />

      <EditorialBand
        tone="cream"
        marker="01"
        id="ghltp-about"
        aria-labelledby="ghltp-about-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              About
            </EditorialEyebrow>
            <EditorialHeading id="ghltp-about-heading" className="mt-4">
              About the Program
            </EditorialHeading>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
              <p>
                The Akomapa Global Health Leadership Training Program is a
                semester-long, certificate-bearing course that equips emerging
                health professionals with the knowledge, empathy, and vision to
                lead transformative change in global health.
              </p>
              <p>
                Taught by world experts from leading universities across Africa,
                the United States, and beyond, and from top global health
                organizations, this program unites students passionate about
                reimagining healthcare — from classrooms to communities.
              </p>
              <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                Rooted in Akomapa&apos;s philosophy of leadership through
                service, the course blends rigorous academic instruction with
                mentorship, live dialogue, and hands-on learning from the field.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={0.1} className="relative lg:col-span-5">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b]"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#1C1F1E]/10 bg-[#E6E7E7] dark:border-[#FCFAEF]/15 dark:bg-[#2F3332]">
              <Image
                src="/highlights/Akomapa-66.jpg"
                alt="Students in global health leadership training"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="02"
        id="ghltp-vision"
        aria-labelledby="ghltp-vision-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-4xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Vision
            </EditorialEyebrow>
            <EditorialHeading
              id="ghltp-vision-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Our Vision
            </EditorialHeading>
            <EditorialLead className="mt-6 text-[#FCFAEF]/90 dark:text-[#FCFAEF]/90 md:text-xl">
              To train a new generation of 1,000+ global health leaders who lead
              with integrity, humility, and innovation — bridging the gap between
              care and justice, and between learning and leadership.
            </EditorialLead>
          </div>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="03"
        id="ghltp-learn"
        aria-labelledby="ghltp-learn-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Curriculum
            </EditorialEyebrow>
            <EditorialHeading id="ghltp-learn-heading" className="mt-4">
              What You&apos;ll Learn
            </EditorialHeading>
            <EditorialLead className="mt-5">
              Our curriculum integrates cross-disciplinary theory, ethical
              frameworks, and practice-based learning — all grounded in real case
              studies from Akomapa clinics across Ghana and the United States.
            </EditorialLead>
          </div>
        </FadeIn>

        <h3 className="mt-12 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-2xl">
          Core Themes
        </h3>
        <ol className="mt-6 grid border-t border-[#1C1F1E]/15 md:grid-cols-2 xl:grid-cols-3 dark:border-[#FCFAEF]/20">
          {coreThemes.map((theme, index) => (
            <li
              key={theme.id}
              className="border-b border-[#1C1F1E]/15 px-1 py-7 md:border-r md:px-6 xl:[&:nth-child(3n)]:border-r-0 dark:border-[#FCFAEF]/20 md:odd:[&:nth-last-child(-n+1)]:border-r-0"
            >
              <span
                aria-hidden="true"
                className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#0097b2]/55 dark:text-[#66C4DC]/65"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-4 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {theme.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                {theme.description}
              </p>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="04"
        id="ghltp-how"
        aria-labelledby="ghltp-how-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Structure
            </EditorialEyebrow>
            <EditorialHeading
              id="ghltp-how-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              How the Program Works
            </EditorialHeading>
          </div>
        </FadeIn>

        <div className="mt-10">
          <ProgramFactSummary facts={[...programFacts]} tone="dark" />
        </div>

        <h3 className="mt-14 font-heading text-xl font-semibold text-[#FCFAEF] md:text-2xl">
          Program Features
        </h3>
        <ol className="mt-6 grid border-t border-[#FCFAEF]/25 md:grid-cols-2">
          {programFeatures.map((feature, index) => (
            <li
              key={feature.id}
              className="border-b border-[#FCFAEF]/25 px-1 py-7 md:px-6 md:odd:border-r"
            >
              <span
                aria-hidden="true"
                className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#FCFAEF]/45"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-4 font-heading text-lg font-semibold text-[#FCFAEF] md:text-xl">
                {feature.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-[#FCFAEF]/85 md:text-base">
                {feature.description}
              </p>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="05"
        id="ghltp-faculty"
        aria-labelledby="ghltp-faculty-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Partners
            </EditorialEyebrow>
            <EditorialHeading id="ghltp-faculty-heading" className="mt-4">
              Faculty & Contributors
            </EditorialHeading>
            <EditorialLead className="mt-5">
              Taught and mentored by faculty and practitioners from leading
              institutions and organizations worldwide.
            </EditorialLead>
          </div>
        </FadeIn>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
          {facultyInstitutions.map((institution) => (
            <li key={institution.id} className="flex-shrink-0">
              <div className="relative flex h-14 w-auto items-center justify-center px-2 sm:h-16 md:h-20">
                <NextImage
                  src={institution.logo}
                  alt={`${institution.name} logo`}
                  width={institution.width}
                  height={institution.height}
                  className="h-full w-auto object-contain opacity-80"
                />
              </div>
            </li>
          ))}
        </ul>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="06"
        id="ghltp-benefits"
        aria-labelledby="ghltp-benefits-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Beyond the Classroom
            </EditorialEyebrow>
            <EditorialHeading
              id="ghltp-benefits-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Learning Beyond the Classroom
            </EditorialHeading>
            <EditorialLead className="mt-5 text-[#FCFAEF]/90 dark:text-[#FCFAEF]/90">
              Students gain exclusive access to:
            </EditorialLead>
          </div>
        </FadeIn>

        <ol className="mt-10 grid border-t border-[#FCFAEF]/25 md:grid-cols-2 lg:grid-cols-3">
          {learningBenefits.map((benefit, index) => (
            <li
              key={benefit.id}
              className="border-b border-[#FCFAEF]/25 px-1 py-7 md:px-6 lg:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <span
                aria-hidden="true"
                className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#FCFAEF]/45"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-[#FCFAEF]">
                {benefit.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#FCFAEF]/85">
                {benefit.description}
              </p>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="07"
        id="ghltp-impact"
        aria-labelledby="ghltp-impact-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Goals
            </EditorialEyebrow>
            <EditorialHeading id="ghltp-impact-heading" className="mt-4">
              Impact Goal
            </EditorialHeading>
            <EditorialLead className="mt-5">By 2027, we aim to:</EditorialLead>
          </div>
        </FadeIn>

        <FadeInStagger className="mt-12">
          <dl className="grid border-y border-[#1C1F1E]/15 md:grid-cols-3 dark:border-[#FCFAEF]/20">
            {impactGoals.map((goal, index) => (
              <FadeInStaggerItem key={goal.description} direction="up">
                <div
                  className={`flex min-h-40 flex-col justify-between px-1 py-7 sm:px-6 ${metricDividerClasses[index]} border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20`}
                >
                  <dt className="sr-only">{goal.description}</dt>
                  <dd>
                    <AnimatedMetric
                      value={goal.value}
                      suffix={goal.suffix}
                      className="font-heading text-4xl font-semibold tracking-tight text-[#0097b2] md:text-5xl dark:text-[#66C4DC]"
                    />
                    <p className="mt-4 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base">
                      {goal.description}
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
        marker="08"
        id="ghltp-voices"
        aria-labelledby="ghltp-voices-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Testimonials
            </EditorialEyebrow>
            <EditorialHeading
              id="ghltp-voices-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Voices from Participants
            </EditorialHeading>
          </div>
        </FadeIn>
        <div className="mt-12">
          <GhltpTestimonialsCarousel />
        </div>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="09"
        id="ghltp-cta"
        aria-labelledby="ghltp-cta-heading"
        className="border-t border-[#FCFAEF]/15 bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Join the Next Cohort
            </EditorialEyebrow>
            <EditorialHeading
              id="ghltp-cta-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Become Part of a Global Movement
            </EditorialHeading>
            <EditorialLead className="mx-auto mt-6 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Shape the future of compassionate, ethical healthcare through our
              Global Health Leadership Training Program.
            </EditorialLead>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <EditorialButton href="/get-involved" variant="light">
                Apply Now
              </EditorialButton>
              <EditorialButton href="/programs" variant="outline-light">
                Download Program Overview
              </EditorialButton>
              <EditorialButton href="/partnerships" variant="amber">
                Partner to Teach
              </EditorialButton>
            </div>
          </div>
        </FadeIn>
      </EditorialBand>
    </>
  );
}
