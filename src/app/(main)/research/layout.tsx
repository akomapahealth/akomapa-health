import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Science - Research Publications",
  description: "Explore Akomapa Health Foundation's research publications on student-powered healthcare, community health outcomes, and innovative healthcare delivery models.",
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

