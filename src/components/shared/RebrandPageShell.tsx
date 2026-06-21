import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { BRAND } from "@/config/brand";

type Highlight = {
  title: string;
  description: string;
};

type RebrandPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  highlights: readonly Highlight[];
};

export default function RebrandPageShell({
  eyebrow,
  title,
  description,
  highlights,
}: RebrandPageShellProps) {
  return (
    <div data-rebrand-page className="bg-background text-foreground">
      <div className="container mx-auto">
        <Breadcrumb />
      </div>

      <section className="relative isolate overflow-hidden border-y border-[#0097b2]/15 bg-[#FCFAEF] py-16 dark:border-[#FCFAEF]/10 dark:bg-[#1C1F1E] sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#0097b2]/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-[#eeba2b]/15 blur-3xl"
        />

        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-body text-sm font-bold uppercase tracking-[0.18em] text-[#007f96] dark:text-[#F5C94D]">
              {eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl font-body text-lg leading-8 text-[#2F3332]/80 dark:text-[#FCFAEF]/75 sm:text-xl">
              {description}
            </p>
            <p className="mx-auto mt-4 max-w-3xl font-body text-sm leading-6 text-[#2F3332]/65 dark:text-[#FCFAEF]/60">
              {BRAND.taglineSecondary}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((highlight) => (
              <article
                key={highlight.title}
                className="rounded-2xl border border-[#0097b2]/15 bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 dark:border-[#FCFAEF]/10"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#0097b2]/10 text-[#007f96] dark:bg-[#eeba2b]/15 dark:text-[#F5C94D]">
                  <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="font-heading text-xl font-bold text-[#1C1F1E] dark:text-[#FCFAEF]">
                  {highlight.title}
                </h2>
                <p className="mt-3 font-body leading-7 text-[#2F3332]/75 dark:text-[#FCFAEF]/70">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#0097b2] p-6 text-floralwhite sm:p-8 md:flex-row">
            <div>
              <h2 className="font-heading text-2xl font-bold">
                Help shape what comes next
              </h2>
              <p className="mt-2 max-w-2xl font-body text-floralwhite/85">
                Connect with Akomapa to learn more, collaborate, or support this
                work as the new site experience continues to grow.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-md bg-[#eeba2b] px-5 font-body font-semibold text-[#1C1F1E] transition-colors hover:bg-[#F5C94D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-floralwhite focus-visible:ring-offset-2 focus-visible:ring-offset-[#0097b2]"
            >
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
