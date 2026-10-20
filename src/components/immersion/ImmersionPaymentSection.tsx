"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Status = { verified: boolean; firstName?: string };

export default function ImmersionPaymentSection() {
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState<Status>({ verified: false });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    void fetch("/api/immersion/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((status: Status) => { if (status.verified) { setVerified(status); setRegistered(true); } })
      .catch(() => {});
    if (new URLSearchParams(window.location.search).get("immersionVerification") === "expired") {
      setMessage("That verification link has expired. Please request a new one below.");
      setRegistered(true);
    }
  }, []);

  async function requestLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/immersion/request-link", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
      });
      const result = await response.json();
      setMessage(result.message || result.error || "Please try again later.");
    } catch { setMessage("Please try again later."); }
    finally { setBusy(false); }
  }

  async function checkout(choice: "deposit" | "full") {
    const checkoutTab = window.open("", "_blank");
    if (!checkoutTab) { setMessage("Please allow a new tab for Stripe Checkout and try again."); return; }
    checkoutTab.opener = null;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/immersion/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ choice }),
      });
      const result = await response.json();
      if (!response.ok || typeof result.url !== "string") throw new Error(result.error || "Checkout is unavailable.");
      checkoutTab.location.href = result.url;
    } catch (error) {
      checkoutTab.close();
      setMessage(error instanceof Error ? error.message : "Checkout is unavailable.");
    } finally { setBusy(false); }
  }

  return (
    <section aria-labelledby="immersion-payment-title" data-immersion-payment-section className="border-b border-[#1C1F1E]/12 bg-[#F3F3E9] dark:border-[#FCFAEF]/12 dark:bg-[#1C1F1E]">
      <div className="site-container mx-auto px-4 py-16 md:py-20"><div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#007C95] dark:text-[#66C4DC]">Registration payment · test checkout</p>
        <h2 id="immersion-payment-title" className="mt-4 font-heading text-3xl font-semibold leading-tight md:text-4xl">Have you registered to experience the Immersion Program?</h2>
        <p className="mt-5 text-base leading-7 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">Selected applicants can verify their registered email to view payment options. The total program fee is $2,499. A $1,249.50 deposit counts toward it, leaving $1,249.50 for manual follow-up. Payment alone does not confirm a place in the cohort.</p>
        <label className="mt-7 flex max-w-2xl cursor-pointer items-start gap-3 border border-[#1C1F1E]/20 bg-white p-4 dark:border-[#FCFAEF]/20 dark:bg-[#121514]">
          <input type="checkbox" checked={registered} onChange={(event) => setRegistered(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#0F4C5C]" />
          <span className="text-sm font-medium leading-6">I have submitted my Immersion Program application and understand that payment does not guarantee acceptance.</span>
        </label>
        {registered && !verified.verified && (
          <form onSubmit={requestLink} className="mt-7 max-w-xl">
            <label htmlFor="immersion-email" className="block text-sm font-semibold">Email address used for your application</label>
            <input id="immersion-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 w-full rounded-sm border border-[#1C1F1E]/30 bg-white px-4 text-[#1C1F1E] focus-visible:outline-2 focus-visible:outline-[#0F4C5C]" />
            <button type="submit" disabled={busy} className="mt-3 min-h-12 bg-[#0F4C5C] px-6 py-3 text-sm font-bold text-white disabled:opacity-50">{busy ? "Sending…" : "Send verification link"}</button>
          </form>
        )}
        {registered && verified.verified && (
          <div className="mt-7">
            <p className="text-lg font-semibold">Welcome, {verified.firstName}. We’re glad you’re here.</p>
            <p className="mt-2 text-sm leading-6">Choose the option that works for you. Your test checkout will open on Stripe in a new tab.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {([{ choice: "deposit", label: "Pay $1,249.50 deposit" }, { choice: "full", label: "Pay $2,499 in full" }] as const).map(({ choice, label }) => (
                <button key={choice} type="button" disabled={busy} onClick={() => void checkout(choice)} className="inline-flex min-h-12 items-center justify-center bg-[#0F4C5C] px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#0A3C48] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C5C] disabled:opacity-50">{label}<span className="sr-only"> (opens Stripe in a new tab)</span></button>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-[#2F3332]/70 dark:text-[#E6E7E7]/70">Use test payment details only; no real charge will be made.</p>
          </div>
        )}
        {message && <p role="status" className="mt-5 text-sm leading-6">{message} <Link href="/contact" className="underline">Contact Us</Link>.</p>}
      </div></div>
    </section>
  );
}
