import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { BRAND } from "@/config/brand";

export default function MissionVisionSection() {
  return (
    <EditorialBand
      tone="cream"
      marker="02"
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
    >
      <div className="max-w-3xl">
        <EditorialEyebrow>Purpose &amp; Direction</EditorialEyebrow>
        <EditorialHeading id="mission-vision-heading" className="mt-4">
          Mission &amp; Vision
        </EditorialHeading>
        <EditorialLead className="mt-5">
          Our mission and vision anchor every program, partnership, and community
          we serve.
        </EditorialLead>
      </div>

      <dl className="mt-12 grid border-y border-[#1C1F1E]/15 lg:grid-cols-12 dark:border-[#FCFAEF]/20">
        <div className="py-8 lg:col-span-5 lg:pr-12">
          <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#0097b2] dark:text-[#66C4DC]">
            Our Mission
          </dt>
          <dd className="mt-5 font-heading text-xl font-semibold leading-relaxed text-[#1C1F1E] dark:text-[#FCFAEF] md:text-2xl">
            {BRAND.mission}
          </dd>
        </div>

        <div className="border-t border-[#1C1F1E]/15 py-8 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-12 dark:border-[#FCFAEF]/20">
          <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
            Our Vision
          </dt>
          <dd className="mt-5 max-w-3xl text-lg leading-relaxed text-[#2F3332]/85 dark:text-[#E6E7E7]/85 md:text-xl">
            {BRAND.vision}
          </dd>
        </div>
      </dl>
    </EditorialBand>
  );
}
