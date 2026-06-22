import { FadeIn } from "@/components/animations";
import { studentsChangedContent } from "@/data/homepage-narrative";

export default function StudentsChangedSection() {
  const headingId = "students-changed-heading";

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate overflow-hidden bg-skobeloff py-16 text-floralwhite dark:bg-onyx-900 md:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(245,201,77,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(252,250,239,0.14),transparent_38%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-[8%] top-12 h-16 w-16 rounded-full border border-floralwhite/20"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-12 right-[10%] h-24 w-24 rounded-full border border-amber/40"
      />

      <div className="container mx-auto px-4">
        <FadeIn className="mx-auto max-w-5xl text-center">
          <p className="mb-5 font-subheading text-sm font-bold uppercase tracking-[0.2em] text-amber-300">
            Students as Changemakers
          </p>
          <h2
            id={headingId}
            className="font-heading text-4xl font-bold leading-tight text-floralwhite md:text-5xl lg:text-6xl"
          >
            {studentsChangedContent.heading}
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto my-8 h-1 w-24 rounded-full bg-amber"
          />
          <p className="mx-auto max-w-4xl text-lg leading-relaxed text-floralwhite/90 md:text-2xl md:leading-relaxed">
            {studentsChangedContent.body}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
