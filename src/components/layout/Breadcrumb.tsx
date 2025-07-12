"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { Suspense } from "react";

function BreadcrumbContent() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Create breadcrumb items with proper formatting
  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    return {
      href,
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
    };
  });

  if (segments.length === 0) return null;

  return (
    <nav className="py-4 px-4 md:px-0">
      <ol className="flex flex-wrap items-center text-sm text-[#2F3332]/70 dark:text-[#FCFAEF]/70">
        <li className="flex items-center">
          <Link href="/" className="flex items-center hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-[#2F3332]/50 dark:text-[#FCFAEF]/50" />
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-[#2F3332] dark:text-[#FCFAEF]">{crumb.label}</span>
            ) : (
              <Link 
                href={crumb.href} 
                className="hover:text-[#C37B1E] dark:hover:text-[#F3C677] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function Breadcrumb() {
  return (
    <Suspense fallback={
      <nav className="py-4 px-4 md:px-0">
        <div className="flex items-center text-sm text-[#2F3332]/70 dark:text-[#FCFAEF]/70">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-32 rounded"></div>
        </div>
      </nav>
    }>
      <BreadcrumbContent />
    </Suspense>
  );
}