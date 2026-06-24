import { PublicSectionHeader } from "@/components/shared/PublicPagePrimitives";

export default function SectionHeader({
    title,
    description,
    alignment = "center",
    className = "",
  }: {
    title: string;
    description?: string;
    alignment?: "left" | "center" | "right";
    className?: string;
  }) {
    return (
      <PublicSectionHeader
        title={title}
        description={description}
        alignment={alignment === "right" ? "left" : alignment}
        className={`mb-10 ${alignment === "right" ? "ml-auto text-right" : ""} ${className}`}
        titleClassName="text-2xl sm:text-3xl"
      />
    );
  }
