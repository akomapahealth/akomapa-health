"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import {
  readConsent,
  subscribeToConsent,
  writeConsent,
  type ConsentPreferences,
  type ConsentRecord,
} from "@/lib/consent";

const CookieSettingsDialog = dynamic(
  () => import("@/components/consent/CookieSettingsDialog"),
  { ssr: false },
);

/**
 * `unknown` until the stored choice has been read on the client, so the
 * server render and first client render never show (or flash) the banner.
 */
export type ConsentStatus = "unknown" | "undecided" | "decided";

type ConsentContextValue = {
  status: ConsentStatus;
  analytics: boolean;
  /** True once a choice was made on this page (vs. another tab or visit). */
  hasChosenInThisTab: boolean;
  acceptOptional: () => void;
  rejectOptional: () => void;
  savePreferences: (preferences: ConsentPreferences) => void;
  openSettings: () => void;
  isSettingsOpen: boolean;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useCookieConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within ConsentProvider");
  }
  return context;
}

type ConsentProviderProps = {
  children: ReactNode;
};

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [hasRead, setHasRead] = useState(false);
  const [hasChosenInThisTab, setHasChosenInThisTab] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mountSettings, setMountSettings] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sync = () => setRecord(readConsent());
    sync();
    setHasRead(true);
    return subscribeToConsent(sync);
  }, []);

  const savePreferences = useCallback((preferences: ConsentPreferences) => {
    setHasChosenInThisTab(true);
    setRecord(writeConsent(preferences));
  }, []);

  const acceptOptional = useCallback(
    () => savePreferences({ analytics: true }),
    [savePreferences],
  );

  const rejectOptional = useCallback(
    () => savePreferences({ analytics: false }),
    [savePreferences],
  );

  const openSettings = useCallback(() => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setMountSettings(true);
    setIsSettingsOpen(true);
  }, []);

  // Return focus to the control that opened settings. When that control is
  // gone (the banner swapped to its confirmation), the banner moves focus.
  const handleSettingsCloseAutoFocus = useCallback((event: Event) => {
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    if (target?.isConnected) return;
    event.preventDefault();
  }, []);

  const status: ConsentStatus = !hasRead
    ? "unknown"
    : record
      ? "decided"
      : "undecided";

  const value = useMemo(
    () => ({
      status,
      analytics: record?.analytics === true,
      hasChosenInThisTab,
      acceptOptional,
      rejectOptional,
      savePreferences,
      openSettings,
      isSettingsOpen,
    }),
    [
      status,
      record,
      hasChosenInThisTab,
      acceptOptional,
      rejectOptional,
      savePreferences,
      openSettings,
      isSettingsOpen,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {mountSettings ? (
        <CookieSettingsDialog
          open={isSettingsOpen}
          onOpenChange={setIsSettingsOpen}
          onCloseAutoFocus={handleSettingsCloseAutoFocus}
        />
      ) : null}
    </ConsentContext.Provider>
  );
}
