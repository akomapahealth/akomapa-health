import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
  GraduationCap,
  Handshake,
  Heart,
  Stethoscope,
  User,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { SurfaceCard } from "@/components/shared/PublicPagePrimitives";

const iconMap: Record<string, LucideIcon> = {
  User,
  GraduationCap,
  Stethoscope,
  FlaskConical,
  Handshake,
  Heart,
};

export interface PathwayCardProps {
  icon: string;
  title: string;
  description: string;
  audience: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
  accent: string;
  featured?: boolean;
}

export default function PathwayCard({
  icon,
  title,
  description,
  audience,
  ctaLabel,
  ctaHref,
  external = false,
  accent,
  featured = false,
}: PathwayCardProps) {
  const Icon = iconMap[icon];

  const ctaContent = (
    <>
      {ctaLabel}
      {external ? (
        <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
      ) : (
        <ArrowRight
          className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  const ctaClassName =
    "mt-6 inline-flex items-center font-subheading text-sm font-bold uppercase tracking-[0.14em] text-[#0097b2] transition-colors hover:text-[#eeba2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0097b2]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:text-[#66C4DC] dark:hover:text-[#F5C94D] dark:focus-visible:ring-offset-[#121514]";

  return (
    <SurfaceCard
      interactive
      accentColor={`${accent}3D`}
      className="group relative flex h-full flex-col overflow-hidden p-6 sm:p-7"
      style={{ "--pathway-accent": accent } as CSSProperties}
    >
      {/* Accent top border */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 rounded-t-xl"
        style={{ backgroundColor: accent }}
      />

      <div className="flex items-center justify-between gap-3">
        <span
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          {Icon ? <Icon className="h-6 w-6" aria-hidden="true" /> : null}
        </span>
        {featured ? (
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ backgroundColor: `${accent}1F`, color: accent }}
          >
            Primary pathway
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 font-heading text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
        {title}
      </h3>

      <p className="mt-3 font-body leading-7 text-[#2F3332]/75 dark:text-[#FCFAEF]/70">
        {description}
      </p>

      <p className="mt-4 border-l-2 border-[#E6E7E7] pl-3 font-body text-sm leading-6 text-[#2F3332]/65 dark:border-[#2E3433] dark:text-[#FCFAEF]/55">
        <span className="font-semibold text-[#2F3332] dark:text-[#FCFAEF]/80">
          For:
        </span>{" "}
        {audience}
      </p>

      <div className="mt-auto">
        {external ? (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClassName}
          >
            {ctaContent}
          </a>
        ) : (
          <Link href={ctaHref} className={ctaClassName}>
            {ctaContent}
          </Link>
        )}
      </div>
    </SurfaceCard>
  );
}
