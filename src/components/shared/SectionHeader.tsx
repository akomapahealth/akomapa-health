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
      <div 
        className={`mb-10 ${
          alignment === "center" 
            ? "text-center" 
            : alignment === "right" 
              ? "text-right" 
              : "text-left"
        } ${className}`}
      >
        <h2 className="font-heading text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-4 max-w-3xl font-body text-lg text-gray-600">
            {description}
          </p>
        )}
      </div>
    );
  }
