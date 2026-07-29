import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

export default function PhilosophyVision() {
  return (
    <EditorialBand
      tone="onyx"
      aria-labelledby="philosophy-vision-heading"
      className="border-t border-[#66C4DC]/35"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-8">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Our Vision For Global Health
          </EditorialEyebrow>
          <EditorialHeading
            id="philosophy-vision-heading"
            className="mt-4 max-w-4xl text-[#FCFAEF]"
          >
            Transform how global health is taught, practiced, and led.
          </EditorialHeading>
          <EditorialLead className="mt-6 max-w-3xl text-[#FCFAEF]/80 dark:text-[#FCFAEF]/80">
            Akomapa is building a movement where students, faculty, health
            professionals, and communities learn together, lead ethically, and
            strengthen systems that last beyond any single project.
          </EditorialLead>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
          <EditorialButton
            href="/get-involved"
            variant="amber"
            className="focus-visible:ring-[#F5C94D]"
          >
            Join Us
          </EditorialButton>
          <EditorialButton
            href="/partnerships"
            variant="outline-light"
            className="focus-visible:ring-[#F5C94D]"
          >
            Partner With Us
          </EditorialButton>
        </div>
      </div>
    </EditorialBand>
  );
}
