import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type CardWithButtonProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  linkHref: string;
  linkText: string;
};

export default function CardWithButton({
  title,
  description,
  imageSrc,
  imageAlt,
  linkHref,
  linkText,
}: CardWithButtonProps) {
  return (
    <div className="bg-white dark:bg-onyx-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-subheading font-bold text-skobeloff dark:text-floralwhite mb-3">
          {title}
        </h3>
        <p className="text-onyx-600 dark:text-floralwhite/90 mb-4 font-body">
          {description}
        </p>
        <Button className="bg-lapis text-floralwhite hover:bg-amber hover:text-floralwhite w-full">
          <Link href={linkHref}>{linkText}</Link>
        </Button>
      </div>
    </div>
  );
}