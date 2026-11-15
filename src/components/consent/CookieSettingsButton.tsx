"use client";

import type { ReactNode } from "react";
import { useCookieConsent } from "@/components/consent/ConsentProvider";

type CookieSettingsButtonProps = {
  className?: string;
  children?: ReactNode;
};

/** Reopens cookie settings from anywhere (footer, Cookie Policy). */
export default function CookieSettingsButton({
  className,
  children = "Cookie settings",
}: CookieSettingsButtonProps) {
  const { openSettings } = useCookieConsent();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={openSettings}
      className={className}
    >
      {children}
    </button>
  );
}
