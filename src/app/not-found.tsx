import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, 
          or maybe the URL was mistyped.
        </p>
        <Button className="bg-teal-600 hover:bg-teal-700">
          <Link href="/" className="flex items-center">
            <HomeIcon className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}