import type { ReactNode } from "react";
import IntakeDialogProvider from "@/components/intake/IntakeDialogProvider";

/** @deprecated Use IntakeDialogProvider. Kept temporarily for isolated test consumers. */
export default function ImmersionInterestProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <IntakeDialogProvider>{children}</IntakeDialogProvider>;
}
