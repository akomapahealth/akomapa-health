import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProgramDetailHero from "@/components/programs/ProgramDetailHero";
import ProgramQuoteBand from "@/components/programs/ProgramQuoteBand";
import {
  EditorialArrow,
  EditorialArrowLink,
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

const networkFeatures = [
  {
    id: "feature-1",
    title: "Peer-to-Peer Mentorship",
    description:
      "Experienced student teams coach new chapters on operations, patient care, and sustainability.",
  },
  {
    id: "feature-2",
    title: "Case-Based Learning",
    description:
      "Real cases from Akomapa clinics are used for shared discussions across sites, building critical reasoning and global clinical competence.",
  },
  {
    id: "feature-3",
    title: "Leadership & Training Access",
    description:
      "All Network members have access to the Akomapa Global Health Leadership Training Program — a certificate-bearing course led by faculty from Yale, UCLA, UCC, and UG.",
  },
  {
    id: "feature-4",
    title: "Collaborative Research",
    description:
      "Network partners co-design and publish studies that evaluate student-led interventions, community outcomes, and leadership development.",
  },
  {
    id: "feature-5",
    title: "Immersion Opportunities",
    description:
      "Clinics across the Network host visiting students and fellows through the Akomapa Global Health Immersion Program, promoting cross-site collaboration and cultural exchange.",
  },
  {
    id: "feature-6",
    title: "Knowledge Exchange",
    description:
      "Members share best practices on community partnership, data collection, and patient-centered education through regular summits and online forums.",
  },
] as const;

const goals = [
  {
    id: "goal-1",
    title: "Strengthen Community-Based Care",
    description:
      "Through sustainable, student-powered models that make preventative care accessible everywhere.",
    value: null as number | null,
    suffix: null as string | null,
    label: null as string | null,
  },
  {
    id: "goal-2",
    title: "Train Global Leaders",
    description:
      "Student leaders globally by 2027 in interprofessional collaboration and ethical leadership.",
    value: 1000,
    suffix: "+",
    label: "Student Leaders by 2027",
  },
  {
    id: "goal-3",
    title: "Establish Global Presence",
    description: "Community clinics across Africa, North America, and beyond.",
    value: 10,
    suffix: "+",
    label: "Community Clinics",
  },
  {
    id: "goal-4",
    title: "Facilitate Joint Learning",
    description:
      "Research that informs health policy and curriculum development.",
    value: null as number | null,
    suffix: null as string | null,
    label: null as string | null,
  },
  {
    id: "goal-5",
    title: "Build Global Platform",
    description:
      "Mentorship and exchange platform connecting students, faculty, and communities.",
    value: 5,
    suffix: "+",
    label: "Countries Connected",
  },
] as const;

const partnerClinics = [
  {
    name: "Akomapa UCC Clinic",
    location: "University of Cape Coast, Ghana",
    description:
      "Our first clinic and proof of concept—serving over 1,000 patients while training 75+ students.",
    href: "/community-hubs/ucc",
    logo: "/images/partners/akomapa-logo.png",
    external: false,
  },
  {
    name: "Neighborhood Health Project",
    location: "New Haven, USA",
    description:
      "A longstanding student-powered organization advancing community health equity in Connecticut.",
    href: "https://nhp.sites.yale.edu/",
    logo: "/images/partners/nhp-logo.png",
    external: true,
  },
  {
    name: "South Side Student-Run Free Clinic",
    location: "University of Chicago, USA",
    description:
      "A model clinic empowering students to lead in primary care and chronic disease management.",
    href: "#",
    logo: "/images/partners/uchicago.png",
    external: false,
  },
] as const;

export default function Content() {
  return (
    <>
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <ProgramDetailHero
        eyebrow="The Akomapa Network"
        title="Connecting Clinics. Sharing Knowledge. Building the Future of Global Health."
        lead="A global community of student-powered clinics, universities, and mentors working together to reimagine how healthcare is delivered and taught."
        image="/highlights/Akomapa-40.jpg"
        imageAlt="Global network of student healthcare leaders"
        ctas={[
          { href: "/get-involved", label: "Join the Network", variant: "solid" },
          { href: "/partnerships", label: "Partner with Us", variant: "amber" },
        ]}
      />

      <EditorialBand
        tone="cream"
        marker="01"
        id="network-about"
        aria-labelledby="network-about-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              About
            </EditorialEyebrow>
            <EditorialHeading id="network-about-heading" className="mt-4">
              About the Network
            </EditorialHeading>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
              <p>
                The Akomapa Network is a global community of student-powered
                clinics, universities, and mentors working together to reimagine
                how healthcare is delivered and taught.
              </p>
              <p>
                We connect student-powered, expert-supervised clinics from across
                Africa and the United States — uniting them through shared
                learning, leadership training, and collaborative innovation.
              </p>
              <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                Our goal is simple but bold: to make community-based,
                preventative care accessible everywhere while training the next
                generation of global health leaders.
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
                alt="Students collaborating across the network"
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
        id="network-vision"
        aria-labelledby="network-vision-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-4xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Vision
            </EditorialEyebrow>
            <EditorialHeading
              id="network-vision-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Our Vision
            </EditorialHeading>
            <EditorialLead className="mt-6 text-[#FCFAEF]/90 dark:text-[#FCFAEF]/90 md:text-xl">
              To build a global learning ecosystem where student-powered clinics
              don&apos;t work in isolation but as part of a connected movement —
              sharing data, stories, and strategies that strengthen both care
              delivery and education.
            </EditorialLead>
            <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              We envision a world where a student team in Ghana can learn from
              one in Chicago, where a New Haven community project can inspire a
              rural screening model, and where young leaders everywhere are
              equipped to bridge the gap between knowledge and action.
            </EditorialLead>
          </div>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="03"
        id="network-does"
        aria-labelledby="network-does-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Functions
            </EditorialEyebrow>
            <EditorialHeading id="network-does-heading" className="mt-4">
              What the Network Does
            </EditorialHeading>
            <EditorialLead className="mt-5">
              Six core functions that connect, empower, and amplify
              student-powered care across the globe.
            </EditorialLead>
          </div>
        </FadeIn>

        <ol className="mt-12 grid border-t border-[#1C1F1E]/15 md:grid-cols-2 xl:grid-cols-3 dark:border-[#FCFAEF]/20">
          {networkFeatures.map((feature, index) => (
            <li
              key={feature.id}
              className="border-b border-[#1C1F1E]/15 px-1 py-7 md:border-r md:px-6 xl:[&:nth-child(3n)]:border-r-0 dark:border-[#FCFAEF]/20"
            >
              <span
                aria-hidden="true"
                className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#0097b2]/55 dark:text-[#66C4DC]/65"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                {feature.description}
              </p>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="04"
        id="network-goals"
        aria-labelledby="network-goals-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Goals
            </EditorialEyebrow>
            <EditorialHeading
              id="network-goals-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              What We Hope to Accomplish
            </EditorialHeading>
            <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Bold goals that drive our collective mission forward.
            </EditorialLead>
          </div>
        </FadeIn>

        <FadeInStagger className="mt-12">
          <ol className="grid border-t border-[#FCFAEF]/25 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, index) => (
              <FadeInStaggerItem key={goal.id} direction="up">
                <li className="flex h-full flex-col border-b border-[#FCFAEF]/25 px-1 py-7 md:px-6 lg:border-r lg:[&:nth-child(3n)]:border-r-0">
                  <span
                    aria-hidden="true"
                    className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#FCFAEF]/45"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {goal.value !== null ? (
                    <div className="mt-4">
                      <AnimatedMetric
                        value={goal.value}
                        suffix={goal.suffix ?? ""}
                        className="font-heading text-4xl font-semibold tracking-tight text-[#eeba2b] md:text-5xl"
                      />
                      {goal.label ? (
                        <p className="mt-2 font-subheading text-xs font-semibold uppercase tracking-[0.2em] text-[#FCFAEF]/65">
                          {goal.label}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                  <h3 className="mt-4 font-heading text-lg font-semibold text-[#FCFAEF] md:text-xl">
                    {goal.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#FCFAEF]/85 md:text-base">
                    {goal.description}
                  </p>
                </li>
              </FadeInStaggerItem>
            ))}
          </ol>
        </FadeInStagger>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="05"
        id="network-partners"
        aria-labelledby="network-partners-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Partners
            </EditorialEyebrow>
            <EditorialHeading id="network-partners-heading" className="mt-4">
              Founding & Partner Clinics
            </EditorialHeading>
            <EditorialLead className="mt-5">
              Student-powered clinics leading the way in community-based care
              and global collaboration.
            </EditorialLead>
          </div>
        </FadeIn>

        <ul className="mt-12 grid border-t border-[#1C1F1E]/15 md:grid-cols-3 dark:border-[#FCFAEF]/20">
          {partnerClinics.map((clinic) => (
            <li
              key={clinic.name}
              className="border-b border-[#1C1F1E]/15 px-1 py-8 md:border-r md:px-6 md:[&:nth-child(3n)]:border-r-0 dark:border-[#FCFAEF]/20"
            >
              <div className="relative mb-6 flex h-20 items-center justify-center sm:h-24">
                <div className="relative h-full w-full max-w-[12rem]">
                  <Image
                    src={clinic.logo}
                    alt={`${clinic.name} logo`}
                    fill
                    sizes="(min-width: 1024px) 20vw, 60vw"
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {clinic.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-[#0097b2] dark:text-[#66C4DC]">
                {clinic.location}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base">
                {clinic.description}
              </p>
              {clinic.external ? (
                <a
                  href={clinic.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#0097b2] transition-colors hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                >
                  Visit Page
                  <EditorialArrow className="transition-transform group-hover:translate-x-0.5" />
                </a>
              ) : (
                <EditorialArrowLink href={clinic.href} className="mt-6">
                  Visit Page
                </EditorialArrowLink>
              )}
            </li>
          ))}
        </ul>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="06"
        id="network-matters"
        aria-labelledby="network-matters-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-4xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Purpose
            </EditorialEyebrow>
            <EditorialHeading
              id="network-matters-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Why It Matters
            </EditorialHeading>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#FCFAEF]/90 md:text-lg">
              <p>
                The Akomapa Network is more than a collaboration — it&apos;s a
                global classroom without walls.
              </p>
              <p>
                Every clinic becomes both a site of care and a site of learning,
                where students grow as clinicians, leaders, and changemakers
                while improving the health of their communities.
              </p>
              <p className="font-semibold text-[#FCFAEF]">
                By linking student-powered clinics into one connected system,
                we&apos;re making community care smarter, stronger, and
                sustainable — driven by evidence, compassion, and shared purpose.
              </p>
            </div>
          </div>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="07"
        id="network-cta"
        aria-labelledby="network-cta-heading"
      >
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Get Involved
            </EditorialEyebrow>
            <EditorialHeading id="network-cta-heading" className="mt-4">
              Join the Movement
            </EditorialHeading>
            <EditorialLead className="mx-auto mt-5 max-w-2xl">
              We invite universities, clinics, and community organizations to
              join a network redefining what it means to learn, lead, and serve.
            </EditorialLead>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <EditorialButton href="/partnerships" variant="solid">
                Join the Network
              </EditorialButton>
              <EditorialButton href="/partnerships" variant="outline">
                Propose a Partnership
              </EditorialButton>
              <EditorialButton href="/programs" variant="amber">
                Learn More
              </EditorialButton>
            </div>
          </div>
        </FadeIn>
      </EditorialBand>

      <ProgramQuoteBand
        tone="teal"
        marker="08"
        id="network-quote"
        className="bg-[#0F4C5C]"
        quote="The Akomapa Network is building a future where a clinic is not just a place of care but a platform for transformation. Together, we're proving that student leadership can move systems, and that collaboration across borders can save lives."
        attribution="Sedem Dankwa"
        role="Global Partnerships Team Lead"
        image="/team/sedem-dankwa.jpg"
        imageAlt="Sedem Dankwa"
      />
    </>
  );
}
