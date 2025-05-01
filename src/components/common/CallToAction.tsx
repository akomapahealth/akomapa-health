import Link from "next/link";
import { Button } from "@/components/ui/button";

type CallToActionProps = {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
};

export default function CallToAction({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
}: CallToActionProps) {
  return (
    <section className="bg-skobeloff py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-heading font-bold text-floralwhite mb-4">
          {title}
        </h2>
        <p className="text-lg text-floralwhite/90 mb-8 max-w-3xl mx-auto font-body">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-amber text-floralwhite hover:bg-floralwhite hover:text-skobeloff">
            <Link href={primaryButtonHref}>{primaryButtonText}</Link>
          </Button>
          
          {secondaryButtonText && secondaryButtonHref && (
            <Button className="bg-transparent text-floralwhite border-2 border-floralwhite hover:bg-floralwhite hover:text-skobeloff">
              <Link href={secondaryButtonHref}>{secondaryButtonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}