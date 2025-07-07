import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

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

    console.log("Sending email via Web3Forms:", {
      subject,
      messageLength: html.length,
      apiUrl: WEB3FORMS_API_URL
    });

    const response = await fetch(WEB3FORMS_API_URL, {
      method: "POST",
      body: formData,
    });

    console.log("Web3Forms response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Web3Forms API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log("Web3Forms API result:", result);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      console.error("Web3Forms API error:", result);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error sending notification email:", error);
    return NextResponse.json(
      { error: "Failed to send notification email" },
      { status: 500 }
    );
  }
} 