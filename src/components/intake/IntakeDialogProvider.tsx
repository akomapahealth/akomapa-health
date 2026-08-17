"use client";

import {
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
import IntakeDialog from "@/components/intake/IntakeDialog";
import type { PurposeSpecificRequest } from "@/components/intake/PurposeSpecificIntakeForm";

const PurposeSpecificIntakeForm = lazy(
  () => import("@/components/intake/PurposeSpecificIntakeForm"),
);

const copy = {
  program_interest: {
    eyebrow: "Program interest",
    title: "Tell us what you are interested in",
    description:
      "Share your interest so the right program team can follow up with relevant next steps.",
  },
  partnership_request: {
    eyebrow: "Partnership request",
    title: "Explore a partnership",
    description:
      "Tell us about your organization and the collaboration you have in mind.",
  },
  get_involved: {
    eyebrow: "Get involved",
    title: "Find your pathway",
    description:
      "Share how you would like to contribute so our team can route your request appropriately.",
  },
} as const;

type ContextValue = {
  openIntake: (
    request: PurposeSpecificRequest,
    trigger?: HTMLElement | null,
  ) => void;
  closeIntake: () => void;
};
const IntakeContext = createContext<ContextValue | null>(null);

export function useIntakeDialog() {
  const value = useContext(IntakeContext);
  if (!value)
    throw new Error("useIntakeDialog must be used within IntakeDialogProvider");
  return value;
}

export default function IntakeDialogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [request, setRequest] = useState<PurposeSpecificRequest | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const openIntake = useCallback(
    (next: PurposeSpecificRequest, trigger?: HTMLElement | null) => {
      triggerRef.current =
        trigger ??
        (document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null);
      setRequest(next);
    },
    [],
  );
  const closeIntake = useCallback(() => setRequest(null), []);
  const value = useMemo(
    () => ({ openIntake, closeIntake }),
    [closeIntake, openIntake],
  );
  const details = request ? copy[request.formType] : copy.program_interest;
  return (
    <IntakeContext.Provider value={value}>
      {children}
      <IntakeDialog
        open={request !== null}
        onClose={closeIntake}
        onAfterLeave={() => {
          triggerRef.current?.focus();
          triggerRef.current = null;
        }}
        eyebrow={details.eyebrow}
        title={details.title}
        description={details.description}
      >
        {request ? (
          <Suspense fallback={<p role="status">Loading form…</p>}>
            <PurposeSpecificIntakeForm
              key={`${request.formType}-${request.contextId ?? "default"}`}
              request={request}
              onDone={closeIntake}
            />
          </Suspense>
        ) : null}
      </IntakeDialog>
    </IntakeContext.Provider>
  );
}
