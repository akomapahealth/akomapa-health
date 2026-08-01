import Image from "@/components/common/Image";
import { FadeIn } from "@/components/animations";
import {
  EditorialBand,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { whyStudentsMatterContent } from "@/data/ncd-impact";

export default function WhyStudentsMatter() {
  return (
    <EditorialBand
      tone="teal"
      marker="02"
      id="why-students-matter"
      aria-labelledby="why-students-heading"
      className="bg-[#0F4C5C]"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            {whyStudentsMatterContent.eyebrow}
          </EditorialEyebrow>
          <EditorialHeading
            id="why-students-heading"
            className="mt-4 text-[#FCFAEF]"
          >
            {whyStudentsMatterContent.heading}
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            {whyStudentsMatterContent.description}
          </EditorialLead>
        </div>
      </FadeIn>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <FadeIn direction="up" delay={0.1} className="relative lg:col-span-5">
          <span
            aria-hidden="true"
            className="absolute -top-3 left-0 z-10 h-1 w-24 bg-[#eeba2b] md:w-36"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#FCFAEF]/25 bg-[#0F4C5C]">
            <Image
              src={whyStudentsMatterContent.image.src}
              alt={whyStudentsMatterContent.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </FadeIn>

        <ol
          data-ncd-student-reasons
          className="border-y border-[#FCFAEF]/25 lg:col-span-7"
        >
          {whyStudentsMatterContent.reasons.map((reason, index) => (
            <li
              key={reason.title}
              className={
                index === 0 ? "" : "border-t border-[#FCFAEF]/25"
              }
            >
              <FadeIn>
                <div className="flex gap-5 px-1 py-7 sm:px-5">
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-heading text-2xl font-semibold tracking-tight text-[#F5C94D]"
                  >
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-[#FCFAEF] md:text-xl">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#FCFAEF]/85 md:text-base">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </EditorialBand>
  );
}
