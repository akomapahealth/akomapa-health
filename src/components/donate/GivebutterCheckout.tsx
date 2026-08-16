"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  getDonationEntryPoint,
  getDonationProviderConfig,
  type DonationAmount,
  type DonationEntryPointId,
} from "@/config/donation-provider";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const GIVEBUTTER_SCRIPT_ID = "givebutter-widgets-library";
const GIVEBUTTER_ELEMENT_NAME = "givebutter-giving-form";
const GIVEBUTTER_LOAD_TIMEOUT_MS = 12_000;

type GivebutterCheckoutProps = {
  entryPointId: DonationEntryPointId;
  amount: DonationAmount | null;
};

type LoadState = "idle" | "loading" | "ready" | "error";

let widgetLibraryPromise: Promise<void> | null = null;

function waitForGivebutterElement(): Promise<void> {
  if (customElements.get(GIVEBUTTER_ELEMENT_NAME)) {
    return Promise.resolve();
  }

  return Promise.race([
    customElements.whenDefined(GIVEBUTTER_ELEMENT_NAME).then(() => undefined),
    new Promise<never>((_, reject) => {
      window.setTimeout(
        () => reject(new Error("Givebutter widget registration timed out")),
        GIVEBUTTER_LOAD_TIMEOUT_MS,
      );
    }),
  ]);
}

export function loadGivebutterWidgetLibrary(
  widgetLibraryUrl: string,
): Promise<void> {
  if (widgetLibraryPromise) {
    return widgetLibraryPromise;
  }

  widgetLibraryPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(
      GIVEBUTTER_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    const handleReady = () => {
      void waitForGivebutterElement().then(resolve).catch(reject);
    };
    const handleError = () => {
      reject(new Error("Givebutter widget library failed to load"));
    };

    if (existingScript) {
      if (existingScript.dataset.status === "ready") {
        handleReady();
        return;
      }

      existingScript.addEventListener("load", handleReady, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = GIVEBUTTER_SCRIPT_ID;
    script.async = true;
    script.src = widgetLibraryUrl;
    script.referrerPolicy = "strict-origin-when-cross-origin";
    script.addEventListener(
      "load",
      () => {
        script.dataset.status = "ready";
        handleReady();
      },
      { once: true },
    );
    script.addEventListener(
      "error",
      () => {
        script.dataset.status = "error";
        handleError();
      },
      { once: true },
    );
    document.head.appendChild(script);
  }).catch((error) => {
    widgetLibraryPromise = null;
    throw error;
  });

  return widgetLibraryPromise;
}

export function resetGivebutterWidgetLibraryForRetry(): void {
  widgetLibraryPromise = null;
  document.getElementById(GIVEBUTTER_SCRIPT_ID)?.remove();
}

function syncDonationDefaults(
  amount: DonationAmount | null,
  frequency?: "monthly",
): void {
  const url = new URL(window.location.href);

  if (amount === null) {
    url.searchParams.delete("amount");
  } else {
    url.searchParams.set("amount", String(amount));
  }

  if (frequency) {
    url.searchParams.set("frequency", frequency);
  } else {
    url.searchParams.delete("frequency");
  }

  window.history.replaceState(window.history.state, "", url);
}

export default function GivebutterCheckout({
  entryPointId,
  amount,
}: GivebutterCheckoutProps) {
  const provider = useMemo(() => getDonationProviderConfig(), []);
  const entryPoint = getDonationEntryPoint(entryPointId, provider);
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [attempt, setAttempt] = useState(0);
  const widgetKey = useMemo(
    () => `${entryPoint.id}-${entryPoint.frequency ?? "once"}-${amount ?? "other"}`,
    [amount, entryPoint.frequency, entryPoint.id],
  );

  useEffect(() => {
    if (!provider.enabled) {
      return;
    }

    let cancelled = false;
    syncDonationDefaults(amount, entryPoint.frequency);
    setLoadState("loading");

    void loadGivebutterWidgetLibrary(provider.widgetLibraryUrl)
      .then(() => {
        if (cancelled) return;
        setLoadState("ready");
        trackEvent({
          name: "donation_widget_load",
          entry_point: entryPoint.id,
          success: true,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setLoadState("error");
        trackEvent({
          name: "donation_widget_load",
          entry_point: entryPoint.id,
          success: false,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [amount, attempt, entryPoint.frequency, entryPoint.id, provider]);

  if (!provider.enabled) {
    return (
      <div
        role="status"
        className="border border-[#1C1F1E]/12 bg-[#FCFAEF] px-5 py-6 text-center dark:border-[#FCFAEF]/15 dark:bg-[#121514] sm:px-8 sm:py-8"
        data-testid="donation-provider-unavailable"
      >
        <ShieldCheck
          aria-hidden="true"
          className="mx-auto h-7 w-7 text-[#0097b2] dark:text-[#66C4DC]"
        />
        <h4 className="mt-4 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
          Secure online giving is being finalized
        </h4>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-base">
          {provider.unavailableMessage}
        </p>
      </div>
    );
  }

  return (
    <section
      aria-labelledby={`givebutter-checkout-${entryPoint.id}`}
      className="border border-[#0097b2]/25 bg-[#FCFAEF] px-4 py-6 dark:border-[#66C4DC]/30 dark:bg-[#121514] sm:px-6 sm:py-8"
      data-testid={`givebutter-checkout-${entryPoint.id}`}
    >
      <div className="mx-auto max-w-2xl text-center">
        <ShieldCheck
          aria-hidden="true"
          className="mx-auto h-7 w-7 text-[#0097b2] dark:text-[#66C4DC]"
        />
        <h4
          id={`givebutter-checkout-${entryPoint.id}`}
          className="mt-3 font-heading text-xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-2xl"
        >
          Complete your gift securely
        </h4>
        <p className="mt-2 text-sm leading-6 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
          Givebutter processes your payment and sends your receipt and thank-you
          email after a confirmed donation. Review the final amount and
          frequency in the secure form before submitting.
        </p>
      </div>

      <div className="mx-auto mt-6 min-h-44 w-full max-w-[35rem]">
        {loadState === "loading" || loadState === "idle" ? (
          <div
            role="status"
            aria-live="polite"
            className="flex min-h-44 flex-col items-center justify-center gap-3 text-sm text-[#2F3332]/75 dark:text-[#E6E7E7]/75"
          >
            <Loader2 aria-hidden="true" className="h-6 w-6 animate-spin" />
            Loading secure donation form…
          </div>
        ) : null}

        {loadState === "ready" ? (
          <givebutter-giving-form
            key={widgetKey}
            campaign={provider.campaignCode}
            max-width="560px"
            data-testid="givebutter-giving-form"
          />
        ) : null}

        {loadState === "error" ? (
          <div
            role="alert"
            className="border border-[#C9920F]/35 bg-[#F5C94D]/10 px-4 py-5 text-center"
          >
            <p className="text-sm leading-6 text-[#2F3332] dark:text-[#FCFAEF]">
              {provider.configurationErrorMessage}
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4 cursor-pointer border-[#1C1F1E]/30 dark:border-[#FCFAEF]/30"
              onClick={() => {
                resetGivebutterWidgetLibraryForRetry();
                setAttempt((current) => current + 1);
              }}
            >
              <RefreshCw aria-hidden="true" className="h-4 w-4" />
              Retry secure form
            </Button>
          </div>
        ) : null}
      </div>

      <div className="mx-auto mt-6 max-w-2xl border-t border-[#1C1F1E]/10 pt-5 text-center dark:border-[#FCFAEF]/15">
        <a
          href={provider.campaignUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 font-semibold text-[#007f96] underline decoration-[#007f96]/35 underline-offset-4 transition-colors hover:text-[#005f70] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-4 dark:text-[#66C4DC] dark:hover:text-[#9ADCEB]",
          )}
          onClick={() =>
            trackEvent({
              name: "donation_fallback_click",
              entry_point: entryPoint.id,
            })
          }
        >
          Open the secure Givebutter campaign
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <p className="mt-3 text-xs leading-5 text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
          By donating, you also agree to Givebutter&apos;s checkout terms. Read
          Akomapa&apos;s <Link href="/terms#donations">donation and refund terms</Link>{" "}
          and <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </section>
  );
}
