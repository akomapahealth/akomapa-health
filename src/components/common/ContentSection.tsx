import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type ContentSectionProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkHref: string;
  linkText: string;
  imageOnRight?: boolean;
};

export default function ContentSection({
  title,
  description,
  imageSrc,
  imageAlt,
  linkHref,
  linkText,
  imageOnRight = false,
}: ContentSectionProps) {
  return (
    <section className="py-16 bg-floralwhite dark:bg-onyx-600">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${imageOnRight ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
          <div className="lg:w-1/2">
            <div className="relative w-full h-80 lg:h-96 rounded-lg overflow-hidden">
              <Image 
                src={imageSrc} 
                alt={imageAlt} 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-heading font-bold text-skobeloff dark:text-floralwhite mb-4">
              {title}
            </h2>
            <p className="text-lg text-onyx-600 dark:text-floralwhite/90 mb-6 font-body">
              {description}
            </p>
            <Button className="bg-skobeloff text-floralwhite hover:bg-amber hover:text-floralwhite">
              <Link href={linkHref}>{linkText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}