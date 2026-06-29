import HeroSlider from "@/components/home/HeroSlider";

interface HeroSectionProps {
  height?: "full" | "large" | "medium";
}

export default function HeroSection({ height = "large" }: HeroSectionProps) {
  return <HeroSlider height={height} />;
}
