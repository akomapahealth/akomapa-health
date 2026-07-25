"use client";

import { useEffect } from "react";
import { captureException } from "@/lib/sentry";
import { RouteErrorState } from "@/components/shared/RouteBoundaryPrimitives";

export default function MainError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    void captureException(error);
  }, [error]);

  return <RouteErrorState error={error} onRetry={reset} />;
}
