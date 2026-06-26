import { Linkedin, Mail } from "lucide-react";
import Image from "@/components/common/Image";
import {
  FadeIn,
  FadeInStagger,
  FadeInStaggerItem,
} from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
  SurfaceCard,
} from "@/components/shared/PublicPagePrimitives";
import { academyFaculty } from "@/data/academy";
import type { FacultyMember } from "@/lib/types";

function FacultyCard({ faculty }: { faculty: FacultyMember }) {
  const hasLinks = faculty.socialLinks?.linkedin || faculty.socialLinks?.email;

  return (
    <SurfaceCard interactive className="overflow-hidden">
      <div className="relative aspect-[4/5]">
        <Image
          src={faculty.image}
          alt={`${faculty.name}, ${faculty.title}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: "center top" }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#121514]/60 via-transparent to-transparent"
        />
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
          {faculty.name}
        </h3>
        <p className="mt-1 text-sm text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
          {faculty.title}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-[#0097b2] dark:text-[#66C4DC]">
          {faculty.institution}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {faculty.specialties.map((specialty) => (
            <span
              key={specialty}
              className="rounded-full bg-[#0097b2]/8 px-2.5 py-0.5 text-xs text-[#0097b2] dark:bg-[#66C4DC]/12 dark:text-[#66C4DC]"
            >
              {specialty}
            </span>
          ))}
        </div>

        {hasLinks ? (
          <div className="mt-4 flex gap-2">
            {faculty.socialLinks?.linkedin ? (
              <a
                href={faculty.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#2F3332]/60 transition-colors hover:bg-[#0097b2]/10 hover:text-[#0097b2] dark:text-[#E6E7E7]/60 dark:hover:bg-[#66C4DC]/15 dark:hover:text-[#66C4DC]"
                aria-label={`${faculty.name} on LinkedIn`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            ) : null}
            {faculty.socialLinks?.email ? (
              <a
                href={`mailto:${faculty.socialLinks.email}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#2F3332]/60 transition-colors hover:bg-[#0097b2]/10 hover:text-[#0097b2] dark:text-[#E6E7E7]/60 dark:hover:bg-[#66C4DC]/15 dark:hover:text-[#66C4DC]"
                aria-label={`Email ${faculty.name}`}
              >
                <Mail className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </SurfaceCard>
  );
}

export default function FacultyGrid() {
  return (
    <PublicSection tone="cream" spacing="normal" withTexture>
      <FadeIn>
        <PublicSectionHeader
          eyebrow="Faculty"
          title="Learn From Leaders in the Field"
          description="Our faculty bring decades of experience across community medicine, health systems, clinical education, and public health leadership."
          alignment="center"
          className="mb-12 md:mb-16"
        />
      </FadeIn>

      <FadeInStagger className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {academyFaculty.map((faculty) => (
          <FadeInStaggerItem key={faculty.id}>
            <FacultyCard faculty={faculty} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </PublicSection>
  );
}
