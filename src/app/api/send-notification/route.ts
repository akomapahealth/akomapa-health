import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { subject, html } = await request.json();

    if (!subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const WEB3FORMS_API_KEY = process.env.WEB3FORMS_API_KEY;
    const WEB3FORMS_API_URL = process.env.WEB3FORMS_API_URL;

    if (!WEB3FORMS_API_KEY || !WEB3FORMS_API_URL) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Send email using Web3Forms
    // Web3Forms sends emails to the email address associated with your access key
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_API_KEY);
    formData.append("subject", subject);
    formData.append("message", html);
    formData.append("from_name", "Akomapa Health Foundation");
    formData.append("replyto", "akomapahealth@gmail.com");
    
    // Add honeypot spam protection
    formData.append("botcheck", "");

    const response = await fetch(WEB3FORMS_API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.text();
      // Avoid logging the full request body — `subject`/`html` may include
      // user-supplied PII. Sentry's request context already captures route
      // metadata; we only emit the upstream status + a short snippet here.
      console.error(
        `Web3Forms upstream error: status=${response.status} body=${errorBody.slice(0, 200)}`
      );
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: response.status }
      );
    }

    const result = await response.json();
    if (result.success) {
      return NextResponse.json({ success: true });
    }

    console.error(
      `Web3Forms returned non-success: ${typeof result?.message === "string" ? result.message : "unknown reason"}`
    );
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error sending notification email:", error);
    return NextResponse.json(
      { error: "Failed to send notification email" },
      { status: 500 }
    );
  }
} 