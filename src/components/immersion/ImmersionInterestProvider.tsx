"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { trackEvent } from "@/lib/analytics";
import ImmersionInterestModal from "@/components/immersion/ImmersionInterestModal";

type ImmersionInterestContextValue = {
  isOpen: boolean;
  open: (trigger?: HTMLElement | null) => void;
  close: () => void;
};

const ImmersionInterestContext =
  createContext<ImmersionInterestContextValue | null>(null);

export function useImmersionInterest() {
  const context = useContext(ImmersionInterestContext);
  if (!context) {
    throw new Error(
      "useImmersionInterest must be used within ImmersionInterestProvider",
    );
  }
  return context;
}

export default function ImmersionInterestProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((trigger?: HTMLElement | null) => {
    const active =
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    triggerRef.current = trigger ?? active;
    setIsOpen(true);
    trackEvent({ name: "immersion_alert_modal_open" });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const restoreTriggerFocus = useCallback(() => {
    const trigger = triggerRef.current;
    triggerRef.current = null;
    // Defer past Headless UI Dialog focus cleanup that runs on unmount.
    window.setTimeout(() => {
      trigger?.focus();
    }, 0);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [close, isOpen, open],
  );

  return (
    <ImmersionInterestContext.Provider value={value}>
      {children}
      <ImmersionInterestModal
        open={isOpen}
        onClose={close}
        onAfterLeave={restoreTriggerFocus}
      />
    </ImmersionInterestContext.Provider>
  );
}
