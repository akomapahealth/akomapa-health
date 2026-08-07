import { NextRequest, NextResponse } from "next/server";
import {
  getMailerLiteClient,
  normalizeMailerLiteError,
  upsertSubscriber,
} from "@/lib/mailerlite";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    const mailerlite = await getMailerLiteClient();
    if (!mailerlite) {
      return NextResponse.json(
        { error: "Newsletter service is currently unavailable" },
        { status: 500 },
      );
    }

    const subscriberResponse = await upsertSubscriber(mailerlite, {
      email,
      status: "active",
    });
    const subscriberData = subscriberResponse.data.data;

    return NextResponse.json(
      {
        message: "Successfully subscribed to newsletter",
        subscriber: {
          email: subscriberData?.email || email,
          status: subscriberData?.status || "active",
        },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    const normalized = normalizeMailerLiteError(error);

    if (normalized.kind === "validation") {
      return NextResponse.json(
        { error: "This email is already subscribed or invalid" },
        { status: 400 },
      );
    }

    if (normalized.kind === "rate_limited") {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    if (normalized.kind === "unauthorized") {
      return NextResponse.json(
        { error: "Newsletter service is currently unavailable" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 },
    );
  }
}
