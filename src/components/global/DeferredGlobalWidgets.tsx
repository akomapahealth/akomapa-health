"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { announcementCampaign } from "@/data/announcements";

const STORAGE_KEY = "akomapa-announcements-dismissed";

const AnnouncementModal = dynamic(
  () => import("@/components/announcement/AnnouncementModal"),
  { ssr: false }
);

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

function shouldLoadAnnouncement(): boolean {
  const { slides, version } = announcementCampaign;
  if (slides.length === 0) return false;

  try {
    if (localStorage.getItem(STORAGE_KEY) === version) return false;
  } catch {
    // localStorage unavailable — show anyway
  }

  return true;
}

export default function DeferredGlobalWidgets() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showClickTracker, setShowClickTracker] = useState(false);

  useEffect(() => {
    return scheduleIdle(() => setShowClickTracker(true));
  }, []);

  useEffect(() => {
    if (!shouldLoadAnnouncement()) return;

    // Load the modal chunk after idle so first paint is not blocked, while
    // keeping the modal's own 3s auto-open timer intact once mounted.
    return scheduleIdle(() => setShowAnnouncement(true), 2000);
  }, []);

  return (
    <>
      {showAnnouncement && <AnnouncementModal />}
      {showClickTracker && <GlobalClickTracker />}
    </>
  );
}
