import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Our Mission - Volunteer Application",
  description: "Become part of Akomapa Health's student-powered initiative to improve access to preventive healthcare services in Ghana. Apply to volunteer today.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

