import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { communityModelContent } from "@/data/ncd-impact";

export default function CommunityModel() {
  const { stages } = communityModelContent;

  return (
    <EditorialBand
      tone="cream"
      marker="03"
      id="community-model"
      aria-labelledby="community-model-heading"
      className="scroll-mt-20"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow>{communityModelContent.eyebrow}</EditorialEyebrow>
          <EditorialHeading id="community-model-heading" className="mt-4">
            {communityModelContent.heading}
          </EditorialHeading>
          <EditorialLead className="mt-5">
            {communityModelContent.description}
          </EditorialLead>
        </div>
      </FadeIn>

      <ol
        data-ncd-community-model
        className="mt-14 space-y-0 border-t border-[#1C1F1E]/15 dark:border-[#FCFAEF]/20"
      >
        {stages.map((stage, index) => (
          <li
            key={stage.id}
            className="border-b border-[#1C1F1E]/15 py-8 dark:border-[#FCFAEF]/20 lg:py-10"
          >
            <FadeIn>
              <div className="grid gap-4 sm:grid-cols-[5rem_1fr] sm:gap-8">
                <span
                  aria-hidden="true"
                  className="font-heading text-3xl font-semibold tracking-tight text-[#0097b2]/55 dark:text-[#66C4DC]/65"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] md:text-xl">
                    {stage.title}
                  </h3>
                  <p className="mt-1 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
                    {stage.who}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#2F3332]/75 dark:text-[#E6E7E7]/75 md:text-base">
                    {stage.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </EditorialBand>
  );
}
