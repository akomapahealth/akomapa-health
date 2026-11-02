"use client";

import type { ReactNode } from "react";
import { useCookieConsent } from "@/components/consent/ConsentProvider";

type CookieSettingsButtonProps = {
  className?: string;
  /** Typography for the label; <button> ignores font utilities (see consent styles). */
  labelClassName?: string;
  children?: ReactNode;
};

/** Reopens cookie settings from anywhere (footer, Cookie Policy). */
export default function CookieSettingsButton({
  className,
  labelClassName,
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
      <span className={labelClassName}>{children}</span>
    </button>
  );
}
