import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/animations";
import {
  EditorialBand,
  EditorialButton,
  EditorialEyebrow,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { ncdFutureVisionContent } from "@/data/ncd-impact";

const metricDividerClasses = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t lg:border-l lg:border-t-0",
  "border-t sm:border-l lg:border-l",
  "border-t lg:border-l",
] as const;

export default function NCDFutureVision() {
  return (
    <EditorialBand
      tone="onyx"
      marker="06"
      id="ncd-future-vision"
      aria-labelledby="ncd-future-heading"
    >
      <FadeIn>
        <div className="max-w-3xl">
          <EditorialEyebrow tone="gold" className="text-[#F5C94D]">
            {ncdFutureVisionContent.eyebrow}
          </EditorialEyebrow>
          <p className="mt-3 font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/65">
            Future targets — not yet achieved
          </p>
          <EditorialHeading
            id="ncd-future-heading"
            className="mt-4 text-[#FCFAEF]"
          >
            {ncdFutureVisionContent.heading}
          </EditorialHeading>
          <EditorialLead className="mt-5 text-[#FCFAEF]/85 dark:text-[#FCFAEF]/85">
            {ncdFutureVisionContent.description}
          </EditorialLead>
        </div>
      </FadeIn>

      <FadeInStagger className="mt-12" staggerDelay={0.08}>
        <dl
          data-ncd-future-targets
          className="grid border-y border-[#FCFAEF]/25 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ncdFutureVisionContent.targets.map((target, index) => (
            <FadeInStaggerItem key={target.label} direction="up">
              <div
                className={`flex min-h-40 flex-col justify-between border-[#FCFAEF]/25 px-1 py-7 sm:px-6 ${metricDividerClasses[index]}`}
              >
                <dt className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#FCFAEF]/70">
                  {target.label}
                </dt>
                <dd className="mt-4">
                  <p className="font-subheading text-[11px] font-bold uppercase tracking-[0.18em] text-[#F5C94D]/90">
                    Target by {target.futureYear}
                  </p>
                  <p className="mt-2 font-heading text-3xl font-semibold tracking-tight text-[#F5C94D] md:text-4xl">
                    {target.futureValue}
                  </p>
                </dd>
              </div>
            </FadeInStaggerItem>
          ))}
        </dl>
      </FadeInStagger>

      <FadeIn direction="up" delay={0.15}>
        <div className="mt-10 flex flex-wrap gap-3 sm:gap-4">
          {ncdFutureVisionContent.ctas.map((cta) => (
            <EditorialButton
              key={cta.label}
              href={cta.href}
              variant={cta.variant === "amber" ? "amber" : "outline-light"}
            >
              {cta.label}
            </EditorialButton>
          ))}
        </div>
      </FadeIn>
    </EditorialBand>
  );
}
