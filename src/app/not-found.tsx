import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PublicCta } from "@/components/shared/PublicPagePrimitives";
import { FileQuestion } from "lucide-react";

const recoveryLinks = [
  { href: "/get-involved", label: "Get Involved" },
  { href: "/community-hubs", label: "Community Health Hubs" },
  { href: "/programs", label: "Programs" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-lg text-center">
          <div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#66C4DC]/15 dark:text-[#66C4DC]"
            aria-hidden="true"
          >
            <FileQuestion className="h-12 w-12" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            404
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We couldn&apos;t find the page you&apos;re looking for. It may have
            been moved, renamed, or the URL might be mistyped.
          </p>

          <div className="mt-8 flex justify-center">
            <PublicCta href="/" variant="teal" icon={false}>
              Back to Homepage
            </PublicCta>
          </div>

          <nav className="mt-10" aria-label="Helpful links">
            <p className="text-sm font-medium text-foreground">
              Try one of these instead
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {recoveryLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-[#0097b2] underline-offset-4 transition-colors hover:text-[#eeba2b] hover:underline dark:text-[#66C4DC] dark:hover:text-[#F5C94D]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
}
