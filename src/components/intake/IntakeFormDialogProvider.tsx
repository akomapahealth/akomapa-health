"use client";

import {
  Component,
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import IntakeFormDialog from "@/components/intake/IntakeFormDialog";
import type { FilloutAdapterState } from "@/components/intake/FilloutFormAdapter";
import { trackImmersionOperationalEvent } from "@/lib/intake/immersion-analytics";
import {
  buildFilloutContext,
  resolveImmersionIntake,
  type ImmersionIntakeRequest,
  type ImmersionIntent,
  type ResolvedImmersionIntake,
} from "@/lib/intake/immersion-registry";

const FilloutFormAdapter = lazy(
  () => import("@/components/intake/FilloutFormAdapter"),
);

type ContextValue = {
  openIntakeForm: (
    request: ImmersionIntakeRequest,
    trigger?: HTMLElement | null,
  ) => void;
  closeIntakeForm: () => void;
};

const IntakeFormContext = createContext<ContextValue | null>(null);

export function useIntakeFormDialog() {
  const value = useContext(IntakeFormContext);
  if (!value) {
    throw new Error(
      "useIntakeFormDialog must be used within IntakeFormDialogProvider",
    );
  }
  return value;
}

class LazyAdapterBoundary extends Component<
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
    if (!this.state.failed) return this.props.children;
    return <ProviderFailureMessage />;
  }
}

function ProviderFailureMessage() {
  return (
    <div
      role="alert"
      data-intake-provider-state="provider_error"
      className="flex min-h-64 items-center justify-center border border-[#1C1F1E]/14 bg-white p-6 text-center dark:border-[#FCFAEF]/16 dark:bg-[#121514]"
    >
      <p className="max-w-md text-sm leading-6 text-[#2F3332]/82 dark:text-[#E6E7E7]/82">
        The secure form could not be displayed. Use the direct option below
        instead.
      </p>
    </div>
  );
}

function UnavailableState({
  state,
}: {
  state: "disabled" | "missing_configuration";
}) {
  return (
    <div
      role="status"
      data-intake-provider-state={state}
      className="border border-[#1C1F1E]/14 bg-white p-5 dark:border-[#FCFAEF]/16 dark:bg-[#121514]"
    >
      <p className="font-semibold">
        {state === "disabled"
          ? "Embedded Immersion intake is not enabled yet."
          : "The embedded Immersion form is temporarily unavailable."}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#2F3332]/78 dark:text-[#E6E7E7]/78">
        Use the direct option below. Your page and navigation remain available.
      </p>
    </div>
  );
}

function CompletionState() {
  return (
    <div
      role="status"
      aria-live="polite"
      data-intake-provider-state="completed"
      className="border border-[#0097b2]/30 bg-[#0097b2]/8 p-5"
    >
      <p className="font-heading text-xl font-semibold">
        Thank you. Your request is complete.
      </p>
      <p className="mt-2 text-sm leading-6 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
        The Immersion Program team will review it and follow up using the
        details you provided.
      </p>
    </div>
  );
}

export default function IntakeFormDialogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [resolved, setResolved] = useState<ResolvedImmersionIntake | null>(null);
  const [completed, setCompleted] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const trackedStatesRef = useRef(new Set<string>());

  const openIntakeForm = useCallback(
    (request: ImmersionIntakeRequest, trigger?: HTMLElement | null) => {
      const resolution = resolveImmersionIntake(request);
      if (!resolution.ok) return;

      triggerRef.current =
        trigger ??
        (document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null);
      trackedStatesRef.current.clear();
      setCompleted(false);
      setResolved(resolution.value);
      trackImmersionOperationalEvent({
        type: "opened",
        intent: resolution.value.intent.intent,
      });
    },
    [],
  );

  const closeIntakeForm = useCallback(() => setResolved(null), []);
  const value = useMemo(
    () => ({ openIntakeForm, closeIntakeForm }),
    [closeIntakeForm, openIntakeForm],
  );

  const trackProviderFailure = useCallback(
    (intent: ImmersionIntent, category: "provider_error") => {
      const key = `failed:${category}`;
      if (trackedStatesRef.current.has(key)) return;
      trackedStatesRef.current.add(key);
      trackImmersionOperationalEvent({
        type: "provider_failed",
        intent,
        category,
      });
    },
    [],
  );

  const handleAdapterState = useCallback(
    (intent: ImmersionIntent, state: FilloutAdapterState) => {
      if (state === "loading") return;
      const key = `adapter:${state}`;
      if (trackedStatesRef.current.has(key)) return;
      trackedStatesRef.current.add(key);

      if (state === "ready") {
        trackImmersionOperationalEvent({ type: "provider_loaded", intent });
      } else {
        trackImmersionOperationalEvent({
          type: "provider_failed",
          intent,
          category: state,
        });
      }
    },
    [],
  );

  const handleComplete = useCallback((intent: ImmersionIntent) => {
    if (trackedStatesRef.current.has("completed")) return;
    trackedStatesRef.current.add("completed");
    setCompleted(true);
    trackImmersionOperationalEvent({ type: "completed", intent });
  }, []);

  return (
    <IntakeFormContext.Provider value={value}>
      {children}
      {resolved ? (
        <IntakeFormDialog
          open
          resolved={resolved}
          onClose={closeIntakeForm}
          onAfterLeave={() => {
            triggerRef.current?.focus();
            triggerRef.current = null;
            setCompleted(false);
          }}
          onFallback={() =>
            trackImmersionOperationalEvent({
              type: "fallback_selected",
              intent: resolved.intent.intent,
            })
          }
        >
          {completed ? <CompletionState /> : null}
          {!completed && resolved.provider.state === "disabled" ? (
            <UnavailableState state="disabled" />
          ) : null}
          {!completed &&
          resolved.provider.state === "missing_configuration" ? (
            <UnavailableState state="missing_configuration" />
          ) : null}
          {!completed && resolved.provider.state === "enabled" ? (
            <LazyAdapterBoundary
              key={`${resolved.definition.key}-${resolved.intent.intent}`}
              onError={() =>
                trackProviderFailure(resolved.intent.intent, "provider_error")
              }
            >
              <Suspense
                fallback={
                  <div
                    role="status"
                    data-intake-provider-state="loading"
                    className="flex min-h-64 items-center justify-center border border-[#1C1F1E]/14 bg-white p-6 text-sm dark:border-[#FCFAEF]/16 dark:bg-[#121514]"
                  >
                    Loading the secure Immersion form…
                  </div>
                }
              >
                <FilloutFormAdapter
                  filloutId={resolved.provider.filloutId}
                  context={buildFilloutContext(resolved)}
                  onStateChange={(state) =>
                    handleAdapterState(resolved.intent.intent, state)
                  }
                  onComplete={() => handleComplete(resolved.intent.intent)}
                />
              </Suspense>
            </LazyAdapterBoundary>
          ) : null}
        </IntakeFormDialog>
      ) : null}
    </IntakeFormContext.Provider>
  );
}
