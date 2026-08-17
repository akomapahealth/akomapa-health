import Link from "next/link";
import { InlineArrow } from "@/components/home/_home-ui";
import Image from "@/components/common/Image";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/config/brand";

export type BrandSlideContent = {
  variant: "brand";
  id: "brand-intro";
  backgroundImage: string;
  backgroundAlt: string;
};

export type HeroSlideContent = BrandSlideContent;

type Props = {
  content: HeroSlideContent;
  isPrimary?: boolean;
};

const ctaButtonClass =
  "group bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF] px-8 py-6 h-auto text-lg font-medium rounded-half transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl";

const secondaryCtaClass =
  "group bg-[#eeba2b] hover:bg-[#eeba2b]/80 text-[#FCFAEF] px-8 py-6 h-auto text-lg font-medium rounded-half transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl";

function ScrimOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[#0B0F0E]/55"
      aria-hidden
    />
  );
}

export default function HeroSlide({ content, isPrimary = false }: Props) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 brightness-[0.96] contrast-[1.03]">
        <Image
          src={content.backgroundImage}
          alt={content.backgroundAlt}
          fill
          loading={isPrimary ? "eager" : "lazy"}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <ScrimOverlay />

      <div className="relative z-10 mx-auto flex h-full max-w-[var(--container-max,80rem)] items-center px-4 sm:px-6 lg:px-8">
        <div className="hero-entrance max-w-4xl py-16 text-left md:py-24">
          <h1 className="font-heading hero-heading-shadow mb-6 text-4xl font-semibold tracking-tight text-balance text-[#FCFAEF] md:text-5xl lg:text-6xl leading-[1.04]">
            Advancing{" "}
            <span className="text-[#eeba2b]">Noncommunicable Disease</span>{" "}
            <span className="text-[#8DD4E6] dark:text-[#B0E8F5]">
              Prevention & Care
            </span>
          </h1>

          <p className="font-body hero-body-shadow mb-8 max-w-2xl text-lg font-medium leading-relaxed text-[#FCFAEF] md:text-xl">
            {BRAND.heroSubheadline}
          </p>

          <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
            <Button asChild size="lg" className={ctaButtonClass}>
              <Link
                href={BRAND.heroPrimaryCTA.href}
                className="flex items-center space-x-2"
              >
                <span>{BRAND.heroPrimaryCTA.label}</span>
                <InlineArrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button asChild size="lg" className={secondaryCtaClass}>
              <Link
                href={BRAND.heroSecondaryCTA.href}
                className="flex items-center space-x-2"
              >
                <span>{BRAND.heroSecondaryCTA.label}</span>
                <InlineArrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
