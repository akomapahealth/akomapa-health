import Link from "next/link";
import type { ReactNode } from "react";
import {
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
      <p className="text-sm font-medium text-[#1C1F1E] dark:text-[#FCFAEF]">
        Try one of these instead
      </p>
      <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3">
        {recoveryLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="inline-flex min-h-11 items-center text-sm font-medium text-[#0097b2] underline-offset-4 transition-colors hover:text-[#eeba2b] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
            >
              {label}
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
        <div
          role="status"
          aria-live="polite"
          className="text-center"
        >
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
      className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-lg border-l-2 border-[#eeba2b] py-2 pl-6 text-left sm:pl-8">
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

        <div className="mt-8 flex flex-wrap gap-4">
          {onRetry ? (
            <button
              type="button"
              onClick={onRetry}
              className={recoveryActionClassName}
            >
              Try again
            </button>
          ) : (
            <EditorialButton href="/" variant="solid" icon={false}>
              Back to Homepage
            </EditorialButton>
          )}
        </div>

        <RouteRecoveryNav className="text-left [&_ul]:justify-start" />
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
      className="mx-auto w-full max-w-lg text-center"
    >
      {media}

      <p className="font-subheading text-xs font-bold uppercase tracking-[0.2em] text-[#C9920F] dark:text-[#F5C94D]">
        404
      </p>
      <EditorialHeading
        as="h1"
        className="mt-3 text-[1.85rem] md:text-[2.25rem] lg:text-[2.5rem]"
      >
        Page Not Found
      </EditorialHeading>
      <EditorialLead className="mt-4">
        We couldn&apos;t find the page you&apos;re looking for. It may have
        been moved, renamed, or the URL might be mistyped.
      </EditorialLead>

      <div className="mt-8 flex justify-center">
        <EditorialButton href="/" variant="solid" icon={false}>
          Back to Homepage
        </EditorialButton>
      </div>

      <RouteRecoveryNav />
    </div>
  );
}
