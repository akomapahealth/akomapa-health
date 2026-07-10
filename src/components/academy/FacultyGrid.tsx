import { Linkedin, Mail } from "lucide-react";
import Image from "@/components/common/Image";
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import { academyFaculty } from "@/data/academy";
import type { FacultyMember } from "@/lib/types";

function FacultyCard({ faculty }: { faculty: FacultyMember }) {
  const hasLinks = faculty.socialLinks?.linkedin || faculty.socialLinks?.email;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[28px] border border-[#E6E7E7]/80 bg-white/95 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:border-[#2E3433] dark:bg-[#1C1F1E]/95">
      <div className="relative h-80 w-full overflow-hidden sm:h-96 md:h-[28rem] lg:h-[24rem]">
        <Image
          src={faculty.image}
          alt={`${faculty.name}, ${faculty.title}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-col gap-2 px-6 py-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC]">
          {faculty.institution}
        </p>
        <h3 className="text-xl font-semibold text-[#0B2F3A] dark:text-[#FCFAEF]">
          {faculty.name}
        </h3>
        <p className="text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          {faculty.title}
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
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
          <div className="mt-2 flex items-center gap-3 pt-2">
            {faculty.socialLinks?.linkedin ? (
              <a
                href={faculty.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E7E7] text-[#0B2F3A] transition-colors hover:bg-[#0097b2]/10 dark:border-[#2E3433] dark:text-[#FCFAEF] dark:hover:bg-[#0097b2]/20"
                aria-label={`${faculty.name} on LinkedIn`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            ) : null}
            {faculty.socialLinks?.email ? (
              <a
                href={`mailto:${faculty.socialLinks.email}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E7E7] text-[#0B2F3A] transition-colors hover:bg-[#0097b2]/10 dark:border-[#2E3433] dark:text-[#FCFAEF] dark:hover:bg-[#0097b2]/20"
                aria-label={`Email ${faculty.name}`}
              >
                <Mail className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function FacultyGrid() {
  return (
    <section className="overflow-x-hidden bg-[#FCFAEF] py-16 dark:bg-[#1C1F1E] md:py-24">
      <div className="site-container mx-auto px-4 sm:px-6">
        <FadeIn direction="up" className="mx-auto mb-10 max-w-3xl space-y-3 text-center sm:space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0097b2] dark:text-[#66C4DC] sm:text-sm">
            Faculty
          </p>
          <h2 className="text-2xl font-bold text-[#0B2F3A] dark:text-[#FCFAEF] sm:text-3xl md:text-4xl">
            Learn From Leaders in the Field
          </h2>
          <p className="text-base leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-lg">
            Our faculty bring decades of experience across community medicine,
            health systems, clinical education, and public health leadership.
          </p>
        </FadeIn>

        <FadeInStagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {academyFaculty.map((faculty) => (
            <FadeInStaggerItem key={faculty.id}>
              <FacultyCard faculty={faculty} />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
