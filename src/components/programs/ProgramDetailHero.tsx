import type { ReactNode } from "react";
import Link from "next/link";
import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialChevron,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
  type EditorialButtonVariant,
} from "@/components/shared/EditorialPrimitives";

export type ProgramDetailCta = {
  href: string;
  label: string;
  variant?: EditorialButtonVariant;
  external?: boolean;
};

type ProgramDetailHeroProps = {
  eyebrow: string;
  title: string;
  titleId?: string;
  lead: string;
  image: string;
  imageAlt: string;
  ctas?: ProgramDetailCta[];
  backHref?: string;
  backLabel?: string;
  children?: ReactNode;
};

export default function ProgramDetailHero({
  eyebrow,
  title,
  titleId = "program-detail-hero-heading",
  lead,
  image,
  imageAlt,
  ctas = [],
  backHref = "/programs",
  backLabel = "Back to Programs",
  children,
}: ProgramDetailHeroProps) {
  return (
    <EditorialBand
      tone="teal"
      aria-labelledby={titleId}
      className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
      containerClassName="py-14 sm:py-16 md:py-20 lg:py-24"
    >
      <FadeIn>
        <Link
          href={backHref}
          className="mb-8 inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-[#FCFAEF]/85 transition-colors hover:text-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F4C5C]"
        >
          <EditorialChevron className="h-4 w-4" />
          {backLabel}
        </Link>
      </FadeIn>

      <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
        <FadeIn className="lg:col-span-7 lg:pb-4">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            {eyebrow}
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id={titleId}
            className="mt-5 max-w-4xl text-[2.1rem] text-[#FCFAEF] sm:text-[2.75rem] md:text-[3.4rem] lg:text-[3.9rem]"
          >
            {title}
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/88 dark:text-[#FCFAEF]/88">
            {lead}
          </EditorialLead>
          {ctas.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              {ctas.map((cta) => (
                <EditorialButton
                  key={`${cta.href}-${cta.label}`}
                  href={cta.href}
                  variant={cta.variant ?? "solid"}
                  external={cta.external}
                >
                  {cta.label}
                </EditorialButton>
              ))}
            </div>
          ) : null}
          {children}
        </FadeIn>

        <FadeIn direction="left" delay={0.15} className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C] lg:aspect-[4/5]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </EditorialBand>
  );
}
