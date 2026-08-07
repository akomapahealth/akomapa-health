import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";

export default function ImpactCTA() {
  return (
    <EditorialBand
      tone="teal"
      id="impact-cta"
      aria-labelledby="impact-cta-heading"
    >
      <FadeIn direction="up">
        <div className="mx-auto max-w-3xl text-center">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            Join the Movement
          </EditorialEyebrow>
          <EditorialHeading
            id="impact-cta-heading"
            className="mt-4 text-[#FCFAEF]"
          >
            Help us reach our 2028 goals
          </EditorialHeading>
          <EditorialLead className="mx-auto mt-6 max-w-2xl text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            Every partnership, every gift, and every student leader moves us
            closer to healthier communities and a new model for global health.
            Add your strength to the movement.
          </EditorialLead>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <EditorialButton href="/get-involved" variant="amber">
              Get Involved
            </EditorialButton>
            <EditorialButton href="/donate" variant="outline-light">
              Donate
            </EditorialButton>
          </div>
        </div>
      </FadeIn>
    </EditorialBand>
  );
}
