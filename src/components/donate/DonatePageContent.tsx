"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  Heart,
  Smartphone,
} from "lucide-react";
import Image from "@/components/common/Image";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { FadeIn } from "@/components/animations";
import DonationPaymentMethods from "@/components/donate/DonationPaymentMethods";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { cn } from "@/lib/utils";

const partnerAmounts = [
  { value: "20", label: "$20", description: "Monthly" },
  { value: "50", label: "$50", description: "Monthly" },
  { value: "100", label: "$100", description: "Monthly" },
  { value: "custom", label: "Other", description: "Custom amount" },
];

const oneTimeAmounts = [
  { value: "10", label: "$10" },
  { value: "25", label: "$25" },
  { value: "50", label: "$50" },
  { value: "100", label: "$100" },
  { value: "custom", label: "Custom" },
];

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
      "Give what feels right for you, whether it's $10 or $1,000",
  },
  {
    title: "Manual Mobile Money transfer",
    icon: Smartphone,
    description:
      "Review the verified MTN recipient details before completing a one-time transfer",
  },
  {
    title: "100% supports care",
    icon: Heart,
    description:
      "Every dollar goes directly to patient care and clinic operations",
  },
] as const;

function AmountButton({
  selected,
  onClick,
  label,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "min-h-14 rounded-md border-2 p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 md:p-4",
        selected
          ? "border-[#eeba2b] bg-[#FCFAEF] dark:bg-[#121514]"
          : "border-[#1C1F1E]/15 hover:border-[#0097b2]/50 dark:border-[#FCFAEF]/20",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-xl">
          {label}
        </div>
        {selected ? (
          <span className="font-subheading text-[10px] font-bold uppercase tracking-[0.14em] text-[#C9920F] dark:text-[#F5C94D]">
            Selected
          </span>
        ) : null}
      </div>
      {description ? (
        <div className="mt-1 text-xs text-[#2F3332]/75 dark:text-[#E6E7E7]/75 md:text-sm">
          {description}
        </div>
      ) : null}
    </button>
  );
}

export default function DonatePageContent() {
  const [selectedPartnerAmount, setSelectedPartnerAmount] = useState("20");
  const [selectedOneTimeAmount, setSelectedOneTimeAmount] = useState("25");
  const [customPartnerAmount, setCustomPartnerAmount] = useState("");
  const [customOneTimeAmount, setCustomOneTimeAmount] = useState("");
  const [activeSection, setActiveSection] = useState<"partner" | "one-time">(
    "partner",
  );

  const selectedPartnerGivingLevel =
    selectedPartnerAmount === "custom"
      ? customPartnerAmount
        ? `$${customPartnerAmount} monthly`
        : "a custom monthly amount"
      : `$${selectedPartnerAmount} monthly`;

  const selectedOneTimeGivingLevel =
    selectedOneTimeAmount === "custom"
      ? customOneTimeAmount
        ? `$${customOneTimeAmount} one time`
        : "a custom one-time amount"
      : `$${selectedOneTimeAmount} one time`;

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
          role="tablist"
          aria-label="Donation options"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <button
            type="button"
            role="tab"
            id="donate-tab-partner"
            aria-selected={activeSection === "partner"}
            aria-controls="donate-panel-partner"
            onClick={() => setActiveSection("partner")}
            className={cn(
              "min-h-14 border-2 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
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
          </button>
          <button
            type="button"
            role="tab"
            id="donate-tab-one-time"
            aria-selected={activeSection === "one-time"}
            aria-controls="donate-panel-one-time"
            onClick={() => setActiveSection("one-time")}
            className={cn(
              "min-h-14 border-2 px-4 py-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2",
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
          </button>
        </div>

        {activeSection === "partner" ? (
          <div
            id="donate-panel-partner"
            role="tabpanel"
            aria-labelledby="donate-tab-partner"
            className="mt-12 space-y-12"
          >
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
                    Whether you give $20, $50, $100, or more, your partnership
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
                      $20
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

            <FadeIn delay={0.08}>
              <div className="border border-[#1C1F1E]/10 bg-white px-6 py-8 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E] sm:px-8 sm:py-10">
                <h3 className="text-center font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl md:text-3xl">
                  Choose Your Monthly Partnership Amount
                </h3>
                <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
                  {partnerAmounts.map((amount) => (
                    <AmountButton
                      key={amount.value}
                      selected={selectedPartnerAmount === amount.value}
                      onClick={() => setSelectedPartnerAmount(amount.value)}
                      label={amount.label}
                      description={amount.description}
                    />
                  ))}
                </div>

                {selectedPartnerAmount === "custom" ? (
                  <div className="mt-6 sm:mt-8">
                    <Label
                      htmlFor="custom-partner-amount"
                      className="mb-2 block text-sm text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-base"
                    >
                      Enter your monthly amount
                    </Label>
                    <Input
                      id="custom-partner-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={customPartnerAmount}
                      onChange={(e) => setCustomPartnerAmount(e.target.value)}
                      className="h-12 border-[#0097b2] bg-[#FCFAEF] text-base focus:border-[#eeba2b] dark:border-[#66C4DC] dark:bg-[#121514] dark:focus:border-[#F5C94D] sm:text-lg"
                    />
                  </div>
                ) : null}

                <div className="mt-8">
                  <DonationPaymentMethods
                    flow="partner"
                    selectedGivingLevel={selectedPartnerGivingLevel}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        ) : (
          <div
            id="donate-panel-one-time"
            role="tabpanel"
            aria-labelledby="donate-tab-one-time"
            className="mt-12 space-y-12"
          >
            <FadeIn>
              <div className="border-t-2 border-[#0097b2] bg-white px-6 py-8 dark:bg-[#1C1F1E] sm:px-8 sm:py-10">
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="font-heading text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl">
                    Make a One-Time Gift
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
                    Give at your own pace using verified MTN Mobile Money
                    instructions. Every one-time contribution, large or small,
                    fuels medications, labs, and care at our clinic sites.
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

            <FadeIn delay={0.08}>
              <div className="border border-[#1C1F1E]/10 bg-white px-6 py-8 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E] sm:px-8 sm:py-10">
                <h3 className="text-center font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl md:text-3xl">
                  Choose Your Gift Amount
                </h3>
                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 md:gap-4">
                  {oneTimeAmounts.map((amount) => (
                    <AmountButton
                      key={amount.value}
                      selected={selectedOneTimeAmount === amount.value}
                      onClick={() => setSelectedOneTimeAmount(amount.value)}
                      label={amount.label}
                    />
                  ))}
                </div>

                {selectedOneTimeAmount === "custom" ? (
                  <div className="mt-6 sm:mt-8">
                    <Label
                      htmlFor="custom-one-time-amount"
                      className="mb-2 block text-sm text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-base"
                    >
                      Enter your gift amount
                    </Label>
                    <Input
                      id="custom-one-time-amount"
                      type="number"
                      placeholder="Enter amount"
                      value={customOneTimeAmount}
                      onChange={(e) => setCustomOneTimeAmount(e.target.value)}
                      className="h-12 border-[#0097b2] bg-[#FCFAEF] text-base focus:border-[#eeba2b] dark:border-[#66C4DC] dark:bg-[#121514] dark:focus:border-[#F5C94D] sm:text-lg"
                    />
                  </div>
                ) : null}

                <div className="mt-8">
                  <DonationPaymentMethods
                    flow="oneTime"
                    selectedGivingLevel={selectedOneTimeGivingLevel}
                  />
                </div>
              </div>
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
