import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const clientBoundaryFiles = [
  "src/components/intake/FilloutFormAdapter.tsx",
  "src/components/intake/IntakeFormDialog.tsx",
  "src/components/intake/IntakeFormDialogProvider.tsx",
  "src/components/intake/IntakeFormLauncher.tsx",
  "src/lib/intake/immersion-analytics.ts",
  "src/lib/intake/immersion-registry.ts",
] as const;

const serverOnlyNames = [
  "FILLOUT_API_KEY",
  "FILLOUT_FORM_CONFIG",
  "RESEND_API_KEY",
  "INTAKE_ADMIN_TOKEN",
  "INTAKE_NOTIFICATION_RECIPIENT",
] as const;

describe("Immersion client boundary", () => {
  it("does not import server intake modules or name server-only credentials", async () => {
    for (const relativePath of clientBoundaryFiles) {
      const source = await readFile(join(process.cwd(), relativePath), "utf8");
      expect(source, relativePath).not.toMatch(/(?:@\/|\.\.\/)lib\/intake\/server/);
      for (const serverOnlyName of serverOnlyNames) {
        expect(source, relativePath).not.toContain(serverOnlyName);
      }
    }
  });

  it("keeps raw Fillout identifiers out of Immersion page components", async () => {
    const componentPaths = [
      "src/components/immersion/ImmersionRegisterInterestButton.tsx",
      "src/components/immersion/ImmersionRequestBrochureButton.tsx",
      "src/app/(main)/global-health-immersion-program/Content.tsx",
      "src/components/immersion/ImmersionAlertSection.tsx",
    ];

    for (const relativePath of componentPaths) {
      const source = await readFile(join(process.cwd(), relativePath), "utf8");
      expect(source, relativePath).not.toContain("fillout.com");
      expect(source, relativePath).not.toContain("filloutId");
      expect(source, relativePath).not.toContain("NEXT_PUBLIC_IMMERSION");
    }
  });
});
