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
import { announcementCampaign } from "@/data/announcements";
import AnnouncementModal from "@/components/announcement/AnnouncementModal";

const STORAGE_KEY = "akomapa-announcements-dismissed";

type AnnouncementContextValue = {
  openAnnouncements: () => void;
  hasUnseenAnnouncements: boolean;
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

export function AnnouncementProvider({ children }: AnnouncementProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnseenAnnouncements, setHasUnseenAnnouncements] = useState(false);
  const { slides, version } = announcementCampaign;

  useEffect(() => {
    if (slides.length === 0) return;

    try {
      setHasUnseenAnnouncements(localStorage.getItem(STORAGE_KEY) !== version);
    } catch {
      setHasUnseenAnnouncements(true);
    }
  }, [slides.length, version]);

  const openAnnouncements = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleDismiss = useCallback(() => {
    setHasUnseenAnnouncements(false);
  }, []);

  const value = useMemo(
    () => ({ openAnnouncements, hasUnseenAnnouncements }),
    [openAnnouncements, hasUnseenAnnouncements]
  );

  if (slides.length === 0) {
    return <>{children}</>;
  }

  return (
    <AnnouncementContext.Provider value={value}>
      {children}
      <AnnouncementModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onDismiss={handleDismiss}
      />
    </AnnouncementContext.Provider>
  );
}
