import { Linkedin, Mail } from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { academyFaculty } from "@/data/academy";
import type { FacultyMember } from "@/lib/types";

function FacultyCard({ faculty }: { faculty: FacultyMember }) {
  const hasLinks = faculty.socialLinks?.linkedin || faculty.socialLinks?.email;

  return (
    <article className="flex h-full flex-col border-t border-[#1C1F1E]/15 pt-6 dark:border-[#FCFAEF]/20">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-[#1C1F1E]/10 bg-[#E6E7E7] dark:border-[#FCFAEF]/15 dark:bg-[#2F3332]">
        <Image
          src={faculty.image}
          alt={`${faculty.name}, ${faculty.title}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 pt-5">
        <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
          {faculty.institution}
        </p>
        <h3 className="font-heading text-xl font-semibold leading-snug text-[#1C1F1E] dark:text-[#FCFAEF]">
          {faculty.name}
        </h3>
        <p className="text-sm leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          {faculty.title}
        </p>

        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {faculty.specialties.map((specialty) => (
            <li
              key={specialty}
              className="text-xs leading-relaxed text-[#2F3332]/70 dark:text-[#E6E7E7]/70"
            >
              {specialty}
            </li>
          ))}
        </ul>

        {hasLinks ? (
          <div className="mt-auto flex items-center gap-3 pt-4">
            {faculty.socialLinks?.linkedin ? (
              <a
                href={faculty.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1C1F1E]/15 text-[#1C1F1E] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]"
                aria-label={`${faculty.name} on LinkedIn`}
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            {faculty.socialLinks?.email ? (
              <a
                href={`mailto:${faculty.socialLinks.email}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#1C1F1E]/15 text-[#1C1F1E] transition-colors hover:border-[#0097b2] hover:text-[#0097b2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/25 dark:text-[#FCFAEF] dark:hover:border-[#66C4DC] dark:hover:text-[#66C4DC]"
                aria-label={`Email ${faculty.name}`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function FacultyGrid() {
  return (
    <EditorialBand
      tone="cream"
      marker="03"
      id="faculty"
      aria-labelledby="faculty-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow className="text-[#0F4C5C] dark:text-[#66C4DC]">
            Faculty
          </EditorialEyebrow>
          <EditorialHeading id="faculty-heading" className="mt-4">
            Learn From Leaders in the Field
          </EditorialHeading>
          <EditorialLead className="mt-5">
            Our faculty bring decades of experience across community medicine,
            health systems, clinical education, and public health leadership.
          </EditorialLead>
        </div>
      </FadeIn>

      <FadeInStagger className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:gap-8">
        {academyFaculty.map((faculty) => (
          <FadeInStaggerItem key={faculty.id}>
            <FacultyCard faculty={faculty} />
          </FadeInStaggerItem>
        ))}
      </FadeInStagger>
    </EditorialBand>
  );
}
