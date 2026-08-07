import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { AnimatedMetric } from "@/components/motion/AnimatedMetric";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProgramDetailHero from "@/components/programs/ProgramDetailHero";
import ProgramQuoteBand from "@/components/programs/ProgramQuoteBand";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

const whatWeDo = [
  {
    id: "ncd-education",
    title: "Educate on NCDs",
    description:
      "We translate complex topics—hypertension, diabetes, mental health, and nutrition—into relatable lessons, helping students see how these non-communicable concerns connect to stress, emotional well-being, and long-term health.",
  },
  {
    id: "screenings",
    title: "Provide Health Screenings",
    description:
      "Students receive free blood pressure and glucose checks with pathways to local Akomapa clinics for follow-up care when needed.",
  },
  {
    id: "healthy-lifestyles",
    title: "Promote Healthy Lifestyles",
    description:
      "Interactive demonstrations share practical strategies for preventing hypertension, diabetes, and mental health challenges through balanced nutrition, movement, stress management, and emotional well-being.",
  },
  {
    id: "advocate-training",
    title: "Train Young Advocates",
    description:
      "We mentor student leaders to run awareness campaigns on hypertension, diabetes, and mental health—leading peer education and championing wellness initiatives on their campuses.",
  },
  {
    id: "career-mentorship",
    title: "Offer Career Mentorship",
    description:
      "Storytelling circles expose students to careers in medicine, nursing, pharmacy, public health, and leadership while demystifying the journey ahead.",
  },
] as const;

const mentorshipBenefits = [
  {
    title: "Leadership Coaching",
    description:
      "Continued mentorship in health leadership, communication, and advocacy keeps every Young Advocate supported.",
  },
  {
    title: "Training Studios",
    description:
      "Periodic workshops dive into community engagement and prevention of hypertension, diabetes, and mental health challenges using real cases from Akomapa clinics.",
  },
  {
    title: "Student Projects",
    description:
      "Advocates design and lead school-based health campaigns, service projects, and storytelling activations.",
  },
  {
    title: "Youth Forums",
    description:
      "Invitations to leadership forums and community health days connect students to regional clinic partners.",
  },
] as const;

const mentorshipHighlights = [
  {
    label: "Mentor Circles",
    title: "Guided by University Mentors",
    description:
      "Each advocate is paired with an interprofessional mentor who blends compassion, accountability, and lived experience.",
  },
  {
    label: "Leadership in Action",
    title: "Projects that Matter",
    description:
      "Students launch wellness clubs, awareness drives, and research projects that keep momentum alive between visits.",
  },
  {
    label: "Community Connection",
    title: "Clinic-Linked Support",
    description:
      "Mentorship stays tethered to Akomapa clinics so referrals, data, and storytelling always feed back into care.",
  },
] as const;

const howItWorks = [
  {
    eyebrow: "Step 01",
    title: "Clinic Partnerships",
    description:
      "Local Akomapa clinics collaborate with nearby high schools to co-design immersive health education experiences.",
  },
  {
    eyebrow: "Step 02",
    title: "Student Facilitation",
    description:
      "Interprofessional university teams deliver interactive sessions that blend storytelling, demonstrations, and screenings for hypertension, diabetes, and mental wellness.",
  },
  {
    eyebrow: "Step 03",
    title: "Young Advocate Pathway",
    description:
      "Students who show passion join the Young Advocates track for deeper mentorship and leadership development.",
  },
  {
    eyebrow: "Step 04",
    title: "Sustained Engagement",
    description:
      "Regional clinic teams host mentorship circles, community projects, and annual leadership events to keep momentum strong.",
  },
] as const;

const impactMetrics = [
  {
    id: "students",
    eyebrow: "Health Education",
    value: 9000,
    suffix: "+",
    label: "Students Reached",
    description:
      "Educating high school students on preventing hypertension, diabetes, and mental health challenges—building lifelong health literacy.",
  },
  {
    id: "advocates",
    eyebrow: "Peer Leadership",
    value: 300,
    suffix: "+",
    label: "Youth Advocates",
    description:
      "Training peer leaders to champion healthy habits and support students around hypertension, diabetes, mental health, and stress on their campuses.",
  },
  {
    id: "partnerships",
    eyebrow: "Community Care",
    value: 6,
    suffix: "+",
    label: "Clinic Regions",
    description:
      "Linking schools to clinic teams that reinforce prevention and referrals for hypertension, diabetes, mental health, and whole-person care across regions.",
  },
  {
    id: "pipeline",
    eyebrow: "Future Leaders",
    value: 1,
    suffix: "",
    label: "Leadership Pipeline",
    description:
      "Building an early pathway into compassionate health leadership grounded in care for body and mind.",
  },
] as const;

export default function Content() {
  return (
    <>
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <ProgramDetailHero
        eyebrow="Akomapa Young Advocates Program"
        title="Educating. Empowering. Inspiring the Next Generation of Health Leaders."
        lead="Led by university students trained through Akomapa clinics, the Young Advocates Program brings education on hypertension, diabetes, mental health, and whole-person wellness—alongside mentorship and leadership development—directly to high schools."
        image="/gallery/gallery-pic-2.jpg"
        imageAlt="Young advocates participating in a health education session"
        ctas={[
          { href: "/partnerships", label: "Partner with Us", variant: "solid" },
          {
            href: "/get-involved",
            label: "Volunteer as a University Student",
            variant: "amber",
          },
        ]}
      />

      <EditorialBand
        tone="cream"
        marker="01"
        id="ya-about"
        aria-labelledby="ya-about-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-7">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              About
            </EditorialEyebrow>
            <EditorialHeading id="ya-about-heading" className="mt-4">
              About the Program
            </EditorialHeading>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
              <p>
                The Young Advocates Program brings community health, mentorship,
                and leadership development directly to high schools. University
                student teams trained through Akomapa clinics facilitate
                learning, screenings, and storytelling that meet teens where they
                are.
              </p>
              <p>
                Education on hypertension, diabetes, and mental health—as key
                non-communicable concerns—helps students understand how
                lifestyle, stress, and emotional well-being shape long-term
                health outcomes.
              </p>
              <p className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                Every session bridges education and community care—nurturing
                ethical, community-minded leaders who champion physical and
                mental well-being in their schools and neighborhoods.
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
                alt="University mentors guiding high school students"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </FadeIn>
        </div>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="02"
        id="ya-mission"
        aria-labelledby="ya-mission-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Mission
            </EditorialEyebrow>
            <EditorialHeading
              id="ya-mission-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Our Mission
            </EditorialHeading>
            <EditorialLead className="mt-6 text-[#FCFAEF]/90 dark:text-[#FCFAEF]/90 md:text-xl">
              To cultivate youth leaders who understand their power to improve
              community health, advocate for well-being, and serve as role models
              of compassion and integrity.
            </EditorialLead>
          </div>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="03"
        id="ya-what"
        aria-labelledby="ya-what-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Approach
            </EditorialEyebrow>
            <EditorialHeading id="ya-what-heading" className="mt-4">
              What We Do
            </EditorialHeading>
            <EditorialLead className="mt-5">
              University student teams lead immersive sessions that turn
              classrooms into hubs of curiosity and leadership—where students
              learn to prevent hypertension, diabetes, and mental health
              challenges through health literacy and peer support.
            </EditorialLead>
          </div>
        </FadeIn>

        <ol className="mt-12 grid border-t border-[#1C1F1E]/15 md:grid-cols-2 lg:grid-cols-3 dark:border-[#FCFAEF]/20">
          {whatWeDo.map((item, index) => (
            <li
              key={item.id}
              className="border-b border-[#1C1F1E]/15 px-1 py-7 md:border-r md:px-6 lg:[&:nth-child(3n)]:border-r-0 dark:border-[#FCFAEF]/20"
            >
              <span
                aria-hidden="true"
                className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#0097b2]/55 dark:text-[#66C4DC]/65"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="04"
        id="ya-mentorship"
        aria-labelledby="ya-mentorship-heading"
        className="bg-[#0F4C5C]"
      >
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="lg:col-span-6">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Beyond a single visit
            </EditorialEyebrow>
            <EditorialHeading
              id="ya-mentorship-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Ongoing Mentorship
            </EditorialHeading>
            <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Students who show enthusiasm join a long-term mentorship journey
              guided by university mentors from local Akomapa clinics—turning
              curiosity into consistent leadership, resilience, and peer support.
            </EditorialLead>

            <dl className="mt-10 border-t border-[#FCFAEF]/25">
              {mentorshipHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="border-b border-[#FCFAEF]/25 py-6"
                >
                  <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#F5C94D]">
                    {highlight.label}
                  </dt>
                  <dd className="mt-2">
                    <h3 className="font-heading text-lg font-semibold text-[#FCFAEF]">
                      {highlight.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#FCFAEF]/80">
                      {highlight.description}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:col-span-6">
            <ol className="grid border-t border-[#FCFAEF]/25 sm:grid-cols-2">
              {mentorshipBenefits.map((benefit, index) => (
                <li
                  key={benefit.title}
                  className="border-b border-[#FCFAEF]/25 px-1 py-7 sm:border-r sm:px-6 sm:odd:[&:nth-last-child(-n+1)]:border-r-0 sm:[&:nth-child(2n)]:border-r-0"
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
          </FadeIn>
        </div>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="05"
        id="ya-how"
        aria-labelledby="ya-how-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Process
            </EditorialEyebrow>
            <EditorialHeading id="ya-how-heading" className="mt-4">
              How It Works
            </EditorialHeading>
            <EditorialLead className="mt-5">
              A simple, repeatable model ensures every region delivers quality
              mentorship anchored in community care.
            </EditorialLead>
          </div>
        </FadeIn>

        <ol className="mt-12 grid border-t border-[#1C1F1E]/15 md:grid-cols-2 dark:border-[#FCFAEF]/20">
          {howItWorks.map((step, index) => (
            <li
              key={step.title}
              className="border-b border-[#1C1F1E]/15 px-1 py-7 md:border-r md:px-6 md:odd:[&:nth-last-child(-n+1)]:border-r-0 md:[&:nth-child(2n)]:border-r-0 dark:border-[#FCFAEF]/20"
            >
              <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
                {step.eyebrow}
              </p>
              <span className="sr-only">
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="06"
        id="ya-impact"
        data-testid="young-advocates-impact-section"
        aria-labelledby="ya-impact-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Results
            </EditorialEyebrow>
            <EditorialHeading
              id="ya-impact-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Our Impact
            </EditorialHeading>
            <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Every classroom conversation is part of a larger movement to build
              a healthier, more compassionate generation.
            </EditorialLead>
          </div>
        </FadeIn>

        <FadeInStagger className="mt-12">
          <div
            data-testid="young-advocates-impact-grid"
            className="grid w-full max-w-[90rem] grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-4 xl:gap-10"
          >
            {impactMetrics.map((metric) => (
              <FadeInStaggerItem key={metric.id} direction="up" className="h-full min-w-0">
                <article
                  data-testid="young-advocates-impact-card"
                  className="flex h-full min-w-0 flex-col border border-[#FCFAEF]/25 bg-[#FCFAEF] px-6 py-7 text-[#1C1F1E] sm:px-7 sm:py-8"
                >
                  <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2]">
                    {metric.eyebrow}
                  </p>
                  <div className="mt-4 space-y-3">
                    <AnimatedMetric
                      value={metric.value}
                      suffix={metric.suffix ?? ""}
                      className="font-heading text-5xl font-semibold leading-none tracking-tight text-[#0097b2] md:text-6xl"
                    />
                    <h3 className="font-heading text-2xl font-semibold leading-tight text-[#1C1F1E] md:text-[1.75rem]">
                      {metric.label}
                    </h3>
                  </div>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-[#2F3332]/85">
                    {metric.description}
                  </p>
                </article>
              </FadeInStaggerItem>
            ))}
          </div>
        </FadeInStagger>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="07"
        id="ya-clinics"
        aria-labelledby="ya-clinics-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn direction="left" className="relative order-1 lg:order-2 lg:col-span-5">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b]"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#1C1F1E]/10 bg-[#E6E7E7] dark:border-[#FCFAEF]/15 dark:bg-[#2F3332]">
              <Image
                src="/highlights/Akomapa-19.jpg"
                alt="Akomapa clinic mentors supporting youth"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </FadeIn>
          <FadeIn className="order-2 lg:order-1 lg:col-span-7">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Clinics
            </EditorialEyebrow>
            <EditorialHeading id="ya-clinics-heading" className="mt-4">
              Powered by Akomapa Clinics
            </EditorialHeading>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
              <p>
                Each local Akomapa clinic leads the Young Advocates Program in
                its region. The Akomapa UCC Clinic runs the initiative across
                high schools in Cape Coast and surrounding towns, mentoring
                students to become youth health ambassadors connected to real
                community care.
              </p>
              <p>
                Partnerships between clinics, faculty mentors, and education
                authorities ensure students receive accurate information and
                compassionate guidance on hypertension, diabetes, and mental
                health—with real pathways to care that support whole-person
                well-being.
              </p>
            </div>
          </FadeIn>
        </div>
      </EditorialBand>

      <ProgramQuoteBand
        tone="teal"
        marker="08"
        id="ya-quote"
        className="bg-[#0F4C5C]"
        quote="The Akomapa Young Advocates Program believes that leadership begins with empathy. By empowering young people to care for their health and their communities, we are building a generation of changemakers with good hearts."
        attribution="Akomapa Executive Team"
        role="Founders of the Young Advocates Program"
        image="/images/team/brian-fleischer.jpeg"
        imageAlt="Akomapa Health"
      />

      <EditorialBand
        tone="cream"
        marker="09"
        id="ya-cta"
        aria-labelledby="ya-cta-heading"
      >
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Get Involved
            </EditorialEyebrow>
            <EditorialHeading id="ya-cta-heading" className="mt-4">
              Partner or Get Involved
            </EditorialHeading>
            <EditorialLead className="mx-auto mt-5 max-w-2xl">
              We welcome partnerships with schools, education authorities, and
              organizations dedicated to youth development and community health.
            </EditorialLead>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <EditorialButton href="/partnerships" variant="solid">
                Partner with Us
              </EditorialButton>
              <EditorialButton href="/get-involved" variant="amber">
                Volunteer as a Student
              </EditorialButton>
              <EditorialButton href="/donate" variant="outline">
                Support the Program
              </EditorialButton>
            </div>
          </div>
        </FadeIn>
      </EditorialBand>
    </>
  );
}
