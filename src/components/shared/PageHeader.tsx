export default function PageHeader({
    title,
    description,
    className = "",
  }: {
    title: string;
    description?: string;
    className?: string;
  }) {
    return (
      <div className={`mx-auto mb-12 max-w-4xl text-center ${className}`}>
        <h1 className="font-heading text-4xl font-bold leading-tight text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-3xl font-body text-lg leading-relaxed text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-xl">
            {description}
          </p>
        )}
      </div>
    );
  }
