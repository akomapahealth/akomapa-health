import type { Metadata } from "next";
import ImmersionInterestProvider from "@/components/immersion/ImmersionInterestProvider";
import { buildPageMetadata } from "@/lib/seo";
import Content from "./Content";

export const metadata: Metadata = buildPageMetadata(
  "/global-health-immersion-program",
);

export default function GHIPPage() {
  return (
    <ImmersionInterestProvider>
      <Content />
    </ImmersionInterestProvider>
  );
}
