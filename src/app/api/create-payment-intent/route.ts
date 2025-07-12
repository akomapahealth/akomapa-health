import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: NextRequest) {
  try {
    const { amount, frequency, donorName, donorEmail } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Convert amount to cents
    const amountInCents = Math.round(amount * 100);

    // Create metadata for tracking
    const metadata = {
      frequency,
      donorName: donorName || "Anonymous",
      donorEmail: donorEmail || "anonymous@example.com",
      amount: amount.toString(),
    };

    if (frequency === "monthly" || frequency === "annually") {
      // For recurring donations, create proper Stripe subscriptions
      try {
        // Create or retrieve customer
        let customer;
        const existingCustomers = await stripe.customers.list({
          email: donorEmail,
          limit: 1,
        });

        if (existingCustomers.data.length > 0) {
          customer = existingCustomers.data[0];
        } else {
          customer = await stripe.customers.create({
            email: donorEmail,
            name: donorName,
            metadata: {
              donorName: donorName || "Anonymous",
              donorEmail: donorEmail || "anonymous@example.com",
            },
          });
        }

        // Create or get product
        const product = await stripe.products.create({
          name: `Akomapa Health Foundation - ${frequency} donation`,
          description: `${frequency} donation to Akomapa Health Foundation`,
          metadata: {
            type: "donation",
            frequency,
          },
        });

        // Create price for the subscription
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: amountInCents,
          currency: "usd",
          recurring: {
            interval: frequency === "monthly" ? "month" : "year",
          },
          metadata: {
            frequency,
            amount: amount.toString(),
          },
        });

        // Create subscription
        const subscription = await stripe.subscriptions.create({
          customer: customer.id,
          items: [
            {
              price: price.id,
            },
          ],
          payment_behavior: "default_incomplete",
          payment_settings: {
            save_default_payment_method: "on_subscription",
          },
          expand: ["latest_invoice.payment_intent"],
          metadata: {
            ...metadata,
            subscription_type: "donation",
          },
        });

        return NextResponse.json({
          subscriptionId: subscription.id,
          clientSecret: (subscription.latest_invoice as unknown as { payment_intent?: { client_secret?: string } })?.payment_intent?.client_secret,
          customerId: customer.id,
          priceId: price.id,
        });
      } catch (subscriptionError) {
        console.error("Stripe subscription error:", subscriptionError);
        return NextResponse.json(
          { error: "Failed to create subscription" },
          { status: 500 }
        );
      }
    } else {
      // One-time payment
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          ...metadata,
          recurring: "false",
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    }
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
} 