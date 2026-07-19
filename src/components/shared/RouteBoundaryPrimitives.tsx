import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicCta } from "@/components/shared/PublicPagePrimitives";

export const recoveryLinks = [
  { href: "/get-involved", label: "Get Involved" },
  { href: "/community-hubs", label: "Community Health Hubs" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
] as const;

export function RouteLoadingState({ message = "Loading page…" }: { message?: string }) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="text-center">
        <div
          className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-[#0097b2]"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-muted-foreground">{message}</p>
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
    <div className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]">
          <AlertCircle className="h-12 w-12" aria-hidden="true" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Something went wrong
        </p>
        <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          We hit a snag
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          This page ran into an unexpected problem. You can try again or head to
          one of the links below.
        </p>

        {isDev && error && (
          <div className="mt-6 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-left">
            <p className="text-sm font-medium text-destructive">{error.message}</p>
            {error.digest && (
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {onRetry ? (
            <Button
              type="button"
              onClick={onRetry}
              className="h-auto rounded-md bg-[#0097b2] px-7 py-4 text-base font-semibold text-[#FCFAEF] hover:bg-[#eeba2b] hover:text-[#1C1F1E] md:text-lg"
            >
              Try again
            </Button>
          ) : (
            <PublicCta href="/" variant="teal" icon={false}>
              Back to Homepage
            </PublicCta>
          )}
        </div>

        <nav className="mt-10" aria-label="Helpful links">
          <p className="text-sm font-medium text-foreground">
            Try one of these instead
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {recoveryLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm font-medium text-[#0097b2] underline-offset-4 transition-colors hover:text-[#eeba2b] hover:underline dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
