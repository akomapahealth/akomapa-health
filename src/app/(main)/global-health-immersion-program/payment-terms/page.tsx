import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/layout/Breadcrumb";
import {
  IMMERSION_BALANCE_DUE_LABEL,
  IMMERSION_GRACE_END_LABEL,
  IMMERSION_REFUND_REQUEST_CUTOFF_LABEL,
  IMMERSION_TERMS_VERSION,
} from "@/lib/payments/immersion-terms";

export const metadata: Metadata = {
  title: "Immersion Program payment and refund terms | Akomapa",
  description: "Payment, balance, and refund terms for Akomapa’s January 2027 Global Health Immersion Program.",
};

const section = "mt-10 border-t border-[#1C1F1E]/15 pt-8 dark:border-[#FCFAEF]/15";
const heading = "font-heading text-xl font-semibold md:text-2xl";
const paragraph = "mt-4 leading-7 text-[#2F3332]/85 dark:text-[#E6E7E7]/85";

export default function ImmersionPaymentTermsPage() {
  return (
    <main className="min-h-screen bg-[#FCFAEF] text-[#1C1F1E] dark:bg-[#121514] dark:text-[#FCFAEF]">
      <div className="site-container mx-auto"><Breadcrumb /></div>
      <div className="site-container mx-auto max-w-4xl px-4 py-14 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#007C95] dark:text-[#66C4DC]">January 2–15, 2027 pilot cohort</p>
        <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight md:text-5xl">Immersion payment and refund terms</h1>
        <p className={paragraph}>These terms apply to payments for Akomapa&apos;s January 2027 Global Health Immersion Program. Version {IMMERSION_TERMS_VERSION}. Please read them before choosing a payment option.</p>

        <section className={section} aria-labelledby="immersion-terms-fee">
          <h2 id="immersion-terms-fee" className={heading}>Program fee and what it covers</h2>
          <p className={paragraph}>The total fee is <strong>USD $2,499</strong>. You may pay it in full or pay a <strong>$1,249.50 deposit</strong> and then a <strong>$1,249.50 balance</strong>. The deposit counts toward the total fee; it is not an additional charge. The balance is due {IMMERSION_BALANCE_DUE_LABEL}. You return to the verified payment page to pay it yourself. Akomapa will not automatically charge the same card later.</p>
          <p className={paragraph}>The fee includes accommodation, meals, local transport, and program activities. Akomapa will communicate the pilot itinerary and practical details directly to selected participants. Entry fees and materials are included only where your written offer says they are. Akomapa is helping participants with the visa process, but there is no fixed visa-application deadline for this pilot. Your written offer will identify any other costs that you must pay separately.</p>
        </section>

        <section className={section} aria-labelledby="immersion-terms-place">
          <h2 id="immersion-terms-place" className={heading}>Invitation and place in the cohort</h2>
          <p className={paragraph}>Only selected applicants may use this payment flow. Verifying your email or paying does not by itself guarantee a place. Akomapa will confirm your place in writing. If Akomapa accepts your payment but cannot offer you a place, it will refund everything you paid toward the program.</p>
        </section>

        <section className={section} aria-labelledby="immersion-terms-balance">
          <h2 id="immersion-terms-balance" className={heading}>Balance deadline</h2>
          <p className={paragraph}>Akomapa will send a balance reminder at least seven calendar days before {IMMERSION_BALANCE_DUE_LABEL}. If you miss that deadline, Akomapa will contact you and allow a three-day grace period, ending {IMMERSION_GRACE_END_LABEL}, to pay or obtain a written exception. Akomapa may close the payment offer or release an unpaid place after notice. Contact <a href="mailto:info@akomapa.org" className="underline">info@akomapa.org</a> before the deadline if you need help.</p>
        </section>

        <section className={section} aria-labelledby="immersion-terms-cancel">
          <h2 id="immersion-terms-cancel" className={heading}>If you cancel</h2>
          <p className={paragraph}>The first <strong>$1,249.50 deposit portion is nonrefundable</strong> if you cancel. If Akomapa receives your written cancellation request by {IMMERSION_REFUND_REQUEST_CUTOFF_LABEL}, it will refund any program fee you paid above that portion, up to $1,249.50. For example, a person who paid $2,499 in full may receive $1,249.50 back; a person who paid only the deposit receives no refund under this rule. From November 30, 2026 onward, there is no standard refund for voluntary cancellation.</p>
          <p className={paragraph}>If you cannot attend because of serious illness, death of an immediate family member, or visa denial before the program begins, Akomapa will consider reasonable private documentation and refund any amount paid above the $1,249.50 deposit portion even after the standard cutoff. No fixed visa-application deadline applies to this pilot. Your rights under applicable law still apply.</p>
        </section>

        <section className={section} aria-labelledby="immersion-terms-akomapa">
          <h2 id="immersion-terms-akomapa" className={heading}>If Akomapa changes or cancels the program</h2>
          <p className={paragraph}>If Akomapa cancels the program before it begins or cannot offer you a place, it will refund all program payments you made, including the deposit. If it postpones the program or materially changes its dates, locations, or core activities before it begins, you may choose a full refund or a transfer to a replacement program, if one is offered. Akomapa will describe the change in writing. If Akomapa ends the program after it begins, it will refund the portion of the program fee attributable to scheduled program days it does not deliver, subject to any greater rights under applicable law.</p>
        </section>

        <section className={section} aria-labelledby="immersion-terms-refunds">
          <h2 id="immersion-terms-refunds" className={heading}>Refund requests and receipts</h2>
          <p className={paragraph}>Request a cancellation or refund from <a href="mailto:info@akomapa.org" className="underline">info@akomapa.org</a> or the <Link href="/contact" className="underline">Contact Us form</Link>, using your registered email. Eligibility is based on when Akomapa receives your request. Akomapa will acknowledge it within two business days and initiate an approved refund within ten business days after receiving the request and any needed supporting information. Akomapa refunds accidental duplicate or excess program payments in full. Refunds ordinarily return to the original payment method; your bank or card issuer determines when the credit appears.</p>
          <p className={paragraph}>Stripe will provide a payment receipt for a successful live payment. This is a program payment, not a charitable donation, so the receipt is not a donation tax acknowledgment. Please never send card numbers or security codes by email or through the Contact Us form.</p>
        </section>

        <p className="mt-12 border-t border-[#1C1F1E]/15 pt-6 text-sm leading-6 text-[#2F3332]/70 dark:border-[#FCFAEF]/15 dark:text-[#E6E7E7]/70">These terms describe the payment policy for this pilot. Akomapa will communicate the final itinerary and operational instructions directly to selected participants. The terms you accept when starting Checkout govern that payment; material changes will be communicated and will not be applied retroactively without your agreement.</p>
      </div>
    </main>
  );
}
