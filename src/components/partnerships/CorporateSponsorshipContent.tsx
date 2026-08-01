import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialChevron,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { CONTACT } from "@/config/contact";
import Link from "next/link";

const programPillars = [
  {
    title: "Hub Sponsorship",
    description:
      "Fund the operations of Community Learning & Care Hubs that deliver prevention, screening, and referral services to underserved communities.",
  },
  {
    title: "Training Grants",
    description:
      "Support the Akomapa Academy and leadership development programs that prepare the next generation of ethical health professionals.",
  },
  {
    title: "Community Engagement",
    description:
      "Enable health education, NCD screening campaigns, and community engagement initiatives across our partner sites.",
  },
] as const;

const sponsorshipOptions = [
  {
    id: "clinic",
    title: "Sponsor a Clinic",
    description:
      "Fund an entire day, semester, or year of care at one of our community sites in Abeadze Dominase or Abura. Your sponsorship provides comprehensive healthcare services including screenings, medication counseling, transportation assistance, and essential follow-up services that ensure continuity of care.",
    recognition: [
      "Company logo featured on clinic day banners and promotional materials",
      "Social media spotlight and public acknowledgment across our platforms",
      "Opportunity for co-branded materials and invitations for staff site visits",
      "Detailed impact report showcasing the difference your sponsorship made",
    ],
  },
  {
    id: "supplies",
    title: "Sponsor Medical Supplies & Medications",
    description:
      "Help us maintain fully stocked clinics with essential medical equipment and supplies including blood pressure cuffs, glucometers, test strips, patient education materials, and life-saving medications. Your in-kind or financial contribution directly supports patient safety and quality care delivery.",
    recognition: [
      "Recognition on supply packaging and monthly inventory reports",
      "Comprehensive Akomapa impact report highlighting your contribution",
      "Mention in quarterly newsletters and annual reports",
      "Invitation to witness supply distribution during clinic days",
    ],
  },
  {
    id: "cash",
    title: "Make a Cash Contribution",
    description:
      "Provide flexible financial support where the need is greatest. Your unrestricted funds enable us to cover critical operational costs including staff stipends, professional development training, emergency patient referrals, and essential program operations that ensure sustainable healthcare delivery.",
    recognition: [
      "Tiered recognition levels based on contribution amount",
      "Logo placement on our website sponsor page and annual report",
      "Featured acknowledgment during key events and quarterly impact reports",
      "Customized partnership benefits package tailored to your organization",
    ],
  },
  {
    id: "pharmacy",
    title: "Sponsor the Akomapa Pharmacy",
    description:
      "Become a founding sponsor of our innovative low-cost community pharmacy initiative. This sustainable model addresses medication access barriers while creating long-term clinic financial stability. Your sponsorship helps build a future where quality healthcare becomes self-sustaining.",
    recognition: [
      "Prominent naming rights opportunity within the pharmacy facility",
      "Featured placement in press releases and social media campaigns",
      'Permanent "Founding Partner" recognition on facility signage',
      "Exclusive updates on pharmacy impact and community health outcomes",
    ],
  },
  {
    id: "farms",
    title: "Support Akomapa Farms & Food Stores",
    description:
      "Partner with us to address food insecurity while generating sustainable funding for healthcare services. Our innovative model combines community agriculture with affordable food distribution, creating a holistic approach to health and nutrition that directly benefits underserved communities.",
    recognition: [
      "Naming opportunity for food stand, market display, or garden plots",
      "Recognition in nutrition education and wellness campaign materials",
      "Regular updates on farm productivity and community nutrition impact",
      "Opportunity to participate in harvest events and community celebrations",
    ],
  },
] as const;

const recognitionBenefits = [
  {
    title: "Logo Inclusion on Website Sponsor Wall",
    description:
      "Your company logo displayed prominently on our website's corporate sponsors page, reaching thousands of visitors monthly",
  },
  {
    title: "Quarterly Heartbeat Impact Reports",
    description:
      "Featured coverage in our detailed quarterly impact reports showcasing program outcomes and the difference your partnership makes",
  },
  {
    title: "Exclusive Site Visits and Updates",
    description:
      "Invitations to visit our clinic sites in person or participate in virtual updates and presentations about program activities",
  },
  {
    title: "Customized Marketing Materials",
    description:
      "Personalized content, visuals, and impact stories that you can use to showcase your partnership and social responsibility initiatives",
  },
] as const;

const processSteps = [
  {
    step: "01",
    title: "Quick Response",
    description: "We'll respond within 24 hours",
  },
  {
    step: "02",
    title: "Custom Solutions",
    description: "Tailored partnership packages",
  },
  {
    step: "03",
    title: "Clear Next Steps",
    description: "Guided onboarding for your sponsorship",
  },
] as const;

export default function CorporateSponsorshipContent() {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <EditorialBand
        tone="teal"
        aria-labelledby="corporate-sponsorship-heading"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <FadeIn>
          <Link
            href="/partnerships"
            className="mb-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#FCFAEF]/85 transition-colors hover:text-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C]"
          >
            <EditorialChevron className="h-4 w-4" />
            Back to Partnerships
          </Link>
        </FadeIn>

        <FadeIn delay={0.08}>
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Support Our Work
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="corporate-sponsorship-heading"
            className="mt-5 max-w-4xl text-[2.1rem] text-[#FCFAEF] sm:text-[2.75rem] md:text-[3.4rem] lg:text-[3.9rem]"
          >
            Partner with Purpose. Build Health. Leave a Legacy.
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            At Akomapa, we believe in bold partnerships that change lives. Our
            mission—to deliver compassionate, community-rooted care to
            underserved Ghanaians—is too urgent, too vast, and too vital to do
            alone. That&apos;s why we&apos;re inviting visionary companies,
            foundations, and institutions to stand with us as Corporate
            Sponsors.
          </EditorialLead>
          <EditorialLead className="mt-4 max-w-3xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            When you sponsor Akomapa, you&apos;re not just funding a clinic.
            You&apos;re fueling access, equity, and the future of healthcare in
            Africa.
          </EditorialLead>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <EditorialButton href="/contact?type=partnership" variant="amber">
              Discuss Sponsorship
            </EditorialButton>
            <EditorialButton href={CONTACT.email.href} variant="outline-light" external>
              Email Us
            </EditorialButton>
          </div>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="01"
        aria-labelledby="sponsorship-pillars-heading"
      >
        <FadeIn>
          <EditorialEyebrow>Where Sponsorship Goes</EditorialEyebrow>
          <EditorialHeading id="sponsorship-pillars-heading" className="mt-4">
            Join leading organizations in supporting community-driven healthcare
          </EditorialHeading>
          <EditorialLead className="mt-5 max-w-3xl">
            Corporate sponsorship fuels Community Learning &amp; Care Hubs,
            ethical leadership training, and sustainable health programs across
            Ghana and beyond.
          </EditorialLead>
        </FadeIn>

        <ol className="mt-12 grid list-none gap-8 md:grid-cols-3 md:gap-10">
          {programPillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={0.06 * index}>
              <li className="border-t border-[#0097b2]/25 pt-6">
                <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {pillar.description}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </EditorialBand>

      <EditorialBand
        tone="white"
        marker="02"
        aria-labelledby="sponsorship-options-heading"
      >
        <FadeIn>
          <EditorialEyebrow tone="gold">Ways to Sponsor Akomapa</EditorialEyebrow>
          <EditorialHeading id="sponsorship-options-heading" className="mt-4">
            Transform Lives Through Strategic Partnership
          </EditorialHeading>
          <EditorialLead className="mt-5 max-w-3xl">
            We welcome both financial and in-kind contributions. Here are some
            of the many ways your organization can make a meaningful impact:
          </EditorialLead>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {sponsorshipOptions.map((option, index) => (
            <FadeIn key={option.id} delay={0.05 * index}>
              <article
                aria-labelledby={`sponsorship-option-${option.id}`}
                className="border-t-2 border-[#0097b2] pt-6"
              >
                <h3
                  id={`sponsorship-option-${option.id}`}
                  className="font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-2xl"
                >
                  {option.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {option.description}
                </p>
                <div className="mt-6 border border-[#1C1F1E]/10 bg-[#FCFAEF] p-5 dark:border-[#FCFAEF]/15 dark:bg-[#121514] sm:p-6">
                  <h4 className="font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#0097b2] dark:text-[#66C4DC]">
                    Recognition Benefits
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {option.recognition.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-[#2F3332]/85 dark:text-[#E6E7E7]/85 sm:text-base"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#eeba2b]"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="03"
        aria-labelledby="recognition-heading"
      >
        <FadeIn>
          <EditorialEyebrow>Your Recognition Matters</EditorialEyebrow>
          <EditorialHeading id="recognition-heading" className="mt-4">
            Celebrating Our Partners
          </EditorialHeading>
          <EditorialLead className="mt-5 max-w-3xl">
            All corporate sponsors receive comprehensive recognition and
            partnership benefits designed to showcase your commitment to
            healthcare equity.
          </EditorialLead>
        </FadeIn>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {recognitionBenefits.map((benefit, index) => (
            <FadeIn key={benefit.title} delay={0.05 * index}>
              <article className="border-l-2 border-[#eeba2b] pl-5 sm:pl-6">
                <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-xl">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {benefit.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.12}>
          <aside
            aria-labelledby="major-sponsor-heading"
            className="mt-12 border border-[#0097b2]/25 bg-white px-6 py-8 dark:border-[#66C4DC]/25 dark:bg-[#1C1F1E] sm:px-8 sm:py-10"
          >
            <EditorialEyebrow tone="gold">Major Sponsors</EditorialEyebrow>
            <h3
              id="major-sponsor-heading"
              className="mt-3 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-2xl"
            >
              Exclusive Major Sponsor Benefits
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
              Major sponsors may receive{" "}
              <span className="font-semibold text-[#1C1F1E] dark:text-[#F5C94D]">
                naming rights
              </span>{" "}
              to clinic days, pharmacy spaces, or leadership training events,
              creating lasting legacy partnerships that honor your commitment to
              healthcare equity.
            </p>
          </aside>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="04"
        aria-labelledby="sponsorship-cta-heading"
        className="border-t border-[#FCFAEF]/15 bg-[#0F4C5C]"
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end lg:gap-16">
          <FadeIn>
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Let&apos;s Build a Healthier Future—Together
            </EditorialEyebrow>
            <EditorialHeading
              id="sponsorship-cta-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Your Company&apos;s Generosity Can Change Lives
            </EditorialHeading>
            <EditorialLead className="mt-5 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              Your company&apos;s generosity can change lives, uplift
              communities, and inspire a new standard of sustainable care in
              Ghana. Join us in rewriting what is possible.
            </EditorialLead>
            <p className="mt-6 text-base text-[#FCFAEF]/85">
              To discuss corporate sponsorship opportunities, write to{" "}
              <a
                href={CONTACT.email.href}
                className="font-semibold text-[#F5C94D] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C]"
              >
                {CONTACT.email.display}
              </a>
              .
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="border-t border-[#66C4DC]/65 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/75">
                How partnership starts
              </p>
              <ol className="mt-5 space-y-4">
                {processSteps.map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="font-subheading text-xs font-bold tracking-[0.16em] text-[#eeba2b]"
                    >
                      {item.step}
                    </span>
                    <div>
                      <p className="font-semibold text-[#FCFAEF]">{item.title}</p>
                      <p className="mt-1 text-sm text-[#FCFAEF]/75">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-col gap-3">
                <EditorialButton
                  href="/contact?type=partnership"
                  variant="amber"
                  className="min-h-14 w-full justify-between"
                >
                  Become a Sponsor
                </EditorialButton>
                <EditorialButton
                  href="/donate"
                  variant="outline-light"
                  className="min-h-14 w-full justify-between"
                >
                  Individual Donations
                </EditorialButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </EditorialBand>
    </div>
  );
}
