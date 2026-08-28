import type { ReactNode } from "react";
import IntakeDialogProvider from "@/components/intake/IntakeDialogProvider";
import IntakeFormDialogProvider from "@/components/intake/IntakeFormDialogProvider";

/** @deprecated Use IntakeDialogProvider. Kept temporarily for isolated test consumers. */
export default function ImmersionInterestProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <IntakeDialogProvider>
      <IntakeFormDialogProvider>{children}</IntakeFormDialogProvider>
    </IntakeDialogProvider>
  );
}
