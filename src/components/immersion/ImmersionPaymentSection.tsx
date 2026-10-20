"use client";

import { useState } from "react";
import type { ImmersionPaymentLinks } from "@/lib/payments/immersion";

export default function ImmersionPaymentSection({
  links,
}: {
  links: ImmersionPaymentLinks;
}) {
  const [registered, setRegistered] = useState(false);

  return (
    <section
      aria-labelledby="immersion-payment-title"
      data-immersion-payment-section
      className="border-b border-[#1C1F1E]/12 bg-[#F3F3E9] dark:border-[#FCFAEF]/12 dark:bg-[#1C1F1E]"
    >
      <div className="site-container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#007C95] dark:text-[#66C4DC]">
            Registration payment · test checkout
          </p>
          <h2
            id="immersion-payment-title"
            className="mt-4 font-heading text-3xl font-semibold leading-tight md:text-4xl"
          >
            Have you registered to experience the Immersion Program?
          </h2>
          <p className="mt-5 text-base leading-7 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">
            If you have submitted your application, choose a deposit or pay the
            full $2,499 program fee. The $1,249.50 deposit counts toward that
            fee; Akomapa will contact you about the remaining $1,249.50. A
            payment alone does not confirm a place in the cohort.
          </p>
          <label className="mt-7 flex max-w-2xl cursor-pointer items-start gap-3 border border-[#1C1F1E]/20 bg-white p-4 dark:border-[#FCFAEF]/20 dark:bg-[#121514]">
            <input
              type="checkbox"
              checked={registered}
              onChange={(event) => setRegistered(event.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[#0F4C5C]"
            />
            <span className="text-sm font-medium leading-6">
              I have submitted my Immersion Program application and understand
              that payment does not guarantee acceptance.
            </span>
          </label>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {([
              { href: links.deposit, label: "Pay $1,249.50 deposit" },
              { href: links.full, label: "Pay $2,499 in full" },
            ] as const).map(({ href, label }) =>
              registered ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center bg-[#0F4C5C] px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#0A3C48] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C5C]"
                >
                  {label}
                  <span className="sr-only"> (opens Stripe in a new tab)</span>
                </a>
              ) : (
                <span
                  key={label}
                  aria-disabled="true"
                  className="inline-flex min-h-12 items-center justify-center bg-[#0F4C5C]/45 px-5 py-3 text-center text-sm font-bold text-white"
                >
                  {label}
                </span>
              ),
            )}
          </div>
          <p className="mt-5 text-sm leading-6 text-[#2F3332]/70 dark:text-[#E6E7E7]/70">
            You will complete this test payment on Stripe. Use test payment
            details only; no real charge will be made.
          </p>
        </div>
      </div>
    </section>
  );
}
