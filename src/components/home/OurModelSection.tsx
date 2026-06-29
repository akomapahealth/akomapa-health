import Link from "next/link";
import { FadeIn } from "@/components/animations";
import {
  HomeBand,
  HomeEyebrow,
  HomeHeading,
  HomeLead,
  InlineArrow,
} from "@/components/home/_home-ui";

const components = [
  {
    title: "Community Learning & Care Hubs",
    body: "Supervised interprofessional student teams deliver screening, diagnosis, education, treatment, referral, and longitudinal follow-up — while the hubs double as living classrooms.",
    href: "/community-hubs",
    cta: "Visit the hubs",
  },
  {
    title: "Ethical Leadership Academy",
    body: "Preparing the next generation of health professionals through online learning, mentorship, and community-based service.",
    href: "/academy",
    cta: "Enter the Academy",
  },
  {
    title: "Research & Innovation",
    body: "Generating evidence that improves care, informs policy, and strengthens health systems.",
    href: "/research",
    cta: "See the research",
  },
  {
    title: "Nkwapa Digital Health Platform",
    body: "Secure patient records, longitudinal follow-up, quality improvement, and impact measurement across every hub.",
    href: "/research",
    cta: "Explore the platform",
  },
  {
    title: "Systems Partnerships",
    body: "Working alongside communities, universities, ministries of health, and institutions to build sustainable primary care.",
    href: "/partnerships",
    cta: "Build with us",
  },
];

export default function OurModelSection() {
  const headingId = "our-model-heading";

  return (
    <HomeBand tone="white" marker="04" aria-labelledby={headingId}>
      <FadeIn>
        <div className="max-w-3xl">
          <HomeEyebrow>Our Model</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4">
            Five components, one connected system.
          </HomeHeading>
          <HomeLead className="mt-6">
            Each part reinforces the others: every clinic improves care for
            today&rsquo;s patients, every student encounter prepares
            tomorrow&rsquo;s workforce, and every partnership strengthens local
            health systems.
          </HomeLead>
        </div>
      </FadeIn>

      <div className="mt-14">
        <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {components.map((item, index) => (
            <FadeIn
              key={item.title}
              delay={index * 0.06}
              as="li"
              className="relative"
            >
              <Link
                href={item.href}
                className="group relative flex h-full flex-col rounded-xl p-3 transition-colors hover:bg-[#FCFAEF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2] dark:hover:bg-[#1C1F1E]"
              >
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-md border border-[#1C1F1E]/25 bg-white font-subheading text-base font-bold tracking-[0.1em] text-[#0097b2] transition-colors group-hover:border-transparent group-hover:bg-[#0097b2] group-hover:text-[#FCFAEF] dark:border-[#FCFAEF]/25 dark:bg-[#1C1F1E] dark:text-[#66C4DC] dark:group-hover:bg-[#0097b2] dark:group-hover:text-[#FCFAEF]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold leading-snug text-[#1C1F1E] transition-colors group-hover:text-[#0097b2] dark:text-[#FCFAEF] dark:group-hover:text-[#66C4DC]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
                  {item.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0097b2] dark:text-[#66C4DC]">
                  {item.cta}
                  <InlineArrow className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>

              {/* Dashed connector to the next marker (desktop only), painted
                  above the card so the hover background doesn't break it. The
                  marker centre sits 40px down (12px card padding + 28px half of
                  the 56px square); the line spans this marker's right edge to
                  the next marker's left edge (24px gap + 12px padding). */}
              {index < components.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute hidden border-t border-dashed border-[#C1C3C3] dark:border-[#4F5554] lg:block"
                  style={{ left: "68px", right: "-36px", top: "40px" }}
                />
              ) : null}
            </FadeIn>
          ))}
        </ol>
      </div>
    </HomeBand>
  );
}
