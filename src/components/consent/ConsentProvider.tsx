"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
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
 * `unknown` on the server and during hydration, so the banner never flashes
 * or mismatches; the stored choice is read right after.
 */
export type ConsentStatus = "unknown" | "undecided" | "decided";

type ConsentActions = {
  acceptOptional: () => void;
  rejectOptional: () => void;
  savePreferences: (preferences: ConsentPreferences) => void;
  openSettings: () => void;
  isSettingsOpen: boolean;
  /** True once a choice was made on this page (vs. another tab or visit). */
  hasChosenInThisTab: boolean;
};

type ConsentState = {
  status: ConsentStatus;
  analytics: boolean;
};

const ConsentContext = createContext<ConsentActions | null>(null);

// The stored record is read through useSyncExternalStore rather than held in
// context: a context value that changes during hydration forces React to
// discard and client-render every still-dehydrated Suspense boundary below.
let cachedKey: string | undefined;
let cachedRecord: ConsentRecord | null = null;

function getConsentSnapshot(): ConsentRecord | null {
  const record = readConsent();
  const key = record
    ? `${record.version}:${record.analytics}:${record.decidedAt}`
    : "none";
  if (key !== cachedKey) {
    cachedKey = key;
    cachedRecord = record;
  }
  return cachedRecord;
}

const getServerConsentSnapshot = () => undefined;

export function useCookieConsent(): ConsentActions & ConsentState {
  const actions = useContext(ConsentContext);
  if (!actions) {
    throw new Error("useCookieConsent must be used within ConsentProvider");
  }

  const record = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );

  return {
    ...actions,
    status: record === undefined ? "unknown" : record ? "decided" : "undecided",
    analytics: record?.analytics === true,
  };
}

type ConsentProviderProps = {
  children: ReactNode;
};

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [hasChosenInThisTab, setHasChosenInThisTab] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [mountSettings, setMountSettings] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const savePreferences = useCallback((preferences: ConsentPreferences) => {
    setHasChosenInThisTab(true);
    writeConsent(preferences);
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
    event.preventDefault();
    if (target?.isConnected) target.focus();
  }, []);

  const value = useMemo(
    () => ({
      acceptOptional,
      rejectOptional,
      savePreferences,
      openSettings,
      isSettingsOpen,
      hasChosenInThisTab,
    }),
    [
      acceptOptional,
      rejectOptional,
      savePreferences,
      openSettings,
      isSettingsOpen,
      hasChosenInThisTab,
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
