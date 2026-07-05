"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PublicCta } from "@/components/shared/PublicPagePrimitives";

// Lottie ships ~30kB of runtime. Defer it so a hard-404 doesn't pay the cost
// upfront from any other route's chunk graph.
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const recoveryLinks = [
  { href: "/get-involved", label: "Get Involved" },
  { href: "/community-hubs", label: "Community Health Hubs" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NotFound() {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    fetch("/Error 404.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load animation:", err));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-lg text-center">
          {animationData !== null ? (
            <div className="mx-auto mb-8 max-w-md">
              <Lottie
                animationData={animationData as object}
                loop
                className="h-auto w-full"
                aria-hidden="true"
              />
            </div>
          ) : (
            <div
              className="mx-auto mb-8 max-w-md aspect-[4/3] animate-pulse rounded-2xl bg-muted/40"
              aria-hidden="true"
            />
          )}

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            404
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We couldn&apos;t find the page you&apos;re looking for. It may have
            been moved, renamed, or the URL might be mistyped.
          </p>

          <div className="mt-8 flex justify-center">
            <PublicCta href="/" variant="teal" icon={false}>
              Back to Homepage
            </PublicCta>
          </div>
        ) : null}
        <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, 
          or maybe the URL was mistyped.
        </p>
        <Button asChild className="bg-[#0097b2] hover:bg-[#0097b2]/80 text-[#FCFAEF]">
          <Link href="/" className="flex items-center">
            <HomeIcon className="h-4 w-4 mr-2" />
            Back to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
