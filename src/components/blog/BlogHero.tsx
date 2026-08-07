import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

type BlogHeroProps = {
  postCount: number;
};

export function BlogHero({ postCount }: BlogHeroProps) {
  return (
    <EditorialBand
      tone="teal"
      aria-labelledby="thought-leadership-heading"
      className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-8">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Ideas grounded in practice
          </EditorialEyebrow>
          <EditorialHeading
            as="h1"
            id="thought-leadership-heading"
            className="mt-5 max-w-4xl text-[#FCFAEF]"
          >
            Thought Leadership
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            Student essays, faculty reflections, and community voices on ethical
            global health, community partnership, and the future of care.
          </EditorialLead>
        </div>
        <div className="border-t border-[#66C4DC]/55 pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="font-heading text-5xl font-semibold text-[#F5C94D] md:text-6xl">
            {postCount}
          </p>
          <p className="mt-2 max-w-xs text-sm font-semibold uppercase tracking-[0.16em] text-[#FCFAEF]/75">
            {postCount === 1 ? "Perspective" : "Perspectives"} from across the
            Akomapa network
          </p>
        </div>
      </div>
    </EditorialBand>
  );
}
