import {
  EditorialButton,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

type HubEmptyStateProps = {
  title: string;
  description: string;
  cta: { label: string; href: string };
  headingId?: string;
};

export default function HubEmptyState({
  title,
  description,
  cta,
  headingId,
}: HubEmptyStateProps) {
  return (
    <div
      data-hub-empty-state
      className="max-w-2xl border-l-2 border-[#eeba2b] pl-6 sm:pl-8"
    >
      <EditorialHeading
        as="h3"
        id={headingId}
        className="text-[1.35rem] md:text-[1.5rem] lg:text-[1.65rem]"
      >
        {title}
      </EditorialHeading>
      <EditorialLead className="mt-3">{description}</EditorialLead>
      <EditorialButton href={cta.href} variant="solid" className="mt-6">
        {cta.label}
      </EditorialButton>
    </div>
  );
}
