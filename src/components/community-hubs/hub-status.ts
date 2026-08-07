import type { CommunityHub } from "@/lib/types";

export const hubStatusLabels = {
  active: "Active",
  "in-development": "In development",
  planned: "Planned",
  future: "Future",
} as const satisfies Record<CommunityHub["status"], string>;

export function getHubStatusLabel(status: CommunityHub["status"]): string {
  return hubStatusLabels[status];
}
