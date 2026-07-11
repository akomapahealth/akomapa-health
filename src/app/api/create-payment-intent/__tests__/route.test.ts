import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/create-payment-intent/route";

describe("POST /api/create-payment-intent", () => {
  it("fails closed before Stripe initialization while card payments are disabled", async () => {
    const request = new NextRequest(
      "http://localhost/api/create-payment-intent",
      {
        method: "POST",
        body: JSON.stringify({ amount: 25, frequency: "one-time" }),
      },
    );

    const response = await POST(request);

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error:
        "Online card and bank-account donations are not currently available.",
    });
  });
});
