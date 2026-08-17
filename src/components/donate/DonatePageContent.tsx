"use client";

import { DollarSign, Heart, ShieldCheck } from "lucide-react";
import Image from "@/components/common/Image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { FadeIn } from "@/components/animations";
import GhanaMobileMoney from "@/components/donate/GhanaMobileMoney";
import GivebutterCheckout from "@/components/donate/GivebutterCheckout";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { cn } from "@/lib/utils";

const partnerBenefits = [
  {
    title: "Quarterly 'Heartbeat' Updates",
    description: "Clinic impact and stories from the field",
  },
  {
    title: "Early Event Invitations",
    description: "Akomapa events and webinars",
  },
  {
    title: "Behind-the-Scenes Access",
    description: "Research, photos, and clinic milestones",
  },
  {
    title: "Part of Something Bold",
    description:
      "Deep sense of knowing you're part of something lasting",
  },
];

const impactAreas = [
  {
    title: "Early Disease Detection",
    description:
      "Reach patients with high blood pressure and diabetes before it's too late, while reinforcing that prevention also requires mental health awareness, stress management, emotional well-being, and regular screenings.",
  },
  {
    title: "Professional Development",
    description:
      "Train the next generation of ethical, community-minded health professionals who understand the unique needs of underserved populations.",
  },
  {
    title: "Program Expansion",
    description:
      "Power our upcoming pharmacy and food security programs that will provide comprehensive care beyond clinical services.",
  },
  {
    title: "Scalable Model",
    description:
      "Build a replicable model of healthcare delivery in Ghana and beyond, demonstrating sustainable solutions for underserved communities.",
  },
];

const oneTimeBenefits = [
  {
    title: "Choose any amount",
    icon: DollarSign,
    description:
      "Select a suggested amount here or choose another amount in the secure form",
  },
  {
    title: "Secure processor checkout",
    icon: ShieldCheck,
    description:
      "Givebutter handles payment details, confirmation, and your receipt",
  },
  {
    title: "Support where it matters",
    icon: Heart,
    description:
      "Your gift strengthens patient care, community programs, and clinic operations",
  },
] as const;

type DonatePageContentProps = {
  initialSection?: "partner" | "one-time";
};

export default function DonatePageContent({
  initialSection = "partner",
}: DonatePageContentProps) {
  const activeSection = initialSection;

  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="site-container mx-auto">
        <Breadcrumb />
      </div>

      <EditorialBand
        tone="teal"
        aria-labelledby="donate-hero-heading"
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
      >
        <FadeIn>
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Give With Purpose
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="donate-hero-heading"
            className="mt-5 max-w-4xl text-[2.35rem] text-[#FCFAEF] sm:text-[3rem] md:text-[3.7rem] lg:text-[4.35rem]"
          >
            Every act of generosity saves a life.
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            At Akomapa, we believe that healing is a shared calling—and
            transformation begins with bold hearts who dare to act. We are
            building something rare: a student-powered, community-rooted, and
            ethically led model of care for people who&apos;ve long been left
            behind.
          </EditorialLead>
        </FadeIn>
      </EditorialBand>

      <EditorialBand
        tone="cream"
        marker="01"
        aria-labelledby="giving-options-heading"
      >
        <FadeIn className="mx-auto mb-10 max-w-2xl text-center">
          <EditorialEyebrow>Ways to Give</EditorialEyebrow>
          <EditorialHeading id="giving-options-heading" className="mt-4">
            Choose how you want to support Akomapa
          </EditorialHeading>
        </FadeIn>

        <div
          role="group"
          aria-label="Donation options"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <a
            href="/donate?entry=partner&frequency=monthly"
            aria-current={activeSection === "partner" ? "page" : undefined}
            className={cn(
              "min-h-14 cursor-pointer border-2 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
              activeSection === "partner"
                ? "border-[#eeba2b] bg-white dark:bg-[#1C1F1E]"
                : "border-[#1C1F1E]/12 bg-transparent hover:border-[#0097b2]/40 dark:border-[#FCFAEF]/15",
            )}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                Partners Program
              </span>
              <span className="font-subheading text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9920F] dark:text-[#F5C94D]">
                Featured
              </span>
            </span>
            {activeSection === "partner" ? (
              <span className="mt-1 block text-xs text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                Currently viewing
              </span>
            ) : null}
          </a>
          {/* A native document navigation intentionally resets Givebutter's
              iframe. Givebutter documents recurring frequency values only;
              a fresh form is the safe way to restore its one-time default. */}
          <a
            href="/donate?entry=one-time"
            aria-current={activeSection === "one-time" ? "page" : undefined}
            className={cn(
              "min-h-14 cursor-pointer border-2 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
              activeSection === "one-time"
                ? "border-[#0097b2] bg-white dark:bg-[#1C1F1E]"
                : "border-[#1C1F1E]/12 bg-transparent hover:border-[#0097b2]/40 dark:border-[#FCFAEF]/15",
            )}
          >
            <span className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              One-Time Gift
            </span>
            {activeSection === "one-time" ? (
              <span className="mt-1 block text-xs text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                Currently viewing
              </span>
            ) : null}
          </a>
        </div>

        {activeSection === "partner" ? (
          <div className="mt-12 space-y-12">
            <FadeIn>
              <div className="border-t-2 border-[#eeba2b] bg-white px-6 py-8 dark:bg-[#1C1F1E] sm:px-8 sm:py-10">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="font-heading text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl">
                    The Akomapa Partners Program
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
                    But we cannot do it alone. The Akomapa Partners Program is a
                    growing community of monthly donors who believe in our
                    mission and walk with us—month by month, life by life.
                    Whether you give $25, $50, $100, or more, your partnership
                    sustains free care, medication, NHIS enrollment, and student
                    training in some of Ghana&apos;s most underserved
                    communities.
                  </p>
                </div>

                <dl className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="border-l-2 border-[#eeba2b] pl-4 text-left">
                    <dt className="text-xs font-medium uppercase tracking-wide text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                      Community Members Reached Monthly
                    </dt>
                    <dd className="mt-2 font-heading text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                      50+
                    </dd>
                  </div>
                  <div className="border-l-2 border-[#0097b2] pl-4 text-left">
                    <dt className="text-xs font-medium uppercase tracking-wide text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
                      Monthly Impact Starts
                    </dt>
                    <dd className="mt-2 font-heading text-4xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                      $25
                    </dd>
                  </div>
                </dl>

                <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-md border border-[#1C1F1E]/10 dark:border-[#FCFAEF]/15">
                  <Image
                    src="/highlights/Akomapa-66.jpg"
                    alt="Akomapa Partners Program - Community healthcare delivery"
                    fill
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  {impactAreas.map((impact) => (
                    <article
                      key={impact.title}
                      className="border-t border-[#0097b2]/30 pt-5"
                    >
                      <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                        {impact.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-base">
                        {impact.description}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-10 border border-[#eeba2b]/35 bg-[#FCFAEF] px-5 py-6 dark:bg-[#121514] sm:px-8 sm:py-8">
                  <h3 className="text-center font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl">
                    As a Partner, you&apos;ll receive:
                  </h3>
                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                    {partnerBenefits.map((benefit) => (
                      <div key={benefit.title}>
                        <h4 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {benefit.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08} className="space-y-6">
              <GivebutterCheckout entryPointId="partner" />
              <GhanaMobileMoney journey="partner" />
            </FadeIn>
          </div>
        ) : (
          <div className="mt-12 space-y-12">
            <FadeIn>
              <div className="border-t-2 border-[#0097b2] bg-white px-6 py-8 dark:bg-[#1C1F1E] sm:px-8 sm:py-10">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="font-heading text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl">
                    Make a One-Time Gift
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
                    Give at your own pace through Givebutter&apos;s secure checkout.
                    Every one-time contribution, large or small, fuels
                    medications, labs, and care at our clinic sites.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {oneTimeBenefits.map((benefit) => {
                    const IconComponent = benefit.icon;
                    return (
                      <article
                        key={benefit.title}
                        className="border-t border-[#0097b2]/30 pt-5 text-left"
                      >
                        <div className="mb-3 inline-flex h-11 w-11 items-center justify-center border border-[#0097b2]/30 text-[#0097b2] dark:border-[#66C4DC]/40 dark:text-[#66C4DC]">
                          <IconComponent
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <h4 className="font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
                          {benefit.title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
                          {benefit.description}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08} className="space-y-6">
              <GivebutterCheckout entryPointId="oneTime" />
              <GhanaMobileMoney journey="oneTime" />
            </FadeIn>
          </div>
        )}
      </EditorialBand>

      <EditorialBand
        tone="teal"
        marker="02"
        aria-labelledby="corporate-giving-heading"
        className="border-t border-[#FCFAEF]/15 bg-[#0F4C5C]"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <FadeIn className="lg:col-span-6">
            <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
              Corporate Partnerships
            </EditorialEyebrow>
            <EditorialHeading
              id="corporate-giving-heading"
              className="mt-4 text-[#FCFAEF]"
            >
              Corporate Sponsorship Opportunities
            </EditorialHeading>
            <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
              We welcome corporate partnerships with mission-aligned businesses
              and organizations seeking to invest in health equity.
            </EditorialLead>
            <h3 className="mt-8 font-heading text-xl font-semibold text-[#FCFAEF] sm:text-2xl">
              Transform Lives Together
            </h3>
            <p className="mt-3 text-base leading-relaxed text-[#FCFAEF]/85 sm:text-lg">
              Your company&apos;s support can transform lives, and we&apos;re
              happy to work with you to recognize your contribution, including
              co-branding opportunities, features in our updates, and
              involvement in community events.
            </p>
            <ul className="mt-6 space-y-3 text-base text-[#FCFAEF]/85 sm:text-lg">
              {[
                "Financial contributions",
                "Donations of medications and medical supplies",
                "Equipment or service support for our clinics",
                "Collaboration on health education or outreach campaigns",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 bg-[#eeba2b]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <EditorialButton
                href="/partnerships/corporate-sponsorship"
                variant="light"
              >
                Learn More About Corporate Sponsorship
              </EditorialButton>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="relative lg:col-span-6">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25">
              <Image
                src="/highlights/Akomapa-73.jpg"
                alt="Corporate partnerships and collaboration"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </EditorialBand>
    </div>
  );
}
