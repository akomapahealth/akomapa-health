import NextImage from "next/image";
import { FadeIn } from "@/components/animations";
import {
  HomeArrowLink,
  HomeBand,
  HomeEyebrow,
  HomeHeading,
} from "@/components/home/_home-ui";

const partners = [
  { name: "University of Cape Coast", logo: "/images/partners/ucc.png" },
  { name: "University of Ghana", logo: "/images/partners/ug-logo.png" },
  { name: "Yale School of Medicine", logo: "/images/partners/yale-sm-logo.png" },
  { name: "David Geffen School of Medicine at UCLA", logo: "/images/partners/ucla.png" },
  { name: "Ghana Health Service", logo: "/images/partners/ghana-health-service-logo.png" },
  { name: "African Impact Initiative", logo: "/images/partners/AII-logo-bg.png" },
  { name: "Yale African Innovation Symposium", logo: "/images/partners/yale-african-innovation.webp" },
  { name: "Africa Health Collaborative", logo: "/images/partners/africa-health-collab.png" },
  { name: "Tsai Center for Innovative Thinking", logo: "/images/partners/tsai-city-logo.png" },
  { name: "Mastercard Foundation", logo: "/images/partners/mastercard-foundation.png" },
];

export default function PartnersSection() {
  const headingId = "partners-heading";

  return (
    <HomeBand tone="white" aria-labelledby={headingId}>
      <FadeIn>
        <div className="mx-auto max-w-2xl text-center">
          <HomeEyebrow className="inline-block">Our Partners</HomeEyebrow>
          <HomeHeading id={headingId} className="mt-4">
            Who we work with.
          </HomeHeading>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 md:text-lg">
            We build with communities, universities, ministries of health, and
            partners committed to accessible noncommunicable disease care.
          </p>
        </div>
      </FadeIn>

      <ul
        data-testid="partner-logos"
        className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#E6E7E7] bg-[#E6E7E7] dark:border-[#2F3332] dark:bg-[#2F3332] sm:grid-cols-3 lg:grid-cols-5"
      >
        {partners.map((partner) => (
          <li
            key={partner.name}
            className="flex items-center justify-center bg-white p-6 dark:bg-[#1C1F1E]"
          >
            <div className="relative h-12 w-full opacity-80 transition-opacity duration-300 hover:opacity-100">
              <NextImage
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                sizes="(min-width: 1024px) 160px, (min-width: 640px) 22vw, 40vw"
                className="object-contain object-center"
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-10 text-center">
        <HomeArrowLink href="/partnerships" className="justify-center">
          See all partners
        </HomeArrowLink>
      </div>
    </HomeBand>
  );
}
