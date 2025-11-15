import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Akomapa Health Foundation&apos;s mission, vision, and our dedicated team working to improve healthcare access globally.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

