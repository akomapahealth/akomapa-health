import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
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
    title: "Community Farms",
    description:
      "We work alongside farmers and cooperatives to grow fresh produce with regenerative practices, ensuring every harvest strengthens local soil, nutrition, and income.",
  },
  {
    title: "Akomapa Stores",
    description:
      "Neighborhood stores make healthy food accessible and affordable, with every purchase reinvested into clinic operations and health education.",
  },
  {
    title: "Nutrition & Wellness Education",
    description:
      "Clinic visits include personalized counseling and cooking demonstrations so families leave with knowledge, recipes, and confidence.",
  },
  {
    title: "Economic Empowerment",
    description:
      "Agriculture, retail, and distribution roles create dignified jobs for youth and women, expanding leadership pathways tied to community wellbeing.",
  },
  {
    title: "Sustainability Cycle",
    description:
      "Every cedi earned flows back into medication, equipment, and leadership training, making care both free at the point of service and financially resilient.",
  },
] as const;

const longTermGoals = [
  {
    title: "Establish 5+ farms and stores by 2030",
    detail:
      "Each site will anchor an Akomapa clinic with reliable access to nutritious food grown and sold by community members.",
  },
  {
    title: "Cover 25% of clinic costs annually",
    detail:
      "Proceeds from farms and stores will underwrite essential services, medicines, and logistics across the network.",
  },
  {
    title: "Train local youth and women",
    detail:
      "Hands-on apprenticeships in sustainable farming and agribusiness will expand economic mobility and leadership.",
  },
  {
    title: "Integrate nutrition education everywhere",
    detail:
      "Every outreach, clinic day, and community event will include live cooking, tastings, and practical guidance for day-to-day wellness.",
  },
] as const;

const partners = [
  {
    name: "Local Farming Cooperatives",
    logo: "/images/partners/local-coops-logo.svg",
  },
  {
    name: "Ministry of Food & Agriculture",
    logo: "/images/partners/mofa-logo.svg",
  },
  {
    name: "Ghana Health Service Nutrition Units",
    logo: "/images/partners/ghana-health-service-logo.png",
  },
  {
    name: "UCC School of Agriculture",
    logo: "/images/partners/ucc.png",
  },
  {
    name: "Global Nutrition & Sustainability Alliance",
    logo: "/images/partners/global-nutrition-logo.svg",
  },
] as const;

export default function Content() {
  return (
    <>
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <ProgramDetailHero
        eyebrow="Akomapa Foods & Stores Initiative"
        title="Nourishing Health. Sustaining Care. Empowering Communities."
        lead="Health begins long before patients reach our clinics. By linking agriculture, nutrition, and economic participation, Akomapa ensures that every community can feed, heal, and sustain itself."
        image="/highlights/Akomapa-47.jpg"
        imageAlt="Akomapa Foods team cultivating community farms"
        ctas={[
          { href: "/partnerships", label: "Partner with Us", variant: "solid" },
          {
            href: "/get-involved",
            label: "Support the Launch",
            variant: "amber",
          },
          { href: "/donate", label: "Donate", variant: "amber" },
        ]}
      />

      <EditorialBand
        tone="cream"
        marker="01"
        id="foods-about"
        aria-labelledby="foods-about-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn direction="left" className="relative order-2 lg:order-1 lg:col-span-5">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b]"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#1C1F1E]/10 bg-[#E6E7E7] dark:border-[#FCFAEF]/15 dark:bg-[#2F3332]">
              <Image
                src="/highlights/Akomapa-61.jpg"
                alt="Fresh produce harvested for the Akomapa Foods Initiative"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </FadeIn>
          <FadeIn className="order-1 lg:order-2 lg:col-span-7">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              About
            </EditorialEyebrow>
            <EditorialHeading id="foods-about-heading" className="mt-4">
              About the Initiative
            </EditorialHeading>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
              <p>
                The Akomapa Foods & Stores Initiative is the sustainability
                engine of our health model, connecting food security, economic
                empowerment, and clinic access in one ecosystem.
              </p>
              <p>
                Health starts in kitchens, markets, and farms. When communities
                grow and sell nutritious food, they also strengthen the very
                clinics that care for them.
              </p>
              <p>
                By linking agriculture and nutrition to student-powered community
                health hubs, Akomapa ensures communities receive care and co-own
                the means to sustain it for generations.
              </p>
            </div>
          </FadeIn>
        </div>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="02"
        id="foods-vision"
        aria-labelledby="foods-vision-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-4xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Vision
            </EditorialEyebrow>
            <EditorialHeading
              id="foods-vision-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Our Vision
            </EditorialHeading>
            <EditorialLead className="mt-6 text-[#FCFAEF]/90 dark:text-[#FCFAEF]/90 md:text-xl">
              We are building a network of community-run farms and food stores
              that make nutritious food accessible while generating revenue to
              fund free, student-led healthcare. Every clinic becomes part of a
              thriving local economy where wellness, work, and sustainability
              reinforce one another.
            </EditorialLead>
          </div>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="03"
        id="foods-what"
        aria-labelledby="foods-what-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Model
            </EditorialEyebrow>
            <EditorialHeading id="foods-what-heading" className="mt-4">
              What We Do
            </EditorialHeading>
            <EditorialLead className="mt-5">
              A full-circle model blends agriculture, retail, education, and
              reinvestment so communities thrive alongside their clinics.
            </EditorialLead>
          </div>
        </FadeIn>

        <ol className="mt-12 grid border-t border-[#1C1F1E]/15 md:grid-cols-2 xl:grid-cols-3 dark:border-[#FCFAEF]/20">
          {whatWeDo.map((item, index) => (
            <li
              key={item.title}
              className="border-b border-[#1C1F1E]/15 px-1 py-7 md:border-r md:px-6 xl:[&:nth-child(3n)]:border-r-0 dark:border-[#FCFAEF]/20"
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
              <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="04"
        id="pilot"
        aria-labelledby="foods-pilot-heading"
      >
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <FadeIn className="order-2 lg:order-1 lg:col-span-7">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Spotlight
            </EditorialEyebrow>
            <EditorialHeading id="foods-pilot-heading" className="mt-4">
              Pilot Project
            </EditorialHeading>
            <EditorialLead className="mt-5">
              Our first Akomapa Farm and Store launches near the University of
              Cape Coast in 2027. The site will supply fresh produce directly to
              local families, power free clinic days, and document a model for
              replication.
            </EditorialLead>
            <dl className="mt-8 border-y border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20">
              <div className="py-6">
                <dt className="sr-only">Expansion plans</dt>
                <dd className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
                  Expansion plans are already aligned with future Akomapa clinics
                  across Ghana, Africa, and the United States. Each new location
                  adapts to local crops, culture, and community priorities while
                  staying rooted in our shared standards.
                </dd>
              </div>
              <div className="border-t border-[#1C1F1E]/15 py-6 dark:border-[#FCFAEF]/20">
                <dt className="sr-only">Launch timeline</dt>
                <dd className="text-sm font-semibold text-[#0097b2] dark:text-[#66C4DC]">
                  Launch Timeline · 2027
                </dd>
              </div>
            </dl>
          </FadeIn>
          <FadeIn direction="left" delay={0.1} className="relative order-1 lg:order-2 lg:col-span-5">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b]"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#1C1F1E]/10 bg-[#E6E7E7] dark:border-[#FCFAEF]/15 dark:bg-[#2F3332]">
              <Image
                src="/highlights/Akomapa-40.jpg"
                alt="Community members preparing the pilot farm launch"
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
        marker="05"
        id="foods-goals"
        aria-labelledby="foods-goals-heading"
        className="bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Goals
            </EditorialEyebrow>
            <EditorialHeading
              id="foods-goals-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Long-Term Goals
            </EditorialHeading>
            <EditorialLead className="mt-5 text-[#FCFAEF]/90 dark:text-[#FCFAEF]/90">
              Every goal ties nutrition to sustainable healthcare financing and
              community leadership.
            </EditorialLead>
          </div>
        </FadeIn>

        <ol className="mt-12 grid border-t border-[#FCFAEF]/25 md:grid-cols-2">
          {longTermGoals.map((goal, index) => (
            <li
              key={goal.title}
              className="border-b border-[#FCFAEF]/25 px-1 py-7 md:border-r md:px-6 md:odd:[&:nth-last-child(-n+1)]:border-r-0 md:[&:nth-child(2n)]:border-r-0"
            >
              <span
                aria-hidden="true"
                className="font-heading text-3xl font-semibold tracking-[-0.06em] text-[#FCFAEF]/45"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-[#FCFAEF] md:text-xl">
                {goal.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#FCFAEF]/85 md:text-base">
                {goal.detail}
              </p>
            </li>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="06"
        id="foods-partners"
        aria-labelledby="foods-partners-heading"
      >
        <FadeIn>
          <div className="max-w-3xl">
            <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
              Partners
            </EditorialEyebrow>
            <EditorialHeading id="foods-partners-heading" className="mt-4">
              Partnerships Fuel Every Harvest
            </EditorialHeading>
            <EditorialLead className="mt-5">
              We collaborate with institutions that share a commitment to food
              security, research, and ethical healthcare delivery.
            </EditorialLead>
          </div>
        </FadeIn>

        <div
          className="mt-10 w-full overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2"
          tabIndex={0}
          role="region"
          aria-label="Partner logos"
        >
          <ul className="flex min-w-max items-stretch gap-4 py-2 sm:gap-6 md:gap-8">
            {partners.map((partner) => (
              <li
                key={partner.name}
                className="flex h-24 w-44 flex-shrink-0 flex-col items-center justify-center border border-[#1C1F1E]/15 bg-[#FCFAEF] px-4 dark:border-[#FCFAEF]/20 dark:bg-[#1C1F1E] sm:h-28 sm:w-56 lg:h-32 lg:w-64"
              >
                <div className="relative h-10 w-28 sm:h-12 sm:w-36 md:h-14 md:w-44 lg:h-16 lg:w-48">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    sizes="(min-width: 1024px) 12rem, 40vw"
                    className="object-contain"
                  />
                </div>
                <p className="mt-3 px-2 text-center text-xs font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {partner.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </EditorialBand>

      <ProgramQuoteBand
        tone="teal"
        marker="07"
        id="foods-quote"
        className="bg-[#0F4C5C]"
        quote="Our goal is to build communities that not only receive care but help sustain it. Akomapa Foods & Stores redefines healthcare by making every harvest an act of healing."
        attribution="Akomapa Executive Team"
      />

      <EditorialBand
        tone="teal"
        marker="08"
        id="foods-cta"
        aria-labelledby="foods-cta-heading"
        className="border-t border-[#FCFAEF]/15 bg-[#0F4C5C]"
      >
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Get Involved
            </EditorialEyebrow>
            <EditorialHeading
              id="foods-cta-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Join the Movement
            </EditorialHeading>
            <EditorialLead className="mx-auto mt-6 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Help us make nutrition the foundation of sustainable healthcare.
              Your partnership advances farms, stores, and clinics that belong to
              the communities they serve.
            </EditorialLead>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <EditorialButton href="/partnerships" variant="light">
                Partner with Us
              </EditorialButton>
              <EditorialButton href="/get-involved" variant="outline-light">
                Support the Launch
              </EditorialButton>
              <EditorialButton href="/donate" variant="amber">
                Donate
              </EditorialButton>
            </div>
          </div>
        </FadeIn>
      </EditorialBand>
    </>
  );
}
