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
      <div className={`mb-12 text-center ${className}`}>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[#2F3332] dark:text-[#FCFAEF] sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-3xl font-body text-lg text-[#2F3332]/70 dark:text-[#FCFAEF]/70">
            {description}
          </p>
        )}
      </div>
    );
  }
