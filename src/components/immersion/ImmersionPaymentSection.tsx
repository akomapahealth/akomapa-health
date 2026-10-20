"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { IMMERSION_BALANCE_DUE_LABEL, IMMERSION_REFUND_REQUEST_CUTOFF_LABEL, IMMERSION_TERMS_PATH, IMMERSION_TERMS_VERSION } from "@/lib/payments/immersion-terms";
import type { ImmersionMode } from "@/lib/payments/immersion";
import type { ImmersionPaymentChoice, ImmersionPaymentStage } from "@/lib/payments/immersion-state";

type Status = { verified: boolean; firstName?: string; paymentStage?: ImmersionPaymentStage };
const initialChoices: { choice: ImmersionPaymentChoice; label: string }[] = [
  { choice: "deposit", label: "Pay $1,249.50 deposit" },
  { choice: "full", label: "Pay $2,499 in full" },
];
const balanceChoices: { choice: ImmersionPaymentChoice; label: string }[] = [
  { choice: "balance", label: "Pay remaining $1,249.50" },
];

export default function ImmersionPaymentSection({ mode }: { mode: ImmersionMode }) {
  const [registered, setRegistered] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState<Status>({ verified: false });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const refresh = () => { void fetch("/api/immersion/status", { cache: "no-store" })
      .then((response) => response.json())
      .then((status: Status) => { setVerified(status); if (status.verified) setRegistered(true); })
      .catch(() => {}); };
    refresh();
    window.addEventListener("focus", refresh);
    const handleVisible = () => { if (!document.hidden) refresh(); };
    document.addEventListener("visibilitychange", handleVisible);
    if (new URLSearchParams(window.location.search).get("immersionVerification") === "expired") {
      setMessage("That verification link has expired. Please request a new one below.");
      setRegistered(true);
    }
    return () => { window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", handleVisible); };
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

  async function checkout(choice: ImmersionPaymentChoice) {
    if (!acceptedTerms) { setMessage("Please read and accept the Immersion payment terms before continuing."); return; }
    const checkoutTab = window.open("", "_blank");
    if (!checkoutTab) { setMessage("Please allow a new tab for Stripe Checkout and try again."); return; }
    checkoutTab.opener = null;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/immersion/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ choice, acceptedTerms: true, termsVersion: IMMERSION_TERMS_VERSION }),
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
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#007C95] dark:text-[#66C4DC]">Registration payment{mode === "test" ? " · test checkout" : ""}</p>
        <h2 id="immersion-payment-title" className="mt-4 font-heading text-3xl font-semibold leading-tight md:text-4xl">Have you registered to experience the Immersion Program?</h2>
        <p className="mt-5 text-base leading-7 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">Selected applicants can verify their registered email to view payment options. The total program fee is $2,499. A $1,249.50 deposit counts toward it; the remaining $1,249.50 is due {IMMERSION_BALANCE_DUE_LABEL}. Deposit payers can return to this page to pay the balance. Payment alone does not confirm a place in the cohort.</p>
        <p className="mt-4 text-sm leading-6 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">If you cancel, the $1,249.50 deposit portion is nonrefundable. If you pay in full and Akomapa receives your cancellation request by {IMMERSION_REFUND_REQUEST_CUTOFF_LABEL}, the other $1,249.50 is refundable. From November 30, voluntary cancellation is not refundable. If Akomapa cancels the program or cannot offer you a place, it will refund your full program payment. Applicable legal rights still apply.</p>
        <p className="mt-4 text-sm leading-6 text-[#2F3332]/80 dark:text-[#E6E7E7]/80">The fee includes accommodation, meals, local transport, and program activities. Akomapa will share the pilot itinerary and any additional costs directly with selected participants. Entry fees and materials are included only where the written offer says so.</p>
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
            {verified.paymentStage === "initial" && <p className="mt-2 text-sm leading-6">Choose the option that works for you. {mode === "test" ? "Your test checkout" : "Secure checkout"} will open on Stripe in a new tab.</p>}
            {verified.paymentStage === "balance" && <p className="mt-2 text-sm leading-6">Your deposit is recorded. You can pay the remaining $1,249.50 by {IMMERSION_BALANCE_DUE_LABEL}. {mode === "test" ? "Your test checkout" : "Secure checkout"} will open on Stripe in a new tab.</p>}
            {verified.paymentStage === "paid" && <p role="status" className="mt-2 text-sm leading-6">Your $2,499 program fee is paid in full. Thank you. Akomapa will follow up about your place in the cohort.</p>}
            {verified.paymentStage === "pending" && <p role="status" className="mt-2 text-sm leading-6">Your payment is still processing. Please check back shortly or contact Akomapa if you need help.</p>}
            {verified.paymentStage === "closed" && <p role="status" className="mt-2 text-sm leading-6">Online payment for this option has closed. Please <Link href="/contact" className="underline">contact Akomapa</Link> for help.</p>}
            {(!verified.paymentStage || verified.paymentStage === "unavailable") && <p role="status" className="mt-2 text-sm leading-6">We can’t show payment options right now. Please try again shortly or <Link href="/contact" className="underline">contact us</Link> for help.</p>}
            {(verified.paymentStage === "initial" || verified.paymentStage === "balance") && <>
              <label className="mt-5 flex max-w-2xl cursor-pointer items-start gap-3 border border-[#1C1F1E]/20 bg-white p-4 dark:border-[#FCFAEF]/20 dark:bg-[#121514]">
                <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#0F4C5C]" />
                <span className="text-sm leading-6">I have read and agree to the <Link href={IMMERSION_TERMS_PATH} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Immersion payment and refund terms<span className="sr-only"> (opens in a new tab)</span></Link>.</span>
              </label>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {(verified.paymentStage === "balance" ? balanceChoices : initialChoices).map(({ choice, label }) => (
                  <button key={choice} type="button" disabled={busy || !acceptedTerms} onClick={() => void checkout(choice)} className="inline-flex min-h-12 items-center justify-center bg-[#0F4C5C] px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#0A3C48] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C5C] disabled:opacity-50">{label}<span className="sr-only"> (opens Stripe in a new tab)</span></button>
                ))}
              </div>
              {mode === "test" && <p className="mt-5 text-sm leading-6 text-[#2F3332]/70 dark:text-[#E6E7E7]/70">Use test payment details only; no real charge will be made.</p>}
            </>}
          </div>
        )}
        {message && <p role="status" className="mt-5 text-sm leading-6">{message} <Link href="/contact" className="underline">Contact Us</Link>.</p>}
      </div></div>
    </section>
  );
}
