import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, partnershipType } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Prepare form data for Web3Forms
    const formData = new FormData();
    
    // Add Web3Forms access key
    formData.append("access_key", process.env.WEB3FORMS_API_KEY!);
    
    // Add recipient email
    formData.append("to", "akomapahealth@gmail.com");
    
    // Add form data
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone || "");
    formData.append("subject", `Akomapa Health Foundation - ${subject}`);
    
    // Include partnership type in message if provided
    const fullMessage = partnershipType 
      ? `Partnership Type: ${partnershipType}\n\n${message}`
      : message;
    
    formData.append("message", fullMessage);
    
    // Add additional metadata
    formData.append("from_name", "Akomapa Health Foundation Website");
    formData.append("replyto", email);

    // Send to Web3Forms
    const response = await fetch(process.env.WEB3FORMS_API_URL!, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json(
        { message: "Message sent successfully" },
        { status: 200 }
      );
    } else {
      console.error("Web3Forms Error:", data);
      return NextResponse.json(
        { message: data.message || "Failed to send message" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 