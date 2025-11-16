"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Lottie from "lottie-react";

export default function NotFound() {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    fetch("/Error 404.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {animationData !== null ? (
          <div className="max-w-md mx-auto mb-8">
            <Lottie 
              animationData={animationData as object} 
              loop={true}
              className="w-full h-auto"
            />
          </div>
        ) : null}
        <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, 
          or maybe the URL was mistyped.
        </p>
        <Button className="bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF]">
          <Link href="/" className="flex items-center">
            <HomeIcon className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}