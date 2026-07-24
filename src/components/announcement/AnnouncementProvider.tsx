"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { announcementCampaign } from "@/data/announcements";

const STORAGE_KEY = "akomapa-announcements-dismissed";
const AUTO_OPEN_DELAY_MS = 3000;

const AnnouncementTrigger = dynamic(
  () => import("@/components/announcement/AnnouncementTrigger"),
  { ssr: false },
);

const AnnouncementModal = dynamic(
  () => import("@/components/announcement/AnnouncementModal"),
  { ssr: false },
);

type AnnouncementContextValue = {
  openAnnouncements: () => void;
  hasUnseenAnnouncements: boolean;
  isOpen: boolean;
};

const AnnouncementContext = createContext<AnnouncementContextValue | null>(null);

export function useAnnouncements() {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error("useAnnouncements must be used within AnnouncementProvider");
  }
  return context;
}

type AnnouncementProviderProps = {
  children: ReactNode;
};

function scheduleIdle(callback: () => void, fallbackMs = 1500): () => void {
  if (typeof requestIdleCallback !== "undefined") {
    const id = requestIdleCallback(callback, { timeout: fallbackMs });
    return () => cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, fallbackMs);
  return () => window.clearTimeout(id);
}

function isCampaignDismissed(version: string): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === version;
  } catch {
    return false;
  }
}

export function AnnouncementProvider({ children }: AnnouncementProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnseenAnnouncements, setHasUnseenAnnouncements] = useState(false);
  const [mountTrigger, setMountTrigger] = useState(false);
  const [mountModal, setMountModal] = useState(false);
  const { slides, version } = announcementCampaign;

  useEffect(() => {
    if (slides.length === 0) return;

    try {
      setHasUnseenAnnouncements(localStorage.getItem(STORAGE_KEY) !== version);
    } catch {
      setHasUnseenAnnouncements(true);
    }
  }, [slides.length, version]);

  // Idle-mount the FAB; keep it available without blocking first paint.
  useEffect(() => {
    if (slides.length === 0) return;
    return scheduleIdle(() => setMountTrigger(true));
  }, [slides.length]);

  // Mount the modal chunk only when needed: unseen auto-open path, or user opens FAB.
  useEffect(() => {
    if (slides.length === 0 || mountModal) return;

    if (isOpen) {
      setMountModal(true);
      return;
    }

    if (isCampaignDismissed(version)) return;

    return scheduleIdle(() => setMountModal(true));
  }, [slides.length, version, isOpen, mountModal]);

  // Auto-open for first-time visitors (new browser / unseen campaign version).
  useEffect(() => {
    if (slides.length === 0) return;
    if (isCampaignDismissed(version)) return;

    const timer = setTimeout(() => {
      setMountModal(true);
      setIsOpen(true);
    }, AUTO_OPEN_DELAY_MS);

    return () => clearTimeout(timer);
  }, [slides.length, version]);

  const openAnnouncements = useCallback(() => {
    setMountModal(true);
    setMountTrigger(true);
    setIsOpen(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setHasUnseenAnnouncements(false);
  }, []);

  const value = useMemo(
    () => ({ openAnnouncements, hasUnseenAnnouncements, isOpen }),
    [openAnnouncements, hasUnseenAnnouncements, isOpen],
  );

  if (slides.length === 0) {
    return <>{children}</>;
  }

  return (
    <AnnouncementContext.Provider value={value}>
      {children}
      {mountTrigger ? <AnnouncementTrigger /> : null}
      {mountModal ? (
        <AnnouncementModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onDismiss={handleDismiss}
        />
      ) : null}
    </AnnouncementContext.Provider>
  );
}
