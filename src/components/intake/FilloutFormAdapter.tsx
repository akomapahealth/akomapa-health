"use client";

import {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { FilloutStandardEmbed } from "@fillout/react";
import type { FilloutContext } from "@/lib/intake/immersion-registry";

export type FilloutAdapterState =
  | "loading"
  | "ready"
  | "offline"
  | "load_timeout"
  | "provider_error";

type FilloutFormAdapterProps = {
  filloutId: string;
  context: FilloutContext;
  onStateChange: (state: FilloutAdapterState) => void;
  onComplete: () => void;
  loadTimeoutMs?: number;
};

class FilloutRenderBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function StateMessage({ state }: { state: FilloutAdapterState }) {
  if (state === "ready") return null;

  const messages: Record<Exclude<FilloutAdapterState, "ready">, string> = {
    loading: "Loading the secure Immersion form…",
    offline:
      "You appear to be offline. Reconnect to load the secure Immersion form.",
    load_timeout:
      "The secure form did not load. It may be blocked by a browser setting or content blocker.",
    provider_error:
      "The secure form could not be displayed. Use the direct option below instead.",
  };

  return (
    <div
      role={state === "loading" ? "status" : "alert"}
      aria-live="polite"
      data-intake-provider-state={state}
      className="flex min-h-64 items-center justify-center border border-[#1C1F1E]/14 bg-white p-6 text-center dark:border-[#FCFAEF]/16 dark:bg-[#121514]"
    >
      <p className="max-w-md text-sm leading-6 text-[#2F3332]/82 dark:text-[#E6E7E7]/82">
        {messages[state]}
      </p>
    </div>
  );
}

export default function FilloutFormAdapter({
  filloutId,
  context,
  onStateChange,
  onComplete,
  loadTimeoutMs = 12_000,
}: FilloutFormAdapterProps) {
  const [state, setState] = useState<FilloutAdapterState>(() =>
    typeof navigator !== "undefined" && !navigator.onLine
      ? "offline"
      : "loading",
  );
  const completedRef = useRef(false);
  const initializedRef = useRef(false);
  const adapterRootRef = useRef<HTMLDivElement | null>(null);

  const updateState = useCallback(
    (next: FilloutAdapterState) => {
      setState(next);
      onStateChange(next);
    },
    [onStateChange],
  );

  useEffect(() => {
    const handleOffline = () => updateState("offline");
    const handleOnline = () => {
      initializedRef.current = false;
      updateState("loading");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [updateState]);

  useEffect(() => {
    const secureProviderFrame = () => {
      const iframe = adapterRootRef.current?.querySelector("iframe");
      if (!iframe) return;
      iframe.title = "Global Health Immersion Program form";
      iframe.removeAttribute("allow");
    };

    secureProviderFrame();
    const observer = new MutationObserver(secureProviderFrame);
    if (adapterRootRef.current) {
      observer.observe(adapterRootRef.current, {
        childList: true,
        subtree: true,
      });
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (state !== "loading") return;

    const timer = window.setTimeout(() => {
      if (!initializedRef.current) updateState("load_timeout");
    }, loadTimeoutMs);
    return () => window.clearTimeout(timer);
  }, [loadTimeoutMs, state, updateState]);

  const handleInit = useCallback(() => {
    initializedRef.current = true;
    updateState("ready");
  }, [updateState]);

  const handleSubmit = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  const handleRenderError = useCallback(
    () => updateState("provider_error"),
    [updateState],
  );

  const shouldRenderEmbed = state !== "offline" && state !== "provider_error";

  return (
    <div
      ref={adapterRootRef}
      data-fillout-form-adapter
      className="min-w-0"
    >
      <StateMessage state={state} />
      {shouldRenderEmbed ? (
        <div
          aria-hidden={state === "ready" ? undefined : true}
          className={
            state === "ready"
              ? "h-[min(56dvh,40rem)] min-h-[28rem] overflow-hidden"
              : "h-0 overflow-hidden"
          }
        >
          <FilloutRenderBoundary onError={handleRenderError}>
            <FilloutStandardEmbed
              filloutId={filloutId}
              domain="embed.fillout.com"
              inheritParameters={false}
              parameters={context}
              onInit={handleInit}
              onSubmit={handleSubmit}
            />
          </FilloutRenderBoundary>
        </div>
      ) : null}
    </div>
  );
}
