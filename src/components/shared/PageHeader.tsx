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
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>
    );
  }