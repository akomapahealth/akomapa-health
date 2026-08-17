import { ghanaMobileMoneyDonation } from "@/config/donation-provider";

type GhanaMobileMoneyProps = {
  journey: "partner" | "oneTime";
};

export default function GhanaMobileMoney({
  journey,
}: GhanaMobileMoneyProps) {
  const method = ghanaMobileMoneyDonation;

  return (
    <section
      aria-labelledby={`ghana-mobile-money-${journey}`}
      className="border border-[#1C1F1E]/12 bg-white px-5 py-6 dark:border-[#FCFAEF]/15 dark:bg-[#1C1F1E] sm:px-8 sm:py-8 lg:px-10"
      data-testid="ghana-mobile-money"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-subheading text-xs font-bold uppercase tracking-[0.18em] text-[#007f96] dark:text-[#66C4DC]">
              Ghana giving
            </p>
            <h4
              id={`ghana-mobile-money-${journey}`}
              className="mt-3 font-heading text-2xl font-semibold text-[#1C1F1E] dark:text-[#FCFAEF] sm:text-3xl"
            >
              Donate with {method.label}
            </h4>
            <p className="mt-3 text-sm leading-6 text-[#2F3332]/80 dark:text-[#E6E7E7]/80 sm:text-base">
              {method.description} {method.instructions}
            </p>
          </div>
          <span className="inline-flex w-fit items-center border border-[#eeba2b]/45 bg-[#F5C94D]/16 px-3 py-2 font-subheading text-xs font-bold uppercase tracking-[0.14em] text-[#8A6508] dark:text-[#F5C94D]">
            Available now
          </span>
        </div>

        <dl className="mt-7 grid gap-px overflow-hidden border border-[#1C1F1E]/12 bg-[#1C1F1E]/12 dark:border-[#FCFAEF]/15 dark:bg-[#FCFAEF]/15 sm:grid-cols-3">
          <div className="bg-[#FCFAEF] px-4 py-4 dark:bg-[#121514] sm:px-5">
            <dt className="text-xs font-medium uppercase tracking-wide text-[#2F3332]/65 dark:text-[#E6E7E7]/65">
              Account name
            </dt>
            <dd className="mt-2 font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {method.accountName}
            </dd>
          </div>
          <div className="bg-[#FCFAEF] px-4 py-4 dark:bg-[#121514] sm:px-5">
            <dt className="text-xs font-medium uppercase tracking-wide text-[#2F3332]/65 dark:text-[#E6E7E7]/65">
              Network
            </dt>
            <dd className="mt-2 font-semibold text-[#1C1F1E] dark:text-[#FCFAEF]">
              {method.network}
            </dd>
          </div>
          <div className="bg-[#FCFAEF] px-4 py-4 dark:bg-[#121514] sm:px-5">
            <dt className="text-xs font-medium uppercase tracking-wide text-[#2F3332]/65 dark:text-[#E6E7E7]/65">
              Mobile Money number
            </dt>
            <dd className="mt-2 text-lg font-bold tabular-nums text-[#1C1F1E] dark:text-[#FCFAEF]">
              {method.phone}
            </dd>
          </div>
        </dl>

        <div className="mt-6 border border-[#eeba2b]/35 bg-[#F5C94D]/10 px-4 py-4 sm:px-5">
          <p className="font-semibold leading-6 text-[#1C1F1E] dark:text-[#FCFAEF]">
            {method.verificationNote}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#2F3332]/75 dark:text-[#E6E7E7]/75">
            {journey === "partner"
              ? "This is a manual transfer and does not create an automatic monthly plan. Repeat the transfer each month if you want to give monthly."
              : "This is a manual one-time transfer."}{" "}
            MTN transfers are not confirmed by this website and do not trigger
            Givebutter receipts or automatic thank-you emails.
          </p>
        </div>
      </div>
    </section>
  );
}
