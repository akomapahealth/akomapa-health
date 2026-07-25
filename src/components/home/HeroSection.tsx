import HeroSlide from "@/components/home/HeroSlide";
import HeroInteractive from "@/components/home/HeroInteractive";
import { cn } from "@/lib/utils";

const BRAND_BACKGROUND = {
  src: "/highlights/Akomapa-28.jpg",
  alt: "Akomapa healthcare professionals working in a community clinic",
};

interface HeroSectionProps {
  height?: "full" | "large" | "medium";
}

const heightClasses: Record<NonNullable<HeroSectionProps["height"]>, string> = {
  full: "h-[100svh] min-h-[640px]",
  large: "h-[80svh] min-h-[560px]",
  medium: "h-[60svh] min-h-[480px]",
};

export default function HeroSection({ height = "full" }: HeroSectionProps) {
  return (
    <section
      className={cn("relative overflow-hidden", heightClasses[height])}
      aria-label="Akomapa homepage hero"
      data-testid="hero-slider"
    >
      <div className="h-full w-full bg-[#1C1F1E]">
        <HeroSlide
          content={{
            variant: "brand",
            id: "brand-intro",
            backgroundImage: BRAND_BACKGROUND.src,
            backgroundAlt: BRAND_BACKGROUND.alt,
          }}
          isPrimary
        />
      </div>
      <HeroInteractive />
    </section>
  );
}
