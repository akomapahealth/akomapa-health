"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GlobalClickTracker = dynamic(
  () => import("@/components/analytics/GlobalClickTracker"),
  { ssr: false }
);

function scheduleIdle(callback: () => void, fallbackMs = 1500): () => void {
  if (typeof requestIdleCallback !== "undefined") {
    const id = requestIdleCallback(callback, { timeout: fallbackMs });
    return () => cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, fallbackMs);
  return () => window.clearTimeout(id);
}

/**
 * Lazily mounts non-critical global widgets after idle.
 * Announcements are owned by AnnouncementProvider (auto-open + floating FAB).
 */
export default function DeferredGlobalWidgets() {
  const [showClickTracker, setShowClickTracker] = useState(false);

  useEffect(() => {
    return scheduleIdle(() => setShowClickTracker(true));
  }, []);

  return <>{showClickTracker && <GlobalClickTracker />}</>;
}
