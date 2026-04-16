import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CorporateCTA() {
  return (
    <section className="bg-gradient-to-r from-[#0097b2] via-[#0F4C5C] to-[#031C3A] py-16 text-[#FCFAEF]">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-white/5 p-8">
          <p className="mb-2 font-semibold text-[#F5C94D]">CORPORATE PARTNERSHIPS</p>
          <h2 className="mb-3 text-3xl font-bold">Scale your impact with Akomapa</h2>
          <p className="mb-6 text-[#FCFAEF]/85">
            Partner with us through financial support, medication donations, and outreach collaborations that expand equitable care.
          </p>
          <Button asChild variant="amber">
            <Link href="/partner/corporate-sponsorship">
              Explore corporate sponsorship
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
