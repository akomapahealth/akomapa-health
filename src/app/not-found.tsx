"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToMainContent from "@/components/layout/SkipToMainContent";
import { RouteNotFoundState } from "@/components/shared/RouteBoundaryPrimitives";

// Lottie ships ~30kB of runtime. Defer it so a hard-404 doesn't pay the cost
// upfront from any other route's chunk graph.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function NotFound() {
  const [animationData, setAnimationData] = useState<unknown>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setAnimationData(null);
      return;
    }

    let cancelled = false;

    fetch("/Error 404.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setAnimationData(data);
        }
      })
      .catch((err) => console.error("Failed to load animation:", err));

    return () => {
      cancelled = true;
    };
  }, [shouldReduceMotion]);

  const media =
    shouldReduceMotion === true ? (
      <div
        className="mx-auto mb-8 aspect-[4/3] max-w-md rounded-md border border-[#E6E7E7]/50 bg-[#FCFAEF] dark:border-[#4F5554]/50 dark:bg-[#1C1F1E]"
        aria-hidden="true"
      />
    ) : animationData !== null ? (
      <div className="mx-auto mb-8 max-w-md" aria-hidden="true">
        <Lottie
          animationData={animationData as object}
          loop
          className="h-auto w-full"
          aria-hidden="true"
        />
      </div>
    ) : (
      <div
        className="mx-auto mb-8 aspect-[4/3] max-w-md rounded-md bg-muted/40"
        aria-hidden="true"
      />
    );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SkipToMainContent />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex flex-1 items-center justify-center px-4 py-16 outline-none sm:py-24"
      >
        <RouteNotFoundState media={media} />
      </main>
      <Footer />
    </div>
  );
}
