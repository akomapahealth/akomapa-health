import { FadeIn } from "@/components/animations";
import {
  PublicSection,
  PublicSectionHeader,
} from "@/components/shared/PublicPagePrimitives";
import { studentsChangedContent } from "@/data/homepage-narrative";

export default function StudentsChangedSection() {
  const headingId = "students-changed-heading";

  return (
    <PublicSection aria-labelledby={headingId} tone="teal" spacing="spacious">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(252,250,239,0.08),transparent_42%,rgba(245,201,77,0.14))]"
      />

      <FadeIn className="mx-auto max-w-5xl text-center">
        <PublicSectionHeader
          eyebrow="Students as Changemakers"
          eyebrowTone="gold"
          title={studentsChangedContent.heading}
          titleId={headingId}
          titleClassName="text-[#FCFAEF] dark:text-[#FCFAEF]"
        />
        <div
          aria-hidden="true"
          className="mx-auto my-8 h-1 w-24 rounded-full bg-[#eeba2b]"
        />
        <p className="mx-auto max-w-4xl text-lg leading-relaxed text-[#FCFAEF]/90 md:text-2xl md:leading-relaxed">
          {studentsChangedContent.body}
        </p>
      </FadeIn>
    </PublicSection>
  );
}
