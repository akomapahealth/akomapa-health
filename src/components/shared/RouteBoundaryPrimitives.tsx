import Link from "next/link";
import type { ReactNode } from "react";
import {
  EditorialArrow,
  EditorialButton,
  EditorialHeading,
  EditorialLead,
} from "@/components/shared/EditorialPrimitives";
import { cn } from "@/lib/utils";

export const recoveryLinks = [
  { href: "/get-involved", label: "Get Involved" },
  { href: "/community-hubs", label: "Community Health Hubs" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
] as const;

const recoveryActionClassName =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#0097b2] px-6 py-3 text-sm font-semibold text-[#FCFAEF] transition-colors hover:bg-[#eeba2b] hover:text-[#1C1F1E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 md:text-base";

function RouteRecoveryNav({ className }: { className?: string }) {
  return (
    <nav
      className={cn("mt-10", className)}
      aria-label="Helpful links"
      data-route-recovery-nav
    >
      <p className="font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#C9920F] dark:text-[#F5C94D]">
        Helpful destinations
      </p>
      <p className="mt-2 text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
        Try one of these instead
      </p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {recoveryLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="group inline-flex min-h-11 w-full items-center justify-between gap-3 border border-[#1C1F1E]/10 bg-white/70 px-4 py-3 text-sm font-medium text-[#0097b2] transition-colors hover:border-[#0097b2]/40 hover:text-[#0F4C5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E]/50 dark:text-[#66C4DC] dark:hover:border-[#66C4DC]/40 dark:hover:text-[#F5C94D]"
            >
              <span>{label}</span>
              <EditorialArrow className="opacity-70 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function RouteLoadingState({
  message = "Loading page…",
}: {
  message?: string;
}) {
  return (
    <div
      data-route-loading-state
      className="flex flex-1 flex-col bg-background"
      aria-busy="true"
    >
      <div className="site-container mx-auto w-full px-4 py-4">
        <div
          className="h-4 w-40 max-w-full rounded-sm bg-[#1C1F1E]/10 dark:bg-[#FCFAEF]/10"
          aria-hidden="true"
        />
      </div>

      <div
        className="border-b border-[#FCFAEF]/20 bg-[#0F4C5C]"
        aria-hidden="true"
      >
        <div className="site-container mx-auto space-y-4 px-4 py-14 sm:py-16 md:py-20">
          <div className="h-3 w-16 rounded-sm bg-[#FCFAEF]/25" />
          <div className="h-10 w-3/4 max-w-xl rounded-sm bg-[#FCFAEF]/20" />
          <div className="h-4 w-1/2 max-w-md rounded-sm bg-[#FCFAEF]/15" />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center px-4 py-16 sm:py-20">
        <div role="status" aria-live="polite" className="text-center">
          <div
            data-route-loading-spinner
            className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-[#0097b2] motion-reduce:animate-none"
            aria-hidden="true"
          />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>

        <div
          className="mt-12 w-full max-w-[65ch] space-y-3"
          aria-hidden="true"
        >
          <div className="h-3 w-full rounded-sm bg-[#1C1F1E]/8 dark:bg-[#FCFAEF]/10" />
          <div className="h-3 w-11/12 rounded-sm bg-[#1C1F1E]/8 dark:bg-[#FCFAEF]/10" />
          <div className="h-3 w-4/5 rounded-sm bg-[#1C1F1E]/8 dark:bg-[#FCFAEF]/10" />
          <div className="h-3 w-10/12 rounded-sm bg-[#1C1F1E]/8 dark:bg-[#FCFAEF]/10" />
        </div>
      </div>
    </div>
  );
}

type RouteErrorStateProps = {
  error?: Error & { digest?: string };
  onRetry?: () => void;
};

export function RouteErrorState({ error, onRetry }: RouteErrorStateProps) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div
      data-route-error-state
      className="flex flex-1 items-center justify-center bg-[#FCFAEF] px-4 py-16 dark:bg-[#121514] sm:py-24"
    >
      <div className="mx-auto w-full max-w-xl border border-[#E6E7E7]/70 bg-white px-6 py-10 dark:border-[#4F5554]/50 dark:bg-[#1C1F1E] sm:px-10 sm:py-12">
        <div
          className="mb-6 h-1 w-12 bg-[#eeba2b]"
          aria-hidden="true"
        />
        <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
          Something went wrong
        </p>
        <EditorialHeading
          as="h1"
          className="mt-3 text-[1.85rem] md:text-[2.25rem] lg:text-[2.5rem]"
        >
          We hit a snag
        </EditorialHeading>
        <EditorialLead className="mt-4">
          This page ran into an unexpected problem. You can try again or head to
          one of the links below.
        </EditorialLead>

        {isDev && error ? (
          <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-left">
            <p className="text-sm font-medium text-destructive">{error.message}</p>
            {error.digest ? (
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                Digest: {error.digest}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className={recoveryActionClassName}
            >
              Try again
            </button>
          ) : (
            <EditorialButton href="/" variant="solid">
              Back to Homepage
            </EditorialButton>
          )}
          <EditorialButton href="/contact" variant="outline" icon={false}>
            Contact us
          </EditorialButton>
        </div>

        <RouteRecoveryNav />
      </div>
    </div>
  );
}

type RouteNotFoundStateProps = {
  media?: ReactNode;
};

export function RouteNotFoundState({ media }: RouteNotFoundStateProps) {
  return (
    <div
      data-route-not-found-state
      className="mx-auto w-full max-w-2xl border border-[#E6E7E7]/70 bg-white dark:border-[#4F5554]/50 dark:bg-[#1C1F1E]"
    >
      {media ? (
        <div
          data-route-not-found-media
          className="border-b border-[#E6E7E7]/50 bg-[#FCFAEF]/80 px-6 pt-8 dark:border-[#4F5554]/40 dark:bg-[#121514]/80 sm:px-10"
        >
          {media}
        </div>
      ) : null}

      <div className="px-6 py-10 text-center sm:px-10 sm:py-12">
        <div
          className="mx-auto mb-6 h-1 w-12 bg-[#eeba2b]"
          aria-hidden="true"
        />
        <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
          404
        </p>
        <EditorialHeading
          as="h1"
          className="mt-3 text-[1.85rem] md:text-[2.25rem] lg:text-[2.5rem]"
        >
          Page Not Found
        </EditorialHeading>
        <EditorialLead className="mx-auto mt-4 max-w-md">
          We couldn&apos;t find the page you&apos;re looking for. It may have
          been moved, renamed, or the URL might be mistyped.
        </EditorialLead>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <EditorialButton href="/" variant="solid">
            Back to Homepage
          </EditorialButton>
          <EditorialButton href="/contact" variant="outline" icon={false}>
            Contact us
          </EditorialButton>
        </div>

        <RouteRecoveryNav className="text-left" />
      </div>
    </div>
  );
}
