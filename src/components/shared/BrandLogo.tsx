import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  href?: string;
};

export default function BrandLogo({
  className,
  imageClassName,
  width = 250,
  height = 70,
  priority,
  href = "/",
}: BrandLogoProps) {
  const logo = (
    <span className={cn("relative inline-flex items-center", className)}>
      <Image
        src="/images/akomapa-logo.png"
        alt="Akomapa Health Foundation Logo"
        width={width}
        height={height}
        priority={priority}
        className={cn("h-12 w-auto object-contain dark:hidden", imageClassName)}
      />
      <Image
        src="/images/akomapa-logo-dark.png"
        alt="Akomapa Health Foundation Logo"
        width={width}
        height={height}
        priority={priority}
        className={cn("hidden h-12 w-auto object-contain dark:block", imageClassName)}
      />
    </span>
  );

  if (!href) return logo;

  return (
    <Link href={href} className={cn("inline-flex items-center", className)}>
      {logo}
    </Link>
  );
}
